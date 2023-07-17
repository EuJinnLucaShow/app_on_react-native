import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';

const wallpaper = require('../assets/wallpaper.png');

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleSubmit = () => {
    if (!login || !email || !password) {
      Alert.alert('Поле не може бути пустим!');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Невірний формат електронної пошти!');
      return;
    }
    navigation.navigate('Home', { screen: 'PostsScreen' });
    clearForm();
  };

  const clearForm = () => {
    setLogin('');
    setEmail('');
    setPassword('');
  };

  const onChangeLogin = text => {
    setLogin(text.trim());
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
                height: isShowKeybord ? 620 : 550,
              }}
            >
              <View style={styles.avatar}>
                <TouchableOpacity
                  style={styles.addAvatar}
                  onPress={() => Alert.alert('Simple Button pressed')}
                >
                  <Octicons name="plus-circle" size={25} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={[styles.input, isLoginFocused && styles.inputFocus]}
                onFocus={() => {
                  setIsShowKeybord(true), setIsLoginFocused(true);
                  setIsEmailFocused(false);
                  setIsPasswordFocused(false);
                }}
                onBlur={() => setIsLoginFocused(false)}
                onChangeText={onChangeLogin}
                value={login}
                placeholder="Логін"
              />
              <TextInput
                style={[styles.input, isEmailFocused && styles.inputFocus]}
                onFocus={() => {
                  setIsShowKeybord(true), setIsEmailFocused(true);
                  setIsLoginFocused(false);
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
                  setIsShowKeybord(true), setIsPasswordFocused(true);
                  setIsLoginFocused(false);
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
                <Text style={styles.titlebutton}>Зареєстуватися</Text>
              </TouchableOpacity>
              <Text style={styles.titletext}>
                Вже є акаунт?
                <Text
                  onPress={() => navigation.navigate('LoginScreen')}
                  style={{ color: '#FF6C00' }}
                >
                  {' '}
                  Увійти
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
  avatar: {
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    alignSelf: 'center',
  },
  addAvatar: {
    marginTop: '65%',
    left: '90%',
    height: 25,
    width: 25,
    pointerEvents: 'auto',
    backgroundColor: '#fff',
    borderRadius: 100,
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
