import React, {
  useState,
  useRef,
} from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ToastAndroid,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";

import { register } from "../../../store/user/actions";

import { ToastMessage } from "../../../utils";

import Header from "../../../components/header";

import { BLACK, WHITE } from "../../../assets/color";

const Register = ({ navigation, route }: { navigation: any, route: any }): JSX.Element => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const TIRefFirstName = useRef();
  const TIRefLastName = useRef();
  const TIRefEmail = useRef();
  const TIRefPassword = useRef();
  const TIRefConfirmPassword = useRef();

  const onPressRegister = () => {
    if (!firstName) {
      TIRefFirstName.current.focus();
      return;
    }
    if (!lastName) {
      TIRefLastName.current.focus();
      return;
    }
    if (!email) {
      TIRefEmail.current.focus();
      return;
    }
    if (!password) {
      TIRefPassword.current.focus();
      return;
    }
    if (!confirmPassword) {
      TIRefConfirmPassword.current.focus();
      return;
    }
    if (password !== confirmPassword) {
      ToastAndroid.show('Password does not match!', ToastAndroid.BOTTOM);
      return;
    }
    const params = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    register(params).then(success => {
      if (success) {
        navigation.navigate('Login');
      } else {
        ToastMessage('Unable to Register');
      }
    });
  }

  const onPressLogin = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title={'Register'} />
      {/* Body */}
      <View style={styles.bodyContainer}>
        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Inputs */}
          <KeyboardAvoidingView 
            style={styles.TIContainer} 
            behavior='height'>
            {/* First Name Input */}
            <View style={styles.TIContainer}>
              <Text style={styles.TIHeader}>
                First Name
              </Text>
              <TextInput
                ref={TIRefFirstName}
                style={styles.TI}
                value={firstName}
                placeholder="Enter Your First Name"
                onChangeText={setFirstName} />
            </View>
            {/* Last Name Input */}
            <View style={styles.TIContainer}>
              <Text style={styles.TIHeader}>
                Last Name
              </Text>
              <TextInput
                ref={TIRefLastName}
                style={styles.TI}
                value={lastName}
                placeholder="Enter Your Last Name"
                onChangeText={setLastName} />
            </View>
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
                secureTextEntry
                onChangeText={setPassword} />
            </View>
            {/* Confirm Password Input */}
            <View style={styles.TIContainer}>
              <Text style={styles.TIHeader}>
                Confirm Password
              </Text>
              <TextInput
                ref={TIRefConfirmPassword}
                style={styles.TI}
                value={confirmPassword}
                placeholder="Confirm Your Password"
                secureTextEntry
                onChangeText={setConfirmPassword} />
            </View>
          </KeyboardAvoidingView>
          {/* Register Button */}
          <Pressable
            onPress={onPressRegister}
            style={styles.registerButtonContainer}>
            <Text style={styles.registerButtonText}>
              Register
            </Text>
          </Pressable>
        </View>
        {/* Login Button */}
        <Pressable
          onPress={onPressLogin}
          style={styles.loginButtonContainer}>
          <Text style={styles.loginButtonText}>
            Already have an account? Login
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
  registerButtonContainer: {
    alignSelf: 'center',
  },
  registerButtonText: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    fontSize: 20,
    color: BLACK,
    borderRadius: 10,
    backgroundColor: 'lightblue',
  },
  loginButtonContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    color: BLACK,
    textDecorationLine: 'underline',
  },
});

export default Register;