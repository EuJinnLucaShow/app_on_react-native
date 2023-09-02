import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font'; // Import the Font module
import { Provider } from 'react-redux';

import { store } from './src/redux/store';
import Main from './src/components/Main/Main';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Roboto-Regular': require('./src/fonts/Roboto-Regular.ttf'),
          'Roboto-Medium': require('./src/fonts/Roboto-Medium.ttf'),
          'Roboto-Bold': require('./src/fonts/Roboto-Bold.ttf'),
        });
        // Other asynchronous operations can be added here
      } catch (error) {
        console.warn('Error loading assets:', error);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  });

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Main onLayout={onLayoutRootView} />
    </Provider>
  );
}
