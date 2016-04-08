/* @flow */
'use strict';

import React, {Component, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Button from './Button';
import Icon from 'react-native-vector-icons/Ionicons';
import controlPanel from '../../Styles/controlPanel';
import {Actions} from 'react-native-router-flux';

export default class ControlPanel extends Component {
    
    render() {
        return (
            <View style={controlPanel.sidebar}>
                <ScrollView>
                    <Image source={require('../../img/icon.png')} style={{alignSelf:'center', margin: 30, width: 180, height: 100, opacity: 0.9}}/>
                    
                    <View style={{position: 'relative'}}>
                        <Icon name="ios-home-outline" size={30} color="rgba(255,255,255,0.9)" style={{position:'absolute', left: 9,  bottom: 6}}/>
                        <TouchableOpacity 
                            style={controlPanel.link}
                            underlayColor="#2D2D30"
                            onPress={Actions.home}>
                            <Text style={controlPanel.linkText}>Home</Text>
                        </TouchableOpacity>                
                    </View>
                    <View style={{position: 'relative'}}>
                        <Icon name="ios-copy-outline" size={30} color="rgba(255,255,255,0.9)" style={{position:'absolute', left: 9, bottom: 6}}/>
                        <TouchableOpacity 
                            style={controlPanel.link}
                            underlayColor="#2D2D30"
                            onPress={Actions.blankPage}>
                            <View>
                                <Text style={controlPanel.linkText}>Blank Page</Text>
                            </View>
                        </TouchableOpacity>
                    </View>  
                </ScrollView>
            </View>
        );
    }
    
}
