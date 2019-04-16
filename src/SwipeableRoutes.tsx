import React, { Component } from "react";
import SwipeableViews from "react-swipeable-views";
import { matchPath, withRouter } from "react-router";
import {RouteComponentProps} from "react-router";
import generatePath from "./generatePath";


type PathParamsType = {
  // param1: string,
}

// Your component own properties
type Props = RouteComponentProps<PathParamsType> & {
  // someString: string,
  path?:any,
  onChangeIndex?:Function,
  children:any[],
  history?:any,
  replace?:any,
  index?:number,
  innerRef?:any,
  location?:any,
  staticContext?:any,
  match?:any,
}
type State = {
  urls:any,
};
class SwipeableRoutes extends Component<Props,State> {
  state:State = {
    urls: {},
  };

  // Trigger the location change to the route path
  handleIndexChange = (index:number, type:any) => {
    // const path:any = this.props.path;
    const {
      props: { path, defaultParams }
    } = React.Children.toArray(this.props.children)[index];

    let url:string;
    if (path.includes(":")) {
      if (path in this.state.urls) {
        url = this.state.urls[path];
      } else {
        // Build url with defaults
        url = generatePath(path, defaultParams);
        this.setState((state:State) => ({ urls: { ...state.urls, [path]: url } }));
      }
    } else {
      url = path;
    }
    this.historyGoTo(url);

    // Call the onChangeIndex if it's set
    if (typeof this.props.onChangeIndex === "function") {
      this.props.onChangeIndex(index, type);
    }
  };

  triggerOnChangeIndex = (location:any) => {
    const { children } = this.props;
    React.Children.forEach(children, (element, index) => {
      const { path: pathProp, exact, strict, from } = element.props;
      const path = pathProp || from;
      if (matchPath(location.pathname, { path, exact, strict })) {
        if (typeof this.props.onChangeIndex === "function") {
          this.props.onChangeIndex(index);
        }
        this.setState(state => ({
          urls: { ...state.urls, [path]: location.pathname }
        }));
      }
    });
  };

  historyGoTo = (path:any) => {
    const { replace, history } = this.props;
    return replace ? history.replace(path) : history.push(path);
  };

  componentDidMount() {
    const { history } = this.props;
    this.triggerOnChangeIndex(history.location);
    this.unlistenHistory = history.listen((location:any) => {
      // When the location changes, call onChangeIndex with the route index
      this.triggerOnChangeIndex(location);
    });
  }

  unlistenHistory:Function = ()=>{};
  componentWillUnmount() {
    this.unlistenHistory();
  }

  componentDidUpdate(prevProps:Props) {
    // If index prop changed, change the location to the path of that route
    if (prevProps.index !== this.props.index) {
      const paths = React.Children.map(
        this.props.children,
        element => element.props.path
      );
      const index:any = this.props.index;
      this.historyGoTo(paths[index]);
    }
  }

  render() {
    const {
      children,
      index,
      replace,
      history,
      innerRef,
      location,
      staticContext,
      match: routeMatch,
      ...rest
    } = this.props;

    // If there's no match, render the first route with no params
    let matchedIndex:number = 0;
    let match: any;
    if (index) {
      matchedIndex = index;
    } else {
      React.Children.forEach(children, (element, index) => {
        const { path: pathProp, exact, strict, from } = element.props;
        const path = pathProp || from;

        match = matchPath(location.pathname, { path, exact, strict });
        if (match) {
          matchedIndex = index;
        }
      });
    }

    const renderableRoutes = React.Children.toArray(children).filter(
      (element, index) =>
        !element.props.path.includes(":") ||
        Boolean(element.props.defaultParams) ||
        element.props.path in this.state.urls
    );

    return (
      <SwipeableViews
        {...rest}
        index={matchedIndex}
        onChangeIndex={this.handleIndexChange}
        ref={innerRef}
      >
        {renderableRoutes.map((element, index) => {
          const { path, component, render, children } = element.props;
          const props:any = { location, history, staticContext };

          let match:any = matchPath(location.pathname, element.props);
          if (match) {
            match.type = "full";
          } else if (path in this.state.urls) {
            match = matchPath(this.state.urls[path], element.props);
            match.type = "outOfView";
          } else {
            match = matchPath(
              generatePath(path, element.props.defaultParams),
              element.props
            );
            match.type = "none";
          }
          props.match = match;
          props.key = path;

          // A lot of this code is borrowed from the render method of
          // Route. Why can't I just render the Route then?
          // Because Route only renders the component|render|children
          // if there's a match with the location, while here I render
          // regardless of the location.
          return component
            ? React.createElement(component, props)
            : render
            ? render(props)
            : children
            ? typeof children === "function"
              ? children(props)
              : !Array.isArray(children) || children.length // Preact defaults to empty children array
              ? React.Children.only(children)
              : null
            : null;
        })}
      </SwipeableViews>
    );
  }
}

export default withRouter(SwipeableRoutes);
