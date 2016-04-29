/* @flow */
'use strict';

var React = require('react-native');
var primary = require('./variable').brandPrimary
var secondary = require('./variable').brandSecondary
var sidebar = require('./variable').brandSidebar

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
	sidebar: {
    flex: 1,
    padding: 10,
    paddingRight: 0,
    paddingTop: 30,
 		backgroundColor: sidebar,
  },

  logoContainer: {
    borderWidth: 1,
    borderTopColor: 'transparent',
  	borderLeftColor: 'transparent',
  	borderRightColor: 'transparent',
    borderBottomColor: '#fff',
  },

  logo: {
    alignSelf:'center',
    margin: 30,
    height: 100,
    width: 126,
    opacity: 0.9,
  },

  linkIcon: {
    position:'absolute',
    left: 9,
    bottom: 6,
    fontSize: 30,
    color: 'rgba(255,255,255,0.9)',
  },

  linkText: {
   	fontSize: 16,
   	color: '#fff',
    position: 'absolute',
    left: 45,
  },

  link: {
    position: 'relative',
    paddingTop: 14,
    height: 50,
  },
});
