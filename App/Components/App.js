'use strict';

import React, { Component } from 'react-native';
import RootRouter from './RootRouter';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import user from '../Redux/Reducers/user';
import project from '../Redux/Reducers/project';
import audition from '../Redux/Reducers/audition';

const store = createStore(combineReducers({user, project, audition}));

export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <RootRouter />
      </Provider>
    )
  }
}
