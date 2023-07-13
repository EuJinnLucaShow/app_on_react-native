import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { Feather, EvilIcons } from '@expo/vector-icons';

const PostCard = ({ image, name, messages, location }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.postImage} />
      <Text style={styles.postText}>{name}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Feather name="message-circle" size={18} color="gray" />
          <Text>{messages}</Text>
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

export default PostCard;
