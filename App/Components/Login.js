/* @flow */
'use strict';

import React, { Component, TextInput, Text, View, Image, StatusBarIOS, ScrollView, TouchableOpacity, Platform, Alert, Dimensions, DeviceEventEmitter } from 'react-native';
import styles from '../Styles/style';
import login from '../Styles/login';
import ButtonRounded from './Widgets/ButtonRounded';
import { Actions } from 'react-native-router-flux';
import IconInput from './Widgets/IconInput';
import Spinner from 'react-native-spinkit';
import { postSession } from '../Network/Api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: 'secret.agent@cwb.com',
      // password: 'password',
      email: "tymans",
      password: "tymansint",
      visibleHeight: Dimensions.get('window').height,
      isLoading: false,
    };
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  keyboardWillShow(e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({visibleHeight: newSize});
  }

  keyboardWillHide(e) {
    this.setState({visibleHeight: Dimensions.get('window').height});
  }

  render() {
    return(
      <ScrollView style={[styles.color, {height: this.state.visibleHeight}]}>
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
              onPress={() => this.login()}
              text="Login" />
          </View>
          <View style={login.spinnerContainer}>
						<Spinner
							isVisible={this.state.isLoading}
							color={'#ffffff'}
							size={50}
							type={'Wave'} />
					</View>
        </Image>
      </ScrollView>
    );
  }

  async login() {
    // let data = {
    //   'session[username]': this.state.email,
    //   'session[password]': this.state.password,
    //   'session[notification_token]': this.props.user.notificationToken,
    //   'session[platform]': Platform.OS,
    // };

    let data = `username=${this.state.email}&password=${this.state.password}&remember_password=no&doAction=mobileactorupload`

    this.setState({isLoading: true});
    try {
      const response = await postSession(data);
      let userData = {
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        type: response.type,
      }
      this.props.userActions.saveUser(userData);
      userData.type == 3 ? Actions.projects() : Actions.auditions();
    } catch(error) {
      console.error(error);
    }
    this.setState({isLoading: false});
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const UserActions = require('../Redux/Actions/user');

function mapStateToProps(state) {
  return {
	  user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
	   userActions: bindActionCreators(UserActions, dispatch)
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login);
