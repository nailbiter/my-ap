import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TabsPanel from "./TabsPanel";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SwipeableRoutes from "./SwipeableRoutes";

// class App extends Component {
//   render() {
//     return (<div>
//       {/* <TabsPanel/> */}
//       <SwipeableRoutes/>
//       </div>);
//     // return (
//     //   <div className="App">
//     //     <header className="App-header">
//     //       <img src={logo} className="App-logo" alt="logo" />
//     //       <p>
//     //         Edit <code>src/App.js</code> and save to reload.
//     //       </p>
//     //       <a
//     //         className="App-link"
//     //         href="https://reactjs.org"
//     //         target="_blank"
//     //         rel="noopener noreferrer"
//     //       >
//     //         Learn React
//     //       </a>
//     //     </header>
//     //   </div>
//     // );
//   }
// }

// export default App;

const RedView = () => (
  <div style={{ height: 300, backgroundColor: "red" }}>Red</div>
);
const BlueView = () => (
  <div style={{ height: 300, backgroundColor: "blue" }}>Blue</div>
);
const GreenView = () => (
  <div style={{ height: 300, backgroundColor: "green" }}>Green</div>
);
const YellowView = () => (
  <div style={{ height: 300, backgroundColor: "yellow" }}>Yellow</div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <Link to="/red">Red</Link> |<Link to="/blue">Blue</Link> |
            <Link to="/green">Green</Link> |<Link to="/yellow">Yellow</Link>
          </div>

          <SwipeableRoutes>
            <Route path="/red" component={RedView} />
            <Route path="/blue" component={BlueView} />
            <Route path="/green" component={GreenView} />
            <Route path="/yellow" component={YellowView} />
          </SwipeableRoutes>
        </div>
      </Router>
    );
  }
}

export default App;