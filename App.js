import React, { useCallback } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


function App() {
   const [fontsLoaded] = useFonts({
    'DancingScript-Bold': require('./assets/fonts/DancingScript-Bold.ttf'),
   });
    const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>      
      <ImageBackground source={require('./assets/photobg.png')} resizeMode="cover" style={styles.image}>       
        <Text style={styles.text}>Inside</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {    
    fontFamily: 'DancingScript-Bold',
    color: 'white',
    fontSize: 42,
    lineHeight: 84,    
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default App;