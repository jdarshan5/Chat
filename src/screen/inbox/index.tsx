import React, {
  useEffect,
  useState,
} from "react";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  RefreshControl
} from 'react-native';

import Header from "../../components/header";

import store, { RootState } from "../../store";
import { useSelector } from "react-redux";
import { fetchConversation } from "../../store/conversation/actions";
import { ConversationType, SELECT_CONVERSATION } from "../../store/conversation/reducer";

const Inbox = ({ navigation, route }: { navigation: any, route: Object }): JSX.Element => {

  const { conversations } = useSelector((state: RootState) => state.conversation);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Inbox screen');
    init();
  }, [false]);

  // useEffect(() => {
  //   // if(socket.co)
  // }, [socket.connected]);

  const init = () => {
    setLoading(true);
    fetchConversation().then(() => {
      setLoading(false);
    });
  }

  const onPressConversationItem = (item: ConversationType): void => {
    store.dispatch(SELECT_CONVERSATION(item._id));
    navigation.navigate('Chat');
  }

  const renderConversations: ListRenderItem<ConversationType> = ({ item, index }) => {
    const ind = item.members.find((i: any) => i._id !== store.getState().user.user._id);
    if(item.messages.length === 0) {
      return null;
    }
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
          borderRadius: 10,
          backgroundColor: 'lightblue',
        }}
        onPress={() => onPressConversationItem(item)}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
            }}>
            {`${ind?.firstName[0]} ${ind.lastName[0]}`}
          </Text>
        </View>
        <View>
          <View>
            <Text
              style={{
                color: 'black',
              }}>
              {`${ind.firstName} ${ind.lastName}`}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: 'black',
              }}>
              {`${ind.email}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title="Inbox" searchIcon showBackIcon={false} />
      <FlatList
        data={conversations}
        renderItem={renderConversations}
        keyExtractor={(item, index) => item._id}
        refreshControl={<RefreshControl onRefresh={init} refreshing={loading} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Inbox;