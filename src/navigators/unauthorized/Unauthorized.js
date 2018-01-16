import React from 'react';
import { View, Image, StatusBar, ActivityIndicator, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Swiper from 'react-native-swiper';
import styles from './styles';
import { SET_TOKEN } from '../../redux/common/token';
import { getMySelfAction, isFetchingMySelfSelector } from '../../redux/common/mySelf';
import { getDisciplineAction, isFetchingDisciplineSelector } from '../../redux/common/discipline';
import { getLevelAction, isFetchingLevelSelector } from '../../redux/common/level';
import UnAuthForm from '../../components/screens/unauthorized';

const bg = require('../../assets/onboarding/img1.png');
const img1 = require('../../assets/onboarding/img1.png');
const img2 = require('../../assets/onboarding/img2.png');
const img3 = require('../../assets/onboarding/img3.png');

const Unauthorized = (props) => {
  const {
    isFetchingDiscipline,
    isFetchingLevel,
    isFetchingMySelf
  } = props;
  const visible = (isFetchingDiscipline || isFetchingLevel || isFetchingMySelf) ?
    { display: 'flex' } : { display: 'none' };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.indicator, visible]}>
        <ActivityIndicator animating color="#fff" />
      </View>
      <Swiper>
        <View style={styles.wrapper}>
          <Image source={img1} style={styles.background} />
        </View>
        <View style={styles.wrapper}>
          <Image source={img2} style={styles.background} />
        </View>
        <View style={styles.wrapper}>
          <Image source={img3} style={styles.background} />
        </View>
        <View style={styles.wrapper}>
          <Image source={bg} style={styles.image} />
          <UnAuthForm />
        </View>
      </Swiper>
    </View>
  );
};

const HOCUnauthorized = compose(
  connect(
    state => ({
      strings: state.strings,
      isFetchingDiscipline: isFetchingDisciplineSelector(state),
      isFetchingLevel: isFetchingLevelSelector(state),
      isFetchingMySelf: isFetchingMySelfSelector(state),
    }),
    dispatch => ({ dispatch })
  ),
  lifecycle({
    componentDidMount() {
      this.props.dispatch(getDisciplineAction());
      this.props.dispatch(getLevelAction());

      AsyncStorage.getItem('token').then(response => {
        if(response) {
          const data = JSON.parse(response);
          this.props.dispatch({ type: SET_TOKEN, payload: data });
          if(data.exists) {
            this.props.dispatch(getMySelfAction(data.token));
          }
        }
      });
    },
  })
)(Unauthorized);

export default HOCUnauthorized;
