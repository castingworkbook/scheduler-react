/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';
import React, {
    AppRegistry,
    Component,
    StatusBarIOS
} from 'react-native';

StatusBarIOS.setStyle('light-content');
import RootRouter from './App/Components/RootRouter';

class Scheduler extends Component {
  render() {
    return (
      <RootRouter />
    );
  }
}

AppRegistry.registerComponent('Scheduler', () => Scheduler);
