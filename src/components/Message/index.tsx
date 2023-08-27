import React, {
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useSelector } from "react-redux";

import { RootState } from "../../store";
import { MessageType } from "../../store/conversation/reducer";

import socket from "../../socket";

interface MessageComponent {
  message: MessageType,
};

const Message = ({ message }: MessageComponent): JSX.Element => {

  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (message.sender !== user._id && !message.seen.includes(user._id)) {
      socket.volatile.emit('see_message', {
        conversationId: message.conversation,
        messageId: message._id,
      });
      console.log(`message seen`);
    }
  }, [message]);

  return (
    <View style={
      [
        styles.container,
        {
          justifyContent: message.sender !== user._id ? 'flex-start' : 'flex-end'
        }
      ]
    }>
      <View style={styles.messageBody}>
        <Text style={styles.messageText}>
          {`${message.message}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 4,
  },
  messageBody: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    maxWidth: '80%',
  },
  messageText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Message;
