import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, FlatList } from 'react-native';

import Profile from '../components/Profile';
import data from '../data/data';
import PostCard from '../components/PostCard';
const avatar = require('../assets/avatar.jpg');

const PostsScreen = ({ route }) => {
  console.log(route.params);
  const [posts, setPosts] = useState(data);

  useEffect(() => {
    if (route.params) {
      const newPost = { ...route.params, id: Date.now().toString() }; // Assign a unique "id" property
      setPosts(prevState => [...prevState, newPost]);
    }
  }, [route.params]);

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
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostsScreen;
