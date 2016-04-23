/* @flow */
'use strict';

import React, {Component, ScrollView, View, Text, TextInput, Image} from 'react-native';
import Navbar from './Widgets/Navbar';
import styles from '../Styles/style';
import materials from '../Styles/materials';

export default class Materials extends Component {
  render() {
    return(
      <View style={materials.color}>
        <Navbar
          title="History"
          style={history.toolbar}
          back={true} />
        <Image source={require('../img/glow2.png')} style={materials.container}>
          <ScrollView style={{backgroundColor: 'transparent'}}>
            <View style={styles.verticalCenter}>
              <View style={materials.listContainer}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderHeader={this._renderHeader}
                  renderRow={this._renderRow} />
              </View>
            </View>
          </ScrollView>
        </Image>
      </View>
    )
  }

  _renderHeader() {
    return(
      <View style={materials.headerContainer}>
        <Text style={materials.header}>Brad Pitt's Materials</Text>
      </View>
    )
  }

  _renderRow(material) {
    return(
      <View style={materials.listItem}>
        <View style={materials.listItemLeft}>
          <Text style={materials.font}>{material.text}</Text>
        </View>
        <View style={materials.listItemRight}>
          <Text style={materials.font}>{material.date}</Text>
          <Text style={materials.font}>{material.time}</Text>
        </View>
      </View>
    )
  }
}
