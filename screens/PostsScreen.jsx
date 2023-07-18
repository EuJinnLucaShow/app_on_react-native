import React from 'react';
import { View, ScrollView } from 'react-native';

import PostCard from '../components/PostCard';
import Profile from '../components/Profile';
const avatar = require('../assets/avatar.jpg');
import posts from '../data/posts';

const PostsScreen = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
      }}
    >
      <Profile
        avatar={avatar}
        name="Natali Romanova"
        email="email@example.com"
      />
      <ScrollView
        style={{ margin: 0, padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {posts.map(
          ({
            img,
            description,
            likes,
            comments,
            locationName,
            geoLocation,
          }) => {
            return (
              <PostCard
                key={description}
                image={img}
                description={description}
                likes={likes}
                comments={comments}
                locationName={locationName}
                geoLocation={geoLocation}
              />
            );
          }
        )}
      </ScrollView>
    </View>
  );
};

export default PostsScreen;
