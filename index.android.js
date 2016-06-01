'use strict';

import React, {
    AppRegistry,
    Component,
    BackAndroid
} from 'react-native';
import {Actions} from 'react-native-router-flux';

BackAndroid.addEventListener('hardwareBackPress', function() {
    Actions.pop();
    return true;
});

import App from './App/Components/App';

class Scheduler extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('Scheduler', () => Scheduler);
