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

  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },

  header: {
    padding: 10
  },

  headerText: {
    fontSize: 20,
    color: '#fff'
  },

  textAreaInput: {
    height: deviceHeight/2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 2,
    margin: 15,
    marginTop: 5,
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.9)',
    padding: 10,
    alignItems: 'flex-start',
    fontSize: 17
  },

  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },

  switchFont: {
    marginRight: 10,
    fontSize: 16,
    color: '#fff'
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },

  button: {
    flex: 1
  }
});
