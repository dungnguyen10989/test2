import React from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';

const { width, height } = Dimensions.get('window');


export default class Overlay extends React.Component {
  render() {
    const { visible } = this.props;
    return (
      <View
        style={{
          width,
          height,
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
          zIndex: 1000000,
          justifyContent: 'center',
          display: visible ? 'flex' : 'none'
        }}
      >
        <ActivityIndicator 
          animating
          color="gray"
        />
      </View>
    );
  }
}
