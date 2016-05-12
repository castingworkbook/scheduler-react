/* @flow */
'use strict';

import React, {Component, Text, View, Image, ScrollView, Alert, ListView, TouchableOpacity} from 'react-native';
import styles from '../Styles/style';
import Navbar from './Widgets/Navbar';
import auditions from '../Styles/auditions';
import Spinner from 'react-native-spinkit';

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
      //   title: "Batman Returns",
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
		this.getAuditions();
	}

  render() {
		return(
      <View style={styles.color}>
        <Navbar
					title="Auditions"
					style={styles.toolbar}
					back={true} />
        <Image source={require('../img/glow2.png')} style={styles.container}>
          <ScrollView style={{backgroundColor: 'transparent'}}>
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
        <View style={auditions.bottom}>
          <TouchableOpacity>
            <Text style={auditions.highlightedFont}>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={auditions.highlightedFont}>Alternative</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={auditions.highlightedFont}>NO</Text>
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

  async getAuditions() {
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
      let response = await fetch('http://cwbscheduler.herokuapp.com/projects/1/auditions/', request);
      responseJson = await response.json();
      console.log(responseJson);

      if(responseJson.errors)
        Alert.alert(responseJson.errors);

    } catch(error) {
      console.error(error);
    }
    this.setState({isLoading: false});

    let auditions = _.map(responseJson, (audition, index) => {
      let object = {
        index: index,
				id: audition.id,
				actor: audition.actor,
				phone: audition.phone,
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
