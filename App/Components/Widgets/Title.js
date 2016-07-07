/* @flow */
'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var {
	View,
	Text
} = React;

var RightButtonUser = React.createClass({
	render: function() {
		return (
			<View>
				<Text style={{color:'#fff', fontSize:19, marginBottom:6}}>{this.props.text}</Text>
			</View>
		);
	}
});

module.exports = RightButtonUser;
