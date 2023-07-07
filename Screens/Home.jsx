import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';

const BottomTabs = createBottomTabNavigator();

const Home = () => {
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
          tabBarIcon: ({ focused, size, color }) => {
            return <SimpleLineIcons name="grid" size={20} color={color} />;
          },
          headerTitleAlign: 'center',
          headerRightContainerStyle: { paddingRight: 20 },
          headerRight: () => (
            <TouchableOpacity
              style={styles.logoutButton}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Login')}
            >
              <Feather name="log-out" size={24} color="gray" />
            </TouchableOpacity>
          ),
        }}
        name="PostsScreen"
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
                <Text style={styles.addButtonText}>+</Text>
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
          tabBarIcon: ({ focused, size, color }) => {
            return <AntDesign name="user" size={20} color={color} />;
          },
          headerShown: false,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </BottomTabs.Navigator>
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
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default Home;
