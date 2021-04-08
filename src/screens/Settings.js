import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import DataInput from '../components/screen_settings/DataInput';

import colors from '../components/colors';
import fontSizes from '../components/fontSizes';
import {
  DEFAULT_API_URL,
  DEFAULT_NUMBER_OF_POSTS,
  DEFAULT_UPDATE_INTERVAL,
} from '../constants/Config';
import Header from '../components/common/Header';
import {
  KEY_FEED_URL_ASYNCSTORAGE,
  KEY_NUMBER_OF_POSTS_ASYNCSTORAGE,
  KEY_UPDATE_INTERVAL_ASYNCSTORAGE,
} from '../constants/constants';

const locale = require('../assets/langs/en.json');

let updateInterval = DEFAULT_UPDATE_INTERVAL;

const LOG_TAG = '>>> Settings ';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedUrl: DEFAULT_API_URL,
      numberOfPosts: DEFAULT_NUMBER_OF_POSTS.toString(),
      humanReadableUpdateInterval: '',
      submitButtonColor: colors.CETACEAN_BLUE,

      feedUrlIsNotCorrect: false,
      numberOfPostsIsNotCorrect: false,
      updateIntervalIsNotCorrect: false,

      configSaveLocked: false,
    };

    this.handleFeedUrlInput = this.handleFeedUrlInput.bind(this);
    this.handleNumberOfPostsInput = this.handleNumberOfPostsInput.bind(this);
    this.handleUpdateIntervalInput = this.handleUpdateIntervalInput.bind(this);
  }

  componentDidMount() {
    this.retrieveSavedConfig();
  }

  retrieveSavedConfig() {
    this.retrieveDataFromAsyncStorage(KEY_FEED_URL_ASYNCSTORAGE, 'feedUrl');
    this.retrieveDataFromAsyncStorage(
      KEY_NUMBER_OF_POSTS_ASYNCSTORAGE,
      'numberOfPosts',
    );
    this.retrieveTimeFromAsyncStorage();
  }

  async retrieveDataFromAsyncStorage(key, stateValueToSet) {
    const retrievedData = await AsyncStorage.getItem(key);

    if (retrievedData) {
      this.setState({
        [stateValueToSet]: retrievedData,
      });
    }
  }

  async retrieveTimeFromAsyncStorage() {
    const retrievedData = await AsyncStorage.getItem(
      KEY_UPDATE_INTERVAL_ASYNCSTORAGE,
    );

    if (retrievedData) {
      updateInterval = retrievedData;

      const readableTime = this.convertTimeToMMSS(
        Number.valueOf(retrievedData),
      );
      this.setState({
        humanReadableUpdateInterval: readableTime,
      });
    } else {
      const readableTime = this.convertTimeToMMSS(DEFAULT_UPDATE_INTERVAL);
      this.setState({
        humanReadableUpdateInterval: readableTime,
      });
    }
  }

  convertTimeToMMSS(timeInSeconds) {
    const sec_num = parseInt(timeInSeconds, 10);
    const hours = Math.floor(sec_num / 3600) % 24;
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;
    return [hours, minutes, seconds]
      .map(v => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  }

  convertHHMMSStoTime(time) {
    const a = time.split(':');

    const seconds = +a[0] * 60 + +a[1];
    console.log(LOG_TAG, seconds);

    return seconds;
  }

  handleFeedUrlInput(text) {
    this.setState({
      feedUrl: text,
      feedUrlIsNotCorrect: false,
      configSaveLocked: false,
      submitButtonColor: colors.CETACEAN_BLUE,
    });
  }

  handleNumberOfPostsInput(text) {
    this.setState({
      numberOfPosts: text,
      numberOfPostsIsNotCorrect: false,
      configSaveLocked: false,
      submitButtonColor: colors.CETACEAN_BLUE,
    });
  }

  handleUpdateIntervalInput(text) {
    this.setState({
      humanReadableUpdateInterval: text,
      updateIntervalIsNotCorrect: false,
      configSaveLocked: false,
      submitButtonColor: colors.CETACEAN_BLUE,
    });
  }

  checkData() {
    console.log(
      LOG_TAG,
      this.checkUrl(),
      this.checkNumberOfPosts(),
      this.checkUpdateInterval(),
    );
    if (
      this.checkUrl() &&
      this.checkNumberOfPosts() &&
      this.checkUpdateInterval()
    ) {
      this.saveConfig();
      this.navigateToPostsList();
      console.log(LOG_TAG, 'updateInterval', updateInterval);
    }
  }

  checkUrl() {
    const res = this.state.feedUrl.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    if (res == null) {
      this.setState({
        feedUrlIsNotCorrect: true,
        configSaveLocked: true,
        submitButtonColor: colors.CETACEAN_BLUE_OPAQUE,
      });
      return false;
    }
    return true;
  }

  checkNumberOfPosts() {
    if (+this.state.numberOfPosts < 1) {
      this.setState({
        numberOfPostsIsNotCorrect: true,
        configSaveLocked: true,
        submitButtonColor: colors.CETACEAN_BLUE_OPAQUE,
      });
      return false;
    }
    return true;
  }

  checkUpdateInterval() {
    if (this.state.humanReadableUpdateInterval.split(':').length !== 2) {
      this.setState({
        updateIntervalIsNotCorrect: true,
        configSaveLocked: true,
        submitButtonColor: colors.CETACEAN_BLUE_OPAQUE,
      });
      return false;
    }
    const intervalInSeconds = this.convertHHMMSStoTime(
      this.state.humanReadableUpdateInterval,
    );
    if (intervalInSeconds < 30 || intervalInSeconds > 3600) {
      this.setState({
        updateIntervalIsNotCorrect: true,
        configSaveLocked: true,
        submitButtonColor: colors.CETACEAN_BLUE_OPAQUE,
      });
      return false;
    } else {
      console.log(LOG_TAG, 'intervalInSeconds', intervalInSeconds);
      updateInterval = intervalInSeconds;

      return true;
    }
  }

  resetConfig() {
    this.setState({
      feedUrl: DEFAULT_API_URL,
      numberOfPosts: DEFAULT_NUMBER_OF_POSTS.toString(),
      humanReadableUpdateInterval: this.convertTimeToMMSS(
        DEFAULT_UPDATE_INTERVAL,
      ),

      submitButtonColor: colors.CETACEAN_BLUE,

      feedUrlIsNotCorrect: false,
      numberOfPostsIsNotCorrect: false,
      updateIntervalIsNotCorrect: false,

      configSaveLocked: false,
    });
    updateInterval = DEFAULT_UPDATE_INTERVAL;
  }

  async saveConfig() {
    try {
      await AsyncStorage.setItem(KEY_FEED_URL_ASYNCSTORAGE, this.state.feedUrl);
      await AsyncStorage.setItem(
        KEY_NUMBER_OF_POSTS_ASYNCSTORAGE,
        JSON.stringify(this.state.numberOfPosts),
      );
      await AsyncStorage.setItem(
        KEY_UPDATE_INTERVAL_ASYNCSTORAGE,
        JSON.stringify(updateInterval),
      );
      console.log(LOG_TAG, 'updateInterval', updateInterval);
    } catch (error) {
      console.log(LOG_TAG, 'saveConfig catch', error);
    }
  }

  navigateToPostsList = () => {
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={styles.rootStyle}>
        <Header header={locale.data.settings_header} />
        <View style={styles.container}>
          <DataInput
            value={this.state.feedUrl}
            label={locale.data.enter_feed_url}
            placeholder={locale.data.feed_url_placeholder}
            handleInput={this.handleFeedUrlInput}
            dataIsIncorrect={this.state.feedUrlIsNotCorrect}
          />
          <DataInput
            value={this.state.numberOfPosts}
            label={locale.data.enter_number_of_posts}
            placeholder={locale.data.number_of_posts_placeholder}
            keyboardType="number-pad"
            handleInput={this.handleNumberOfPostsInput}
            dataIsIncorrect={this.state.numberOfPostsIsNotCorrect}
          />
          <DataInput
            value={this.state.humanReadableUpdateInterval}
            label={locale.data.enter_update_interval}
            placeholder={locale.data.update_interval_placeholder}
            keyboardType="number-pad"
            handleInput={this.handleUpdateIntervalInput}
            dataIsIncorrect={this.state.updateIntervalIsNotCorrect}
          />
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: this.state.submitButtonColor,
                  marginVertical: 16,
                },
              ]}
              onPress={() => this.checkData()}
              disabled={this.state.configSaveLocked}>
              <Text
                style={{
                  fontSize: fontSizes.SUBTITLE,
                  color: colors.WHITE,
                }}>
                {locale.data.save_button}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: colors.CETACEAN_BLUE}]}
              onPress={() => this.resetConfig()}>
              <Text
                style={{
                  fontSize: fontSizes.SUBTITLE,
                  color: colors.WHITE,
                }}>
                {locale.data.reset_button}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
  },
  buttonWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  button: {
    flex: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
});

export default Settings;
