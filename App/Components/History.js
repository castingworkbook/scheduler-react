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
        text: "Forward to Actor",
        date: "02/11/16",
        time: "10:37am",
      },
      {
        text: "Actor responds Confirm",
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
        text: "Forward to Actor",
        date: "02/11/16",
        time: "10:37am",
      },
      {
        text: "Actor responds Regret",
        date: "02/11/16",
        time: "1:37pm",
      },
      {
        text: "Called Actor",
        date: "02/11/16",
        time: "2:01pm",
      },
      {
        text: "Added: Actor said 02/21/16 @ 1:30 to 4:30 works",
        date: "02/11/16",
        time: "2:15pm"
      },
      {
        text: "Called Casting",
        date: "02/11/16",
        time: "2:37pm",
      },
      {
        text: "Added: Casting will resubmit for 2:30",
        date: "02/11/16",
        time: "3:10pm",
      },
      {
        text: "Casting resubmits time",
        date: "02/12/16",
        time: "10:37am",
      },
      {
        text: "Forward to Actor",
        date: "02/12/16",
        time: "10:51pm",
      },
      {
        text: "Actor responds Confirm",
        date: "02/12/16",
        time: "11:37pm",
      },
      {
        text: "Forward Confirm to Casting",
        date: "02/12/16",
        time: "1:37pm",
      },
      {
        text: "Set as Closed",
        date: "02/12/16",
        time: "1:40pm",
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
                  renderHeader= {this._renderHeader}
                  renderRow={this._renderRow} />
              </View>
            </View>
          </ScrollView>
          <View style={history.formContainer}>
            <View style={history.inputContainer}>
              <IconInput
                placeholder="Add an action..."
                icon="compose"
                secureTextEntry={false}
                dark={false}
                value={this.state.action}
                onChangeText={(val) => this.setState({action: val})} />
            </View>
            <TouchableOpacity>
              <Text style={history.addFont}>Add</Text>
            </TouchableOpacity>
          </View>
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
