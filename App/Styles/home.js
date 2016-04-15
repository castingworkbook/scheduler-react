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

  separator: {
    height: 1,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
  },

  projectItem: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },

  projectItemLeft: {
    flex: 0.55,
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
    flex: 0.45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },

  actionsContainer: {
    height: 50,
    width: 30,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeActions: {
    alignItems: 'center',
    width: 25,
    height: 25,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    marginRight: 20,
  },

  inactiveActions: {
    width: 25,
    height: 25,
    marginRight: 20,
    opacity: 0,
  },

  projectItemIconContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  projectItemIcon: {
    fontSize: 30,
    color: '#fff'
  },
});
