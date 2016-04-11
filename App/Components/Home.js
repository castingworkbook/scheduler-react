/* @flow */
'use strict';

import React, {Component, Text, View, Image, ScrollView, ListView, BackAndroid, TouchableHighlight} from 'react-native';
import styles from '../Styles/style';
import main from '../Styles/main';
import Navbar from './Widgets/Navbar';
import home from '../Styles/home';
import {primary} from '../Styles/variable';
import {secondary} from '../Styles/variable';
import Login from './Login';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';

export default class Home extends Component {
	constructor(props) {
    super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows([
				{
			    name: "Batman Returns",
			    director: "Brad Richardson",
			    roles: ["Batman", "Robin", "Joker"],
			    actions: 3
			  },
			  {
			    name: "Forrest Gump",
			    director: "Natalie Low",
			    roles: ["Forrest", "Jenny", "Mom"],
			    actions: 1
			  },
			  {
			    name: "Brian the Great",
			    director: "Bill Gates",
			    roles: ["Brian", "Susan", "Trevar"],
			    actions: 2
			  }
			])
		}
  }

	render() {
		return(
    	<View style={home.color}>
     		<Navbar
   		    title="Projects"
   		    style={home.toolbar} />
     		<Image source={require('../img/glow2.png')} style={home.container}>
					<ScrollView style={{backgroundColor: 'transparent'}}>
						<View style={styles.verticalCenter}>
							<View style={home.listContainer}>
								<ListView
				          dataSource = { this.state.dataSource }
				          renderRow  = { this._renderRow.bind(this) }
									renderSeparator = { this._renderSeperator } />
				 			</View>
			 			</View>
					</ScrollView>
        </Image>
    	</View>
		);
	}

	_renderRow (project) {
		return(
			<View style = { main.projectListItem }>
				<View style = { main.projectListItemLeft }>
					<Text style = { main.highlightedFont }>
						{ project.name }
					</Text>
					<Text style = { main.normalFont }>
						{ project.director }
					</Text>
					<View style = { main.projectListItemRoles }>
						<Text style = { main.normalFont }>
							{ project.roles }
						</Text>
					</View>
				</View>
				<View style = { main.projectListItemRight }>
					<View style = { project.actions > 0 ? main.activeActions : main.inactiveActions }>
						<Text style = { project.actionsText }>{ project.actions }</Text>
					</View>
				</View>
			</View>
		);
	}

	_renderSeperator (sectionID, rowID) {
		return (
      <View key = { `${sectionID}-${rowID}` } style = { main.separator } />
    )
	}
}
