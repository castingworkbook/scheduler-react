/* @flow */
'use strict';

import React, {Component, ScrollView, Text, TextInput, View, Image} from 'react-native';
import Navbar from './Widgets/Navbar';
import blankPage from '../Styles/blankPage';
import {brandPrimary as primary} from '../Styles/variable';

export default class BlankPage extends Component {
	render() {
		return(
			<View style={blankPage.color}>
				<Image source={require('../img/glow2.png')} style={blankPage.container}>
					<Navbar
		     		    title="Blank Page"
		     		    subtitle=""
		     		    style={blankPage.toolbar}
		     		    subtitleStyle={blankPage.subtitle}   />		
		     		    <ScrollView style={{backgroundColor: 'transparent', padding: 15}}>	     		      
						
		     		    </ScrollView>
				</Image>
			</View>
		);
	}
}
