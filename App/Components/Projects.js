/* @flow */
'use strict';

import React, { Component, Text, View, Image, ScrollView, Alert, ListView, TouchableOpacity, RefreshControl, Linking } from 'react-native';
import styles from '../Styles/style';
import Navbar from './Widgets/Navbar';
import projects from '../Styles/projects';
import ButtonRounded from './Widgets/ButtonRounded';
import Login from './Login';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import ActionSheet from '@remobile/react-native-action-sheet';
import Spinner from 'react-native-spinkit';
import _ from 'lodash';
import ServerURL from '../Network/Request';

class Projects extends Component {
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
			refreshing: false,
		}
  }

	componentDidMount() {
		this.getProjects();
	}

	render() {
		return(
    	<View style={styles.color}>
     		<Navbar
   		    title="Projects"
   		    style={styles.toolbar}
					back={false} />
     		<Image source={require('../img/glow2.png')} style={styles.container}>
					<ScrollView
						style={{backgroundColor: 'transparent'}}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._onRefresh.bind(this)} />
						}>
						<View style={styles.verticalCenter}>
							<View style={projects.listContainer}>
								<ListView
				          dataSource={this.state.dataSource}
				          renderRow={this._renderRow.bind(this)}
									renderSeparator={this._renderSeperator} />
				 			</View>
			 			</View>
					</ScrollView>
					<View style={projects.footer}>
						<ButtonRounded text="Actions" onPress={this.onOpen.bind(this)} />
					</View>
					<ActionSheet
	          visible={this.state.show}
	          onCancel={this.onCancel.bind(this)}>
	          {this.generateActionButtons()}
	        </ActionSheet>
					<View style={projects.spinnerContainer}>
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
		return(
			<TouchableOpacity onPress={() => this.onItemSelected(project.id)}>
				<View style={project.selected ? projects.projectItemSelected : projects.projectItem}>
					<View style={projects.projectItemLeft}>
						<View style={projects.projectItemSelect}>
							<Text style={projects.highlightedFont}>{project.title}</Text>
							<View style={projects.directorContainer}>
								<Text style={projects.normalFont}>{project.director}</Text>
							</View>
						</View>
					</View>
					<View style={projects.projectItemRight}>
						<View style={projects.actionsContainer}>
							<View style={project.actions > 0 ? projects.activeActions : projects.inactiveActions}>
								<Text>{project.actions}</Text>
							</View>
						</View>
						<TouchableOpacity onPress={() => this.onSchedulePressed(project.id)}>
							<View style={projects.projectItemIconContainer}>
								<Icon name="ios-arrow-forward" style={projects.projectItemIcon} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	_renderSeperator(sectionID, rowID) {
		return (
      <View key={`${sectionID}-${rowID}`} style={projects.separator} />
    )
	}

	_onRefresh() {
		console.log("Refresh Triggered")
		this.setState({refreshing: true});
		this.getProjects();
	}

	generateActionButtons() {
		let buttons;
		if (this.state.selected.length == 1)
			buttons = [
				<ActionSheet.Button key="call-casting" onPress={() => this.onCall()}>Call Casting Director</ActionSheet.Button>
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
      projects,
			selected
    });
	}

	onSchedulePressed(id) {
		this.props.projectActions.setProject(_.find(this.state.projects, { 'id': id }));

		Actions.schedule();
	}

	onCancel() {
    this.setState({show: false});
  }

  onOpen() {
		if (this.state.selected.length < 1)
			Alert.alert("Please select project");
		else if (this.state.selected.length > 1)
			Alert.alert("Please only select 1 project");
		else
    	this.setState({show: true});
  }

	onCall() {
		this.setState({show: false});
		Linking.openURL(`tel:${_.find(this.state.projects, { 'id': this.state.selected[0] }).phone}`);
	}

	async getProjects() {
		let headers = {
      accept: 'application/json',
			authorization: this.props.user.authToken
    };

		let request = {
			method: 'get',
			headers
		}

		let path = ServerURL + 'projects';
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

		let projects = _.map(responseJson.projects, (project, index) => {
			let actions = 0;
			_.each(project.auditions, (audition) => {
				if (_.isEmpty(audition.status)) actions++;
				if ((audition.status == 'CONF' || audition.status == 'REGR' || audition.status == 'TIME') && _.isEmpty(audition.response))
					actions++;
			});

			let object = {
				id: project.id,
				title: project.title,
				director: project.director,
				phone: project.phone,
				selected: false,
				actions,
			}

			return object;
		});

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(projects),
      projects,
			isLoading: false,
			refreshing: false,
		});
	}
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const ProjectActions = require('../Redux/Actions/project');

function mapStateToProps(state) {
	return {
		user: state.user
	}
}

function mapDispatchToProps(dispatch) {
	return {
		projectActions: bindActionCreators(ProjectActions, dispatch)
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Projects);
