'use strict';

import React, {
    AppRegistry,
    Component,
    StatusBarIOS
} from 'react-native';

import App from './App/Components/App';
StatusBarIOS.setStyle('light-content');

class Scheduler extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('Scheduler', () => Scheduler);
