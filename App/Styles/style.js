/* @flow */
'use strict';

var React = require('react-native');
var primary = require('./variable').brandPrimary;
var secondary = require('./variable').brandSecondary;

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null
  },

  color: {
    flex: 1,
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

  transparent: {
    marginTop: 70,
    padding: 15,
    backgroundColor: 'transparent',
    flex: 1
  },

  verticalCenter: {
    justifyContent: 'center'
  },

  name: {
    color: 'rgba(255, 255, 255, 1)',
    flex: 1,
    fontSize: 15
  },

  logo: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    marginTop: -50
  },

  slider: {
    width: 150,
    height: 10,
    margin: 10,
  },

  button: {
    backgroundColor: 'white',
    padding: 10,
    borderColor: '#eeeeee',
    borderWidth:1,
    borderBottomColor: '#aaaaaa',
    marginRight:20,
    marginLeft:20,
    alignSelf: 'center',
    marginTop: 10
  },
});

module.exports = styles;
