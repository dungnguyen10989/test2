import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  name: {
    fontSize: 18,
    color: 'black',
    marginBottom: 5
  },
  date: {
    fontSize: 14,
    color: 'gray'
  }
});

const navigate = (id) => NavigationActions.navigate({ routeName: 'DetailOfUser', params: { id } });

class Header extends React.Component {
  render() {
    const { 
      actor, date 
    } = this.props;
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.dispatch(navigate(actor.id))} >
          <Image
            style={styles.avatar}
            source={{ uri: actor.image }}
          />
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Text style={styles.name} numberOfLines={1}>{actor.name}</Text>
          <Text style={styles.date} numberOfLines={1}>{date}</Text>
        </View>
      </View>
    );
  }
}

export default connect()(Header);

