import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const data = localStorage.getItem("data");

    if (token) {
      setAuthenticated(true);
      api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`;
      setUserInfo(JSON.parse(data));
    }

    setLoading(false);
  }, []);

  async function handleLogin(emailLog, passwordLog) {
    const {
      data: { auth, token, userData, message },
    } = await api.post("/login", {
      email: emailLog,
      password: passwordLog,
    });

    if (!auth) {
      return setErrorMessage(message);
    }

    localStorage.setItem("token", JSON.stringify(token));
    api.defaults.headers.authorization = `Bearer ${token}`;
    setUserInfo(userData);
    localStorage.setItem("data", JSON.stringify(userData));
    setAuthenticated(true);
    history.push("/profile");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    api.defaults.headers.authorization = undefined;
    setAuthenticated(false);
    history.push("/login");
  }

  return {
    handleLogin,
    handleLogout,
    loading,
    authenticated,
    userInfo,
    setUserInfo,
    errorMessage,
    setErrorMessage,
  };
}
