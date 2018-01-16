import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'silver'
  },
  image: {
    width,
    height: width * 0.75,
    resizeMode: 'cover'
  },
  title: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

const navigate = (routeName, id) => (NavigationActions.navigate({
  routeName,
  params: { id }
}));

class Content extends React.Component {
  render() {
    const { title, image } = this.props;
    const padding = (!title && !image) ? {} : { paddingVertical: 10, borderTopWidth: 0.5, borderBottomWidth: 0.5 };
    return (
      <TouchableWithoutFeedback 
        style={[styles.wrapper, padding]}
        onPress={() => {}}
      >
        <View style={[styles.wrapper, padding]}>
          {
            title && 
            <TouchableOpacity 
              activeOpacity={0.5} 
            >
              <Text numberOfLines={3} style={styles.title}>{title}</Text>
            </TouchableOpacity>
          }
                
          {
            image && 
            <TouchableOpacity 
              activeOpacity={0.5} 
            >
              <Image style={styles.image} source={{ uri: image }} />
            </TouchableOpacity>
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
export default connect()(Content);

