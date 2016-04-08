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
    bg : {
        flex: 1,
        width: null,
        height: null,
        paddingTop: 15
    },
    toolbar: {
        height: 60,
        backgroundColor: secondary,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingTop: 13,
        paddingRight: 15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 1.5
    },  
    subtitle : {
        color: '#fff',
        fontSize: 16,
        height: 0
    }
});
