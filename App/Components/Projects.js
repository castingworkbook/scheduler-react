/* @flow */
'use strict';

import React, {Component, Text, View, Image, ScrollView, Alert, ListView, BackAndroid, TouchableOpacity} from 'react-native';
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
					<ScrollView style={{backgroundColor: 'transparent'}}>
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
	          <ActionSheet.Button onPress={this.onNotesAction.bind(this)}>View / Add Notes</ActionSheet.Button>
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
		let roles = _.map(project.roles, (role, index) => {
			if (index < 3)
				return <Text key={index} style={projects.normalFont}>{role}</Text>
		});

		return(
			<TouchableOpacity onPress={() => this.onItemSelected(project.index)}>
				<View style={project.selected ? projects.projectItemSelected : projects.projectItem}>
					<View style={projects.projectItemLeft}>
						<View style={projects.projectItemSelect}>
							<Text style={projects.highlightedFont}>{project.title}</Text>
							<Text style={projects.normalFont}>{project.director}</Text>
							<View style={projects.projectItemRoles}>{roles}</View>
						</View>
					</View>
					<View style={projects.projectItemRight}>
						<View style={projects.actionsContainer}>
							<View style={project.actions > 0 ? projects.activeActions : projects.inactiveActions}>
								<Text>{project.actions}</Text>
							</View>
						</View>
						<TouchableOpacity onPress={() => this.onSchedulePressed(project.index)}>
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

	generateActionButtons() {
		let buttons;
		if (this.state.selected.length == 1)
			buttons = [
				<ActionSheet.Button key="call-casting">Call Casting Director</ActionSheet.Button>
			]
		return buttons;
	}

	onItemSelected(index) {
		let selected;
		if (_.includes(this.state.selected, index))
			selected = _.without(this.state.selected, index);
		else
			selected = _.concat(this.state.selected, index);

    const projects = _.map(_.cloneDeep(this.state.projects), (project) => {
      if (project.index == index && project.selected == false) {
        project.selected = true;
      } else if (project.index == index && project.selected == true) {
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

	onSchedulePressed(index) {
		this.props.projectActions.setProject(this.state.projects[index]);

		Actions.schedule();
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
		let headers = {
      accept: 'application/json',
			authorization: this.props.user.authToken
    };

		let request = {
			method: 'get',
			headers
		}

		let responseJson;
		try {
			this.setState({isLoading: true});
			let response = await fetch('http://cwbscheduler.herokuapp.com/projects', request);
			responseJson = await response.json();
			console.log(responseJson);

			if(responseJson.errors)
				Alert.alert(responseJson.errors);

		} catch(error) {
			console.error(error);
		}
		this.setState({isLoading: false});

		let projects = _.map(responseJson, (project, index) => {
			let object = {
				index: index,
				id: project.id,
				title: project.title,
				director: project.director,
				phone: project.phone,
				roles: project.roles,
				actions: 3,
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
