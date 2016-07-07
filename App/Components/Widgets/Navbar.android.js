/* @flow */
'use strict';

import React, { Component, Text, View } from 'react-native';
import ToolbarAndroid from 'ToolbarAndroid';
import { brandPrimary as primary } from '../../Styles/variable';
import AppEventEmitter from '../../Services/AppEventEmitter';

export default class Navbar extends Component {
  open () {
    AppEventEmitter.emit('hamburger.click');
  }

  render() {
    return(
      <ToolbarAndroid
        actions={[{title: ' ',  icon: require('../../img/menu.png'), show: 'always'}]}
        title={this.props.title}
        titleColor="#fff"
        subtitle={this.props.subtitle}
        subtitleColor="#fff"
        style={this.props.style}
        onActionSelected={this.open} />
    );
  }
}
