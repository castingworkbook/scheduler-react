var React = require('react-native');
var signup = require('../../Styles/signup');
var Icon = require('react-native-vector-icons/Ionicons');

var {
    View,
    Text
} = React


module.exports = React.createClass({
    
    render: function(){
        return(
            <View style={signup.title}>
                <Text style={signup.header}> Create Account </Text>
                <Icon name="ios-camera-outline" size={50} color="rgba(255,255,255,0.9)" style={{top:2, alignSelf: 'center'}}/>
            </View>
        )
    }
})
