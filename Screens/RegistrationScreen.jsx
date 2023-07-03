import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';

const RegistrationScreen = () => {
  const [login, onChangeLogin] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.containerKeyBoard}
    >
      <View style={styles.InnerContainer}>
        <Text style={styles.Text}>Реєстрація</Text>
        <SafeAreaView style={styles.InnerContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeLogin}
            value={login}
            placeholder="Логін"
          />
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
            onPress={() => Alert.alert('Simple Button pressed')}
          >
            <Text style={styles.titlebutton}>Зареєстуватися</Text>
          </Pressable>
          <Text style={styles.titletext}>Вже є акаунт? Увійти</Text>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerKeyBoard: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  InnerContainer: {
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
  },
  Text: {
    color: '#212121',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Roboto',
    fontWeight: 500,
    lineHeight: 35,
    letterSpacing: 0.3,
    marginTop: 92,
    marginBottom: 32,
  },
  input: {
    height: 50,
    margin: 12,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  button: {
    color: '#FFF',
    backgroundColor: '#FF6C00',
    height: 50,
    width: 343,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 43,
    marginHorizontal: 25,
  },
  titlebutton: {
    color: '#FFF',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 400,
  },
  showPassword: {
    top: -45,
    left: 300,
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

export default RegistrationScreen;
