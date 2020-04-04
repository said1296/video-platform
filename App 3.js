import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import Navigation from './pages/components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';

function theme(state = {
  fontPrimary: 'Quantico',

  primary: '#ff8c00',
  secondary: '#A1BDFF',
  pink: "#F78AFA",
  teal: "#00FFCC",

  offWhite: '#F2F2F2',
  lightGray: '#252525',
  midGray: '#C4C4C4',
  darkGray: "#131313"
  }, action) {

  switch(action.type) {
    default:
      return state;
  }
}


function general(state = {
  baseURL: "http://localhost:3000",
  collapse: false
  }, action) {
  switch(action.type) {
    case 'TOGGLE_COLLAPSE':
      state = {... state, collapse: !state.collapse};
      default:
        return state;
  }
}

const rootReducer = combineReducers({
  theme,
  general
})

const store = createStore(rootReducer)

const pages = {
  Home: "/",
  Register: "/register",
  About: "/about"
}

function App(props) {
  const Handler = pages[props.pathname];
  return <Handler />;
}

ReactDOM.render(<App pathname={location.pathname} />, document.getElementById("root"));