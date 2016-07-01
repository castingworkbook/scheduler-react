/* @flow */
'use strict';

import React, { Component, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Button from './Button';
import Icon from 'react-native-vector-icons/Ionicons';
import controlPanel from '../../Styles/controlPanel';
import {Actions} from 'react-native-router-flux';
import { resetData } from '../../Network/Api';

export default class ControlPanel extends Component {
  render() {
    return (
      <View style={controlPanel.sidebar}>
        <ScrollView>
          <Image source={require('../../img/cwb_logo.png')} style={controlPanel.logo} />
          <View style={{position: 'relative'}}>
            <TouchableOpacity
              style={controlPanel.link}
              underlayColor="#2D2D30"
              onPress={Actions.projects}>
              <Icon name="clipboard" style={controlPanel.linkIcon} />
              <View style={{position: 'relative'}}>
                <Text style={controlPanel.linkText}>Projects</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{position: 'relative'}}>
            <TouchableOpacity
              style={controlPanel.link}
              underlayColor="#2D2D30"
              onPress={Actions.login}>
              <Icon name="log-out" style={controlPanel.linkIcon} />
              <View style={{position: 'relative'}}>
                <Text style={controlPanel.linkText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{position: 'relative'}}>
            <TouchableOpacity
              style={controlPanel.link}
              underlayColor="#2D2D30"
              onPress={() => this.handleResetPressed()}>
              <Icon name="ios-refresh" style={controlPanel.linkIcon} />
              <View style={{position: 'relative'}}>
                <Text style={controlPanel.linkText}>Reset</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  handleResetPressed() {
    this.reset();
  }

  async reset() {
    try {
      let endpoint = "/scheduling2016/api/agents/reset/"
      let response = await resetData(endpoint);

      Alert.alert("Data Reset!");
    } catch(error) {
      console.log(error);
    }
  }
}
