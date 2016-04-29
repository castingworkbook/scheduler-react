/* @flow */
'use strict';

import React, {Component, ScrollView, View, Image, ListView, Text, TouchableOpacity} from 'react-native';
import styles from '../Styles/style';
import history from '../Styles/history';
import Navbar from './Widgets/Navbar';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

export default class History extends Component {
  constructor(props) {
    super(props);

    const dummyActions = [
      {
        text: "Confirm",
        date: "MO Apr 25",
        time: "1:37pm",
      },
      {
        text: "Brad Pitt responds Confirm",
        date: "MO Apr 25",
        time: "11:37pm",
      },
      {
        text: "Forward",
        date: "MO Apr 25",
        time: "10:51pm",
      },
      {
        text: "Casting resubmits time",
        date: "MO Apr 25",
        time: "10:37am",
      },
      {
        text: "Message: Can we set the time between to 02/21/16 between 1:30 to 4:30?",
        date: "MO Apr 25",
        time: "2:37pm",
      },
      {
        text: "Request Alternative Time with Message",
        date: "MO Apr 25",
        time: "2:37pm",
      },
      {
        text: "Note: Brad said 02/21/16 @ 1:30 to 4:30 works",
        date: "MO Apr 25",
        time: "2:15pm"
      },
      {
        text: "Call Brad Pitt",
        date: "MO Apr 25",
        time: "2:01pm",
      },
      {
        text: "Brad Pitt responds Regret",
        date: "MO Apr 25",
        time: "1:37pm",
      },
      {
        text: "Forward to Brad Pitt",
        date: "MO Apr 25",
        time: "10:37am",
      },
    ]

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(dummyActions)
    }
  }

  render() {
    return(
      <View style={history.color}>
        <Navbar
          title="History"
          style={history.toolbar}
          back={true} />
        <Image source={require('../img/glow2.png')} style={history.container}>
          <ScrollView style={{backgroundColor: 'transparent'}}>
            <View style={styles.verticalCenter}>
  						<View style={history.listContainer}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderHeader={this._renderHeader.bind(this)}
                  renderRow={this._renderRow.bind(this)} />
              </View>
            </View>
          </ScrollView>
        </Image>
      </View>
    );
  }

  _renderHeader() {
    return(
      <View style={history.headerContainer}>
        <View style={history.nameContainer}>
          <Text style={history.header}>Brad Pitt</Text>
        </View>
        <View>
          <View style={history.subheaderContainer}>
            <View style={history.materialsContainer}>
              <Text style={history.font}>Materials</Text>
              <TouchableOpacity onPress={() => this.onMaterials()}>
    						<View style={history.materialsIconContainer}>
    							<Icon name="document-text" style={history.materialsIcon} />
    						</View>
    					</TouchableOpacity>
            </View>
            <View style={history.headerDate}>
              <Text style={history.font}>Monday Apr 25</Text>
              <Text style={history.font}>3:30pm</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  _renderRow(action) {
    return(
      <View style={history.actionItem}>
        <View style={history.actionItemLeft}>
          <Text style={history.font}>{action.text}</Text>
        </View>
        <View style={history.actionItemRight}>
          <Text style={history.font}>{action.date}</Text>
          <Text style={history.font}>{action.time}</Text>
        </View>
      </View>
    )
  }

  onMaterials() {
    Actions.materials();
  }
}
