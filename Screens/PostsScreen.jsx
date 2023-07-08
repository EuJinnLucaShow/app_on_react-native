import { SafeAreaView, ScrollView } from 'react-native';
import React from 'react';

import Profile from '../components/Profile';
import Post from '../components/Post';
import data from '../data/data';

const avatar = require('../assets/avatar.png');
const postImage = require('../assets/forest.png');

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
          <Post
            key={element.id}
            img={postImage}
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
