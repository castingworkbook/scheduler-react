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
    color: '#fff',
  },

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
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },

  header: {
    fontSize: 25,
    color: '#fff',
  },

  notificationsContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 5,
    marginLeft: 5,
  },

  notification: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  notificationIcon: {
    fontSize: 12,
    color: '#fff',
    marginRight: 5,
  },

  notificationFont: {
    fontSize: 12,
    color: '#fff',
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

  auditionItem: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },

  auditionItemSelected: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#008EC2',
  },

  auditionItemLeft: {
    flex: 0.6,
    flexDirection: 'column',
    overflow: 'hidden',
    marginRight: 10,
  },

  date: {
    marginTop: 10
  },

  auditionItemRight: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },

  statusContainer: {
    flex: 1,
    height: 50,
    justifyContent: 'center'
  },

  auditionItemIconContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  auditionItemIcon: {
    fontSize: 30,
    color: '#fff',
  },
});
