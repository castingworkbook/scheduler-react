/* @flow */
'use strict';

var React = require('react-native');
var primary = require('./variable').brandPrimary;
var secondary = require('./variable').brandSecondary;

var {
  StyleSheet,
  Dimensions
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
		paddingBottom: 15,
		paddingTop: 30,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.1,
		shadowRadius: 1.5
	},

  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },

  headerText: {
    fontSize: 20,
    color: '#fff'
  },

  materialItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'transparent',
  },

  materialItemLeft: {
    flex: 0.8,
    flexDirection: 'row',
    paddingRight: 10,
  },

  materialItemIconContainer: {
    height: 50,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notificationIcon: {
    fontSize: 20,
    color: '#fff',
    position: 'absolute',
    top: 0,
    right: 5,
  },

  materialItemIcon: {
    fontSize: 30,
    color: '#fff',
  },

  nameContainer: {
    marginTop: 5,
    padding: 10,
  },

  materialItemRight: {
    flex: 0.2,
    flexDirection: 'column',
    alignItems: 'flex-end'
  },

  font: {
    fontSize: 16,
    color: '#fff'
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    padding: 20,
    backgroundColor: secondary,
  },

  switchFont: {
    fontSize: 13,
    color: '#fff',
    marginRight: 10,
  },
});
