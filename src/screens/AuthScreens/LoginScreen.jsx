import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/authOperations';
import { authStateChange } from '../../redux/auth/authSlice';
import Background from '../../components/Background/Background';
import MainButton from '../../components/Buttons/MainButton';
import AuthLinkButton from '../../components/Buttons/AuthLinkButton';

export default function LoginScreen() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isShownPsw, setIsShownPsw] = useState(true);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleFocus = key => {
    setIsFocused(key);
  };

  const handleBlur = () => {
    setIsFocused('');
  };

  const handleLoginSubmit = () => {
    if (email && password) {
      dispatch(login(email, password)).then(data => {
        if (data === undefined || !data.user) {
          return;
        }
        dispatch(authStateChange({ stateChange: true }));
        setEmail('');
        setPassword('');
      });
      return;
    }
  };

  return (
    <>
      <Background />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.form}>
            <Text style={styles.formTitle}>Увійти</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    isFocused === 'emailAddress' ? '#FF6C00' : '#E8E8E8',
                },
              ]}
              placeholderTextColor={'#BDBDBD'}
              placeholder="Адреса електронної пошти"
              value={email}
              textContentType="emailAddress"
              autoCompleteType="email"
              onBlur={handleBlur}
              onFocus={() => handleFocus('emailAddress')}
              onChangeText={setEmail}
            />

            <View style={(position = 'relative')}>
              <TextInput
                style={[
                  styles.input,
                  { marginBottom: 0 },
                  {
                    borderColor:
                      isFocused === 'password' ? '#FF6C00' : '#E8E8E8',
                  },
                ]}
                placeholderTextColor={'#BDBDBD'}
                placeholder="Пароль"
                value={password}
                textContentType="password"
                autoCompleteType="off"
                secureTextEntry={isShownPsw}
                onBlur={handleBlur}
                onFocus={() => handleFocus('password')}
                onChangeText={setPassword}
              />
              {password && (
                <TouchableOpacity
                  style={styles.btnShowPassword}
                  onPress={() => setIsShownPsw(!isShownPsw)}
                >
                  <Text style={styles.btnShowPasswordText}>
                    {isShownPsw ? 'Показати' : 'Приховати'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {!keyboardStatus && (
              <View>
                <MainButton
                  text="Увійти"
                  onPress={() => handleLoginSubmit(email, password)}
                />
                <AuthLinkButton
                  text="Немає акаунту?"
                  linkText="Зареєструватися"
                  onPress={() => navigation.navigate('Registration')}
                />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    position: 'relative',
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  formTitle: {
    fontFamily: 'Roboto-Medium',
    color: '#212121',
    marginBottom: 33,
    fontSize: 30,
    textAlign: 'center',
  },
  input: {
    fontFamily: 'Roboto-Regular',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    color: '#212121',
    padding: 16,
    marginBottom: 16,
  },
  btnShowPassword: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  btnShowPasswordText: {
    color: '#1B4371',
  },
});
