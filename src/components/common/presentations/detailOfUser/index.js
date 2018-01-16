import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import styles from './styles';

const nouser = require('../../../../assets/nouser.png');

const navigate = (routeName, id) => NavigationActions.navigate({ routeName, params: { id } });

class DetailOfUser extends React.Component {
  render() {
    const { user, strings } = this.props;
    const {
      wrapper, cover, avatar, camera, coverNull, avatarNull, name, discipline,
      followWrapper, followButton, controlWrapper, followText,
      counterWrapper, counterButton, counterText, controlButton, controlLeft
    } = styles;
    const _cover = user ? { uri: user.cover } : null;
    const _avatar = user ? { uri: user.avatar[200] } : nouser;

    return (
      <View style={wrapper}>
        <Image
          style={[cover, user ? {} : coverNull]}
          source={_cover}
        />
        <Image
          style={[avatar, user ? {} : avatarNull]}
          source={_avatar}
        />
        {
          user && user.id === 25 &&
          <TouchableOpacity style={camera} activeOpacity={0.6}>
            <Icons name="ios-camera" size={30} />
          </TouchableOpacity>
        }
        {
          user && user.id === 25 &&
          <View style={controlWrapper}>
            <View style={controlLeft}>
              <Icons name="ios-contact" size={20} style={controlButton} />
              <Icons name="ios-search" size={20} style={controlButton} />
            </View>
            <Icons name="ios-more" size={20} style={controlButton} />
          </View>
        }

        <View>
          <Text
            style={[name, (user && user.id === 25) ? { marginTop: 30 } : { marginTop: 60 }]}
          >{user ? user.first_name.concat(user.last_name) : ''}
          </Text>
          <Text
            style={discipline}
          >{user ? user.disciplines_show : ''}
          </Text>

          <View style={followWrapper}>
            <TouchableOpacity
              style={[followButton, { borderRightWidth: 0.5 }]}
              activeOpacity={0.6}
              onPress={() => this.props.dispatch(navigate('ListFollowing', user.id))}
            >
              <Text style={followText}>{user ? `${user.following_count} ${strings.following}` : ''}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[followButton, { borderLeftWidth: 0.5 }]} 
              activeOpacity={0.6}
              onPress={() => this.props.dispatch(navigate('ListFollower', user.id))}
            >
              <Text style={followText}>{user ? `${user.follower_count}  ${strings.follower}` : ''}</Text>
            </TouchableOpacity>
          </View>

          <View style={counterWrapper} >
            <TouchableOpacity style={counterButton} activeOpacity={0.6}>
              <Text style={counterText}>
                {user ? `${user.kilometer_count}  ${strings.km}` : ''}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[counterButton, { borderLeftWidth: 1, borderRightWidth: 1, borderColor: 'silver' }]}
              activeOpacity={0.6}
            >
              <Text style={counterText}>
                {user ? `${user.team_count} ${strings.teams}` : ''}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={counterButton} activeOpacity={0.6}>
              <Text style={counterText}>
                {user ? `${user.training_count} ${strings.trainings}` : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}


export default connect(state => ({ strings: state.strings }))(DetailOfUser);
