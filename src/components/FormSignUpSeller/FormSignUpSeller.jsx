import React, { useContext, useEffect, useState } from "react";
import { FieldOutlined } from "../Common/Inputs/TextFields";
import { ButtonContained } from "../Common/Buttons/Buttons";
import { SuccessAlert, ErrorAlert } from "../Common/Alerts/Alerts";
import { userContext } from "../../context/userContext/userContext";
import { Spinner } from "../Common/Spinner/Spinner";

export default function FormSignUpSeller() {
  const [sellerData, setSellerData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "vendedor",
    bussinessName: "",
    bussinessType: "",
    ine: "",
    password: "",
    password2: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { signUpSeller, alerts, setAlerts } = useContext(userContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setSellerData({ ...sellerData, [name]: value });
    // Limpiar errores al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!sellerData.name) newErrors.name = "Nombre completo es requerido";
    if (!sellerData.email) newErrors.email = "Email es requerido";
    else if (!/\S+@\S+\.\S+/.test(sellerData.email)) newErrors.email = "Email inválido";
    if (!sellerData.phone) newErrors.phone = "Teléfono es requerido";
    if (!sellerData.bussinessName) newErrors.bussinessName = "Nombre del negocio es requerido";
    if (!sellerData.bussinessType) newErrors.bussinessType = "Tipo de negocio es requerido";
    if (!sellerData.ine) newErrors.ine = "INE/Pasaporte es requerido";
    if (!sellerData.password) newErrors.password = "Contraseña es requerida";
    else if (sellerData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    if (sellerData.password !== sellerData.password2) newErrors.password2 = "Las contraseñas no coinciden";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleOnSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await signUpSeller(sellerData);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlerts({ ...alerts, success: null });
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [alerts.success]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 p-6">
      <h1 className="text-4xl font-serif text-white mb-8 text-center">Regístrate como vendedor</h1>
      
      <form 
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 border-2 border-white"
        onSubmit={handleOnSubmit}
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre completo */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre completo:
            </label>
            <FieldOutlined
              id="name"
              name="name"
              value={sellerData.name}
              onChange={handleChange}
              type="text"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:border-primary-blue focus:ring-primary-blue/50"
              }`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              required
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* Correo electrónico */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico:
            </label>
            <FieldOutlined
              id="email"
              name="email"
              value={sellerData.email}
              onChange={handleChange}
              type="email"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:border-primary-blue focus:ring-primary-blue/50"
              }`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Teléfono:
            </label>
            <FieldOutlined
              id="phone"
              name="phone"
              value={sellerData.phone}
              onChange={handleChange}
              type="tel"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:border-primary-blue focus:ring-primary-blue/50"
              }`}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              required
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Tipo de cliente (disabled) */}
          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Tipo de cliente:
            </label>
            <FieldOutlined
              id="role"
              name="role"
              value={sellerData.role}
              onChange={handleChange}
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>

          {/* Nombre del negocio (full width) */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="bussinessName" className="block text-sm font-medium text-gray-700">
              Nombre del negocio:
            </label>
            <FieldOutlined
              id="bussinessName"
              name="bussinessName"
              value={sellerData.bussinessName}
              onChange={handleChange}
              type="text"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.bussinessName 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:border-primary-blue focus:ring-primary-blue/50"
              }`}
              aria-invalid={!!errors.bussinessName}
              aria-describedby={errors.bussinessName ? "bussinessName-error" : undefined}
              required
            />
            {errors.bussinessName && (
              <p id="bussinessName-error" className="mt-1 text-sm text-red-600">
                {errors.bussinessName}
              </p>
            )}
          </div>

          {/* Tipo de negocio (full width) */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="bussinessType" className="block text-sm font-medium text-gray-700">
              Tipo de negocio:
            </label>
            <FieldOutlined
              id="bussinessType"
              name="bussinessType"
              value={sellerData.bussinessType}
              onChange={handleChange}
              type="text"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.bussinessType 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:border-primary-blue focus:ring-primary-blue/50"
              }`}
              aria-invalid={!!errors.bussinessType}
              aria-describedby={errors.bussinessType ? "bussinessType-error" : undefined}
              required
            />
            {errors.bussinessType && (
              <p id="bussinessType-error" className="mt-1 text-sm text-red-600">
                {errors.bussinessType}
              </p>
            )}
          </div>

          {/* INE/Pasaporte (full width) */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="ine" className="block text-sm font-medium text-gray-700">
              INE/Pasaporte:
            </label>
            <FieldOutlined
              id="ine"
              name="ine"
              value={sellerData.ine}
              onChange={handleChange}
              type="text"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.ine 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:border-primary-blue focus:ring-primary-blue/50"
              }`}
              aria-invalid={!!errors.ine}
              aria-describedby={errors.ine ? "ine-error" : undefined}
              required
            />
            {errors.ine && (
              <p id="ine-error" className="mt-1 text-sm text-red-600">
                {errors.ine}
              </p>
            )}
          </div>

          {/* Contraseñas (en row en desktop, columna en mobile) */}
          <div className="space-y-2 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Crear contraseña:
                </label>
                <FieldOutlined
                  id="password"
                  name="password"
                  value={sellerData.password}
                  onChange={handleChange}
                  type="password"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password 
                      ? "border-red-500 focus:ring-red-200" 
                      : "border-gray-300 focus:border-primary-blue focus:ring-primary-blue/50"
                  }`}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  required
                />
                {errors.password && (
                  <p id="password-error" className="mt-1 text-sm text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                  Confirmar contraseña:
                </label>
                <FieldOutlined
                  id="password2"
                  name="password2"
                  value={sellerData.password2}
                  onChange={handleChange}
                  type="password"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password2 
                      ? "border-red-500 focus:ring-red-200" 
                      : "border-gray-300 focus:border-primary-blue focus:ring-primary-blue/50"
                  }`}
                  aria-invalid={!!errors.password2}
                  aria-describedby={errors.password2 ? "password2-error" : undefined}
                  required
                />
                {errors.password2 && (
                  <p id="password2-error" className="mt-1 text-sm text-red-600">
                    {errors.password2}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Botón de envío */}
        <div className="flex justify-center mt-10">
          <ButtonContained
            type="submit"
            disabled={isLoading}
            backgroundColor="bg-primary-blue"
            colorText="text-white"
            width="w-full max-w-md"
            height="h-12"
            className={isLoading ? "opacity-75 cursor-not-allowed" : ""}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner className="h-5 w-5" />
                <span>Registrando...</span>
              </div>
            ) : (
              "Enviar"
            )}
          </ButtonContained>
        </div>

        {/* Alertas */}
        <div className="mt-6">
          {alerts.success && (
            <SuccessAlert 
              type="success" 
              text={alerts.success} 
              onClose={() => setAlerts({ ...alerts, success: "" })} 
            />
          )}
          {alerts.error && (
            <ErrorAlert 
              type="error" 
              text={alerts.error} 
              onClose={() => setAlerts({ ...alerts, error: "" })} 
            />
          )}
        </div>
      </form>
    </section>
  );
}