import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import {
  Text,
  TextInput,
  View,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import { login } from "../../../store/user/actions";

import { ToastMessage } from "../../../utils";

import Header from "../../../components/header";

import { BLACK, GREY, WHITE } from "../../../assets/color";

const Login = ({ navigation, route }: { navigation: any, route: any }): JSX.Element => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const TIRefEmail = useRef();
  const TIRefPassword = useRef();

  useEffect(() => {
    console.log('Login Screen');
  }, [false]);

  const onPressLogin = () => {
    if (!email) {
      TIRefEmail.current.focus();
      return;
    }
    if (!password) {
      TIRefPassword.current.focus();
      return;
    }
    const fcmToken = '';
    const params = {
      email: email,
      password: password,
      fcmToken: fcmToken,
    };
    login(params).then(success => {
      if (success) {
        navigation.replace('Inbox');
      } else {
        ToastMessage('Unable to Register');
      }
    }
    );
  }

  const onPressRegister = () => {
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title={'Login'} />
      {/* Body */}
      <View style={styles.bodyContainer}>
        {/* Login Form */}
        <View style={styles.formContainer}>
          {/* Inputs */}
          <KeyboardAvoidingView 
            style={styles.TIContainer}
            behavior='height'>
            {/* Email Input */}
            <View style={styles.TIContainer}>
              <Text style={styles.TIHeader}>
                Email
              </Text>
              <TextInput
                ref={TIRefEmail}
                style={styles.TI}
                value={email}
                placeholder="Enter Your Email"
                placeholderTextColor={GREY}
                onChangeText={setEmail} />
            </View>
            {/* Password Input */}
            <View style={styles.TIContainer}>
              <Text style={styles.TIHeader}>
                Password
              </Text>
              <TextInput
                ref={TIRefPassword}
                style={styles.TI}
                value={password}
                placeholder="Enter Your Password"
                placeholderTextColor={GREY}
                secureTextEntry
                onChangeText={setPassword} />
            </View>
          </KeyboardAvoidingView>
          {/* Login Button */}
          <Pressable
            onPress={onPressLogin}
            style={styles.loginButtonContainer}>
            <Text style={styles.loginButtonText}>
              Login
            </Text>
          </Pressable>
        </View>
        {/* Register Button */}
        <Pressable
          onPress={onPressRegister}
          style={styles.registerButtonContainer}>
          <Text style={styles.registerButtonText}>
            First Time? Register
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  bodyContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  TIContainer: {
    marginHorizontal: 10,
  },
  TIHeader: {
    marginHorizontal: 10,
    color: BLACK,
  },
  TI: {
    marginVertical: 4,
    borderRadius: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
  },
  loginButtonContainer: {
    alignSelf: 'center',
  },
  loginButtonText: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    fontSize: 20,
    color: BLACK,
    borderRadius: 10,
    backgroundColor: 'lightblue',
  },
  registerButtonContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    color: BLACK,
    textDecorationLine: 'underline',
  },
});

export default Login;