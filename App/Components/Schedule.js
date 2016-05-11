/* @flow */
'use strict';

import React, {Component, ScrollView, Text, View, Image, ListView, TouchableOpacity, Alert} from 'react-native';
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

export default class Schedule extends Component {
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
      selected: [],
      clicked: 'none',
      show: false,
			isLoading: false
		}
	}

	componentDidMount() {
		if (this.props.message)
			Alert.alert(this.props.message);

		this.getSchedules();
	}

	render() {
		return(
			<View style={styles.color}>
				<Navbar
					title="Schedule"
					style={styles.toolbar}
					back={true} />
				<Image source={require('../img/glow2.png')} style={styles.container}>
   		    <ScrollView style={{backgroundColor: 'transparent'}}>
						<View style={styles.verticalCenter}>
							<View style={schedule.listContainer}>
								<ListView
									dataSource={this.state.dataSource}
									renderHeader= {this._renderHeader}
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
						<ActionSheet.Button onPress={() => this.onAction("SENT+")}>Send to {this.state.selected.length} Actor(s) + Materials</ActionSheet.Button>
	          <ActionSheet.Button onPress={() => this.onAction("CONF")}>Confirm {this.state.selected.length}</ActionSheet.Button>
						<ActionSheet.Button onPress={() => this.onAction("REGR")}>Regret {this.state.selected.length}</ActionSheet.Button>
						<ActionSheet.Button onPress={() => this.onAction("TIME")}>Request {this.state.selected.length} New Time(s)</ActionSheet.Button>
						<ActionSheet.Button onPress={() => this.onAction("CAST")}>Forward {this.state.selected.length} to Casting</ActionSheet.Button>
						{this.generateActionButtons()}
						<ActionSheet.Button>Call Casting Director</ActionSheet.Button>
						<ActionSheet.Button onPress={this.onNotes.bind(this)}>View / Add Notes</ActionSheet.Button>
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
        <Text style={schedule.header}>Batman Returns</Text>
				<View style={schedule.notificationsContainer}>
					<View style={schedule.notification}>
						<Icon name="android-alert" style={schedule.notificationIcon} />
						<Text style={schedule.notificationFont}>2 need to be sent to Actor(s)</Text>
					</View>
					<View style={schedule.notification}>
						<Icon name="android-alert" style={schedule.notificationIcon} />
						<Text style={schedule.notificationFont}>4 need to be forwarded to Casting</Text>
					</View>
				</View>
      </View>
    )
	}

	_renderRow(audition) {
		return(
			<TouchableOpacity onPress={() => this.onItemSelected(audition.index)}>
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
						<TouchableOpacity onPress={Actions.history}>
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

	generateActionButtons() {
		let buttons;
		if(this.state.selected.length == 1)
			buttons = [
				<ActionSheet.Button key="call-actor" onPress={() => this.onAction("CALL")}>Call Selected Actor</ActionSheet.Button>,
			]
		return buttons;
	}

	generateStatus(audition) {
		let statusElement;
		if(audition.casting == 'confirm')
			statusElement = <Icon name='checkmark' style={schedule.auditionItemIcon} />
		else if(audition.casting == 'regret')
			statusElement = <Icon name='close' style={schedule.auditionItemIcon} />
		else if(audition.casting == 'time')
			statusElement = <Icon name='clock' style={schedule.auditionItemIcon} />
		else
			statusElement = <Text style={schedule.highlightedFont}>{audition.status}</Text>

		return statusElement;
	}

	onItemSelected(index) {
		let selected;
		if (_.includes(this.state.selected, index))
			selected = _.without(this.state.selected, index);
		else
			selected = _.concat(this.state.selected, index);

    const auditions = _.map(_.cloneDeep(this.state.auditions), (audition) => {
      if (audition.index == index && audition.selected == false) {
        audition.selected = true;
      } else if (audition.index == index && audition.selected == true) {
        audition.selected = false;
      }

      return audition;
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(auditions),
      auditions: auditions,
			selected
    });
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

	sendMessageAlert() {
		this.setState({show: false});

		Alert.alert(
			'Send Message',
      'Would you like to attach a message to this action?',
      [
        {text: 'Yes', onPress: () => Actions.message()},
				{text: 'No', onPress: () => Alert.alert('Action Sent')},
      ]
		)
	}

	onAction(type) {
		const auditions = _.map(_.cloneDeep(this.state.auditions), (audition) => {
			if (_.includes(this.state.selected, audition.index) && type == 'CAST') {
				if(audition.status == 'CONF')
					audition.casting = 'confirm';
				else if(audition.status == 'REGR')
					audition.casting = 'regret';
				else if(audition.status == 'TIME')
					audition.casting = 'time'
			} else if(_.includes(this.state.selected, audition.index) && type != 'CAST') {
				audition.status = type;
			}
			audition.selected = false;

			return audition;
    });

		if(type == "SENT" || type == "SENT+" || type == "CAST")
			this.sendMessageAlert();

		this.setState({
      dataSource: this.state.dataSource.cloneWithRows(auditions),
      auditions: auditions,
			selected: [],
			show: false,
    });
	}

	onNotes() {
		Actions.notes();
	}

	async getSchedules() {
		let headers = {
      accept: 'application/json',
			authorization: this.props.user.authToken
    };

		let request = {
			method: 'get',
			headers
		}

		let path = `http://cwbscheduler.herokuapp.com/projects/${this.props.project.id}/auditions`;

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
		this.setState({isLoading: false});

		let auditions = _.map(responseJson, (audition, index) => {
			let object = {
				index: index,
				id: audition.id,
				actor: audition.actor,
				phone: audition.phone,
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
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
	return {
		user: state.user,
		project: state.project
	}
}

module.exports = connect(mapStateToProps)(Schedule);
