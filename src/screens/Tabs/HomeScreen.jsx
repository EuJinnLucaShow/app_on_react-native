import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import { logout } from '../../redux/auth/authOperations';
import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';

const MainTab = createBottomTabNavigator();

export default HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        headerStyle: styles.header,
        headerTitleStyle: styles.title,
        tabBarStyle: styles.tab,

        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'PostsScreen') {
            iconName = 'grid';
          }
          if (route.name === 'CreatePostsScreen') {
            iconName = 'plus';
          }
          if (route.name === 'ProfileScreen') {
            iconName = 'user';
          }
          return (
            <View
              style={{
                ...styles.iconsTab,
                backgroundColor: focused ? '#FF6C00' : '#FFFFFF',
              }}
            >
              <Feather
                name={iconName}
                size={24}
                color={focused ? '#FFFFFF' : 'gray'}
              />
            </View>
          );
        },
      })}
    >
      <MainTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: 'Публікації',
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color={'#BDBDBD'}
              style={{ marginRight: 10 }}
              onPress={() => dispatch(logout())}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: 'none' },
          title: 'Створити публікацію',
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
              color={'#212121'}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 88,
  },
  title: {
    fontWeight: 500,
    fontSize: 17,
    letterSpacing: -0.4,
    textAlign: 'center',
    color: '#212121',
  },
  tab: {
    paddingHorizontal: 50,
    height: 71,
  },
  iconsTab: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 39,
    borderRadius: 22,
    width: 70,
    height: 40,
    padding: 8,
  },
});
