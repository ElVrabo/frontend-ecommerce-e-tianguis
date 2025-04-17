import { createContext, useEffect, useState } from "react";
import {
  getUserByIdRequest,
  signInRequest,
  signUpRequest,
  updateUserByIdRequest,
  verifyTokenRequest,
} from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState({ 
    error: null, 
    success: null,
    info: null 
  });
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  // Función para limpiar alertas después de un tiempo
  const clearAlert = (type) => {
    setTimeout(() => {
      setAlerts(prev => ({ ...prev, [type]: null }));
    }, 5000);
  };

  // Cambiar tema con persistencia mejorada
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    // Persistir en cookies y localStorage como respaldo
    Cookies.set('theme', newTheme, { expires: 365 });
    localStorage.setItem('theme', newTheme);
  };

  // Aplicar tema al documento
  const applyTheme = (themeToApply) => {
    document.documentElement.classList.toggle('dark', themeToApply === 'dark');
    document.documentElement.setAttribute('data-theme', themeToApply);
  };

  // Cargar tema al inicio
  const loadTheme = () => {
    const cookieTheme = Cookies.get('theme');
    const localTheme = localStorage.getItem('theme');
    const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = cookieTheme || localTheme || defaultTheme;
    
    setTheme(initialTheme);
    applyTheme(initialTheme);
  };

  async function signUpSeller(data) {
    try {
      setIsLoading(true);
      const res = await signUpRequest(data);
      if (res.data.message) {
        setAlerts({ 
          ...alerts, 
          success: {
            message: res.data.message,
            type: 'success'
          } 
        });
        clearAlert('success');
        setTimeout(() => {
          navigate('/signIn');
        }, 3000);
      }
    } catch (error) {
      setAlerts({
        ...alerts,
        error: {
          message: error.response?.data?.error || 'Error desconocido',
          type: 'error'
        }
      });
      clearAlert('error');
    } finally {
      setIsLoading(false);
    }
  }

  async function signUpBuyer(data) {
    try {
      setIsLoading(true);
      const res = await signUpRequest(data);
      if (res.data.message) {
        setAlerts({ 
          ...alerts, 
          success: {
            message: res.data.message,
            type: 'success'
          } 
        });
        clearAlert('success');
        setTimeout(() => {
          navigate('/signIn');
        }, 3000);
      }
    } catch (error) {
      setAlerts({
        ...alerts,
        error: {
          message: error.response?.data?.error || 'Error desconocido',
          type: 'error'
        }
      });
      clearAlert('error');
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(data) {
    try {
      setIsLoading(true);
      const res = await signInRequest(data);
      if (res.data.user.role === 'comprador') {
        navigate("/");
      } else if(res.data.user.role === 'vendedor') {
        navigate('/dashboardSeller');
      }
      setUserData(res.data.user);
      setIsAuth(true);
      
      setAlerts({
        ...alerts,
        success: {
          message: `Bienvenido ${res.data.user.name}`,
          type: 'success'
        }
      });
      clearAlert('success');
    } catch (error) {
      setAlerts({
        ...alerts,
        error: {
          message: error.response?.data?.error || 'Error al iniciar sesión',
          type: 'error'
        }
      });
      clearAlert('error');
    } finally {
      setIsLoading(false);
    }
  }

  async function getUserById(id) {
    try {
      setIsLoading(true);
      const res = await getUserByIdRequest(id);
      setUserData(res.data.user);
    } catch (error) {
      setAlerts({
        ...alerts,
        error: {
          message: error.response?.data?.error || 'Error al obtener usuario',
          type: 'error'
        }
      });
      clearAlert('error');
    } finally {
      setIsLoading(false);
    }
  }

  async function updateUserById(id, userData) {
    try {
      setIsLoading(true);
      const res = await updateUserByIdRequest(id, userData);
      setUserData(res.data.user);
      
      setAlerts({
        ...alerts,
        success: {
          message: 'Perfil actualizado correctamente',
          type: 'success'
        }
      });
      clearAlert('success');
    } catch (error) {
      setAlerts({
        ...alerts,
        error: {
          message: error.response?.data?.error || 'Error al actualizar',
          type: 'error'
        }
      });
      clearAlert('error');
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    Cookies.remove("token");
    setIsAuth(false);
    setUserData(null);
    
    setAlerts({
      ...alerts,
      info: {
        message: 'Sesión cerrada correctamente',
        type: 'info'
      }
    });
    clearAlert('info');
    navigate('/signIn');
  }

  useEffect(() => {
    // Cargar configuración inicial del tema
    loadTheme();

    // Verificar autenticación
    async function checkLogin() {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuth(false);
        setIsLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(token);
        if (res.data) {
          setIsAuth(true);
          setUserData(res.data.user);
        }
      } catch (error) {
        setIsAuth(false);
        setUserData(null);
        
        setAlerts({
          ...alerts,
          error: {
            message: 'La sesión ha expirado',
            type: 'error'
          }
        });
        clearAlert('error');
      } finally {
        setIsLoading(false);
      }
    }
    
    checkLogin();

    // Escuchar cambios en las preferencias del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      // Solo cambiar si no hay preferencia guardada
      if (!Cookies.get('theme') && !localStorage.getItem('theme')) {
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  return (
    <userContext.Provider
      value={{
        signUpSeller,
        signUpBuyer,
        signIn,
        getUserById,
        updateUserById,
        logout,
        isAuth,
        userData,
        isLoading,
        alerts,
        setAlerts,
        theme,
        toggleTheme
      }}
    >
      {children}
    </userContext.Provider>
  );
};