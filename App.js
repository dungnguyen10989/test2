import { Provider } from 'react-redux';
import React from 'react';
import Root from './src/navigators/Root';
import store from './src/redux/store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export default App;