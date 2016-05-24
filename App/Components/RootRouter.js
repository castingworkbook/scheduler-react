'use strict';

import React, { Component, Navigator, Text, View, Platform } from 'react-native';
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
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import user from '../Redux/Reducers/user';
import project from '../Redux/Reducers/project';
import audition from '../Redux/Reducers/audition';
const PushNotification = require('react-native-push-notification');

const store = createStore(combineReducers({user, project, audition}));

class RootRouter extends Component {
	componentDidMount() {
		AppEventEmitter.addListener('hamburger.click', this.openControlPanel.bind(this));
		PushNotification.configure({
	    // (optional) Called when Token is generated (iOS and Android)
	    onRegister: function(token) {
				console.log( 'TOKEN:', token );
				this.onRegister(token);
	    },

	    // (required) Called when a remote or local notification is opened or received
	    onNotification: function(notification) {
	      console.log( 'NOTIFICATION:', notification );
	    },

	    // ANDROID ONLY: (optional) GCM Sender ID.
	    senderID: "YOUR GCM SENDER ID",

	    // IOS ONLY (optional): default: all - Permissions to register.
	    permissions: {
	        alert: true,
	        badge: true,
	        sound: true
	    },

	    // Should the initial notification be popped automatically
	    // default: true
	    popInitialNotification: true,

	    /**
	      * IOS ONLY: (optional) default: true
	      * - Specified if permissions will requested or not,
	      * - if not, you must call PushNotificationsHandler.requestPermissions() later
	      */
	    requestPermissions: true,
		});
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

	onRegister(token) {
		this.props.user.savePushToken({
			token,
			platform: Platform.OS
		});
	}

	onPushNotification(notification) {
		Alert.alert('Notification Received', 'Alert message: ' + notification.getMessage(), [{ text: 'Dismiss', onPress: null, }]);
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
				<Provider store={store}>
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
				</Provider>
      </Drawer>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const UserActions = require('../Redux/Actions/user');

function mapStateToProps(state) {
	return {

	}
}

function mapDispatchToProps(dispatch) {
	return {
		user: bindActionCreators(UserActions, dispatch)
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(RootRouter);
