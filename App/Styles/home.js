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
		height: null,
	},

	color: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: primary,
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
		shadowRadius: 1.5,
	},

  highlightedFont: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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

  footer: {
    paddingBottom: 10
  },

  projectItem: {
    flex: 1,
    flexDirection: 'row',
    height: 135,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },

  projectItemSelected: {
    flex: 1,
    flexDirection: 'row',
    height: 135,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#008EC2',
  },

  projectItemLeft: {
    flex: 0.7,
    flexDirection: 'column',
    overflow: 'hidden',
    marginRight: 10,
  },

  projectItemSelect: {
    flex: 1,
  },

  projectItemRoles: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
  },

  projectItemRight: {
    flex: 0.3,
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
