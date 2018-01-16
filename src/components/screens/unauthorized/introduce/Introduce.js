import React from 'react';
import { Image, StatusBar, AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Swiper from 'react-native-swiper';
import { NavigationActions } from 'react-navigation';

import styles from './styles';
import { SET_TOKEN } from '../../../../redux/common/token';
import { CHANGE_UNAUTHORIZED_SCREEN, BASIC_INFO } from '../../../../redux/common/unAuthScreen';
import { getMySelfAction, isFetchingMySelfSelector } from '../../../../redux/common/mySelf';
import { getDisciplineAction, isFetchingDisciplineSelector } from '../../../../redux/common/discipline';
import { getLevelAction, isFetchingLevelSelector } from '../../../../redux/common/level';
import Overlay from '../../../common/presentations/overlay';

const img1 = require('../../../../assets/onboarding/img1.png');
const img2 = require('../../../../assets/onboarding/img2.png');
const img3 = require('../../../../assets/onboarding/img3.png');
const img4 = require('../../../../assets/onboarding/img4.png');

const slides = [
  {
    key: 'somethun',
    image: img1,
    imageStyle: styles.image
  },
  {
    key: 'somethun-dos',
    image: img2,
    imageStyle: styles.image
  },
  {
    key: 'somethun1',
    image: img3,
    imageStyle: styles.image
  }
];

const Introduce = (props) => {
  const {
    isFetchingDiscipline,
    isFetchingLevel,
    isFetchingMySelf
  } = props;
  const visible = (isFetchingDiscipline || isFetchingLevel || isFetchingMySelf);
  return (
    <View style={{ flex: 1 }}>
      <Overlay visible={visible} />
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <Swiper style={styles.swiper}>
        <View style={styles.slider}>
          <Image source={img1} style={styles.image} />
        </View>
        <View style={styles.slider}>
          <Image source={img2} style={styles.image} />
        </View>
        <View style={styles.slider}>
          <Image source={img3} style={styles.image} />
        </View>
        <View style={styles.slider}>
          <Image source={img4} style={styles.image} />
        </View>
      </Swiper>
    </View>
  );
};

const HOCIntroduce = compose(
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
    },
    componentWillReceiveProps(nextProps) {
      const reset = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'UnAuthForm' })
        ]
      });

      if (!nextProps.isFetchingDiscipline && !nextProps.isFetchingLevel &&
        (this.props.isFetchingDiscipline || this.props.isFetchingLevel)) {
        AsyncStorage.getItem('token').then(response => {
          if (response) {
            const data = JSON.parse(response);
            this.props.dispatch({ type: SET_TOKEN, payload: data });
            if (data.exists) {
              this.props.dispatch(getMySelfAction(data.token));
            } else {
              this.props.dispatch({
                type: CHANGE_UNAUTHORIZED_SCREEN,
                payload: {
                  routeName: BASIC_INFO,
                  back: false
                }
              });
              this.props.navigation.dispatch(reset);
            }
          }
        });
      }
    }
  })
)(Introduce);

export default HOCIntroduce;
