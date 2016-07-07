/* @flow */
'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var {
	TouchableOpacity
} = React;

var RightButtonOk = React.createClass({
	render: function() {
		return (
			<TouchableOpacity onPress={this.props.onPress}>
				<Icon name="ios-checkmark-empty" size={45} color="rgba(255,255,255,0.9)" style={{top:-10, right:25}}/>
			</TouchableOpacity>
		);
	}
});

module.exports = RightButtonOk;
