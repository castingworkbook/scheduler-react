/* @flow */
'use strict';

import React, {Component, Text, View, Image, ScrollView, BackAndroid} from 'react-native';
import styles from '../Styles/style';
import Navbar from './Widgets/Navbar';
import CircularButton from './Widgets/CircularButton';
import home from '../Styles/home';
import {primary} from '../Styles/variable';
import {secondary} from '../Styles/variable';
import Login from './Login';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';

export default class Home extends Component {
	render() {
		return(
    	<View style={home.color}>
     		<Navbar
   		    title="Native Starter Pro"
   		    style={home.toolbar} />
     		<Image source={require('../img/glow2.png')} style={home.container}>
					<ScrollView style={{backgroundColor: 'transparent'}}>
						<View style={styles.verticalCenter}>
							<View style={home.listContainer}>
					     	<Text style={home.list}>
					     		Create Something Awesome . . .
					 			</Text>
				 			</View>
				 			<CircularButton
	              onPress={Actions.login}
	              text={<Icon name="ios-close-outline" size={50} color="rgba(255,255,255,0.9)" style={{backgroundColor: 'transparent'}} />} />
			 			</View>
					</ScrollView>
        </Image>
    	</View>
		);
	}
}
