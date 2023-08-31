import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import LoginScreen from '../screens/AuthScreens/LoginScreen';
import RegisterScreen from '../screens/AuthScreens/RegistrationScreen';

import HomeScreen from '../screens/Tabs/HomeScreen';
import CommentsScreen from '../screens/NestedScreens/CommentsScreen';
import MapScreen from '../screens/NestedScreens/MapScreen';

const Stack = createStackNavigator();

export const useRoute = isAuth => {
  if (!isAuth) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: styles.header,
          headerTitleStyle: styles.title,
        }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegisterScreen}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: styles.header,
        headerTitleStyle: styles.title,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          title: 'Коментарі',
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <Stack.Screen
        options={{
          title: 'Мапа',
        }}
        name="Map"
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 500,
    fontSize: 17,
    letterSpacing: -0.4,
    textAlign: 'center',
    color: '#212121',
  },
});
