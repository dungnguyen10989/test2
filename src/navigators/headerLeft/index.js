import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { compose } from 'recompose';


const HeaderLeft = (props) => {
  const { onPress } = props;
  return (
    <View>
      <TouchableOpacity 
        activeOpacity={0.6} 
        onPress={onPress}
        style={{ padding: 10 }}
      >
        <Icon name="arrow-left" size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const HOCHeaderLeft = compose()(HeaderLeft);
export default HOCHeaderLeft;