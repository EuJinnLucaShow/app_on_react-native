import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const PostCard = ({
  image,
  description,
  comments,
  likes,
  locationName,
  geoLocation,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.postImage} />
      <Text style={styles.postText}>{description}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CommentsScreen', {
                params: { comments, image },
              })
            }
          >
            <Feather
              name="message-circle"
              size={24}
              color={comments.length === 0 ? '#BDBDBD' : '#FF6C00'}
            />
          </TouchableOpacity>
          <Text>{comments.length}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <AntDesign name="like2" size={24} color="#FF6C00" />
        <Text>{likes}</Text>
      </View>
      <View style={styles.info}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MapScreen', {
              params: geoLocation,
            })
          }
        >
          <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <Text>{locationName}</Text>
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
