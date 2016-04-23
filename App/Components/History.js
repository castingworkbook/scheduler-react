/* @flow */
'use strict';

import React, {Component, ScrollView, View, Image, ListView, Text, TouchableOpacity} from 'react-native';
import styles from '../Styles/style';
import history from '../Styles/history';
import Navbar from './Widgets/Navbar';
import IconInput from './Widgets/IconInput';

export default class History extends Component {
  constructor(props) {
    super(props);

    const dummyActions = [
      {
        text: "Forward to Brad Pitt",
        date: "02/11/16",
        time: "10:37am",
      },
      {
        text: "Brad Pitt responds Confirm",
        date: "02/11/16",
        time: "1:37pm",
      },
      {
        text: "Forward to Casting",
        date: "02/11/16",
        time: "2:01pm",
      },
      {
        text: "Set as Closed",
        date: "02/11/16",
        time: "3:01pm",
      },
    ]

    const dummyActions1 = [
      {
        text: "Forward to Actor",
        date: "02/11/16",
        time: "10:37am",
      },
      {
        text: "Called Actor",
        date: "02/11/16",
        time: "1:37pm",
      },
      {
        text: "Added: Actor accepted another role",
        date: "02/11/16",
        time: "1:55pm",
      },
      {
        text: "Set as Regret",
        date: "02/11/16",
        time: "2:01pm",
      },
      {
        text: "Forward to Casting",
        date: "02/11/16",
        time: "2:15pm"
      },
      {
        text: "Set as Closed",
        date: "02/11/16",
        time: "2:37pm",
      },
    ]

    const dummyActions2 = [
      {
        text: "Forward",
        date: "02/11/16",
        time: "10:37am",
      },
      {
        text: "Brad Pitt responds Regret",
        date: "02/11/16",
        time: "1:37pm",
      },
      {
        text: "Call Brad Pitt",
        date: "02/11/16",
        time: "2:01pm",
      },
      {
        text: "Note: Brad said 02/21/16 @ 1:30 to 4:30 works",
        date: "02/11/16",
        time: "2:15pm"
      },
      {
        text: "Request Alternative Time with Message",
        date: "02/11/16",
        time: "2:37pm",
      },
      {
        text: "Message: Can we set the time between to 02/21/16 between 1:30 to 4:30?",
        date: "02/11/16",
        time: "2:37pm",
      },
      {
        text: "Casting resubmits time",
        date: "02/12/16",
        time: "10:37am",
      },
      {
        text: "Forward",
        date: "02/12/16",
        time: "10:51pm",
      },
      {
        text: "Brad Pitt responds Confirm",
        date: "02/12/16",
        time: "11:37pm",
      },
      {
        text: "Confirm",
        date: "02/12/16",
        time: "1:37pm",
      }
    ]

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(dummyActions2),
      action: ""
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
                  renderHeader={this._renderHeader}
                  renderRow={this._renderRow} />
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
        <Text style={history.header}>Brad Pitt</Text>
        <Text style={history.headerDate}>02/20/16 - 3:30pm</Text>
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
}
