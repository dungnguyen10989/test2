import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const TeamItem = props => {
  const {
    photo, name, team_user_count, level, address, training_count, type, id
  } = props.team;

  const actionToDispatch = NavigationActions.navigate(
    {
      routeName: 'TeamInformation',
      params: { id, type }
    }
  );

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => props.dispatch(actionToDispatch)} >
      <View style={styles.wrapper}>
        <Image style={styles.avatar} source={{ uri: photo }} />
        <View style={styles.textWrapper}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.level} numberOfLines={1}>
            <Text>
              {`${level} / `}
            </Text>
            <Text>
              {`${team_user_count} ${strings.members} / `}
            </Text>
            <Text>
              {`${training_count} ${strings.trainings}`}
            </Text>
          </Text>
          <Text style={styles.address} numberOfLines={1}>{address}</Text>
        </View>
        {
          type === 2 && <Icon name="ios-lock" color="#f1c40f" size={30} style={styles.lock} />
        }
      </View>
    </TouchableOpacity>
  );
};

const HOCTeamItem = compose(
  connect(
    state => ({ strings: state.strings }),
    dispatch => ({ dispatch })
  )
)(TeamItem);

export default HOCTeamItem;