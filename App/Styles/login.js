/* @flow */
'use strict';

var React = require('react-native');
var primary = require('./variable').brandPrimary;
var secondary = require('./variable').brandSecondary;

var {
  StyleSheet,
  Dimensions
} = React;
var deviceHeight = Dimensions.get('window').height;
module.exports = StyleSheet.create({
	container: {
		flex: 1,
		width: null,
		height: null,
	},
	shadow: {
		flex: 1,
		width: null,
		height: null,
		backgroundColor: 'transparent'
	},
	shadow2: {
		flex: 1,
		width: null,
		height: null,
		backgroundColor: 'transparent',
		marginTop: -35
	},
	color: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: primary
	},
	textInput: {
		height: 40,
		backgroundColor: 'transparent',
		color: 'rgba(255, 255, 255, 0.9)',
		paddingLeft: 40,
	},
	bg : {
		flex: 1,
		backgroundColor: secondary,
		paddingTop: 20,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 30,
		height: deviceHeight/1.8
	},
	abg : {
		flex: 1,
		backgroundColor: secondary,
		paddingTop: 30,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 30,
    height: deviceHeight/1.8
	},
	background: {
    flex: 1,
    resizeMode: 'stretch'
  },
  logoContainer: {
    flex: 1,
    height: deviceHeight/2+30,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
	logo: {
		height: 100,
		width: 100,
    marginBottom: 20,
	},
  nameText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white'
  },
	navbar: {
		borderBottomColor: 'transparent',
	},
	registerLink: {
		color: 'rgba(255, 255, 255, 0.9)',
		alignSelf: 'center',
		fontSize: 15
	}
});
