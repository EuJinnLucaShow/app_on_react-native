import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, View } from 'react-native';
import React, { useState } from 'react';
import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';

const image = require('./assets/photobg.png');

export default function App() {
  const [activeScreen, setActiveScreen] = useState(0);

  const changeScreen = value => {
    setActiveScreen(value);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        {activeScreen === 0 ? (
          <LoginScreen changeScreen={changeScreen} />
        ) : (
          <RegistrationScreen changeScreen={changeScreen} />
        )}
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
});
