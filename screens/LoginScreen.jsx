import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const wallpaper = require('../assets/wallpaper.png');

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Поле не може бути пустим!');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Невірний формат електронної пошти!');
      return;
    }
    navigation.navigate('Home', {
      screen: 'PostsScreen',
      params: {
        user: 'e-mail@example.com',
      },
    });
    clearForm();
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };

  const onChangeEmail = text => {
    setEmail(text.trim());
  };

  const onChangePassword = text => {
    setPassword(text.trim());
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss(), setIsShowKeybord(false);
      }}
    >
      <View style={styles.container}>
        <ImageBackground source={wallpaper} style={styles.backgroundImage}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.containerKeyBoard}
          >
            <View
              style={{
                ...styles.innerContainer,
                height: isShowKeybord ? 500 : 450,
              }}
            >
              <Text style={styles.title}>Увійти</Text>
              <TextInput
                style={[styles.input, isEmailFocused && styles.inputFocus]}
                onFocus={() => {
                  setIsShowKeybord(true);
                  setIsEmailFocused(true);
                  setIsPasswordFocused(false);
                }}
                onBlur={() => setIsEmailFocused(false)}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Адреса електронної пошти"
                autoComplete="email"
                keyboardType="email-address"
              />

              <TextInput
                style={[styles.input, isPasswordFocused && styles.inputFocus]}
                onFocus={() => {
                  setIsShowKeybord(true);
                  setIsPasswordFocused(true);
                  setIsEmailFocused(false);
                }}
                onBlur={() => setIsPasswordFocused(false)}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Пароль"
                autoComplete="password"
                secureTextEntry={hidePassword}
              />

              <TouchableOpacity
                style={styles.showPassword}
                activeOpacity={0.5}
                onPress={() => {
                  setHidePassword(!hidePassword);
                }}
              >
                <Text style={styles.showPasswordText}>
                  {hidePassword ? 'Показати' : 'Приховати'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={handleSubmit}
              >
                <Text style={styles.titlebutton}>Увійти</Text>
              </TouchableOpacity>
              <Text style={styles.titletext}>
                Немає акаунту?
                <Text
                  onPress={() => navigation.navigate('RegistrationScreen')}
                  style={{ color: '#FF6C00' }}
                >
                  {' '}
                  Зареєструватися
                </Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
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
  containerKeyBoard: {
    justifyContent: 'flex-end',
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
  },
  title: {
    color: '#212121',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Roboto',
    fontWeight: 500,
    lineHeight: 35,
    letterSpacing: 0.3,
    marginTop: 32,
    marginBottom: 32,
  },
  input: {
    width: 343,
    height: 50,
    margin: 8,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  inputFocus: {
    borderColor: '#FF6C00',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#FF6C00',
    height: 50,
    width: 343,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 20,
  },
  titlebutton: {
    color: '#FFF',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 400,
  },
  showPassword: {
    top: -45,
    left: 130,
  },
  showPasswordText: {
    color: '#1B4371',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  titletext: {
    color: '#1B4371',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
    marginTop: 16,
  },
});
