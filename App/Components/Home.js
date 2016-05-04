/* @flow */
'use strict';

import React, {Component, Text, View, Image, ScrollView, Alert, ListView, BackAndroid, TouchableOpacity} from 'react-native';
import styles from '../Styles/style';
import Navbar from './Widgets/Navbar';
import home from '../Styles/home';
import ButtonRounded from './Widgets/ButtonRounded';
import Login from './Login';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import ActionSheet from '@remobile/react-native-action-sheet';
import Spinner from 'react-native-spinkit';
import _ from 'lodash';

export default class Home extends Component {
	constructor(props) {
    super(props);

		const dummyProjects = [
			// {
			// 	id: 1,
			// 	name: "Batman Returns",
			// 	director: "Brad Richardson",
			// 	phone: "7777777",
			// 	roles: ["Batman", "Robin"],
			// 	actions: 3,
			// 	selected: false,
			// },
			// {
			// 	id: 2,
			// 	name: "Forrest Gump",
			// 	director: "Natalie Low",
			// 	phone: "7777777",
			// 	roles: ["Forrest Gump", "Jenny Curran"],
			// 	actions: 0,
			// 	selected: false,
			// },
			// {
			// 	id: 3,
			// 	name: "The NoteBook",
			// 	director: "Jeff Rose",
			// 	roles: ["Handsome Guy", "Pretty Girl"],
			// 	actions: 2,
			// 	selected: false,
			// }
		];

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(dummyProjects),
			projects: dummyProjects,
			selected: [],
			show: false,
			isLoading: false,
		}
  }

	componentDidMount() {
		this.getProjects();
	}

	render() {
		return(
    	<View style={home.color}>
     		<Navbar
   		    title="Projects"
   		    style={home.toolbar}
					back={false} />
     		<Image source={require('../img/glow2.png')} style={home.container}>
					<ScrollView style={{backgroundColor: 'transparent'}}>
						<View style={styles.verticalCenter}>
							<View style={home.listContainer}>
								<ListView
				          dataSource={this.state.dataSource}
				          renderRow={this._renderRow.bind(this)}
									renderSeparator={this._renderSeperator} />
				 			</View>
			 			</View>
					</ScrollView>
					<View style={home.footer}>
						<ButtonRounded text="Actions" onPress={this.onOpen.bind(this)} />
					</View>
					<ActionSheet
	          visible={this.state.show}
	          onCancel={this.onCancel.bind(this)}>
	          {this.generateActionButtons()}
	          <ActionSheet.Button onPress={this.onNotesAction.bind(this)}>View / Add Notes</ActionSheet.Button>
	        </ActionSheet>
					<View style={home.spinnerContainer}>
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

	_renderRow(project) {
		let roles = _.map(project.roles, (role, index) => {
			if (index < 3)
				return <Text key={index} style={home.normalFont}>{role}</Text>
		});

		return(
			<TouchableOpacity onPress={() => this.onItemSelected(project.id)}>
				<View style={project.selected ? home.projectItemSelected : home.projectItem}>
					<View style={home.projectItemLeft}>
						<View style={home.projectItemSelect}>
							<Text style={home.highlightedFont}>{project.name}</Text>
							<Text style={home.normalFont}>{project.director}</Text>
							<View style={home.projectItemRoles}>{roles}</View>
						</View>
					</View>
					<View style={home.projectItemRight}>
						<View style={home.actionsContainer}>
							<View style={project.actions > 0 ? home.activeActions : home.inactiveActions}>
								<Text>{project.actions}</Text>
							</View>
						</View>
						<TouchableOpacity onPress={Actions.schedule}>
							<View style={home.projectItemIconContainer}>
								<Icon name="ios-arrow-forward" style={home.projectItemIcon} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	_renderSeperator(sectionID, rowID) {
		return (
      <View key={`${sectionID}-${rowID}`} style={home.separator} />
    )
	}

	generateActionButtons() {
		let buttons;
		if (this.state.selected.length == 1)
			buttons = [
				<ActionSheet.Button key="call-casting">Call Casting Director</ActionSheet.Button>
			]
		return buttons;
	}

	onItemSelected(id) {
		let selected;
		if (_.includes(this.state.selected, id))
			selected = _.without(this.state.selected, id);
		else
			selected = _.concat(this.state.selected, id);

    const projects = _.map(_.cloneDeep(this.state.projects), (project) => {
      if (project.id == id && project.selected == false) {
        project.selected = true;
      } else if (project.id == id && project.selected == true) {
        project.selected = false;
      }

      return project;
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(projects),
      projects: projects,
			selected
    });
	}

	onCancel() {
    this.setState({show: false});
  }

  onOpen() {
		if (this.state.selected.length < 1)
			Alert.alert("Please select projects");
		else
    	this.setState({show: true});
  }

	onNotesAction() {
		Actions.notes();
	}

	async getProjects() {
		let responseJson;
		try {
			this.setState({isLoading: true});
			let response = await fetch('http://www.thecwbint.com/scheduling2016/api/agents/71/activebreakdowns');
			responseJson = await response.json();
		} catch(error) {
			console.error(error);
		}
		this.setState({isLoading: false});

		let projects = _.map(responseJson, (project, index) => {
			let object = {
				id: index+1,
				name: project.title,
				director: project.directorName,
				phone: project.directorPhone,
				roles: ["Batman", "Robin"],
				actions: project.auditionsRegretedNotForwardedCount+project.auditionsConfirmedNotForwardedCount+project.auditionsRequestedNotForwardedCount,
				selected: false,
			}

			return object;
		});

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(projects),
      projects: projects
		});
	}
}
