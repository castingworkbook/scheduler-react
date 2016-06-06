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
var deviceWidth = Dimensions.get('window').width;

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

  separator: {
    height: 1,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
  },

  footer: {
    paddingBottom: 10,
  },

  projectItem: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },

  projectItemSelected: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#008EC2',
  },

  projectItemLeft: {
    flex: 0.6,
    flexDirection: 'column',
    overflow: 'hidden',
    marginRight: 10,
  },

  projectItemSelect: {
    flex: 1,
  },

  directorContainer: {
    marginTop: 20,
  },

  projectItemRight: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },

  actionsContainer: {
    height: 60,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 5,
  },

  activeActions: {
    alignItems: 'center',
    width: 25,
    height: 25,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
  },

  inactiveActions: {
    width: 25,
    height: 25,
    marginRight: 20,
    opacity: 0,
  },

  projectItemIconContainer: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  projectItemIcon: {
    fontSize: 30,
    color: '#fff',
  },
});
