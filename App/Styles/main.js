const React = require('react-native');
const { StyleSheet } = React;

const Styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
  },

  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },

  screenContainer: {
    flex: 1,
  },

  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
  },

  actionSheetButton: {
    backgroundColor: '#F6F6F6',
    padding: 10,
  },

  header: {
    fontSize: 25,
  },

  button: {
    backgroundColor: '#55FCFF',
    margin: 16,
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 18,
  },

  phone: {
    paddingLeft: 20,
  },

  logo: {
    width: 100,
    height: 100,
  },

  separator: {
    height: 1,
    backgroundColor: 'white',
  },

  usernameInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    margin: 10,
    padding: 5,
  },

  passwordInput: {
    borderWidth: 2,
    borderColor: 'gray',
    height: 40,
    margin: 10,
    padding: 5,
  },

  settingItem: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    padding: 10,
    backgroundColor: '#F6F6F6',
  },

  settingItemText: {
    fontSize: 30,
    alignSelf: 'center',
  },

  projectListItem: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    padding: 10,
    backgroundColor: 'transparent',
  },

  projectListItemLeft: {
    flex: 0.5,
    flexDirection: 'column',
  },

  projectListItemRight: {
    flex: 0.5,
    height: 33,
    alignSelf: 'center'
  },

  projectListItemRoles: {
    flex: 1,
    flexDirection: 'row',
  },

  highlightedFont: {
    fontSize: 20,
    color: 'white'
  },

  normalFont: {
    fontSize: 15,
    color: 'white'
  },

  activeActions: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 15,
    width: 25,
    height: 25,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    bottom: 5,
  },

  inactiveActions: {
    opacity: 0
  },

  actionsText: {
    alignSelf: 'center',
    color: '#fff'
  },

  submissionItem: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    padding: 10,
    backgroundColor: '#F6F6F6',
    justifyContent: 'space-between',
  },

  submissionItemSelected: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    padding: 10,
    borderColor: 'gray',
    borderTopWidth: 0,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    backgroundColor: '#00FFFF',
  },

  submissionItemLeft: {
    flex: 0.5,
    flexDirection: 'column',
  },

  submissionItemRight: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: 33,
  },

  submissionItemSelect: {
    flex: 1,
  },

  yesResponse: {
    backgroundColor: '#00CC33',
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    width: 60,
    alignItems: 'center',
  },

  noResponse: {
    backgroundColor: '#FF0000',
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    width: 60,
    alignItems: 'center',
  },

  auditionItem: {
    flex: 1,
    flexDirection: 'column',
    height: 180,
    padding: 10,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },

  auditionItemTop: {
    flex: 1,
    flexDirection: 'row',
  },

  auditionItemLeft: {
    flex: 0.7,
    flexDirection: 'column',
  },

  auditionItemRight: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },

  auditionItemBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

module.exports = Styles;
