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
	listContainer: {
		borderBottomColor: primary,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 0.6,
		marginLeft: 22,
		marginRight: 22,
		flexDirection: 'row'
	},
	list: {
		color: '#fff',
		fontSize: 18,
		marginBottom: 20,
		marginTop: 20,
		flex: 1		
	},
	time: {
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		marginTop: 20,
		color: 'rgba(255,255,255,0.7)'
	},
	title: {
		alignSelf: 'center'
	},
	header: {
		alignSelf: 'center',
		fontSize: 20,
		color: '#fff',
		top: -2
	},
	day: {
		alignSelf: 'center',
		fontSize: 26,
		letterSpacing: 1,
		color: 'rgba(255,255,255,0.7)'
	},
	subTitle: {
		color: 'rgba(255,255,255,0.7)',
		fontSize: 10,
		alignSelf: 'center',
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
	subtitle : {
		color: '#fff',
		fontSize: 16,
		alignSelf: 'center'
	}
});
