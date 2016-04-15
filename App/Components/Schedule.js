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
import ActionSheet from '@remobile/react-native-action-sheet'

export default class Schedule extends Component {
	constructor(props) {
		super(props);

		const dummyAuditions = [
			{
				id: 1,
				actor: "Brad Pitt",
				role: "Batman",
				date: "02/20/16",
				time: "3:30pm",
				status: "C",
				selected: false
			},
			{
				id: 2,
				actor: "Christian Bale",
				role: "Batman",
				date: "02/20/16",
				time: "3:50pm",
				status: "R",
				selected: false
			},
			{
				id: 3,
				actor: "Ben Affleck",
				role: "Batman",
				date: "02/20/16",
				time: "4:10pm",
				status: "?",
				selected: false
			}
		]

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(dummyAuditions),
			auditions: dummyAuditions,
      status: "",
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
	          visible  = { this.state.show }
	          onCancel = { this.onCancel.bind(this) }>
	          <ActionSheet.Button onPress={this.onAction.bind(this)}>Forward</ActionSheet.Button>
	          <ActionSheet.Button onPress={this.onAction.bind(this)}>Confirm</ActionSheet.Button>
						<ActionSheet.Button onPress={this.onAction.bind(this)}>Regret</ActionSheet.Button>
						<ActionSheet.Button onPress={this.onAction.bind(this)}>Request Alternative Time</ActionSheet.Button>
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
			<View style={audition.selected ? schedule.auditionItemSelected : schedule.auditionItem}>
        <View style={schedule.auditionItemLeft}>
          <TouchableOpacity onPress={() => this.onItemSelected(audition.id)}>
            <View style={schedule.auditionItemSelect}>
              <Text style={schedule.highlightedFont}>{audition.actor}</Text>
              <Text style={schedule.normalFont}>{audition.role}</Text>
							<View style={schedule.date}>
								<Text style={schedule.normalFont}>{audition.date}</Text>
								<Text style={schedule.normalFont}>{audition.time}</Text>
							</View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={schedule.auditionItemRight}>
					<View style={schedule.statusContainer}>
						<View style={schedule.status}><Text>{audition.status}</Text></View>
					</View>
					<TouchableOpacity>
						<View style={schedule.auditionItemIconContainer}>
							<Icon name="ios-telephone" style={schedule.auditionItemIcon} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={Actions.history}>
						<View style={schedule.auditionItemIconContainer}>
							<Icon name="ios-arrow-forward" style={schedule.auditionItemIcon} />
						</View>
					</TouchableOpacity>
				</View>
      </View>
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

	onAction() {
		this.setState({show: false});

		Alert.alert(
			'Send a Message',
      'Would you like to attach a message to this action?',
      [
        {text: 'Yes', onPress: () => Actions.message()},
				{text: 'No', onPress: () => Alert.alert('Action Sent')},
      ])
	}
}
