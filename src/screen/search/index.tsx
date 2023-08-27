import React, {
  useState,
  useEffect,
} from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  BackHandler
} from 'react-native';

import Header from "../../components/header";

import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { UserType } from "../../store/user/reducer";
import { ADD_SEARCH_USERS } from "../../store/search/reducer";
import { ADD_TO_CONVERSATION, ConversationType, SELECT_CONVERSATION } from "../../store/conversation/reducer";

import socket from "../../socket";

import { BLACK, WHITE } from "../../assets/color";

const Search = ({ navigation, route }: { navigation: any, route: any }): JSX.Element => {

  const { conversations } = useSelector((state: RootState) => state.conversation);
  const { searchUser } = useSelector((state: RootState) => state.search);

  const [search, setSearch] = useState('');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);

  const onBackPress = (): null | boolean | undefined => {
    console.log('backPressed');
    return true;
  }

  const handleSearchText = (value: string) => {
    if (value === '') {
      store.dispatch(ADD_SEARCH_USERS([]));
      setSearch('');
      return;
    }
    socket.emit('search_user', value.trim());
    setSearch(value);
  }

  const onPressUserItem = async (user: UserType) => {
    const convIndex = conversations.findIndex((i, index) => {
      if (i.members.findIndex(i => i._id === user._id) > 0) {
        return true;
      }
      return false;
    });
    if (convIndex !== -1) {
      store.dispatch(SELECT_CONVERSATION(conversations[convIndex]._id));
      navigation.navigate('Chat');
      return;
    } else {
      console.log('need to create conversation');
      socket.emit('new_conversation', user._id, (conversation: ConversationType) => {
        store.dispatch(ADD_TO_CONVERSATION(conversation));
        navigation.navigate('Chat');
      });
    }
  }

  const renderUser: ListRenderItem<UserType> = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.userContainer}
        onPress={() => onPressUserItem(item)} >
        {/* User's Initial */}
        <View style={styles.userNameInitContainer}>
          <Text style={styles.userNameInitText}>
            {`${item.firstName[0]} ${item.lastName[0]}`}
          </Text>
        </View>
        <View>
          {/* Name */}
          <View style={styles.userNameContainer}>
            <Text style={styles.userNameText}>
              {`${item.firstName} ${item.lastName}`}
            </Text>
          </View>
          {/* Email */}
          <View style={styles.userEmailContainer}>
            <Text style={styles.userEmailText}>
              {`${item.email}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={'Search'} />
      <View style={styles.bodyContainer}>
        <View style={styles.searchTIContainer}>
          <TextInput
            value={search}
            onChangeText={handleSearchText}
            placeholder={'Search'}
            style={styles.searchTI} />
        </View>
        <View>
          <FlatList
            data={searchUser}
            renderItem={renderUser} />
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
  searchTIContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  searchTI: {
    flex: 1,
    borderRadius: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
    color: BLACK,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: 'lightblue',
  },
  userNameInitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userNameInitText: {
    fontSize: 20,
    color: 'black',
  },
  userNameContainer: {},
  userNameText: {
    color: 'black',
  },
  userEmailContainer: {},
  userEmailText: {
    color: 'black',
  },
});

export default Search;
