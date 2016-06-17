/* @flow */
'use strict';

import React, { Component, Text, View, Image, ScrollView, Alert, ListView, TouchableOpacity, RefreshControl } from 'react-native';
import styles from '../Styles/style';
import Navbar from './Widgets/Navbar';
import auditions from '../Styles/auditions';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import IconInput from './Widgets/IconInput';
import Spinner from 'react-native-spinkit';
import { getAuditions, putAudition } from '../Network/Api';
import _ from 'lodash';

class Auditions extends Component {
  constructor(props) {
    super(props);

    const dummyAuditions = [
      // {
      // 	id: 1,
      //  title: "Batman Returns",
      // 	actor: "Brad Pitt",
      // 	phone: "7777777",
      // 	role: "Batman",
      // 	date: "Monday Apr 25",
      // 	time: "3:30pm",
      // 	status: "",
      // 	casting: ""
      // },
      // {
      // 	id: 2,
      //  title: "Batman Returns",
      // 	actor: "Christian Bale",
      // 	phone: "7777777",
      // 	role: "Batman",
      // 	date: "Monday Apr 25",
      // 	time: "3:50pm",
      // 	status: "",
      // 	casting: ""
      // },
      // {
      // 	id: 3,
      //   title: "Batman Returns",
      // 	actor: "Ben Affleck",
      // 	phone: "7777777",
      // 	role: "Batman",
      // 	date: "Monday Apr 25",
      // 	time: "4:10pm",
      // 	status: "",
      // 	casting: ""
      // }
    ];

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(dummyAuditions),
      auditions: dummyAuditions,
      selected: [],
      isLoading: false,
    }
  }

  componentDidMount() {
		this.populateAuditionList();
	}

  render() {
		return(
      <View style={styles.color}>
        <Navbar
					title="Auditions"
					style={styles.toolbar}
					back={true} />
        <Image source={require('../img/glow2.png')} style={styles.container}>
          <ScrollView
            style={{backgroundColor: 'transparent'}}
            refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._onRefresh.bind(this)} />
						}>
            <View style={styles.verticalCenter}>
              <View style={auditions.listContainer}>
								<ListView
									dataSource={this.state.dataSource}
									renderRow={this._renderRow.bind(this)}
									renderSeparator={this._renderSeperator} />
							</View>
            </View>
          </ScrollView>
          <View style={auditions.spinnerContainer}>
						<Spinner
							isVisible={this.state.isLoading}
							color={'#ffffff'}
							size={50}
							type={'Wave'} />
					</View>
        </Image>
      </View>
    )
  }

  _renderRow(audition) {
    return(
      <View style={auditions.container}>
        <View style={auditions.top}>
          <View style={auditions.left}>
            <Text style={auditions.highlightedFont}>{audition.title}</Text>
            <Text style={auditions.normalFont}>{audition.role}</Text>
          </View>
          <View style={auditions.right}>
            <Text style={auditions.highlightedFont}>{audition.time}</Text>
            <Text style={auditions.normalFont}>{audition.date}</Text>
          </View>
        </View>
        <View style={auditions.middle}>
          <TouchableOpacity onPress={() => this.onMessages(audition.id)}>
            <View style={auditions.messageIconContainer}>
              <Icon name="email" style={auditions.messageIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onMaterials()}>
            <View style={auditions.messageIconContainer}>
              <Icon name="document-text" style={auditions.messageIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={auditions.bottom}>
          <TouchableOpacity onPress={() => this.onAction(audition.id, 'CONF')}>
            <Text style={audition.status == 'CONF' || audition.status == 'SENT' || audition.status == 'SENT+' ? auditions.highlightedFont : auditions.inActiveStatus}>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onAction(audition.id, 'REGR')}>
            <Text style={audition.status == 'REGR' || audition.status == 'SENT' || audition.status == 'SENT+' ? auditions.highlightedFont : auditions.inActiveStatus}>NO</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _renderSeperator(sectionID, rowID) {
    return (
      <View key={`${sectionID}-${rowID}`} style={auditions.separator} />
    )
  }

  _onRefresh() {
		console.log("Refresh Triggered");
		this.setState({refreshing: true});
		this.populateAuditionList();
	}

  async populateAuditionList() {
    let endpoint = 'auditions';
    let auditionListData;
    this.setState({isLoading: true});
    try {
      auditionListData = await getAuditions(endpoint, this.props.user.authToken);
    } catch(error) {
      console.error(error);
    }

    let auditions = _.map(auditionListData, (audition) => {
      let object = {
				id: audition.id,
				actor: audition.actor,
				phone: audition.phone,
        title: audition.title,
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
      isLoading: false,
      refreshing: false,
    });
  }

  onMessages(id) {
    Actions.notes({audition: {id}});
  }

  onMaterials() {
    Actions.materials();
  }

  onAction(id, status) {
    this.updateStatus(id, status);

    if (status == 'REGR')
      Actions.notes({audition: {id}})
  }

  async updateStatus(id, status) {
    let data = {
			'audition[status]': status
		};

    let endpoint = `auditions/${id}`;
		let auditionListData;
    this.setState({isLoading: true});
		try {
			auditionListData = await putAudition(endpoint, this.props.user.authToken, data);
		} catch(error) {
			console.log(error);
		}

		let auditions = _.map(auditionListData, (audition) => {
			let object = {
				id: audition.id,
				actor: audition.actor,
				phone: audition.phone,
        title: audition.title,
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
      isLoading: false
		});
  }
}

import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

module.exports = connect(mapStateToProps)(Auditions);
