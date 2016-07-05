/* @flow */
'use strict';

import React, {Component, ScrollView, View, Text, TextInput, Image, Switch} from 'react-native';
import Navbar from './Widgets/Navbar';
import styles from '../Styles/style';
import message from '../Styles/message';
import ButtonRounded from './Widgets/ButtonRounded';
import {Actions} from 'react-native-router-flux';
import {putAuditions} from '../Network/Api';

export default class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      isLoading: false
    }
  }

  render() {
    return(
      <View style={styles.color}>
        <Navbar
          title="Compose Message"
          style={styles.toolbar}
          back={true} />
        <Image source={require('../img/glow2.png')} style={styles.container}>
          <ScrollView style={{backgroundColor: 'transparent'}}>
            <View style={message.inputContainer}>
              <View style={message.header}>
                <Text style={message.headerText}>To: Actors</Text>
              </View>
              <TextInput
                style={message.textAreaInput}
                multiline={true}
                numberOfLines={20}
                placeholder={'Write a message...'}
                placeholderTextColor={'rgba(0,0,0,0.6)'}
                onChangeText={(val) => this.setState({message: val})} />
            </View>
          </ScrollView>
          <View style={message.footer}>
            <View style={message.button}>
              <ButtonRounded text="Send" onPress={() => this.updateStatus()} />
            </View>
            <View style={message.button}>
              <ButtonRounded text="Discard" onPress={() => Actions.pop()} />
            </View>
          </View>
        </Image>
      </View>
    )
  }

  async updateStatus() {
    let endpoint;
    switch(this.props.status) {
      case 'SENT':
        endpoint = `/scheduling2016/api/agents/${this.props.user.id}/batchforwardauditionschedule`;
        break;
      case 'REGR':
        endpoint = `/scheduling2016/api/agents/${this.props.user.id}/batchregretauditionschedule`;
        break;
      case 'TIME':
        endpoint = `/scheduling2016/api/agents/${this.props.user.id}/batchrequestotherauditionschedule`;
        break;
    }

    let data = {
      auditionScheduleIds: this.props.selected,
      message: this.state.message
    };
		let jsonData = JSON.stringify(data);
		let response;
    this.setState({isLoading: true});
		try {
			response = await putAuditions(endpoint, jsonData);
      Actions.schedule();
		} catch(error) {
			console.error(error);
		}
  }
}

import {connect} from 'react-redux';

function mapStateToProps({user}) {
  return {user}
}

module.exports = connect(mapStateToProps)(Message);
