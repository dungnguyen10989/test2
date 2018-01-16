import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import styles from './styles';

const noteam = require('../../../../assets/nouser.png');

const navigate = routeName => NavigationActions.navigate({ routeName });

class DetailOfTeam extends React.Component {
  render() {
    console.log(this.props);
    const { team, strings } = this.props;
    const _cover = team ? { uri: team.photo_cover } : null;
    const _avatar = team ? { uri: team.photo } : noteam;
    return (
      <View style={styles.wrapper}>
        <Image
          style={[styles.cover, team ? {} : styles.coverNull]}
          source={_cover}
        />
        <Image
          style={[styles.avatar, team ? {} : styles.avatarNull]}
          source={_avatar}
        />

        <View>
          <Text style={styles.name} numberOfLines={1}>{team ? team.name : ''}</Text>
          <Text style={styles.discipline}>{team ? team.disciplines : ''}</Text>

          <View style={styles.counterWrapper} >
            <TouchableOpacity style={styles.counterButton} activeOpacity={0.6}>
              <Text style={styles.counterText}>
                {team ? `${team.kilometer_count}  ${strings.km}` : ''}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.counterButton, { borderLeftWidth: 1, borderRightWidth: 1, borderColor: 'silver' }]}
              activeOpacity={0.6}
              onPress={() => this.props.navigation.dispatch(navigate('MembersOfTeam'))}
            >
              <Text style={styles.counterText}>
                {team ? `${team.team_user_count}  ${strings.members}` : ''}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.counterButton} 
              activeOpacity={0.6}
              onPress={() => this.props.dispatch(navigate('TrainingsOfTeam'))}
            >
              <Text style={styles.counterText}>
                {team ? `${team.training_count}  ${strings.trainings}` : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => ({ strings: state.strings }))(DetailOfTeam);
