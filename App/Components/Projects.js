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
import { getProjects } from '../Network/Api';

class Projects extends Component {
	constructor(props) {
    super(props);

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows([]),
			projects: [],
			selected: [],
			show: false,
			isLoading: false,
			refreshing: false,
		}
  }

	componentDidMount() {
		this.populateProjectList();
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
				<View style={_.includes(this.state.selected, project.id) ? projects.projectItemSelected : projects.projectItem}>
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
		this.populateProjectList();
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

    const projects = _.cloneDeep(this.state.projects)
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
		Linking.openURL(`tel:${_.find(this.state.projects, {'id': this.state.selected[0]}).phone}`);
	}

	async populateProjectList() {
		let projectListData;
		this.setState({isLoading: true});
		try {
			const endpoint = `/scheduling2016/api/agents/${this.props.user.id}/activebreakdowns`;
			projectListData = await getProjects(endpoint);
		} catch(error) {
			console.error(error);
		}

		let projects = _.map(projectListData, (project, index) => {
			let actions = project.auditionsRequestedNotForwardedCount + project.auditionsResponseNotForwardedCount;
			let object = {
				id: project.breakdownId,
				type: project.breakdownType,
				title: project.title.trim(),
				director: project.directorName.trim(),
				phone: project.directorPhone.trim(),
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

function mapStateToProps({user}) {
	return {user}
}

function mapDispatchToProps(dispatch) {
	return {
		projectActions: bindActionCreators(ProjectActions, dispatch)
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Projects);
