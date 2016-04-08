/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

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

import RootRouter from './App/Components/RootRouter';

class BoilerPlate extends Component {
    render() {
        return (
            <RootRouter />
        );
    }
}


AppRegistry.registerComponent('BoilerPlate', () => BoilerPlate);
