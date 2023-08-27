import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from "react-native";

import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { BLACK } from "../../assets/color";

const Header = ({ navigation = null, title, searchIcon = false, showBackIcon = true }: { navigation?: any | null, title: String, searchIcon?: boolean, showBackIcon?: boolean }): JSX.Element => {

  const navigateToSearch = () => {
    navigation.navigate('Search');
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {showBackIcon &&
          <EntypoIcon
            name='chevron-left'
            size={20}
            color={BLACK}
            onPress={navigation?.goBack}
            style={styles.backIcon} />}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {title}
          </Text>
        </View>
      </View>
      <View>
        {searchIcon &&
          <FontAwesomeIcon
            name='search'
            size={20}
            color={BLACK}
            onPress={navigateToSearch}
            style={styles.searchIcon} />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
  },
  subContainer: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    // paddingHorizontal: 10,
  },
  titleContainer: {},
  titleText: {
    color: 'black',
    fontSize: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
});

export default Header;
