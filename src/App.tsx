import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TabsPanel from "./TabsPanel";
import "./App.css";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import SwipeableRoutes from "./SwipeableRoutes";

class App extends Component {
  render() {
    return (<Router><TabsPanel/></Router>);
  }
}

export default App;