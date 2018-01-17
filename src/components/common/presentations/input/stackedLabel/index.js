import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { compose } from 'recompose';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const StackedLabel = props => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.up}>
        <Icon name={props.iconName} size={24} color="#000" />
        <View style={styles.titleWrapper}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.titile}>{`${props.title} `}</Text>
            { 
              props.require && 
              <View style={styles.star}>
                <Text style={{ color: 'orange', fontSize: 20 }}>*</Text>
              </View>
            }
            
            <Text style={{ fontSize: 20 }}> :</Text>
            
          </View>
          { props.subTitle && <Text style={styles.subTitle}>{props.subTitle}</Text> }
        </View>
      </View>
      <View style={styles.down}>
        <TouchableOpacity
          activeOpacity={props.editable ? 1 : 0.8}
          onPress={!props.editable ? props.onPress : null}
        >
          <TextInput 
            style={styles.input} 
            underlineColorAndroid="rgba(0,0,0,0)" 
            editable={props.editable === true}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HOCStackedLabel = compose()(StackedLabel);

export default HOCStackedLabel;