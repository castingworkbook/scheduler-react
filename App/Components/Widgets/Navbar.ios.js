/* @flow */
'use strict';

import React, {Component, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import navbarStyle from './../../Styles/navbar.js';
import {brandPrimary as primary} from '../../Styles/variable';
import {Actions} from 'react-native-router-flux';
import AppEventEmitter from '../../Services/AppEventEmitter';

export default class Navbar extends Component {
  open () {
    AppEventEmitter.emit('hamburger.click');
  }

  render() {
    let backButton;
    if (this.props.back) {
      backButton = <TouchableOpacity onPress={Actions.pop}>
                     <View style={navbarStyle.backContainer}>
                       <Icon name="ios-arrow-left" size={40} color="rgba(255,255,255,0.9)" />
                     </View>
                   </TouchableOpacity>
    } else {
      backButton = <View style={navbarStyle.backContainer}></View>
    }

    return(
      <View style={[this.props.style, navbarStyle.navbar]}>
        { backButton }
        <View>
          <Text style={navbarStyle.title}>{this.props.title}</Text>
          <Text style={this.props.subtitleStyle}>{this.props.subtitle}</Text>
        </View>
        <TouchableOpacity onPress={this.open}>
          <View style={navbarStyle.menuContainer}>
            <Icon name="navicon" size={40} color="rgba(255,255,255,0.9)" style={{top:0}} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
