import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function CustomRoute({ isAuthenticated, isPrivate, ...rest }) {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <p style={{ margin: "15px" }}>Carregando...</p>;
  }

  if (isAuthenticated && authenticated) {
    return <Redirect to="/profile" />;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
}

export default CustomRoute;
