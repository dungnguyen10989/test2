import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { _colors, _dims } from '../../utils';


const event = require('../../assets/icons/tabbar/30/event.png');
const eventFocus = require('../../assets/icons/tabbar/30/eventFocus.png');
const team = require('../../assets/icons/tabbar/30/team.png');
const teamFocus = require('../../assets/icons/tabbar/30/teamFocus.png');
const feed = require('../../assets/icons/tabbar/30/flux.png');
const feedFocus = require('../../assets/icons/tabbar/30/fluxFocus.png');
const map = require('../../assets/icons/tabbar/30/map.png');
const mapFocus = require('../../assets/icons/tabbar/30/mapFocus.png');
const alert = require('../../assets/icons/tabbar/30/alert.png');
const alertFocus = require('../../assets/icons/tabbar/30/alertFocus.png');

class Tabbar extends React.Component {
  renderIcon = () => {
    const { 
      strings, navigationState, dispatch, jumpToIndex, navigation
    } = this.props;

    return(
      navigationState.routes.map((route, index) => {
        const focused = index === navigationState.index;
        let obj = {};
        if(route.routeName === 'EventTab') {
          obj = focused ? { uri: eventFocus, color: _colors.activeIconText } : 
            { uri: event, color: _colors.inactiveIconText };
          Object.assign(obj, { title: strings.eventTitle });
        }
        if(route.routeName === 'TeamTab') {
          obj = focused ? { uri: teamFocus, color: _colors.activeIconText } : 
            { uri: team, color: _colors.inactiveIconText };
          Object.assign(obj, { title: strings.teamTitle });
        }
        if(route.routeName === 'FeedTab') {
          obj = focused ? { uri: feedFocus, color: _colors.activeIconText } : 
            { uri: feed, color: _colors.inactiveIconText };
          Object.assign(obj, { title: strings.feedTitle });
        }
        if(route.routeName === 'MapTab') {
          obj = focused ? { uri: mapFocus, color: _colors.activeIconText } : 
            { uri: map, color: _colors.inactiveIconText };
          Object.assign(obj, { title: strings.mapTitle });
        }
        if(route.routeName === 'NotificationTab') {
          obj = focused ? { uri: alertFocus, color: _colors.activeIconText } : 
            { uri: alert, color: _colors.inactiveIconText };
          Object.assign(obj, { title: strings.alertTitle });
        }
        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.9}
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
            onPress={() => {
              if (focused) { // 2 equals index of MapTap in routes
                if(index !== 2 && navigationState.routes[index].routes[1]) {
                  const { key } = navigationState.routes[index].routes[1];
                  const actionToDispatch = NavigationActions.back({
                    key
                  });
                  dispatch(actionToDispatch);
                }else {
                  // const { scrollToTopFlatList } = navigationState.routes[index].routes[0].params;
                  // scrollToTopFlatList();
                }
              } else {
                jumpToIndex(index);
              }
            }}
          >
            <Image 
              source={obj.uri} 
              style={{ width: 26, height: 26, resizeMode: 'center' }} 
            />
            <Text 
              style={{ fontSize: 9, marginTop: 2, color: obj.color }}
            >{obj.title}
            </Text>
          </TouchableOpacity>
        );
      })
    );
  };

  render() {
    return (
      <View style={{
        flexDirection: 'row', 
        height: 60, 
        backgroundColor: _colors.bottomBarBackground, 
        justifyContent: 'space-around', 
        alignItems: 'center'
      }}
      >
        {this.renderIcon()}
      </View>
    );
  }
}

export default connect(state => ({ strings: state.strings, nav: state.nav }))(Tabbar);