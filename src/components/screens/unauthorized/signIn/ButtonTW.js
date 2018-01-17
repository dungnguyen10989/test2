import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { checkSocialExistsAction } from '../../../../redux/common/social';

const { RNTwitterSignIn } = NativeModules;

const Constants = {
  // Dev Parse keys
  TWITTER_COMSUMER_KEY: 'Mp0taY9OcO8UhvacuTPU73Xbp',
  TWITTER_CONSUMER_SECRET: 'HWAhDOOUFYsuL4H4w445eEta2lzpxRBN07zxuFZCo5UwbD9RqG'
};

class TwitterButton extends Component {
  state = {
    isLoggedIn: false
  }

  _twitterSignIn = () => {
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);
    RNTwitterSignIn.logIn()
      .then(loginData => {
        const obj = {
          email: loginData.email,
          name: loginData.name,
          provider: 'twitter',
          provider_uid: loginData.userID,
        };
        if (loginData.authToken && loginData.authTokenSecret) {
          this.props.dispatch(checkSocialExistsAction(obj));
        }
      })
      .catch(error => {
        console.log(error);
      }
      );
  }

  handleLogout = () => {
    RNTwitterSignIn.logOut();
    this.setState({
      isLoggedIn: false
    });
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <View >
        {isLoggedIn ? 
          <TouchableOpacity onPress={this.handleLogout}>
            <Text>Log out</Text>
          </TouchableOpacity> : 
          <Icon.Button name="logo-twitter" size={32} color="white" style={styles.icon} onPress={this._twitterSignIn}>
            Login with Twitter
          </Icon.Button>}
      </View>
    );
  }
}

export default connect()(TwitterButton);


const styles = StyleSheet.create({
  icon: {
    width: 200,
    height: 50
  }
});