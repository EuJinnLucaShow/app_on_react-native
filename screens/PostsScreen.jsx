import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import PostCard from '../components/PostCard';
import Profile from '../components/Profile';
const avatar = require('../assets/avatar.jpg');
import posts from '../data/posts';

const PostsScreen = () => {
  return (
    <SafeAreaView
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'visible',
      }}
    >
      <ScrollView>
        <Profile
          avatar={avatar}
          name="Natali Romanova"
          email="email@example.com"
        />
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
    </SafeAreaView>
  );
};

export default PostsScreen;
