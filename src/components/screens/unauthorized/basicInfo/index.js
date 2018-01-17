/* eslint react/prop-types: 0 */
import React from 'react';
import { View, TextInput, Modal, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import {
  CHANGE_UNAUTHORIZED_SCREEN, ADVANCE_INFO, CHECK_EMAIL, BASIC_INFO
} from '../../../../redux/common/unAuthScreen';
import Header from '../Header';
import StackedLabel from '../../../common/presentations/input/stackedLabel';


const BasicInfo = (props) => {
  const { unAuthScreen, dispatch } = props;
  const data = unAuthScreen.routeName === BASIC_INFO && unAuthScreen.data;
  const back = unAuthScreen.routeName === BASIC_INFO && unAuthScreen.back;
  const { wrapper, input } = styles;

  onLeftPress = () => dispatch({
    type: CHANGE_UNAUTHORIZED_SCREEN,
    payload: { routeName: CHECK_EMAIL },
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header
        onLeftPress={onLeftPress}
        back={back}
      />
      <ScrollView style={{ flex: 1, padding: 15 }}>
        {
          data &&
          <View style={wrapper}>
            <TextInput
              value={data.email}
              editable={!data.email}
            />
          </View>
        }
        <StackedLabel 
          iconName="ios-person-outline"
          title="Name"
          require
          editable
          value={props.name}
          onPress={() => alert(1)}
        />
        <StackedLabel 
          iconName="ios-transgender-outline"
          title="Gender"
          require
          value={props.gender}
          onPress={() => props.setModalGenderVisible(true)}
        />
        <StackedLabel 
          iconName="ios-navigate-outline"
          title="Location"
          require
          value={props.location}
        />
        <StackedLabel 
          iconName="ios-calendar-outline"
          title="Birthday"
          require
          value={props.birthday}
        />
      </ScrollView>
      <Modal 
        animationType
        visible={props.modalGenderVisible}
        style={{ 
          flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', position: 'absolute', top: 0, left: 0,
        }}
      >
        <TouchableOpacity onPress={() => {
          props.setModalGenderVisible(false);
          props.setGender('Male');
        }}
        >
          <Text>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          props.setModalGenderVisible(false);
          props.setGender('Male');
        }}
        >
          <Text>Male</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};


const HOCBasicInfo = compose(
  connect(
    state => ({
      unAuthScreen: state.unAuthScreen,
      mySelf: state.mySelfReducer,
      strings: state.strings
    }),
    dispatch => ({ dispatch }),
  ),
  withState('gender', 'setGender', 'Male'),
  withState('birthday', 'setBirthday', ''),
  withState('location', 'setLocation', ''),
  withState('name', 'setName', ''),
  withState('modalGenderVisible', 'setModalGenderVisible', false),
  withState('modalCalendarVisible', 'setModalCalendarVisible', false),
)(BasicInfo);

export default HOCBasicInfo;

const styles = StyleSheet.create({
  wrapper: {
    height: 60,
    borderBottomWidth: 1,
    borderColor: 'silver',
    marginBottom: 10
  },
  input: {
    borderWidth: 0
  }
});