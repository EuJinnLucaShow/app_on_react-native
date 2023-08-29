import 'react-native-gesture-handler';
import React from 'react';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';

import { store } from './src/redux/store';
import Main from './src/components/Main/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./src/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./src/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./src/fonts/Roboto-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
