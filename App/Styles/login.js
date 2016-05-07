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
		width: 126,
    marginBottom: 20,
	},

  nameText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white'
  },

	registerLink: {
		color: 'rgba(255, 255, 255, 0.9)',
		alignSelf: 'center',
		fontSize: 15
	}
});
