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
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },

  header: {
    padding: 10
  },

  headerText: {
    fontSize: 20,
    color: '#fff'
  },

  textAreaInput: {
    height: deviceHeight/2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 2,
    margin: 15,
    marginTop: 5,
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.9)',
    padding: 10,
    alignItems: 'flex-start',
    fontSize: 17
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },

  button: {
    flex: 1
  }
});
