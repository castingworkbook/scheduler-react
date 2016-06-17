/* @flow */
'use strict';

import React, { Component, ScrollView, View, ListView, Text, TextInput, Image, TouchableOpacity, RefreshControl } from 'react-native';
import Navbar from './Widgets/Navbar';
import styles from '../Styles/style';
import notes from '../Styles/notes';
import Icon from 'react-native-vector-icons/Ionicons';
import IconInput from './Widgets/IconInput';
import Spinner from 'react-native-spinkit';
import _ from 'lodash';
import { getMessages, postMessage } from '../Network/Api';

export default class Notes extends Component {
  constructor(props) {
    super(props);

    const dummyNotes = [
      // {
      //   text: 'Brad Pitt only eats turnips',
      //   date: "02/11/16",
      //   time: "9:37am",
      // },
      // {
      //   text: 'Brad Pitt only showers once a month',
      //   date: "02/11/16",
      //   time: "10:37am",
      // },
      // {
      //   text: 'Brad Pitt only wakes up at 9:39am',
      //   date: "02/11/16",
      //   time: "11s:37am",
      // }
    ]

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(dummyNotes),
      message: "",
      isLoading: false,
			refreshing: false,
    }
  }

  componentDidMount() {
    this.populateMessages();
  }

  render() {
    return(
      <View style={styles.color}>
        <Navbar
          title="Messages"
          style={styles.toolbar}
          back={true} />
        <Image source={require('../img/glow2.png')} style={styles.container}>
          <ScrollView
            style={{backgroundColor: 'transparent'}}
            refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._onRefresh.bind(this)} />
						}>
            <View style={styles.verticalCenter}>
              <View style={notes.listContainer}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this._renderRow} />
              </View>
            </View>
          </ScrollView>
          <View style={notes.formContainer}>
            <View style={notes.inputContainer}>
              <IconInput
                placeholder="Enter a Message..."
                icon="compose"
                secureTextEntry={false}
                dark={false}
                value={this.state.message}
                onChangeText={(val) => this.setState({message: val})} />
            </View>
            <TouchableOpacity onPress={() => this.sendMessage()}>
              <View style={notes.addButton}>
                <Text style={notes.addButtonText}>Send</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={notes.spinnerContainer}>
						<Spinner
							isVisible={this.state.isLoading}
							color={'#ffffff'}
							size={50}
							type={'Wave'} />
					</View>
        </Image>
      </View>
    )
  }

  _onRefresh() {
		console.log("Refresh Triggered")
		this.setState({refreshing: true});
		this.populateMessages();
	}

  _renderRow(note) {
    return(
      <View style={notes.noteItem}>
        <View style={notes.noteItemLeft}>
          <Text style={notes.font}>{note.sender}: {note.body}</Text>
        </View>
        <View style={notes.noteItemRight}>
          <Text style={notes.font}>{note.date}</Text>
          <Text style={notes.font}>{note.time}</Text>
        </View>
      </View>
    )
  }

  async populateMessages() {
    let endpoint;
    if (this.props.user.role == 'agent') {
      endpoint = `auditions/${this.props.audition.id}/messages?project_id=${this.props.project.id}`;
    } else {
      endpoint = `auditions/${this.props.audition.id}/messages`;
    }

    let messageListData;
    this.setState({isLoading: true});
    try {
      messageListData = await getMessages(endpoint, this.props.user.authToken);
    } catch(error) {
      console.error(error);
    }

    let messages = _.map(messageListData, (message) => {
      let object = {
        id: message.id,
        sender: message.sender,
        body: message.body,
        date: message.date,
        time: message.time
      }

      return object;
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(messages),
      isLoading: false,
      refreshing: false,
    });
  }

  async sendMessage() {
    let data = {
      'message[user_id]': this.props.user.id,
      'message[body]': this.state.message,
    };

    let endpoint;
    if (this.props.user.role == 'agent') {
      endpoint = `auditions/${this.props.audition.id}/messages?project_id=${this.props.project.id}`;
    } else {
      endpoint = `auditions/${this.props.audition.id}/messages`;
    }

    let messageListData;
    this.setState({isLoading: true});
    try {
      messageListData = await postMessage(endpoint, this.props.user.authToken, data);
    } catch(error) {
      console.error(error);
    }

    let messages = _.map(messageListData, (message) => {
      let object = {
        id: message.id,
        sender: message.sender,
        body: message.body,
        date: message.date,
        time: message.time
      }
      return object;
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(messages),
      message: "",
      isLoading: false,
    });
  }
}

import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    user: state.user,
    project: state.project,
  }
}

module.exports = connect(mapStateToProps)(Notes);
