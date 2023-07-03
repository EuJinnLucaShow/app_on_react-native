import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, View } from 'react-native';
import React from 'react';
import LoginScreen from './Screens/LoginScreen';
// import RegistrationScreen from './Screens/RegistrationScreen';

const image = require('./assets/photobg.png');

export default function App() {
  return (
    <View style={styles.Container}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <LoginScreen />
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
});
