import React, {Component} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../components/colors';
import logo from '../assets/images/logo.png';
import {KEY_FEED_URL_ASYNCSTORAGE} from '../constants/constants';

//const LOG_TAG = '>>> LoadingScreen ';

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.retrieveAppConfigurationStatus();
  }

  // Fetch the token from storage then navigate to our appropriate place
  retrieveAppConfigurationStatus = async () => {
    const feedUrl = await AsyncStorage.getItem(KEY_FEED_URL_ASYNCSTORAGE);

    if (feedUrl) {
      this.props.navigation.navigate('App');
    } else {
      this.props.navigation.navigate('Setup');
    }
  };

  render() {
    return (
      <View style={styles.rootStyle}>
        <Image style={styles.logoImage} source={logo} />
        <ActivityIndicator
          style={styles.activityIndicator}
          animating={true}
          size={48}
          color={colors.CETACEAN_BLUE}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    borderColor: colors.CETACEAN_BLUE,
    borderWidth: 1,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 256,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    opacity: 0.2,
  },
  logoImage: {
    width: 128,
    height: 128,
  },
});

export default LoadingScreen;
