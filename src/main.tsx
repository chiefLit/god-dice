import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "./routes";
import './global.less'

ReactDOM.render(
  <Router>
    <Switch>
      {routes.map((route) => {
        return (
          <Route
            path={route.path}
            component={route.component}
            exact
            key={route.path}
          />
        );
      })}
    </Switch>
  </Router>,
  document.getElementById("root")
);
