/* @flow */
'use strict';

var React = require('react-native');
var primary = require('./variable').brandPrimary;
var secondary = require('./variable').brandSecondary;

var {
  StyleSheet,
} = React;

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
		padding: 15,
		paddingTop: 30,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.1,
		shadowRadius: 1.5
  },

  highlightedFont: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },

  normalFont: {
    fontSize: 16,
    color: '#fff'
  },

  listContainer: {
		marginLeft: 12,
		marginRight: 12,
		flexDirection: 'row'
	},

  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },

  header: {
    fontSize: 25,
    color: '#fff',
  },

  separator: {
    height: 1,
    backgroundColor: 'white',
  },

  footer: {
    padding: 10
  },

  auditionItem: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    padding: 10,
    backgroundColor: 'transparent',
  },

  auditionItemSelected: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    padding: 10,
    backgroundColor: '#800000',
  },

  auditionItemLeft: {
    flex: 0.5,
    flexDirection: 'column',
    overflow: 'hidden',
  },

  auditionItemRight: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: 33,
  },

  auditionItemSelect: {
    flex: 1,
  },

  status: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 15,
    width: 25,
    height: 25,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    bottom: 5,
  },

  auditionItemIcon: {
    fontSize: 30,
    color: '#fff',
  },
});
