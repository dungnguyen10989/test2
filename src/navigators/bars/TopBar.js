import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { compose } from 'recompose';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import { _colors, _dims, _ios } from '../../utils';

const TopBar = props => {
  const { Right, Center, navigation } = props;
  return(
    <View style={styles.wrapper}>
      <TouchableOpacity 
        style={styles.icon} 
        activeOpacity={0.8}  
        onPress={() => navigation.dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' }))}
      >
        <Icon name="menu" size={_dims.topBarsIcon} color={_colors.drawerOpen} />
      </TouchableOpacity>
      { Center && <Center style={styles.center} /> }
      <View style={styles.icon}>
        { Right && <Right /> }
      </View>
    </View>
  );
};

const HOCTopBar = compose(
  connect(null, dispatch => ({ dispatch }))
)(TopBar);
export default HOCTopBar;

const styles = StyleSheet.create({
  wrapper: {
    height: _dims.topBarHeight,
    paddingHorizontal: 15,
    paddingTop: _ios ? 20 : 0,
    justifyContent: 'center',
    backgroundColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

