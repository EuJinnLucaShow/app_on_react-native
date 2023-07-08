import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';

const BottomTabs = createBottomTabNavigator();

export default function Home() {
  const navigation = useNavigation();

  return (
    <BottomTabs.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 80 },
      }}
    >
      <BottomTabs.Screen
        options={{
          tabBarIcon: () => {
            return <SimpleLineIcons name="grid" size={20} color="#808080" />;
          },
          headerTitleAlign: 'center',
          headerRightContainerStyle: { paddingRight: 20 },
          headerRight: () => (
            <TouchableOpacity
              style={styles.logoutButton}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Feather name="log-out" size={24} color="#808080" />
            </TouchableOpacity>
          ),
        }}
        name="Публікації"
        component={PostsScreen}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: () => {
            return (
              <TouchableOpacity
                style={styles.addButton}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('CreatePostsScreen')}
              >
                <Text style={styles.addButtonText}>
                  <Feather name="plus" size={24} color="white" />
                </Text>
              </TouchableOpacity>
            );
          },
          headerShown: false,
          tabBarStyle: { display: 'none' },
          headerTitleAlign: 'center',
        }}
        name="CreatePostsScreen"
        component={CreatePostsScreen}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: () => {
            return <Feather name="user" size={24} color="#808080" />;
          },
          headerShown: false,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </BottomTabs.Navigator>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#FF6C00',
    height: 40,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});
