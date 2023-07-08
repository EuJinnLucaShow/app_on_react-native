import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import React from 'react';
import { Feather, EvilIcons } from '@expo/vector-icons';

const Post = ({ img, text, messeges, location }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.postImage}></ImageBackground>
      <Text style={styles.postText}>{text}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Feather name="message-circle" size={18} color="gray" />
          <Text>{messeges}</Text>
        </View>
        <View style={styles.info}>
          <EvilIcons name="location" size={24} color="gray" />
          <Text style={styles.infoLink}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 400,
    justifyContent: 'flex-start',
    padding: 10,
  },
  postImage: {
    flex: 4,
    width: '100%',
    height: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  postText: {
    textAlign: 'left',
    marginTop: 8,
    fontWeight: '500',
    fontSize: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    padding: 10,
  },
  infoLink: {
    textDecorationLine: 'underline',
  },
});

export default Post;
