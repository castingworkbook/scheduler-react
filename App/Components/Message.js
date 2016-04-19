/* @flow */
'use strict';

import React, {Component, ScrollView, View, Text, TextInput, Image, Switch} from 'react-native';
import Navbar from './Widgets/Navbar';
import styles from '../Styles/style';
import message from '../Styles/message';
import ButtonRounded from './Widgets/ButtonRounded';
import {Actions} from 'react-native-router-flux';

export default class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      materials: false
    }
  }


  render() {
    return(
      <View style={message.color}>
        <Navbar
          title="Compose Message"
          style={message.toolbar}
          back={true} />
        <Image source={require('../img/glow2.png')} style={message.container}>
          <ScrollView style={{backgroundColor: 'transparent'}}>
            <View style={message.inputContainer}>
              <View style={message.header}>
                <Text style={message.headerText}>To: Michael Bay</Text>
              </View>
              <TextInput
                style={message.textAreaInput}
                multiline={true}
                numberOfLines={20}
                placeholder={'Write a message...'}
                placeholderTextColor={'rgba(0,0,0,0.6)'} />
            </View>
            <View style={message.switchContainer}>
              <Text style={message.switchFont}>Attach Materials?</Text>
              <Switch
                onValueChange={(value) => this.setState({materials: value})}
                value={this.state.materials} />
            </View>
          </ScrollView>
          <View style={message.footer}>
            <View style={message.button}>
              <ButtonRounded text="Send" onPress={() => Actions.schedule({message: "Action with Message Sent"})} />
            </View>
            <View style={message.button}>
              <ButtonRounded text="Discard" onPress={() => Actions.schedule({message: "Action Sent"})} />
            </View>
          </View>
        </Image>
      </View>
    )
  }
}
