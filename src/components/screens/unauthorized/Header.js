/* eslint react/prop-types: 0 */
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Platform } from 'react-native';

const leftIcon = require('../../../assets/icons/left.png');

const styles = StyleSheet.create({
  wrapper: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    height: 50,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  leftButton: {
    width: 30,
    height: 30,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});


class Header extends React.Component {
  render() {
    const { onLeftPress, backgroundColor } = this.props;
    const secondStyle = backgroundColor ? { backgroundColor } : null;
    const title = backgroundColor ? 'Sign In with Strava' : 'Account setup';
    return (
      <View style={[styles.wrapper, secondStyle]}>
        {
          onLeftPress &&
          <TouchableOpacity
            style={styles.left}
            activeOpacity={0.5}
            onPress={onLeftPress}
          >
            <Image source={leftIcon} style={styles.leftButton} />
          </TouchableOpacity>
        }

        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

export default Header;

