/* @flow */
'use strict';

import React, {Component, ScrollView, View, ListView, Text, TextInput, Image, TouchableOpacity, Switch} from 'react-native';
import Navbar from './Widgets/Navbar';
import styles from '../Styles/style';
import materials from '../Styles/materials';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Materials extends Component {
  constructor(props) {
    super(props)

    const dummyMaterials = [
      {
        name: "Overview",
        date: "02/11/16",
        time: "10:10am",
        alert: false,
      },
      {
        name: "Script",
        date: "02/11/16",
        time: "10:37am",
        alert: false,
      },
      {
        name: "Images",
        date: "02/11/16",
        time: "11:48am",
        alert: true,
      }
    ]

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(dummyMaterials),
      materials: false,
    }
  }

  render() {
    return(
      <View style={styles.color}>
        <Navbar
          title="Materials"
          style={styles.toolbar}
          back={true} />
        <Image source={require('../img/glow2.png')} style={styles.container}>
          <ScrollView style={{backgroundColor: 'transparent'}}>
            <View style={styles.verticalCenter}>
              <View style={materials.listContainer}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderHeader={this._renderHeader.bind(this)}
                  renderRow={this._renderRow} />
              </View>
            </View>
          </ScrollView>
          <View style={materials.footer}>
            <Text style={materials.switchFont}>Automatically forward the materials?</Text>
            <Switch
              onValueChange={(value) => this.setState({materials: value})}
              value={this.state.materials} />
          </View>
        </Image>
      </View>
    )
  }

  _renderHeader() {
    return(
      <View style={materials.header}>
        <Text style={materials.headerText}>{`${this.props.audition.actor}'s Materials`}</Text>
      </View>
    )
  }

  _renderRow(material) {
    return(
      <View style={materials.materialItem}>
        <View style={materials.materialItemLeft}>
          <TouchableOpacity>
            <View>
              <View style={materials.materialItemIconContainer}>
                <Icon name="document-text" style={materials.materialItemIcon} />
              </View>
              <Icon name="android-alert" style={material.alert ? materials.notificationIcon : {opacity: 0}} />
            </View>
          </TouchableOpacity>
          <View style={materials.nameContainer}>
            <Text style={materials.font}>{material.name}</Text>
          </View>
        </View>
        <View style={materials.materialItemRight}>
          <Text style={materials.font}>{material.date}</Text>
          <Text style={materials.font}>{material.time}</Text>
        </View>
      </View>
    )
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    audition: state.audition
  }
}

module.exports = connect(mapStateToProps)(Materials);
