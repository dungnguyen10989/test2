import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { compose } from 'recompose';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Text } from 'react-native-elements';
import { _colors, _dims } from '../../../../utils';

const Header = (props) => {
  const {
    onLeftPress,
    onRightPress,
    onHiddenPress,
    onTitlePress,
    titleText,
    rightIcon,
    hiddenIcon,
    showHidden,
    titleIconVisible,
  } = props;

  return (
    <View>
      <TouchableOpacity
        onPress={onLeftPress}
        activeOpacity={0.6}
      >
        <Icon name="menu" size={18} color={_COLORs.headerLeft} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onTitlePress}
        activeOpacity={0.9}
      >
        <Text>{titleText}</Text>
        {
          titleIconVisible && <Icon name="arrow-right" size={18} color={_COLORs.headerTitleText} />
        }   
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onRightPress}
        activeOpacity={0.6}
      >
        <Icon name={rightIcon} size={18} color={_COLORs.headerRight} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onHiddenPress}
        activeOpacity={0.6}
        style={[styles.hidden, showHidden ? { display: 'flex' } : { display: 'none' }]}
      >
        <Icon name={hiddenIcon} size={18} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const HOCHeader = compose()(Header);

export default HOCHeader;