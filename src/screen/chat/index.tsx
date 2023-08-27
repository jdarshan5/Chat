import React, {
  useEffect,
  useState,
} from "react";
import {
  View,
  FlatList,
  ListRenderItem,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';

import Header from "../../components/header";

import { useSelector } from 'react-redux';
import { RootState } from "../../store";

import { MessageType } from "../../store/conversation/reducer";

import socket from "../../socket";

import { GREY, WHITE } from "../../assets/color";
import Message from "../../components/Message";

const Chat = ({ navigation, route }: { navigation: any, route: Object }): JSX.Element => {

  const { user } = useSelector((state: RootState) => state.user);
  const { selectedConversation } = useSelector((state: RootState) => state.conversation);

  const [message, setMessage] = useState('');

  const renderMessages: ListRenderItem<MessageType> = ({ item, index }) => {
    return <Message message={item} />
  }

  const sendMessage = () => {
    socket.emit('new_message', {
      convId: selectedConversation?._id,
      message: message.trim(),
    });
    setMessage('');
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={'Chat'} />
      <View style={styles.bodyContainer}>
        <FlatList
          data={selectedConversation?.messages ? selectedConversation?.messages : []}
          renderItem={renderMessages}
          inverted
          contentContainerStyle={{
            flexGrow: 1,
          }}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: GREY,
                }}>
                Start your conversation by sending Hii!
              </Text>
            </View>
          }
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
          }}>
          <TextInput
            style={{
              flex: 1,
              borderRadius: 10,
              marginRight: 10,
              paddingHorizontal: 10,
              backgroundColor: '#f2f2f2',
            }}
            value={message}
            onChangeText={setMessage}
            placeholder="Enter your message" />
          {message.length > 0 &&
            <Pressable
              onPress={sendMessage}>
              <Text
                style={{
                  color: 'black',
                  backgroundColor: 'lightblue',
                  padding: 10,
                  fontSize: 16,
                  borderRadius: 10,
                }}>
                Send
              </Text>
            </Pressable>
          }
        </View>
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
});

export default Chat;