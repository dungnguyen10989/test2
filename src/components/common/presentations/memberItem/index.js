import React from 'react';
import { NavigationActions } from 'react-navigation';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';

class MemberItem extends React.Component {
  render() {
    const {
      avatar, name, city, isFollowed, id
    } = this.props.user;

    const navigateAction = NavigationActions.navigate({
      routeName: 'DetailOfUser',
      params: { id }
    });

    const { strings } = this.props;

    return (
      <View style={styles.wrapper} >
        <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.dispatch(navigateAction)}>
          <Image style={styles.avatar} source={{ uri: avatar }} />
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.city}>{city}</Text>
        </View>
        {
          (id !== 25) &&
          <TouchableOpacity
            style={[styles.button, isFollowed ? styles.followedButton : styles.unfollowedButton]}
          >
            <Text
              style={[styles.buttonText,
              isFollowed ? styles.followedButtonText : styles.unfollowedButtonText]}
            >
              {isFollowed ? strings.follow : strings.unfollow}
            </Text>
          </TouchableOpacity>
        }

      </View>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.strings,
  selfInfo: state.selfInfo
});

export default connect(mapStateToProps)(MemberItem);
