import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';

const Tabs = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();

  const renderPostsTabBarIcon = ({ focused }) => (
    <Feather name="grid" size={24} color={focused ? 'orange' : '#808080'} />
  );

  const renderCreatePostButton = () => (
    <TouchableOpacity
      style={styles.addButton}
      activeOpacity={0.5}
      onPress={() => navigation.navigate('CreatePostsScreen')}
    >
      <Feather name="plus" size={24} color="white" />
    </TouchableOpacity>
  );

  const renderProfileTabBarIcon = ({ focused }) => (
    <Feather name="user" size={24} color={focused ? 'orange' : '#808080'} />
  );

  const renderLogoutButton = () => (
    <TouchableOpacity
      style={styles.logoutButton}
      activeOpacity={0.5}
      onPress={() => navigation.navigate('LoginScreen')}
    >
      <Feather name="log-out" size={24} color="#808080" />
    </TouchableOpacity>
  );

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 80 },
      }}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          tabBarIcon: renderPostsTabBarIcon,
          headerTitleAlign: 'center',
          headerRightContainerStyle: { paddingRight: 20 },
          headerRight: renderLogoutButton,
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: renderCreatePostButton,
          // headerShown: false,
          // tabBarStyle: { display: 'none' },
          // headerTitleAlign: 'center',
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: renderProfileTabBarIcon,
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#FF6C00',
    height: 40,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default Home;
