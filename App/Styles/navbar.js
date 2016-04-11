/* @flow */
'use strict';

var React = require('react-native');
var primary = require('./variable').brandPrimary;

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
	navbar: {
		height: 70
	},
	title : {
		color: '#fff',
		fontSize: 20,
		fontWeight: "500",
    marginTop: 10,
	}
});
