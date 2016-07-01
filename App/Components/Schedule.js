/* @flow */
'use strict';

import React, { Component, ScrollView, Text, View, Image, ListView, TouchableOpacity, Alert, RefreshControl, Linking } from 'react-native';
import styles from '../Styles/style';
import Navbar from './Widgets/Navbar';
import schedule from '../Styles/schedule';
import ButtonRounded from './Widgets/ButtonRounded';
import {brandPrimary as primary} from '../Styles/variable';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import ActionSheet from '@remobile/react-native-action-sheet';
import Spinner from 'react-native-spinkit';
import _ from 'lodash';
import { getAuditions, putAuditions } from '../Network/Api';

class Schedule extends Component {
	constructor(props) {
		super(props);

		const dummyAuditions = [
			// {
			// 	id: 1,
			// 	actor: "Brad Pitt",
			// 	phone: "7777777",
			// 	role: "Batman",
			// 	date: "Monday Apr 25",
			// 	time: "3:30pm",
			// 	status: "",
			// 	casting: "",
			// 	selected: false
			// },
			// {
			// 	id: 2,
			// 	actor: "Christian Bale",
			// 	phone: "7777777",
			// 	role: "Batman",
			// 	date: "Monday Apr 25",
			// 	time: "3:50pm",
			// 	status: "",
			// 	casting: "",
			// 	selected: false
			// },
			// {
			// 	id: 3,
			// 	actor: "Ben Affleck",
			// 	phone: "7777777",
			// 	role: "Batman",
			// 	date: "Monday Apr 25",
			// 	time: "4:10pm",
			// 	status: "",
			// 	casting: "",
			// 	selected: false
			// }
		]

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(dummyAuditions),
			auditions: dummyAuditions,
			forwardActorCount: 0,
			forwardCastingCount: 0,
      selected: [],
      show: false,
			isLoading: false,
			refreshing: false,
		}
	}

	componentDidMount() {
		if (this.props.message)
			Alert.alert(this.props.message);

		this.populateAuditionList();
	}

	render() {
		return(
			<View style={styles.color}>
				<Navbar
					title="Schedule"
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
							<View style={schedule.listContainer}>
								<ListView
									dataSource={this.state.dataSource}
									renderHeader={this._renderHeader.bind(this)}
									renderRow={this._renderRow.bind(this)}
									renderSeparator={this._renderSeperator} />
							</View>
						</View>
   		    </ScrollView>
					<View style={schedule.footer}>
						<ButtonRounded text="Actions" onPress={this.onOpen.bind(this)} />
					</View>
					<ActionSheet
	          visible={this.state.show}
	          onCancel={this.onCancel.bind(this)}>
	          <ActionSheet.Button onPress={() => this.onAction("SENT")}>Send to {this.state.selected.length} Actor(s)</ActionSheet.Button>
	          <ActionSheet.Button onPress={() => this.onAction("CONF")}>Confirm {this.state.selected.length}</ActionSheet.Button>
						<ActionSheet.Button onPress={() => this.onAction("REGR")}>Regret {this.state.selected.length}</ActionSheet.Button>
						<ActionSheet.Button onPress={() => this.onAction("TIME")}>Request {this.state.selected.length} New Time(s)</ActionSheet.Button>
						<ActionSheet.Button onPress={() => this.onAction("CAST")}>Forward {this.state.selected.length} to Casting</ActionSheet.Button>
						{this.generateActionButtons()}
	        </ActionSheet>
					<View style={schedule.spinnerContainer}>
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

	_renderHeader() {
		return (
      <View style={schedule.headerContainer}>
        <Text style={schedule.header}>{this.props.project.title}</Text>
				<View style={schedule.notificationsContainer}>
					{this.generateActorNotification()}
					{this.generateCastingNotification()}
				</View>
      </View>
    )
	}

	_renderRow(audition) {
		return(
			<TouchableOpacity onPress={() => this.onItemSelected(audition.id)}>
				<View style={audition.selected ? schedule.auditionItemSelected : schedule.auditionItem}>
	        <View style={schedule.auditionItemLeft}>
            <Text style={schedule.highlightedFont}>{audition.actor}</Text>
            <Text style={schedule.normalFont}>{audition.role}</Text>
						<View style={schedule.date}>
							<Text style={schedule.normalFont}>{audition.date}</Text>
							<Text style={schedule.normalFont}>{audition.time}</Text>
						</View>
	        </View>
	        <View style={schedule.auditionItemRight}>
						<View style={schedule.statusContainer}>
							{this.generateStatus(audition)}
						</View>
						<TouchableOpacity onPress={() => this.onAuditionPressed(audition.id)}>
							<View style={schedule.auditionItemIconContainer}>
								<Icon name="ios-arrow-forward" style={schedule.auditionItemIcon} />
							</View>
						</TouchableOpacity>
					</View>
	      </View>
			</TouchableOpacity>
		)
	}

	_renderSeperator(sectionID, rowID) {
		return (
      <View key={`${sectionID}-${rowID}`} style={schedule.separator} />
    )
	}

	_onRefresh() {
		console.log("Refresh Triggered")
		this.setState({refreshing: true});
		this.populateAuditionList();
	}

	generateActionButtons() {
		let buttons;
		if(this.state.selected.length == 1)
			buttons = [
				<ActionSheet.Button key="call-actor" onPress={() => this.onAction("CALL")}>Call Selected Actor</ActionSheet.Button>,
				<ActionSheet.Button key="message-actor" onPress={() => this.onMessages()}>Message Selected Actor</ActionSheet.Button>,
			]
		return buttons;
	}

	generateStatus(audition) {
		let statusElement;
		if(audition.status == 6)
			statusElement = <Icon name='checkmark' style={[schedule.auditionItemIcon, {color: '#00AD63'}]} />
		else if(audition.status == 4)
			statusElement = <Icon name='close' style={[schedule.auditionItemIcon, {color: '#E9556A'}]} />
		else if(audition.status == 10)
			statusElement = <Icon name='clock' style={[schedule.auditionItemIcon, {color: '#00B5EF'}]} />
		else if (audition.status == 2)
			statusElement = <Text style={[schedule.highlightedFont, {color: '#00B5EF'}]}>SENT</Text>
		else if (audition.status == 5)
			statusElement = <Text style={[schedule.highlightedFont, {color: '#00AD63'}]}>CONF</Text>
		else if (audition.status == 3)
			statusElement = <Text style={[schedule.highlightedFont, {color: '#E9556A'}]}>REGR</Text>

		return statusElement;
	}

	generateActorNotification() {
		let countText;
		if (this.state.forwardActorCount > 1)
			countText = `${this.state.forwardActorCount} need to be sent to Actors`;
		else
			countText = `${this.state.forwardActorCount} needs to be sent to Actor`;

		if (this.state.forwardActorCount > 0) {
			return <View style={schedule.notification}>
							 <Icon name="android-alert" style={schedule.notificationIcon} />
							 <Text style={schedule.notificationFont}>{countText}</Text>
						 </View>
		}
	}

	generateCastingNotification() {
		let countText;
		if (this.state.forwardCastingCount > 1)
			countText = `${this.state.forwardCastingCount} need to be forwarded to Casting`;
		else
			countText = `${this.state.forwardCastingCount} needs to be forwarded to Casting`;

		if (this.state.forwardCastingCount > 0) {
			return <View style={schedule.notification}>
							 <Icon name="android-alert" style={schedule.notificationIcon} />
							 <Text style={schedule.notificationFont}>{countText}</Text>
						 </View>
		}
	}

	onItemSelected(id) {
		let selected;
		if (_.includes(this.state.selected, id))
			selected = _.without(this.state.selected, id);
		else
			selected = _.concat(this.state.selected, id);

    const auditions = _.map(_.cloneDeep(this.state.auditions), (audition) => {
      if (audition.id == id && audition.selected == false) {
        audition.selected = true;
      } else if (audition.id == id && audition.selected == true) {
        audition.selected = false;
      }
      return audition;
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(auditions),
      auditions,
			selected
    });
	}

	onAuditionPressed(id) {
		this.props.auditionActions.setAudition(_.find(this.state.auditions, { 'id': id }));

		Actions.history();
	}

	onCancel() {
    this.setState({show: false});
  }

  onOpen() {
		if(this.state.selected.length < 1)
			Alert.alert("Please select auditions");
		else
    	this.setState({show: true});
  }

	sendMessageAlert(id) {
		this.setState({show: false});

		Alert.alert(
			'Send Message',
      'Would you like to attach a message to this action?',
      [
        {text: 'Yes', onPress: () => Actions.notes({audition: {id}})},
				{text: 'No', onPress: () => Alert.alert('Action Sent')},
      ]
		)
	}

	onAction(status) {
		this.setState({show: false});
		this.updateStatus(status);

		if ((status != 'CALL') && this.state.selected.length == 1)
			this.sendMessageAlert(this.state.selected[0]);
	}

	onMessages() {
		this.setState({show: false});
    Actions.notes({audition: {id: this.state.selected[0]}});
  }

	async populateAuditionList() {
		let endpoint = `/scheduling2016/api/agents/${this.props.user.id}/breakdownschedules/${this.props.project.id}/${this.props.project.type}`;
		let auditionListData;
		this.setState({isLoading: true});
		try {
			auditionListData = await getAuditions(endpoint, this.props.user.authToken);
		} catch(error) {
			console.error(error);
		}

		let forwardActorCount = 0;
		let forwardCastingCount = 0;
		let auditions = _.map(auditionListData, (audition, index) => {
			if (audition.auditionStatusI == 1)
				forwardActorCount++;
			if (audition.auditionStatusI == 5 || audition.auditionStatusI == 3)
				forwardCastingCount++;

			let millidate = audition.auditionDate.replace(/\/Date\((-?\d+)\)\//, '$1');
			let date = new Date(parseInt(millidate));

			let object = {
				id: audition.auditionScheduleId,
				actor: `${audition.clientFirstName} ${audition.clientLastName}`,
				actorPhone: audition.clientPhoneNumber,
				directorPhone: audition.directorPhoneNumber,
				role: audition.roleName,
				date: date.toLocaleDateString(),
				time: date.toLocaleTimeString(),
				status: audition.auditionStatusI,
				error: false,
				selected: false
			}

			return object;
		});

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(auditions),
      auditions,
			forwardActorCount,
			forwardCastingCount,
			isLoading: false,
			refreshing: false,
		});
	}

	async updateStatus(status) {
		let endpoint;
		switch(status) {
			case 'CALL':
				endpoint = `/scheduling2016/api/agents/${this.props.user.id}/batchsettocallauditionschedule`;
				break;
			case 'SENT':
				endpoint = `/scheduling2016/api/agents/${this.props.user.id}/batchforwardauditionschedule`;
				break;
			case 'CONF':
				endpoint = `/scheduling2016/api/agents/${this.props.user.id}/batchconfirmauditionschedule`;
				break;
			case 'REGR':
				endpoint = `/scheduling2016/api/agents/${this.props.user.id}/batchregretauditionschedule`;
				break;
			case 'TIME':
				endpoint = `/scheduling2016/api/agents/${this.props.user.id}/batchrequestotherauditionschedule`;
				break;
			case 'CAST':
				endpoint = ``;
				break;
		}

		let data = {
			auditionScheduleIds: this.state.selected
		};
		let jsonData = JSON.stringify(data);
		let response;
		this.setState({isLoading: true});
		try {
			response = await putAuditions(endpoint, jsonData);
			console.log(response);
		} catch(error) {
			console.error(error);
		}

		let forwardActorCount = 0;
		let forwardCastingCount = 0;
		let auditions = _.map(this.state.auditions, (audition) => {
			let object;
			if (_.some(response.auditions, {'auditionScheduleId': audition.id})) {
				let responseObject = _.find(response.auditions, {'auditionScheduleId': audition.id});

				object = {
					id: audition.id,
					actor: audition.actor,
					actorPhone: audition.actorPhone,
					directorPhone: audition.directorPhone,
					role: audition.role,
					date: audition.date,
					time: audition.time,
					status: audition.responseObject.state.stateId,
					selected: false
				}
			} else {
				object = {
					id:
				}
			}

			return object;
		});

		if (status == 'CALL')
				Linking.openURL(`tel:${_.find(this.state.auditions, { 'id': this.state.selected[0] }).phone}`);

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(auditions),
      auditions,
			forwardActorCount,
			forwardCastingCount,
			selected: [],
			isLoading: false,
		});
	}
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const AuditionActions = require('../Redux/Actions/audition');

function mapStateToProps(state) {
	return {
		user: state.user,
		project: state.project
	}
}

function mapDispatchToProps(dispatch) {
	return {
		auditionActions: bindActionCreators(AuditionActions, dispatch)
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Schedule);
