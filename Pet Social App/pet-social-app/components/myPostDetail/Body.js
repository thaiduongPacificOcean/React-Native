import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
const Body = ({post}) => {
  const navigation = useNavigation();
  const handlePressImage = (image) => {
    navigation.navigate("DetaiImageScreen",{image});
  }
  const time = new Date(post.createdAt.toMillis()).toLocaleString();
  const handleEdit = (post) => {
    navigation.navigate('EditPostScreen',{post})
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <TouchableOpacity onPress={() => handlePressImage(post.imageUrl)}>
          <Image style={styles.image} source={{uri: post.imageUrl}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEdit(post)}>
          <View style={styles.iconEdit}>
            <Feather name="edit" size={20} color="grey" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <View style={styles.postInfo}>
          <View style={styles.like}>
              <Image source={{uri: 'https://img.icons8.com/metro/26/like.png'}} style={styles.icon}/>
              <Text style={styles.number}>{post.like_by_users.length.toString()} Yêu Thích</Text>
            </View>
            <Divider width={2} orientation='vertical' color='#d0d0d0'/>
            <View style={styles.like}>
              <Image source={{uri: 'https://img.icons8.com/metro/26/comments.png'}} style={styles.iconCmt}/>
              <Text style={styles.number}>{post.comments.length.toString()} Bình luận</Text>
            </View>
        </View>
        <View style={styles.caption}>
          <Image source={{uri: post.profile_picture}} style={styles.profilePicture}/>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.captionText}>{post.caption}</Text>
        </View>
      </View>
    </View>
  )
}

export default Body

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  imageView: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginRight: 20,
    marginBottom: 20
  },
  image : {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20
  },
  info : {
  },
  postInfo : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  like: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: 'grey'
  },
  iconCmt: {
    width: 15,
    height: 15,
    marginRight: 8,
    tintColor: 'grey'
  },
  number: {
    color : 'grey'
  },
  caption: {

  },
  time : {
    fontSize : 10,
    marginBottom: 2
  },
  profilePicture : {
    
  },
  iconEdit : {
    backgroundColor: '#fff',
    position: 'absolute', 
    alignItems: 'center',
    padding: 2,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#B36B39'
  }
})