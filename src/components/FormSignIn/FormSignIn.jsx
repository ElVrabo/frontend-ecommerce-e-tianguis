import { ButtonContained } from "../Common/Buttons/Buttons";
import { useContext, useState } from "react";
import googleIcon from "../../assets/images/google-removebg-preview.png";
import { FieldOutlined } from "../Common/Inputs/TextFields";
import { Link } from "react-router-dom";
import { ErrorAlert } from "../Common/Alerts/Alerts";
import { userContext } from "../../context/userContext/userContext";
import { Spinner } from "../Common/Spinner/Spinner";

export default function FormSignIn() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { signIn, alerts, setAlerts } = useContext(userContext);

  const validateForm = () => {
    const newErrors = {};
    if (!userData.email) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(userData.email)) newErrors.email = "Email inválido";
    
    if (!userData.password) newErrors.password = "La contraseña es requerida";
    else if (userData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleOnSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await signIn(userData);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOnChange(event) {
    setUserData((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
    // Limpiar errores al escribir
    if (errors[event.target.name]) {
      setErrors(prev => ({...prev, [event.target.name]: ""}));
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-white p-4">
      <h1 className="text-4xl font-serif text-gray-800 mb-8">Inicia Sesión</h1>
      
      <form 
        className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 flex flex-col items-center"
        onSubmit={handleOnSubmit}
        noValidate
      >
        <div className="w-full mb-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email:
            </label>
            <FieldOutlined 
              id="email"
              type="email" 
              name="email" 
              value={userData.email} 
              onChange={handleOnChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:border-primary-blue focus:ring-primary-blue/50"
              }`}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password:
            </label>
            <FieldOutlined 
              id="password"
              type="password" 
              name="password" 
              value={userData.password} 
              onChange={handleOnChange}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:border-primary-blue focus:ring-primary-blue/50"
              }`}
            />
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600">
                {errors.password}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          <p className="text-gray-600">¿Eres nuevo?</p>
          <Link 
            to="/selectAccount" 
            className="text-primary-blue hover:text-primary-blue-dark hover:underline focus:outline-none focus:ring-2 focus:ring-primary-blue/50 focus:rounded"
            aria-label="Registrarse"
          >
            ¡Registrate!
          </Link>
        </div>
        
        <div className="mb-6 w-full flex justify-center relative">
          <ButtonContained
            type="submit"
            disabled={isLoading}
            className={`w-full max-w-xs h-12 flex items-center justify-center ${
              isLoading ? "opacity-75 cursor-not-allowed" : "hover:bg-primary-blue-dark"
            } transition-all`}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2" />
                Procesando...
              </>
            ) : (
              "Enviar"
            )}
          </ButtonContained>
        </div>
        
        {alerts.error && (
          <div className="w-full mb-6" role="alert">
            <ErrorAlert 
              type="error" 
              text={alerts.error} 
              onClose={() => setAlerts({ ...alerts, error: "" })} 
            />
          </div>
        )}
        
        <div className="mt-6 text-center w-full">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-gray-500">O ingresa con</span>
            </div>
          </div>
          
          <button 
            type="button"
            onClick={() => alert('Iniciar sesión con Google')}
            className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue/50"
            aria-label="Iniciar sesión con Google"
          >
            <img src={googleIcon} className="h-6" alt="" aria-hidden="true" />
            <span className="text-gray-700 font-medium">Google</span>
          </button>
        </div>
      </form>
    </section>
  );
}