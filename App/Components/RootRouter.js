'use strict';

import React, { Component, Navigator, Text, View, Platform, Alert } from 'react-native';
import { Router, Route, Schema, Animations, TabBar } from 'react-native-router-flux';
import EventEmitter from 'EventEmitter';
import Drawer from 'react-native-drawer'
import ControlPanel from './Widgets/ControlPanel';
import Login from './Login';
import Projects from './Projects';
import Schedule from './Schedule';
import Auditions from './Auditions';
import History from './History';
import Message from './Message';
import Materials from './Materials';
import Notes from './Notes';
import layout from '../Styles/layout';
import AppEventEmitter from '../Services/AppEventEmitter';
import PushNotification from 'react-native-push-notification';

class RootRouter extends Component {
	componentDidMount() {
		AppEventEmitter.addListener('hamburger.click', this.openControlPanel.bind(this));
		PushNotification.configure({
      onRegister: this.setToken.bind(this),
      onNotification: this.onPushNotification.bind(this),
      senderID: "625049319254",
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
		PushNotification.setApplicationIconBadgeNumber(0);
  }

  componentWillUnMount() {
  	AppEventEmitter.removeListener('hamburger.click');
  }

	closeControlPanel(navigation) {
		if (navigation.type == 'AFTER_ROUTER_ROUTE') {
			this.refs.drawer.close();
		}
	}

	openControlPanel() {
	  this.refs.drawer.open();
	}

	setToken({token}) {
    this.props.userActions.saveUser({notification_token: token});
  }

  onPushNotification(notification) {
    console.log(notification);
    Alert.alert(notification.title, notification.message, [{ text: 'Dismiss', onPress: null, }]);
  }

  render() {
    return(
    	<Drawer
    		style={{marginBottom: 20}}
				ref="drawer"
				type="overlay"
				tapToClose={true}
				openDrawerOffset={0.2}
				panCloseMask={0.2}
				content={<ControlPanel />}>
        <Router hideNavBar={true} dispatch={this.closeControlPanel.bind(this)}>
          <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight} />
          <Route name="login" wrapRouter={false} component={Login} initial={true} />
          <Route name="projects" wrapRouter={false} component={Projects} title="Projects" />
          <Route name="schedule" wrapRouter={false} component={Schedule} title="Schedule" />
					<Route name="auditions" wrapRouter={false} component={Auditions} title="Auditions" />
					<Route name="history" wrapRouter={false} component={History} title="History" />
					<Route name="message" wrapRouter={false} component={Message} title="Message" />
					<Route name="materials" wrapRouter={false} component={Materials} title="Materials" />
					<Route name="notes" wrapRouter={false} component={Notes} title="Notes" />
        </Router>
      </Drawer>
    );
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(RootRouter)
