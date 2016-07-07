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
		backgroundColor: secondary,
	  padding: 25,
	  borderColor: secondary,
	  borderWidth:0,
	  borderBottomColor: secondary,
	  alignSelf: 'center',
		borderRadius: 40,
		width: 80,
		height: 80,
		marginTop: 28,
		paddingRight: 10,
		shadowColor: '#000',
		shadowOffset: {width: 2, height: 2},
		shadowOpacity: 0.2,
		shadowRadius: 4,
		overflow: 'hidden'
	},

	buttonText: {
		color: '#fff',
		fontSize: 10,
		marginTop: -10,
		marginLeft: -5
	}
});
