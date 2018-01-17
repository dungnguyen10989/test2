import React from 'react';
import { StatusBar, AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { NavigationActions } from 'react-navigation';
import AppIntroSlider from 'react-native-app-intro-slider';

import styles from './styles';
import { SET_TOKEN } from '../../../../redux/common/token';
import { getMySelfAction, isFetchingMySelfSelector } from '../../../../redux/common/mySelf';
import { getDisciplineAction, isFetchingDisciplineSelector } from '../../../../redux/common/discipline';
import { getLevelAction, isFetchingLevelSelector } from '../../../../redux/common/level';
import Overlay from '../../../common/presentations/overlay';

const img1 = require('../../../../assets/onboarding/img1.png');
const img2 = require('../../../../assets/onboarding/img2.png');
const img3 = require('../../../../assets/onboarding/img3.png');
const img4 = require('../../../../assets/onboarding/img4.png');

const resetRoot = NavigationActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'Authorized' })]
});

const slides = [
  {
    key: 1,
    image: img1,
    imageStyle: styles.image,
  },
  {
    key: 2,
    image: img2,
    imageStyle: styles.image,
  },
  {
    key: 3,
    image: img3,
    imageStyle: styles.image,
  },
  {
    key: 4,
    image: img4,
    imageStyle: styles.image,
  }
];

const reset = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'UnAuthForm' })
  ]
});

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
      <AppIntroSlider
        slides={slides}
        onDone={() => props.navigation.dispatch(reset)}
      />
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
      mySelf: state.mySelfReducer
    }),
    dispatch => ({ dispatch })
  ),
  lifecycle({
    componentDidMount() {
      AsyncStorage.removeItem('token');
      this.props.dispatch(getDisciplineAction());
      this.props.dispatch(getLevelAction());
      AsyncStorage.getItem('token').then(response => {
        if (response) {
          this.props.dispatch({ type: SET_TOKEN, payload: response });
          this.props.dispatch(getMySelfAction(response));
        }
      });
    },
    componentWillReceiveProps(nextProps) {
      if(!this.props.isFetchingDiscipline && !this.props.isFetchingLevel && 
        !this.props.isFetchingMySelf && nextProps.mySelf.id) {
        this.props.dispatch(resetRoot);
      }
    }
  })
)(Introduce);

export default HOCIntroduce;
