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
		paddingBottom: 15,
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
    marginLeft: 10,
    marginRight: 10,
  },

  footer: {
    paddingBottom: 10
  },

  auditionItem: {
    flex: 1,
    flexDirection: 'column',
    height: 135,
    backgroundColor: 'transparent',
  },

  auditionItemSelected: {
    flex: 1,
    flexDirection: 'column',
    height: 135,
    backgroundColor: '#008EC2',
  },

  auditionItemTop: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },

  auditionItemLeft: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
    marginRight: 10,
  },

  auditionItemSelect: {
    flex: 1,
  },

  date: {
    marginTop: 10
  },

  auditionItemRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  statusPanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  auditionItemIconContainer: {
    height: 50,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },

  notificationIcon: {
    fontSize: 20,
    color: '#fff',
    position: 'absolute',
    top: 0,
    right: 5,
  },

  auditionItemIcon: {
    fontSize: 30,
    color: '#fff',
  },

  greenIconStatus: {
    fontSize: 30,
    color: '#00A54E',
  },

  yellowIconStatus: {
    fontSize: 30,
    color: '#FAF519',
  },

  redIconStatus: {
    fontSize: 30,
    color: '#DF0024',
  }
});
