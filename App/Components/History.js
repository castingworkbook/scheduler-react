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
import ServerURL from '../Network/Request';

class History extends Component {
  constructor(props) {
    super(props);

    const dummyActions = [
      // {
      //   text: "Confirm",
      //   date: "MO Apr 25",
      //   time: "1:37pm",
      // },
      // {
      //   text: "Brad Pitt responds Confirm",
      //   date: "MO Apr 25",
      //   time: "11:37pm",
      // },
      // {
      //   text: "Forward",
      //   date: "MO Apr 25",
      //   time: "10:51pm",
      // },
      // {
      //   text: "Casting resubmits time",
      //   date: "MO Apr 25",
      //   time: "10:37am",
      // },
      // {
      //   text: "Message: Can we set the time between to 02/21/16 between 1:30 to 4:30?",
      //   date: "MO Apr 25",
      //   time: "2:37pm",
      // },
      // {
      //   text: "Request Alternative Time with Message",
      //   date: "MO Apr 25",
      //   time: "2:37pm",
      // },
      // {
      //   text: "Note: Brad said 02/21/16 @ 1:30 to 4:30 works",
      //   date: "MO Apr 25",
      //   time: "2:15pm"
      // },
      // {
      //   text: "Call Brad Pitt",
      //   date: "MO Apr 25",
      //   time: "2:01pm",
      // },
      // {
      //   text: "Brad Pitt responds Regret",
      //   date: "MO Apr 25",
      //   time: "1:37pm",
      // },
      // {
      //   text: "Forward to Brad Pitt",
      //   date: "MO Apr 25",
      //   time: "10:37am",
      // },
    ]

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(dummyActions),
      action: "",
      isLoading: false,
			refreshing: false,
    }
  }

  componentDidMount() {
    this.getHistory();
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
                value={this.state.action}
                onChangeText={(val) => this.setState({action: val})} />
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
		this.getHistory();
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
          <Text style={history.font}>{action.text}</Text>
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

  async getHistory() {
    let headers = {
      accept: 'application/json',
			authorization: this.props.user.authToken
    };

		let request = {
			method: 'get',
			headers
		}

    let path = ServerURL + `auditions/${this.props.audition.id}/histories?project_id=${this.props.project.id}`;
    let responseJson;
    try {
      this.setState({isLoading: true});
      let response = await fetch(path, request);
      responseJson = await response.json();
      console.log(responseJson);

			if(responseJson.errors)
				Alert.alert(responseJson.errors);
    } catch(error) {
      console.error(error);
    }

    let history = _.map(responseJson, (record) => {
      let object = {
        id: record.id,
        text: record.action,
        date: record.date,
        time: record.time
      }

      return object;
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(history),
      isLoading: false,
      refreshing: false,
    });
  }

  async addNote() {
    let headers = {
      accept: 'application/json',
			authorization: this.props.user.authToken
    };

    let data = {
      'history[action]': `Note: ${this.state.action}.`,
    };

    let formData = new FormData();
    for (var k in data) {
			formData.append(k, data[k]);
		}

    let request = {
      method: 'post',
      headers: headers,
      body: formData
    }

    let path = ServerURL + `auditions/${this.props.audition.id}/histories?project_id=${this.props.project.id}`;
    let responseJson;
    try {
      this.setState({isLoading: true});
      let response = await fetch(path, request);
      responseJson = await response.json();
      console.log(responseJson);

			if(responseJson.errors)
				Alert.alert(responseJson.errors);
    } catch(error) {
      console.error(error);
    }

    let history = _.map(responseJson, (record) => {
      let object = {
        id: record.id,
        text: record.action,
        date: record.date,
        time: record.time
      }

      return object;
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(history),
      action: "",
      isLoading: false,
    });
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    user: state.user,
    project: state.project,
    audition: state.audition
  }
}

module.exports = connect(mapStateToProps)(History);
