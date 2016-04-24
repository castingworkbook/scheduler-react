/* @flow */
'use strict';

import React, {Component, ScrollView, Text, View, Image, ListView, TouchableOpacity, Alert} from 'react-native';
import styles from '../Styles/style';
import Navbar from './Widgets/Navbar';
import schedule from '../Styles/schedule';
import ButtonRounded from './Widgets/ButtonRounded';
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
				date: "M 02/20/16",
				time: "3:30pm",
				forwardStatus: 1,
				materialStatus: 0,
				actorStatus: 0,
				agentStatus: 0,
				forwardAlert: false,
				materialAlert: true,
				actorAlert: false,
				agentAlert: false,
				historyAlert: false,
				selected: false
			},
			{
				id: 2,
				actor: "Christian Bale",
				role: "Batman",
				date: "M 02/20/16",
				time: "3:50pm",
				forwardStatus: 1,
				materialStatus: 1,
				actorStatus: 2,
				agentStatus: 0,
				forwardAlert: false,
				materialAlert: false,
				actorAlert: true,
				agentAlert: false,
				historyAlert: false,
				selected: false
			},
			{
				id: 3,
				actor: "Ben Affleck",
				role: "Batman",
				date: "M 02/20/16",
				time: "4:10pm",
				forwardStatus: 1,
				materialStatus: 1,
				actorStatus: 1,
				agentStatus: 1,
				forwardAlert: false,
				materialAlert: false,
				actorAlert: false,
				agentAlert: false,
				historyAlert: false,
				selected: false
			}
		]

		this.statusStyles = [
			schedule.auditionItemIcon,
			schedule.greenIconStatus,
			schedule.yellowIconStatus,
			schedule.redIconStatus,
			schedule.auditionItemIcon
		]

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(dummyAuditions),
			auditions: dummyAuditions,
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
	          <ActionSheet.Button onPress={this.onAction.bind(this)}>Forward</ActionSheet.Button>
	          <ActionSheet.Button onPress={this.onAction.bind(this)}>Confirm</ActionSheet.Button>
						<ActionSheet.Button onPress={this.onAction.bind(this)}>Regret</ActionSheet.Button>
						<ActionSheet.Button onPress={this.onAction.bind(this)}>Request Alternative Time</ActionSheet.Button>
						<ActionSheet.Button>Call Actor</ActionSheet.Button>
						<ActionSheet.Button>Call Casting</ActionSheet.Button>
						<ActionSheet.Button onPress={this.onNotesAction.bind(this)}>View / Add Notes</ActionSheet.Button>
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
		return(
			<TouchableOpacity onPress={() => this.onItemSelected(audition.id)}>
				<View style={audition.selected ? schedule.auditionItemSelected : schedule.auditionItem}>
					<View style={schedule.auditionItemTop}>
		        <View style={schedule.auditionItemLeft}>
		            <View style={schedule.auditionItemSelect}>
		              <Text style={schedule.highlightedFont}>{audition.actor}</Text>
		              <Text style={schedule.normalFont}>{audition.role}</Text>
		            </View>
		        </View>
		        <View style={schedule.auditionItemRight}>
							<Text style={schedule.highlightedFont}>{audition.time}</Text>
							<Text style={schedule.normalFont}>{audition.date}</Text>
						</View>
					</View>
					<View style={schedule.statusPanel}>
						<TouchableOpacity onPress={() => this.onForwardStatus(audition.forwardStatus)}>
							<View style={schedule.auditionItemStatusContainer}>
								<View style={schedule.auditionItemIconContainer}>
									<Icon name="videocamera" style={this.statusStyles[audition.forwardStatus]} />
								</View>
								<Icon name="android-alert" style={audition.forwardAlert ? schedule.notificationIcon : {opacity: 0}} />
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.onMaterialStatus(audition.materialStatus)}>
							<View style={schedule.auditionItemStatusContainer}>
								<View style={schedule.auditionItemIconContainer}>
									<Icon name="document-text" style={this.statusStyles[audition.materialStatus]} />
								</View>
								<Icon name="android-alert" style={audition.materialAlert ? schedule.notificationIcon : {opacity: 0}} />
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.onActorStatus(audition.actorStatus)}>
							<View>
								<View style={schedule.auditionItemIconContainer}>
									<Icon name="person" style={this.statusStyles[audition.actorStatus]} />
								</View>
								<Icon name="android-alert" style={audition.actorAlert ? schedule.notificationIcon : {opacity: 0}} />
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.onAgentStatus(audition.agentStatus)}>
							<View style={schedule.auditionItemStatusContainer}>
								<View style={schedule.auditionItemIconContainer}>
									<Icon name="film-marker" style={this.statusStyles[audition.agentStatus]} />
								</View>
								<Icon name="android-alert" style={audition.agentAlert ? schedule.notificationIcon : {opacity: 0}} />
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={Actions.history}>
							<View style={schedule.auditionItemStatusContainer}>
								<View style={schedule.auditionItemIconContainer}>
									<Icon name="clock" style={schedule.auditionItemIcon} />
								</View>
								<Icon name="android-alert" style={audition.historyAlert ? schedule.notificationIcon : {opacity: 0}} />
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
      auditions: auditions
    });
	}

	onCancel() {
    this.setState({show: false});
  }

  onOpen() {
    this.setState({show: true});
  }

	onForwardStatus(state) {
		if(state == 1)
			Alert.alert('Forward Status', 'You have forwarded the audition to Actor. (Green)');
		else
			Alert.alert('Forward Status', 'You have not forwarded the audition to the Actor. (White)');
	}

	onMaterialStatus(state) {
		Actions.materials();
	}

	onActorStatus(state) {
		if(state == 1)
			Alert.alert('Actor Status', 'Actor has confirmed. (Green)');
		else if(state == 2)
			Alert.alert('Actor Status', 'Actor has requested alternative time. (Yellow)');
		else if(state == 3)
			Alert.alert('Actor Status', 'Actor has regreted. (Red)');
		else
			Alert.alert('Actor Status', 'Actor has not responded yet. (White)');
	}

	onAgentStatus(state) {
		if(state == 1)
			Alert.alert('Audition Status', 'You have confirmed. (Green)');
		else if(state == 2)
			Alert.alert('Audition Status', 'You have requested an alternative time. (Yellow)');
		else if(state == 3)
			Alert.alert('Audition Status', 'You have regreted. (Red)');
		else
			Alert.alert('Audition Status', 'You have not sent a response. (White)');
	}

	onAction() {
		this.setState({show: false});

		Alert.alert(
			'Send Message or Materials',
      'Would you like to attach messages or materials to this action?',
      [
        {text: 'Yes', onPress: () => Actions.message()},
				{text: 'No', onPress: () => Alert.alert('Action Sent')},
      ])
	}

	onNotesAction() {
		Actions.notes();
	}
}
