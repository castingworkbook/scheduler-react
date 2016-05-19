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
  spinnerContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: deviceHeight/2,
    left: deviceWidth/2-30,
  },

  listContainer: {
		flexDirection: 'row'
	},

  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },

  nameContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  header: {
    fontSize: 25,
    color: '#fff',
  },

  headerDate: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },

  subheaderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  materialsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'transparent',
  },

  actionItemLeft: {
    flex: 0.7,
    paddingRight: 10
  },

  actionItemRight: {
    flex: 0.3,
    flexDirection: 'column',
    alignItems: 'flex-end'
  },

  font: {
    fontSize: 16,
    color: '#fff'
  },

  materialsIconContainer: {
    height: 50,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },

  materialsIcon: {
    marginTop: 5,
    fontSize: 30,
    color: '#fff',
  },
});
