import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import Home from './screens/Home';
import CreatePostsScreen from './screens/CreatePostsScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
  }); // підключає шрифти
  if (!fontsLoaded) {
    return null;
  }

  const Stack = createStackNavigator(); // вказує на групу навігаторів

  return (
    <NavigationContainer>
      {' '}
      // вказує на головний навігатор
      <Stack.Navigator // вказує на групу навігаторів
        initialRouteName="LoginScreen" // вказує на початковий екран
        screenOptions={{ headerShown: false }} // вказує на те, що хедер не буде відображатись
      >
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
