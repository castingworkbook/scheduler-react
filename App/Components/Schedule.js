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

export default class Schedule extends Component {
	constructor(props) {
		super(props);

		const dummyAuditions = [
			{
				id: 1,
				actor: "Brad Pitt",
				role: "Batman",
				date: "M Apr 25",
				time: "3:30pm",
				status: "",
				casting: "confirm",
				selected: false
			},
			{
				id: 2,
				actor: "Christian Bale",
				role: "Batman",
				date: "M Apr 25",
				time: "3:50pm",
				status: "CONF",
				casting: "",
				selected: false
			},
			{
				id: 3,
				actor: "Ben Affleck",
				role: "Batman",
				date: "M Apr 25",
				time: "4:10pm",
				status: "REQ+",
				casting: "",
				selected: false
			}
		]

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(dummyAuditions),
			auditions: dummyAuditions,
      selected: [],
      clicked: 'none',
      show: false
		}
	}

	componentDidMount() {
		if (this.props.message)
			Alert.alert(this.props.message);
	}

	render() {
		return(
			<View style={schedule.color}>
				<Navbar
					title="Schedule"
					style={schedule.toolbar}
					back={true} />
				<Image source={require('../img/glow2.png')} style={schedule.container}>
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
	          visible={ this.state.show }
	          onCancel={ this.onCancel.bind(this) }>
	          <ActionSheet.Button onPress={this.onAction.bind(this)}>Forward to Actor</ActionSheet.Button>
						<ActionSheet.Button onPress={this.onAction.bind(this)}>Forward to Actor with Materials</ActionSheet.Button>
	          <ActionSheet.Button onPress={this.onAction.bind(this)}>Set to Confirm</ActionSheet.Button>
						<ActionSheet.Button onPress={this.onAction.bind(this)}>Set to Regret</ActionSheet.Button>
						<ActionSheet.Button onPress={this.onAction.bind(this)}>Set to Request Alternative Time</ActionSheet.Button>
						<ActionSheet.Button onPress={this.onAction.bind(this)}>Forward to Casting</ActionSheet.Button>
						<ActionSheet.Button>Call Actor</ActionSheet.Button>
						<ActionSheet.Button>Call Casting</ActionSheet.Button>
						<ActionSheet.Button onPress={this.onNotes.bind(this)}>View / Add Notes</ActionSheet.Button>
	        </ActionSheet>
				</Image>
			</View>
		);
	}

	_renderHeader() {
		return (
      <View style={schedule.headerContainer}>
        <Text style={schedule.header}>Batman Returns</Text>
      </View>
    )
	}

	_renderRow(audition) {
		let statusElement;
		if(audition.casting == 'confirm') {
			statusElement = <Icon name='checkmark' style={schedule.auditionItemIcon} />
		} else if (audition.casting == 'regret'){
			statusElement = <Icon name='close' style={schedule.auditionItemIcon} />
		} else if (audition.casting == 'time'){
			statusElement = <Icon name='clock' style={schedule.auditionItemIcon} />
		} else {
			statusElement = <Text style={schedule.highlightedFont}>{audition.status}</Text>
		}

		return(
			<TouchableOpacity onPress={() => this.onItemSelected(audition.id)}>
				<View style={_.includes(this.state.selected, audition.id) ? schedule.auditionItemSelected : schedule.auditionItem}>
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
							{statusElement}
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

	onItemSelected(id) {
		if(_.includes(this.state.selected, id)) {
			this.setState({selected: _.remove(this.state.selected, id)});
		} else {
			this.setState({selected: _.concat(this.state.selected, id)});
		}
	}

	onCancel() {
    this.setState({show: false});
  }

  onOpen() {
    this.setState({show: true});
  }

	onAction() {
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

	onForward() {
		this.setState({show: false});
	}

	onForwardPlus() {
		this.setState({show: false});
	}

	onConfirm() {
		this.setState({show: false});
	}

	onRegret() {
		this.setState({show: false});
	}

	onTime() {
		this.setState({show: false});
	}

	onCasting() {
		this.setState({show: false});
	}

	onCallActor() {
		this.setState({show: false});
	}

	onCallCasting() {
		this.setState({show: false});
	}

	onNotes() {
		Actions.notes();
	}
}
