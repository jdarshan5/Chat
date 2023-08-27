import React, { useEffect } from "react";
import {
  View,
  Text,
} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import socket from "../../socket";

import store from "../../store";
import { fetchUser } from "../../store/user/actions";

const Splash = ({ navigation, route }: { navigation: any, route: any }): JSX.Element => {

  useEffect(() => {
    init();
  }, [false]);

  const init = async () => {
    console.log('Splash Screen');
    const token = await AsyncStorage.getItem('authToken');
    console.log(token);
    if (token) {
      fetchUser(token).then(success => {
        if (success) {
          socket.io.opts.query = { _id: store.getState().user.user._id };
          socket.connect();
          navigation.replace('Inbox');
        }
      });
    } else {
      navigation.replace('Login');
    }
  }

  return (
    <View>
      <Text>
        Splash Screen
      </Text>
    </View>
  );
}

export default Splash;