import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import { UserContextType } from "../../types/userType";
import constants from "../../constants/constants";

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await api.post("/login", {
        email: email,
        password: password,
      });

      setCookies(constants.token, res.data.token); // your token
      setCookies("user", res.data.user); // optional data

      navigate(constants.homeRoute);
    } catch (error: any) {
      throw error?.response.data.errors;
    }
  };

  const signup = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await api.post("/sign-up", {
        email: email,
        password: password,
      });

      setCookies(constants.token, res.data.token); // your token
      setCookies("user", res.data.user); // optional data

      navigate(constants.homeRoute);
    } catch (error: any) {
      throw error?.response.data.errors;
    }
  };

  const logout = () => {
    [constants.token, "name"].forEach((obj) => removeCookie(obj)); // remove data saved in cookies
    navigate(constants.loginRoute);
  };

  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
      signup,
    }),
    [cookies]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
