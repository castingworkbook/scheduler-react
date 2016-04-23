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
		height: null
	},

  color: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: primary
	},

  toolbar: {
		height: 80,
		backgroundColor: secondary,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingBottom: 15,
		paddingTop: 30,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.1,
		shadowRadius: 1.5
	},

  

});
