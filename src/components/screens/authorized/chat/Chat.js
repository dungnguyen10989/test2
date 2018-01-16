import React from 'react';
import { View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

const navigate = NavigationActions.navigate({ routeName: 'EventDetail' });
class Chat extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button 
          title="event detail"

          onPress={() => this.props.dispatch(navigate)}
        />
      </View>
    );
  }
}

export default connect()(Chat);

