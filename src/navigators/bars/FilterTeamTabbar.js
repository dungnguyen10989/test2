import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { _colors, _dims, _ios } from '../../utils';

const FilterTeamTabbar = props => {
  renderIcon = () => {
    const { 
      strings, navigationState, dispatch, jumpToIndex
    } = props;

    return(
      navigationState.routes.map((route, index) => {
        const focused = index === navigationState.index;
        const title = index === 0 ? strings.allTeams : strings.myTeams;
        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.9}
            style={{ 
              justifyContent: 'center', 
              alignItems: 'center', 
              flex: 1,
              borderWidth: 1,
              borderColor: 'blue',
              backgroundColor: focused ? 'blue' : '#ddd',
              height: 30,
              borderRadius: 10
            }}
            onPress={() => {
              jumpToIndex(index);
              console.log(index)
              // if (focused) { // 2 equals index of MapTap in routes
              //   if(navigationState.routes[index].routes[1]) {
              //     const { key } = navigationState.routes[index].routes[1];
              //     const actionToDispatch = NavigationActions.back({
              //       key
              //     });
              //     dispatch(actionToDispatch);
              //   }
              // } else {
                
              // }
            }}
          >
            <Text 
              style={{ fontSize: 9, marginTop: 2, color: focused ? '#fff' : '#000' }}
            >{title}
            </Text>
          </TouchableOpacity>
        );
      })
    );
  };

  return (
    <View style={{
      flexDirection: 'row', 
      height: 60, 
      backgroundColor: 'red', 
      justifyContent: 'center', 
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingTop: _ios ? 20 : 0
    }}
    >
      <TouchableOpacity 
        style={{ alignItems: 'center', justifyContent: 'center', marginRight: 15 }}
        onPress={() => dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' }))}
      >
        <Icon name="menu" size={22} color="blue" />
      </TouchableOpacity>

      {this.renderIcon()}

      <TouchableOpacity 
        activeOpacity={1}
        style={{ opacity: 0, marginLeft: 15 }}
      >
        <Icon name="menu" size={22} color="blue" />
      </TouchableOpacity>

    </View>
  );
};

const HOCFilterTeamTabbar = compose(
  connect(state => ({ strings: state.strings }), dispatch => ({ dispatch }))
)(FilterTeamTabbar);
export default HOCFilterTeamTabbar;
