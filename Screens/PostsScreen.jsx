import { SafeAreaView, ScrollView } from 'react-native';
import React from 'react';

import Profile from '../components/Profile';
import PostCard from '../components/PostCard';
import data from '../data/data';

const avatar = require('../assets/avatar.jpg');

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
        {data.map(element => (
          <PostCard
            key={element.id}
            img={element.image}
            text={element.name}
            messages={0}
            location={element.location}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostsScreen;
