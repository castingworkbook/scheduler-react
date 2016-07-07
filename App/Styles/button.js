/* @flow */
'use strict';

var React = require('react-native');
var primary = require('./variable').brandPrimary
var secondary = require('./variable').brandSecondary

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
	button: {
		backgroundColor: '#fff',
	  padding: 10,
	  borderColor: 'transparent',
	  borderWidth:2,
	  alignSelf: 'stretch',
		borderRadius: 23,
		height: 45,
		marginTop: 18,
		marginLeft: 10,
		marginRight: 10,
		shadowColor: '#000',
		shadowOffset: {width: 1, height: 2},
		shadowOpacity: 0.2,
		shadowRadius: 3
	},

	buttonColor: {
		backgroundColor: secondary,
	  padding: 10,
	  borderColor: 'transparent',
	  borderWidth:2,
	  alignSelf: 'stretch',
		borderRadius: 23,
		height: 45,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		shadowColor: '#000',
		shadowOffset: {width: 1, height: 2},
		shadowOpacity: 0.2,
		shadowRadius: 3
	},

	buttonText: {
		color: secondary,
		alignSelf: 'center',
		fontSize: 18
	},

	buttonColorText: {
		color: '#fff',
		alignSelf: 'center',
		fontSize: 17
	}
});
