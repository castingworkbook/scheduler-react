/* @flow */
'use strict';

var React = require('react-native');
var primary = require('./variable').brandPrimary
var secondary = require('./variable').brandSecondary
var sidebar = require('./variable').brandSidebar

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
	sidebar: {
        padding: 10,
        paddingRight: 0,	        
        paddingTop: 30,
 		backgroundColor: sidebar,
 		flex: 1,     		
    },
    controlPanelText: {
     	color:'white'
    },
    linkText: {
     	fontSize: 16,
     	color: '#fff',
        position: 'absolute',
        left: 45
    },    
    link: {    
        position: 'relative',
    	borderWidth: 1,
        paddingTop: 14,
        height: 50,        
    	borderTopColor: 'transparent',
    	borderLeftColor: 'transparent',
    	borderRightColor: 'transparent',
        borderBottomColor: '#333136'
    	// borderBottomColor: '#5597CD'
    },
    badge: {
        alignSelf: 'flex-end',
        marginRight: 15,
        width: 25,
        height: 25,
        backgroundColor: secondary,
        borderRadius: 12,
        justifyContent: 'center',
        bottom: 5
    },
    badgeText: {
        alignSelf: 'center',
        color: '#fff'
    }
});
