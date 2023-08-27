/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {
  useEffect,
} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
} from 'react-native';

import "./src/api/index.ts";

import { Provider } from 'react-redux';

import Router from './src/router';

import socket from './src/socket/index.tsx';

import store from './src/store/index.ts';
import {
  ADD_MESSAGE,
  ConversationType,
  MessageType,
  UPDATE_LAST_MESSAGE,
  UPDATE_MESSAGE
} from './src/store/conversation/reducer.ts';
import { UserType } from './src/store/user/reducer.ts';
import { ADD_SEARCH_USERS } from './src/store/search/reducer.ts';

const App = (): JSX.Element => {

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket Connected!!!');
    });
    socket.on('disconnect', (data) => {
      console.log('Socket Disconnected!!!');
    });
    socket.io.on('reconnect_attempt', () => {
      console.log('reconnecting');
    });
    socket.on('room_joined', (data) => {
      console.log(`room_joined ${data}`);
    });
    socket.on('set_user_success', (data) => {
      console.log(`set_user_success ${JSON.stringify(data)}`);
    });
    socket.on('new_message', (data: MessageType) => {
      console.log(`new_message ${JSON.stringify(data)}`);
      store.dispatch(ADD_MESSAGE(data));
    });
    socket.on('new_message_error', (data: Object) => {
      console.error(`new_message_error ${JSON.stringify(data)}`);
    })
    socket.on('update_message', (data: MessageType) => {
      console.log(`update_message ${JSON.stringify(data)}`);
    });
    socket.on('see_message_success', (data: MessageType) => {
      console.log(`see_message_success ${JSON.stringify(data)}`);
      store.dispatch(UPDATE_MESSAGE(data));
    });
    socket.on('see_message_error', (data: Object) => {
      console.error(`see_message_error ${JSON.stringify(data)}`);
    });
    socket.on('new_conversation', (data: ConversationType) => {
      console.log(`new_conversation ${JSON.stringify(data)}`);
    });
    socket.on('new_conversation_error', (data: Object) => {
      console.error(`new_conversation_error ${JSON.stringify(data)}`);
    });
    socket.on('update_conversation', (data: ConversationType) => {
      console.log(`update_conversation ${JSON.stringify(data)}`);
      store.dispatch(UPDATE_LAST_MESSAGE(data.last_message));
    });
    socket.on('search_user', (data: Array<UserType>) => {
      console.log(`search_user fetched`);
      store.dispatch(ADD_SEARCH_USERS(data));
    });
  }, [false]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'} />
      <Provider store={store}>
        <Router />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white'
  },
});

export default App;
