/* @flow */
'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var {
	TouchableOpacity	

} = React;

var RightButtonDelete = React.createClass({
	render: function() {
		return (
			<TouchableOpacity onPress={this.props.onPress}>
				<Icon name="ios-box-outline" size={32} color="rgba(255,255,255,0.9)" style={{top:-5, right: 20}}/>
			</TouchableOpacity>
		);
	}
});

module.exports = RightButtonDelete;
