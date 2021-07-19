import { createContext } from "react";

import useAuth from "../hooks/useAuth";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const {
    handleLogin,
    handleLogout,
    loading,
    authenticated,
    userInfo,
    setUserInfo,
    errorMessage,
    setErrorMessage,
  } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        loading,
        authenticated,
        userInfo,
        setUserInfo,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
