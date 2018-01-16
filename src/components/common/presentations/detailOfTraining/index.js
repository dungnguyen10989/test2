import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import styles from './styles';

const notraining = require('../../../../assets/nouser.png');

class DetailOfTraining extends React.Component {
  render() {
    const { training, strings } = this.props;
    const _cover = training ? { uri: training.photo_cover } : null;
    const _avatar = training ? { uri: training.photo } : notraining;
    return (
      <View style={styles.wrapper}>
        <Image
          style={[styles.cover, training ? {} : styles.coverNull]}
          source={_cover}
        />
        <Image
          style={[styles.avatar, training ? {} : styles.avatarNull]}
          source={_avatar}
        />
        {
          training && training.user_id === 25 &&
          <TouchableOpacity style={styles.camera} activeOpacity={0.6}>
            <Icons name="ios-camera" size={30} />
          </TouchableOpacity>
        }

        <View>
          <Text style={styles.name} numberOfLines={1}>{training ? training.name : ''}</Text>
          <Text style={styles.discipline}>{training ? training.disciplines : ''}</Text>

          <View style={styles.counterWrapper} >
            <TouchableOpacity style={styles.counterButton} activeOpacity={0.6}>
              <Text style={styles.counterText}>
                {training ? `${training.kilometer_count}  ${strings.km}` : ''}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.counterButton, { borderLeftWidth: 1, borderRightWidth: 1, borderColor: 'silver' }]}
              activeOpacity={0.6}
            >
              <Text style={styles.counterText}>
                {training ? `${training.training_user_count}  ${strings.members}` : ''}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.counterButton} activeOpacity={0.6}>
              <Text style={styles.counterText}>
                {training ? `${training.training_count}  ${strings.trainings}` : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}


export default connect(state => ({ strings: state.strings }))(DetailOfTraining);
