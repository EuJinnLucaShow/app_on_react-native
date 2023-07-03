import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import React from 'react';

const backgroundImage = require('./assets/photobg.png');

export default function App() {
  return (
    <View style={styles.Container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.InnerContainer}>
          <Text style={styles.Text}>Реєстрація</Text>
        </View>
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
  InnerContainer: {
    width: '100%',
    height: 549,
    flexShrink: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
  },
  Text: {
    color: '#212121',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'normal',
    letterSpacing: 0.3,
    marginTop: 92,
  },
});
