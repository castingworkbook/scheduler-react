/* @flow */
'use strict';

import React, {Component, ScrollView, View, Text, Image} from 'react-native';

export default class Note extends Component {
  render() {
    return(
      <View style={note.color}>
        <Navbar
          title="Note"
          style={note.toolbar}
          back={true} />
        <Image source={require('../img/glow2.png')} style={note.container}>
          <ScrollView>
            <View style={note.header}>
              <Text>Batman Notes</Text>
              <Text>02/23/16, 12:30pm</Text>
            </View>
            <View style={note.content}>
              <Text>Blah Blah</Text>
            </View>
          </ScrollView>
        </Image>
      </View>
    )
  }
}
