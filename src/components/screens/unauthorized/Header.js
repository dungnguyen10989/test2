import React from 'react';
import { compose } from 'recompose';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'silver'
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
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});


const Header = props => {
  const { back, onLeftPress, strings } = props;
  return (
    <View style={styles.wrapper}>
      {
        back !== false &&
        <TouchableOpacity
          style={styles.left}
          activeOpacity={0.6}
          onPress={onLeftPress}
        >
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
      }
      <Text style={styles.title}>{strings.titleBasicInfo}</Text>
      { back !== false && <View style={styles.left} /> }
    </View>
  );
};

const HOCHeader = compose(
  connect(state => ({ strings: state.strings }))
)(Header);

export default HOCHeader;

