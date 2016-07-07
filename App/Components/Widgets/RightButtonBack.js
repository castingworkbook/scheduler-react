/* @flow */
'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var {
	TouchableOpacity
} = React;

var RightButtonBack = React.createClass({
	render: function() {
		return (
			<TouchableOpacity onPress={this.props.onPress}>
				<Icon name="ios-arrow-back" size={30} color="rgba(255,255,255,0.9)" style={{top:-5, right:25}}/>
			</TouchableOpacity>
		);
	}
});

module.exports = RightButtonBack;
