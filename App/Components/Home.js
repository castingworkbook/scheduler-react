/* @flow */
'use strict';

import React, {Component, Text, View, Image, ScrollView, ListView, BackAndroid, TouchableOpacity} from 'react-native';
import styles from '../Styles/style';
import Navbar from './Widgets/Navbar';
import home from '../Styles/home';
import ButtonRounded from './Widgets/ButtonRounded';
import Login from './Login';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import ActionSheet from '@remobile/react-native-action-sheet';
import _ from 'lodash';

export default class Home extends Component {
	constructor(props) {
    super(props);

		const dummyProjects = [
			{
				id: 1,
				name: "Batman Returns",
				director: "Brad Richardson",
				roles: ["Batman", "Robin", "Joker"],
				actions: 3,
				selected: false,
			},
			{
				id: 2,
				name: "Forrest Gump",
				director: "Natalie Low",
				roles: ["Forrest Gump", "Jenny Curran", "Mom"],
				actions: 0,
				selected: false,
			},
			{
				id: 3,
				name: "The NoteBook",
				director: "Jeff Rose",
				roles: ["Handsome Guy", "Pretty Girl"],
				actions: 2,
				selected: false,
			}
		];

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(dummyProjects),
			projects: dummyProjects,
			clicked: 'none',
			show: false
		}
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
	          visible={ this.state.show }
	          onCancel={ this.onCancel.bind(this) }>
	          <ActionSheet.Button>Call Casting</ActionSheet.Button>
	          <ActionSheet.Button>View/Add Notes</ActionSheet.Button>
	        </ActionSheet>
        </Image>
    	</View>
		);
	}

	_renderRow(project) {
		let roles = _.map(project.roles, (role, index) => {
			if (index < 2)
				return <Text key={index} style={home.normalFont}>{role}</Text>
		});

		return(
			<View style={project.selected ? home.projectItemSelected : home.projectItem}>
				<View style={home.projectItemLeft}>
					<TouchableOpacity onPress={() => this.onItemSelected(project.id)}>
						<View style={home.projectItemSelect}>
							<Text style={home.highlightedFont}>{project.name}</Text>
							<Text style={home.normalFont}>{project.director}</Text>
							<View style={home.projectItemRoles}>{roles}</View>
						</View>
					</TouchableOpacity>
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
		);
	}

	_renderSeperator(sectionID, rowID) {
		return (
      <View key={`${sectionID}-${rowID}`} style={home.separator} />
    )
	}

	onItemSelected(id) {
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
      projects: projects
    });
	}

	onCancel() {
    this.setState({show: false});
  }

  onOpen() {
    this.setState({show: true});
  }
}
