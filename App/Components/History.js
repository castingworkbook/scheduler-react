/* @flow */
'use strict';

import React, { Component, ScrollView, View, Image, ListView, Text, TouchableOpacity, RefreshControl } from 'react-native';
import styles from '../Styles/style';
import history from '../Styles/history';
import Navbar from './Widgets/Navbar';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import IconInput from './Widgets/IconInput';
import Spinner from 'react-native-spinkit';
import _ from 'lodash';
import { getHistory, postNote } from '../Network/Api';

class History extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      note: "",
      isLoading: false,
			refreshing: false,
    }
  }

  componentDidMount() {
    this.populateHistoryData();
  }

  render() {
    return(
      <View style={styles.color}>
        <Navbar
          title="History"
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
  						<View style={history.listContainer}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderHeader={this._renderHeader.bind(this)}
                  renderRow={this._renderRow.bind(this)} />
              </View>
            </View>
          </ScrollView>
          <View style={history.formContainer}>
            <View style={history.inputContainer}>
              <IconInput
                placeholder="Enter a Note..."
                icon="compose"
                secureTextEntry={false}
                dark={false}
                value={this.state.note}
                onChangeText={(val) => this.setState({note: val})} />
            </View>
            <TouchableOpacity onPress={() => this.addNote()}>
              <View style={history.addButton}>
                <Text style={history.addButtonText}>Add</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={history.spinnerContainer}>
						<Spinner
							isVisible={this.state.isLoading}
							color={'#ffffff'}
							size={50}
							type={'Wave'} />
					</View>
        </Image>
      </View>
    );
  }

  _onRefresh() {
		console.log("Refresh Triggered")
		this.setState({refreshing: true});
		this.populateHistoryData();
	}

  _renderHeader() {
    return(
      <View style={history.headerContainer}>
        <View style={history.nameContainer}>
          <Text style={history.header}>{this.props.audition.actor}</Text>
        </View>
        <View>
          <View style={history.subheaderContainer}>
            <View style={history.materialsContainer}>
              <Text style={history.font}>Materials</Text>
              <TouchableOpacity onPress={() => this.onMaterials()}>
    						<View style={history.materialsIconContainer}>
    							<Icon name="document-text" style={history.materialsIcon} />
    						</View>
    					</TouchableOpacity>
            </View>
            <View style={history.headerDate}>
              <Text style={history.font}>{this.props.audition.date}</Text>
              <Text style={history.font}>{this.props.audition.time}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  _renderRow(action) {
    return(
      <View style={history.actionItem}>
        <View style={history.actionItemLeft}>
          <Text style={history.font}>{action.name}</Text>
          {action.note ? <Text style={history.font}>{action.note}</Text> : null}
        </View>
        <View style={history.actionItemRight}>
          <Text style={history.font}>{action.date}</Text>
          <Text style={history.font}>{action.time}</Text>
        </View>
      </View>
    )
  }

  onMaterials() {
    Actions.materials();
  }

  async populateHistoryData() {
    let endpoint = `/scheduling2016/api/agents/${this.props.user.id}/schedulehistory/${this.props.audition.id}`;
    let historyListData;
    this.setState({isLoading: true});
    try {
      historyListData = await getHistory(endpoint);
    } catch(error) {
      console.error(error);
    }
    let history = _.map(historyListData.reverse(), (record) => {
      let millidate  = record.createdDate.replace(/\/Date\((-?\d+)\)\//, '$1');
      let date = new Date(parseInt(millidate));
      let object = {
        id: record.auditionScheduleHistoryId,
        name: record.actionName,
        note: record.note,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString()
      }
      return object;
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(history),
      history,
      isLoading: false,
      refreshing: false
    });
  }

  async addNote() {
    let data = {noteText: this.state.note};
    let jsonData = JSON.stringify(data);
    let endpoint = `/scheduling2016/api/agents/${this.props.user.id}/createschedulenote/${this.props.audition.id}`;
    let response;
    this.setState({isLoading: true});
    try {
      response = await postNote(endpoint, jsonData);
    } catch(error) {
      console.error(error);
    }

    if (response.history) {
      let millidate  = response.history.createdDate.replace(/\/Date\((-?\d+)\)\//, '$1');
      let date = new Date(parseInt(millidate));
      let note = {
        id: response.history.noteId,
        name: response.history.actionName,
        note: response.history.note,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString()
      }

      let history = _.cloneDeep(this.state.history);
      history.unshift(note);

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(history),
        history,
        note: "",
        isLoading: false,
      });
    } else {
      Alert.alert("Something went wrong!");
    }
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps({user, audition}) {
  return {
    user, 
    audition
  }
}

module.exports = connect(mapStateToProps)(History);
