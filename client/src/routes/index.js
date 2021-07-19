import React from "react";
import { Switch } from "react-router";

import CustomRoute from "./CustomRoute";

import Home from "../pages/Home/index";
import Register from "../pages/Register/index";
import Login from "../pages/Login/index";
import Character from "../pages/Character/index";
import Comics from "../pages/Comic/index";
import Favorites from "../pages/Favorites/index";
import Profile from "../pages/Profile/index";

function Routes() {
  return (
    <Switch>
      <CustomRoute path="/" exact component={Home} />
      <CustomRoute isAuthenticated path="/register" component={Register} />
      <CustomRoute isAuthenticated path="/login" component={Login} />
      <CustomRoute isPrivate path="/character/:id" component={Character} />
      <CustomRoute isPrivate path="/comic/:id" component={Comics} />
      <CustomRoute isPrivate path="/favorites" component={Favorites} />
      <CustomRoute isPrivate path="/profile" component={Profile} />
    </Switch>
  );
}

export default Routes;
