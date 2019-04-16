import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableRoutes from "./SwipeableRoutes";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import {YellowView,GreenView,RedView,BlueView} from "./SwipeableRoutesExample";
import {RouteComponentProps} from "react-router";

function TabContainer(props:any) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = (theme:any) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

type Props = {
    classes?:any,
};

class SimpleTabs extends React.Component<RouteComponentProps<{}>&Props,{value:number}> {
  state = {
    value: 0,
  };

  handleChange = (event:any, value:number) => {
    this.setState({ value });
    console.log("handleChange: %d",value);
    this.props.history.replace(SimpleTabs.PATHS[value]);
  };

  render() {
    const classes:any = this.props.classes;
    const { value } = this.state;

    return (
      <div className={classes.root}>
      {/* <Router> */}
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Item One"/>
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
          </Tabs>
        </AppBar>
          <SwipeableRoutes 
            onChangeIndex={this.handleChangeIndex}
          >
            <Route path={SimpleTabs.PATHS[0]} component={RedView} />
            <Route path={SimpleTabs.PATHS[1]} component={BlueView} />
            <Route path={SimpleTabs.PATHS[2]} component={GreenView} />
            <Route path={SimpleTabs.PATHS[3]} component={YellowView} />
          </SwipeableRoutes>
        {/* </Router> */}
      </div>
    );
  }
  static PATHS:string[] = ["/red","/blue","/green","/yellow",];
  handleChangeIndex = (index:number) => {
    this.setState({
      value:index,
    });
  }
}

export default withRouter(withStyles(styles)(SimpleTabs));