import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

const navigate = (routeName, id) => NavigationActions.navigate({ routeName, params: { id } });

class TrainingItem extends React.Component {
  render() {
    const { training, strings } = this.props;
    const icon = training.actor.type === 'team' ? 'ios-people' : 'ios-person';
    const discipline = training.discipline === 'Indoor Cycling' ? 'ios-bicycle' : 'ios-analytics';
    const route = training.actor.type === 'team' ? 'TeamInfomation' : 'DetailOfUser';
    return (
      <View style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => this.props.dispatch(navigate(route, training.actor.id))} activeOpacity={0.8}>
            <Image
              style={styles.avatar}
              source={{ uri: training.actor.photo }}
            />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <Text style={styles.time}>{training.created}</Text>
            <Icon name={icon} size={25} color="gray" />
            <Text>{training.actor.name}</Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.dispatch(navigate('TrainingInfomation', training.id))} >
          <View>
            <Text style={styles.title} numberOfLines={2}>{training.name}</Text>
            <Image source={{ uri: training.photo }} style={styles.photo} />
            <View style={styles.infoWrapper}>
              <Icon name={discipline} size={22} style={{ marginRight: 10 }} />
              <Text style={styles.level}>{training.disciplines}</Text>
              <Text>{`, ${training.distance} km, ${training.pace}, ${training.level}`}</Text>
            </View>
            <Text style={styles.address}>{training.address}</Text>
            <Text style={styles.address}>{`${training.training_user_count} ${strings.participants}`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(state => ({ strings: state.strings }))(TrainingItem);
