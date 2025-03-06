import { createContext, useEffect, useState } from "react";
import {
  signInRequest,
  signUpRequest,
  verifyTokenRequest,
} from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState({ error: "", success: "" });
  const navigate = useNavigate();

  async function signUpSeller(data) {
    try {
      const res = await signUpRequest(data);
      if (res.data.message) {
        setAlerts({ ...alerts, success: res.data.message });
        navigate('/signIn')
      }
    } catch (error) {
      setAlerts({ ...alerts, error: error.response.data.error });
    }
  }
  async function signUpBuyer(data) {
    try {
      const res = await signUpRequest(data);
      if (res.data.message) {
        setAlerts({ ...alerts, success: res.data.message });
      }
    } catch (error) {
      setAlerts({ ...alerts, error: error.response.data.error });
    }
  }
  async function signIn(data) {
    try {
      const res = await signInRequest(data);
      if (res.data.user.role === 'comprador') {
        navigate("/");
      }else if(res.data.user.role === 'vendedor') {
        navigate('/dashboardSeller')
      }
    } catch (error) {
      setAlerts({ ...alerts, error: error.response.data.error });
    }
  }
  function logout() {
    Cookies.remove("token");
    setIsAuth(false);
    setUserData(null);
    setIsLoading(false);
  }

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuth(false);
        setUserData(null);
        setIsLoading(false);
      } else {
        try {
          const res = await verifyTokenRequest(cookies.token);
          if (!res.data) {
            setIsAuth(false);
            setUserData(null);
            setIsLoading(false);
          } else {
            setIsAuth(true);
            setUserData(res.data.user);
            setIsLoading(false);
          }
        } catch (error) {
          setIsAuth(false);
          setUserData(null);
          setIsLoading(false);
        }
      }
    }
    checkLogin();
  }, []);
  return (
    <userContext.Provider
      value={{
        signUpSeller,
        signUpBuyer,
        signIn,
        logout,
        isAuth,
        userData,
        isLoading,
        alerts,
        setAlerts
      }}
    >
      {children}
    </userContext.Provider>
  );
};
