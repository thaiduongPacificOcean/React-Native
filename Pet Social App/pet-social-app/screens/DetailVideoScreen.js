import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/videoDetail/Header';
import Body from '../components/videoDetail/Body';
import Comments from '../components/videoDetail/Comments';
import { Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { doc, updateDoc, arrayUnion, collection, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const DetailVideoScreen = ({ route }) => {
  const { video } = route.params;
  const [input, setInput] = useState('')

  const [currentUserLogin, setCurrentUserLogin] = useState(null)
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && user.uid) {
        console.log('User is logged in', user.uid);
        getUserData(user.uid);
      } else {
        setCurrentUserLogin(null);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const getUserData = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      setCurrentUserLogin(userDoc.data());
    }
  };
  const updateComment = async () => {
    Keyboard.dismiss();
    const userDocRef = doc(db, 'users', video.owner_id);
    const petDocRef = doc(userDocRef, 'pets', video.petID);

    const postDocRef = doc(petDocRef, 'videos', video.id);

    const newComment = {
      username: currentUserLogin.username,
      content: input,
      userId: auth.currentUser.uid,
      userCommentImg: currentUserLogin.profile_picture,
      timestamp: new Date()
    };
    try {
      updateDoc(postDocRef, {
        comments: arrayUnion(newComment)
      });

      console.log(auth.currentUser.uid, 'Đã comments bài viết có id post là :', video.id)
    }
    catch (error) {
      console.error('Lỗi nút commnents bài viết: ', error)
    }
    setInput("")
  }
  return (
    <View style={styles.container}>
      <Header video={video} />
      <Body video={video} />
      <Comments video={video} />
      <View style={styles.footer}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={updateComment}
          placeholder='Thêm bình luận...'
        >
        </TextInput>
        <TouchableOpacity onPress={updateComment}>
          <Ionicons name='send' size={24} color='#3B68E6' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DetailVideoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    bottom: 0,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: '#ECECEC',
    borderColor: 'transparent',
    padding: 10,
    color: 'grey',
    borderRadius: 30
  },
})