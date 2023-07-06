import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';

const image = require('./assets/photobg.png');

export default function App() {
  const [activeScreen, setActiveScreen] = useState(0);

  const [fontsLoaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const changeScreen = value => {
    setActiveScreen(value);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
    </TouchableWithoutFeedback>
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
