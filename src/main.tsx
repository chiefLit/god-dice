import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RouteConfig } from 'react-router-config';
import { routes } from "./routes";
import './global.less'

const renderRoutes = (routes: RouteConfig[]) => {
  return (
    <Switch>
      {routes.map((route: RouteConfig, index: number) => {
        return (
          <Route
            key={route.key || index}
            path={route.path}
            component={route.component}
            exact={route.exact}
            render={_ => renderRoutes(route.routes || [])}
          />
        );
      })}
    </Switch>
  )
}

ReactDOM.render(
  // <Router>
  //   {withRouter(() => renderRoutes(routes))}
  // </Router>,
  <Router>
    {renderRoutes(routes)}
  </Router>,
  document.getElementById("root")
);
