import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';

export default function LoginScreen({ changeScreen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Поле не може бути пустим!');
      return;
    }
    console.log('Email:', email);
    console.log('Пароль:', password);
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.containerKeyBoard}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Увійти</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Адреса електронної пошти"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Пароль"
          secureTextEntry={hidePassword}
        />
        <Pressable
          style={styles.showPassword}
          activeOpacity={0.5}
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
          <Text style={styles.titlebutton}>Увійти</Text>
        </Pressable>
        <Pressable onPress={() => changeScreen(1)}>
          <Text style={styles.titletext}>Немає акаунту? Зареєструватися</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerKeyBoard: {
    justifyContent: 'flex-end',
  },
  innerContainer: {
    width: '100%',
    height: 400,
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
