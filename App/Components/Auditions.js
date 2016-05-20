/* @flow */
'use strict';

import React, { Component, Text, View, Image, ScrollView, Alert, ListView, TouchableOpacity, RefreshControl } from 'react-native';
import styles from '../Styles/style';
import Navbar from './Widgets/Navbar';
import auditions from '../Styles/auditions';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import IconInput from './Widgets/IconInput';
import Spinner from 'react-native-spinkit';

class Auditions extends Component {
  constructor(props) {
    super(props);

    const dummyAuditions = [
      // {
      // 	id: 1,
      //  title: "Batman Returns",
      // 	actor: "Brad Pitt",
      // 	phone: "7777777",
      // 	role: "Batman",
      // 	date: "Monday Apr 25",
      // 	time: "3:30pm",
      // 	status: "",
      // 	casting: ""
      // },
      // {
      // 	id: 2,
      //  title: "Batman Returns",
      // 	actor: "Christian Bale",
      // 	phone: "7777777",
      // 	role: "Batman",
      // 	date: "Monday Apr 25",
      // 	time: "3:50pm",
      // 	status: "",
      // 	casting: ""
      // },
      // {
      // 	id: 3,
      //   title: "Batman Returns",
      // 	actor: "Ben Affleck",
      // 	phone: "7777777",
      // 	role: "Batman",
      // 	date: "Monday Apr 25",
      // 	time: "4:10pm",
      // 	status: "",
      // 	casting: ""
      // }
    ];

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(dummyAuditions),
      auditions: dummyAuditions,
      selected: [],
      isLoading: false,
    }
  }

  componentDidMount() {
		this.getAuditions();
	}

  render() {
		return(
      <View style={styles.color}>
        <Navbar
					title="Auditions"
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
              <View style={auditions.listContainer}>
								<ListView
									dataSource={this.state.dataSource}
									renderRow={this._renderRow.bind(this)}
									renderSeparator={this._renderSeperator} />
							</View>
            </View>
          </ScrollView>
          <View style={auditions.spinnerContainer}>
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

  _renderRow(audition) {
    return(
      <View style={auditions.container}>
        <View style={auditions.top}>
          <View style={auditions.left}>
            <Text style={auditions.highlightedFont}>{audition.title}</Text>
            <Text style={auditions.normalFont}>{audition.role}</Text>
          </View>
          <View style={auditions.right}>
            <Text style={auditions.highlightedFont}>{audition.time}</Text>
            <Text style={auditions.normalFont}>{audition.date}</Text>
          </View>
        </View>
        <View style={auditions.bottom}>
          <TouchableOpacity onPress={() => this.onMessages(audition.id)}>
            <View style={auditions.messageIconContainer}>
              <Icon name="email" style={auditions.messageIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onAction(audition.id, 'CONF')}>
            <Text style={audition.status == 'CONF' || audition.status == 'SENT' || audition.status == 'SENT+' ? auditions.highlightedFont : auditions.inActiveStatus}>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onAction(audition.id, 'TIME')}>
            <Text style={audition.status == 'TIME' || audition.status == 'SENT' || audition.status == 'SENT+' ? auditions.highlightedFont : auditions.inActiveStatus}>New Time</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onAction(audition.id, 'REGR')}>
            <Text style={audition.status == 'REGR' || audition.status == 'SENT' || audition.status == 'SENT+' ? auditions.highlightedFont : auditions.inActiveStatus}>NO</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _renderSeperator(sectionID, rowID) {
    return (
      <View key={`${sectionID}-${rowID}`} style={auditions.separator} />
    )
  }

  _onRefresh() {
		console.log("Refresh Triggered");
		this.setState({refreshing: true});
		this.getAuditions();
	}

  async getAuditions() {
    let headers = {
      accept: 'application/json',
      authorization: this.props.user.authToken
    };

    let request = {
      method: 'get',
      headers
    }

    let path = 'http://cwbscheduler.herokuapp.com/auditions/';
    // let path = 'http://localhost:3000/auditions/';
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
    this.setState({
      isLoading: false,
      refreshing: false,
    });

    let auditions = _.map(responseJson, (audition) => {
      let object = {
				id: audition.id,
				actor: audition.actor,
				phone: audition.phone,
        title: audition.title,
				role: audition.role,
				date: audition.date,
				time: audition.time,
				status: audition.status,
				casting: audition.response,
				selected: false
      }

      return object;
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(auditions),
      auditions: auditions,
    });
  }

  onMessages(id) {
    Actions.notes({audition: {id}});
  }

  onAction(id, status) {
    this.updateStatus(id, status);
  }

  async updateStatus(id, status) {
    let headers = {
      accept: 'application/json',
			authorization: this.props.user.authToken
    };

    let data = {
			'audition[status]': status
		};

    let formData = new FormData();
		for (var k in data) {
			formData.append(k, data[k]);
		}

    let request = {
			method: 'put',
			headers,
			body: formData
		}

    let path = `http://cwbscheduler.herokuapp.com/auditions/${id}`;
		// let path = `http://localhost:3000/auditions/${id}`;
		let responseJson;
		try {
			this.setState({isLoading: true});
			let response = await fetch(path, request);
			responseJson = await response.json();
      console.log(responseJson);

			if(responseJson.errors)
				Alert.alert(responseJson.errors);
		} catch(error) {
			console.log(error);
			Alert.alert(error);
		}
		this.setState({isLoading: false});

		let auditions = _.map(responseJson, (audition) => {
			let object = {
				id: audition.id,
				actor: audition.actor,
				phone: audition.phone,
        title: audition.title,
				role: audition.role,
				date: audition.date,
				time: audition.time,
				status: audition.status,
				casting: audition.response,
				selected: false
			}

			return object;
		});

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(auditions),
      auditions: auditions,
		});
  }
}

import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

module.exports = connect(mapStateToProps)(Auditions);
