/* @flow */
'use strict';

var React = require('react-native');
var primary = require('./variable').brandPrimary
var secondary = require('./variable').brandSecondary

var {
  StyleSheet,
  Dimensions
} = React;

var deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
	button: {
		backgroundColor: '#fff',
	  padding: 10,
	  borderColor: 'transparent',
	  borderWidth:2,
	  alignSelf: 'stretch',
		borderRadius: 23,
		height: 45,
		marginTop: 10,
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
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
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
	},

	circularButton: {
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
		shadowRadius: 4
	},

	circularButtonText: {
		color: '#fff',
		fontSize: 10,
		marginTop: -12,
		marginLeft: -5
	},

	textInput: {
		height: 40,
		backgroundColor: 'transparent',
		color: 'rgba(255, 255, 255, 0.9)',
		paddingLeft: 40,
	},

	textInputDark: {
		height: 40,
		backgroundColor: 'transparent',
		color: 'rgba(0, 0, 0, 0.9)',
		paddingLeft: 40
	},

	outerBorder: {
		position:'relative',
		borderColor: 'white',
		borderWidth: 0.8,
		borderTopWidth: 0,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		margin: 15,
		marginTop: 5
	},

	outerBorderDark: {
		position:'relative',
		borderColor: '#000',
		borderWidth: 0.8,
		borderTopWidth: 0,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		margin: 15,
		marginTop: 5
	}
});
