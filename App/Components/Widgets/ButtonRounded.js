/* @flow */
'use strict';

import React, {Component, Text, View, TouchableOpacity } from 'react-native';
import bootstrap from '../../Styles/bootstrap';
import {brandPrimary as primary} from '../../Styles/variable';

export default class Button extends Component {
    render() {
        return(
            <TouchableOpacity
                style={ (this.props.backgroundColor) ? bootstrap.buttonColor : bootstrap.button}
                onPress={this.props.onPress}>
                    <Text style={ (this.props.backgroundColor) ? bootstrap.buttonColorText : bootstrap.buttonText}>{this.props.text}</Text>
            </TouchableOpacity> 
        );
    }    

}

