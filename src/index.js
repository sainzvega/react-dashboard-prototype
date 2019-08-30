import ReactDOM from "react-dom";
import React from "react";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import * as Space from "react-spaces";

import { Home } from "./components/Home";
import { Reports } from "./components/Report";
import { ClassBasedTest } from "./components/ClassBasedTest";

import "./styles.css";

const mainRoutes = [
  { name: "Home", path: "/" },
  { name: "Reports", path: "/reports" },
  { name: "Test", path: "/test" }
];

const mainNavStyles = {
  backgroundColor: "#e0eeee",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end"
};

const App = () => {
  return (
    <BrowserRouter>
      <Space.ViewPort>
        <Space.Top size={"10%"} trackSize={true} style={mainNavStyles} as="nav">
          {mainRoutes.map(route => (
            <Link key={route.name} to={route.path}>
              {route.name}
            </Link>
          ))}
        </Space.Top>
        <Space.Fill as="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/reports" component={Reports} />
            <Route path="/test" component={ClassBasedTest} />
          </Switch>
        </Space.Fill>
      </Space.ViewPort>
    </BrowserRouter>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
