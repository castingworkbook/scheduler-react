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

  componentWillMount () {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  keyboardWillShow (e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({scroll: true});
  }

  keyboardWillHide (e) {
    this.setState({scroll: false});
  }

  render() {
    return(
      <ScrollView style={login.color} scrollEnabled={this.state.scroll}>
        <Image source={require('../img/glow2.png')} style={login.container}>
          <Image source={require('../img/logo.png')} style={login.shadow}>
            <View style={ Platform.OS === 'android' ? login.abg : login.bg}>
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
                onChangeText={(val) => this.setState({password: val}) } />
              <TouchableOpacity onPress={this.signuep} style={{alignSelf: 'flex-end', marginRight: 15}}>
                <Text style={login.registerLink}>
                  Forgot Password
                </Text>
              </TouchableOpacity>
              <ButtonRounded
                onPress={()=>Actions.home({data:this.state.value })}
                text="Login" />
              <TouchableOpacity onPress={Actions.signup} style={{marginTop: 20}}>
                <Text style={login.registerLink}>
                  Sign Up Here
                </Text>
              </TouchableOpacity>
            </View>
          </Image>
        </Image>
      </ScrollView>
    );
  }
}
