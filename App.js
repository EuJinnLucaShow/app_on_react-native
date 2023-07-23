import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

import { Provider } from 'react-redux';
import { store } from './src/store/store';
import db from './src/firebase/config';

import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import Home from './src/screens/Home';
import CreatePostsScreen from './src/screens/CreatePostsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PostsScreen from './src/screens/PostsScreen';
import MapScreen from './src/screens/MapScreen';
import CommentsScreen from './src/screens/CommentsScreen';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  const [fontsLoaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  db.auth().onAuthStateChanged(user => setUser(user));

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="CreatePostsScreen"
            options={{ headerShown: true }}
            component={CreatePostsScreen}
          />
          <Stack.Screen name="PostsScreen" component={PostsScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="CommentsScreen" component={CommentsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
