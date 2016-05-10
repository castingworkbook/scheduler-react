/* @flow */
'use strict';

import React, {Component, TextInput, Text, View, Image, StatusBarIOS, ScrollView, TouchableOpacity, Platform, Dimensions, DeviceEventEmitter} from 'react-native';
import styles from '../Styles/style';
import login from '../Styles/login';
import ButtonRounded from './Widgets/ButtonRounded';
import {Actions} from 'react-native-router-flux';
import IconInput from './Widgets/IconInput';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      visibleHeight: Dimensions.get('window').height,
      scroll: false
    };
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  keyboardWillShow(e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({scroll: true});
  }

  keyboardWillHide(e) {
    this.setState({scroll: false});
  }

  render() {
    return(
      <ScrollView style={styles.color} scrollEnabled={this.state.scroll}>
        <Image source={require('../img/glow2.png')} style={styles.container}>
          <View style={login.logoContainer}>
            <Image source={require('../img/cwb_logo.png')} style={login.logo} />
            <Text style={login.nameText}>Scheduler</Text>
          </View>
          <View style={Platform.OS === 'android' ? login.abg : login.bg}>
            <IconInput
              placeholder="EMAIL"
              icon="person"
              secureTextEntry={false}
              dark={false}
              value={this.state.email}
              onChangeText={(val) => this.setState({email: val})} />
            <IconInput
              placeholder="PASSWORD"
              icon="ios-unlocked-outline"
              secureTextEntry={true}
              dark={false}
              value={this.state.password}
              onChangeText={(val) => this.setState({password: val})} />
            <TouchableOpacity onPress={this.signuep} style={{alignSelf: 'flex-end', marginRight: 15}}>
              <Text style={login.registerLink}>Forgot Password</Text>
            </TouchableOpacity>
            <ButtonRounded
              onPress={() => this.createSession()}
              text="Login" />
          </View>
        </Image>
      </ScrollView>
    );
  }

  async createSession() {
    let headers = {
      accept: 'application/json'
    };

    let data = {
      'session[email]': this.state.email,
      'session[password]': this.state.password,
    };

    let formData = new FormData();
    for (var k in data) {
			formData.append(k, data[k]);
		}

    let request = {
      method: 'post',
      headers: headers,
      body: formData
    }

    let responseJson;
    try {
			let response = await fetch('http://cwbscheduler.herokuapp.com/session', request);
			responseJson = await response.json();
      console.log(responseJson);
		} catch(error) {
			console.error(error);
		}
  }
}
