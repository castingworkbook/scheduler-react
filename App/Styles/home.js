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

  separator: {
    height: 1,
    backgroundColor: 'white',
  },

  projectItem: {
    flex: 1,
    flexDirection: 'row',
    height: 115,
    padding: 10,
    backgroundColor: 'transparent',
  },

  projectItemLeft: {
    flex: 0.6,
    flexDirection: 'column',
    overflow: 'hidden',
    marginRight: 10,
  },

  projectItemRoles: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
  },

  projectItemRight: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 33,
    alignSelf: 'center'
  },

  activeActions: {
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

  inactiveActions: {
    width: 25,
    height: 25,
    marginRight: 15,
    opacity: 0
  },

  projectItemIcon: {
    fontSize: 30,
    color: '#fff',
  },
});
