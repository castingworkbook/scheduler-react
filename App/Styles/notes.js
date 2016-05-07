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
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },

  headerText: {
    fontSize: 20,
    color: '#fff'
  },

  noteItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'transparent',
  },

  noteItemLeft: {
    flex: 0.8,
    paddingRight: 10,
  },

  noteItemRight: {
    flex: 0.2,
    flexDirection: 'column',
    alignItems: 'flex-end'
  },

  font: {
    fontSize: 16,
    color: '#fff'
  },

  formContainer: {
    flexDirection: 'row',
    backgroundColor: secondary,
    borderTopWidth: 1,
    borderColor: '#fff',
    paddingBottom: 5,
  },

  inputContainer: {
    flex: 1,
  },

  addButton: {
    width: 70,
    height: 40,
    marginTop: 15,
    alignItems: 'center'
  },

  addButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
  }
});
