/* @flow */
'use strict';

import React, {Component, Text, View, Image, ScrollView, Alert, ListView, BackAndroid, TouchableOpacity} from 'react-native';
import styles from '../Styles/style';
import auditions from '../Styles/auditions';

export default class Auditions extends Component {
  constructor(props) {
    super(props);

    const dummyAuditions = [
      {
      	id: 1,
        title: "Batman",
      	actor: "Brad Pitt",
      	phone: "7777777",
      	role: "Batman",
      	date: "Monday Apr 25",
      	time: "3:30pm",
      	status: "",
      	casting: ""
      },
      {
      	id: 2,
        title: "Batman",
      	actor: "Christian Bale",
      	phone: "7777777",
      	role: "Batman",
      	date: "Monday Apr 25",
      	time: "3:50pm",
      	status: "",
      	casting: ""
      },
      {
      	id: 3,
        title: "Batman",
      	actor: "Ben Affleck",
      	phone: "7777777",
      	role: "Batman",
      	date: "Monday Apr 25",
      	time: "4:10pm",
      	status: "",
      	casting: ""
      }
    ];

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(dummyAuditions),
      projects: dummyAuditions,
      selected: [],
      show: false,
      isLoading: false,
    }
  }

  componentDidMount() {
		if (this.props.message)
			Alert.alert(this.props.message);

		this.getAuditions();
	}

  render() {
		return(
      <View style={styles.color}>
        <Navbar
					title="Schedule"
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
        </Image>
      </View>
    )
  }

  _renderRow(audition) {
    return(
      <View style={auditions.container}>
        <View style={auditions.top}>
          <View style={auditions.left}>
            <Text>{auditions.title}</Text>
            <Text>{auditions.role}</Text>
          </View>
          <View style={auditions.right}>
            <Text>{auditions.date}</Text>
            <Text>{auditions.time}</Text>
          </View>
        </View>
        <View style={auditions.bottom}>
          <TouchableOpacity>
            <Text>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Alternative</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>NO</Text>
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
}
