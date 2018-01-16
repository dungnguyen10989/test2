import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Footer extends React.Component {
  render() {
    const { liked, likeCount, commentCount } = this.props;
    const icon = liked ? 'ios-heart' : 'ios-heart-outline';
    const color = liked ? 'red' : 'gray';
    return (
      <View style={styles.wrapper}>
        <View style={[styles.wrapper, { marginHorizontal: 20 }]}>
          <TouchableOpacity activeOpacity={0.8}>
            <Icon name={icon} size={20} color={color} />
          </TouchableOpacity>
          <Text style={styles.text}>{likeCount}</Text>
        </View>

        <View style={styles.wrapper}>
          <Icon name="ios-chatbubbles" size={20} color="gray" />
          <Text style={styles.text}>{commentCount}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5
  },
  text: {
    marginLeft: 5
  }
});
