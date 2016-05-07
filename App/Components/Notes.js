/* @flow */
'use strict';

import React, {Component, ScrollView, View, ListView, Text, TextInput, Image, TouchableOpacity, Switch} from 'react-native';
import Navbar from './Widgets/Navbar';
import styles from '../Styles/style';
import notes from '../Styles/notes';
import Icon from 'react-native-vector-icons/Ionicons';
import IconInput from './Widgets/IconInput';

export default class Notes extends Component {
  constructor(props) {
    super(props);

    const dummyNotes = [
      {
        text: 'Brad Pitt only eats turnips',
        date: "02/11/16",
        time: "9:37am",
      },
      {
        text: 'Brad Pitt only showers once a month',
        date: "02/11/16",
        time: "10:37am",
      },
      {
        text: 'Brad Pitt only wakes up at 9:39am',
        date: "02/11/16",
        time: "11s:37am",
      }
    ]

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(dummyNotes),
      note: ""
    }
  }

  render() {
    return(
      <View style={styles.color}>
        <Navbar
          title="Notes"
          style={styles.toolbar}
          back={true} />
        <Image source={require('../img/glow2.png')} style={styles.container}>
          <ScrollView style={{backgroundColor: 'transparent'}}>
            <View style={styles.verticalCenter}>
              <View style={notes.listContainer}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderHeader={this._renderHeader}
                  renderRow={this._renderRow} />
              </View>
            </View>
          </ScrollView>
          <View style={notes.formContainer}>
            <View style={notes.inputContainer}>
              <IconInput
                placeholder="Enter a Note..."
                icon="compose"
                secureTextEntry={false}
                dark={false}
                value={this.state.action}
                onChangeText={(val) => this.setState({action: val})} />
            </View>
            <TouchableOpacity>
              <View style={notes.addButton}>
                <Text style={notes.addButtonText}>Add</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    )
  }

  _renderHeader() {
    return(
      <View style={notes.header}>
        <Text style={notes.headerText}>Brad Pitt's Notes</Text>
      </View>
    )
  }

  _renderRow(note) {
    return(
      <View style={notes.noteItem}>
        <View style={notes.noteItemLeft}>
          <Text style={notes.font}>{note.text}</Text>
        </View>
        <View style={notes.noteItemRight}>
          <Text style={notes.font}>{note.date}</Text>
          <Text style={notes.font}>{note.time}</Text>
        </View>
      </View>
    )
  }

}
