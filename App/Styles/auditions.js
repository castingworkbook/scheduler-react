/* @flow */
'use strict';

var React = require('react-native');
var primary = require('./variable').brandPrimary;
var secondary = require('./variable').brandSecondary;

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  highlightedFont: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  normalFont: {
    fontSize: 16,
    color: '#fff'
  },

  spinnerContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: deviceHeight/2,
    left: deviceWidth/2-25,
  },

  listContainer: {
		flexDirection: 'row'
	},
});
