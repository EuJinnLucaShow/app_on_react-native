import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { Octicons } from '@expo/vector-icons';

export default function RegistrationScreen({ changeScreen }) {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const [isShowKeybord, setIsShowKeybord] = useState(false);

  const keyboardHide = () => {
    setIsShowKeybord(false);
  };

  const handleSubmit = () => {
    if (!login || !email || !password) {
      Alert.alert('Поле не може бути пустим!');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Невірний формат електронної пошти!');
      return;
    }
    console.log('Логін:', login);
    console.log('Email:', email);
    console.log('Пароль:', password);
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
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.containerKeyBoard}
    >
      <View
        style={{
          ...styles.innerContainer,
          height: isShowKeybord ? 450 : 550,
        }}
      >
        <View style={styles.avatar}>
          <Pressable
            style={styles.addAvatar}
            onPress={() => Alert.alert('Simple Button pressed')}
          >
            <Octicons name="plus-circle" size={25} color="#FF6C00" />
          </Pressable>
        </View>
        <Text style={styles.title}>Реєстрація</Text>
        <TextInput
          style={styles.input}
          onFocus={() => setIsShowKeybord(true)}
          onEndEditing={keyboardHide}
          onChangeText={onChangeLogin}
          value={login}
          placeholder="Логін"
        />
        <TextInput
          style={styles.input}
          onFocus={() => setIsShowKeybord(true)}
          onEndEditing={keyboardHide}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Адреса електронної пошти"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onFocus={() => setIsShowKeybord(true)}
          onEndEditing={keyboardHide}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Пароль"
          secureTextEntry={hidePassword}
        />
        <Pressable
          style={styles.showPassword}
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Text style={styles.showPasswordText}>
            {hidePassword ? 'Показати' : 'Приховати'}
          </Text>
        </Pressable>
        <Pressable
          style={styles.button}
          activeOpacity={0.5}
          onPress={handleSubmit}
        >
          <Text style={styles.titlebutton}>Зареєстуватися</Text>
        </Pressable>
        <Text style={styles.titletext}>
          Вже є акаунт?
          <Text onPress={() => changeScreen(0)}> Увійти</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerKeyBoard: {
    justifyContent: 'center',
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
