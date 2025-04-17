import { FieldOutlined } from "../Common/Inputs/TextFields";
import { ButtonContained } from "../Common/Buttons/Buttons";
import { useContext, useEffect, useState } from "react";
import { SuccessAlert, ErrorAlert } from "../Common/Alerts/Alerts";
import { userContext } from "../../context/userContext/userContext";
import { Spinner } from "../Common/Spinner/Spinner";

export default function FormSignUpBuyer() {
    const [buyerData, setBuyerData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'comprador',
        buyerAddress: '',
        password: '',
        password2: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { signUpBuyer, alerts, setAlerts } = useContext(userContext);

    function handleOnChange(event) {
        const { name, value } = event.target;
        setBuyerData({ ...buyerData, [name]: value });
        // Limpiar errores al escribir
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    }

    const validateForm = () => {
        const newErrors = {};
        
        if (!buyerData.name) newErrors.name = "Nombre es requerido";
        if (!buyerData.email) newErrors.email = "Email es requerido";
        else if (!/\S+@\S+\.\S+/.test(buyerData.email)) newErrors.email = "Email inválido";
        if (!buyerData.phone) newErrors.phone = "Teléfono es requerido";
        if (!buyerData.buyerAddress) newErrors.buyerAddress = "Domicilio es requerido";
        if (!buyerData.password) newErrors.password = "Contraseña es requerida";
        else if (buyerData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
        if (buyerData.password !== buyerData.password2) newErrors.password2 = "Las contraseñas no coinciden";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleOnSubmit(event) {
        event.preventDefault();
        if (!validateForm()) return;
        
        setIsLoading(true);
        try {
            await signUpBuyer(buyerData);
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
        <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Regístrate como comprador</h1>
            
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">
                <form onSubmit={handleOnSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nombre */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nombre:
                            </label>
                            <FieldOutlined
                                id="name"
                                name="name"
                                value={buyerData.name}
                                type="text"
                                onChange={handleOnChange}
                                className={`w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? "name-error" : undefined}
                            />
                            {errors.name && (
                                <p id="name-error" className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email:
                            </label>
                            <FieldOutlined
                                id="email"
                                name="email"
                                value={buyerData.email}
                                type="email"
                                onChange={handleOnChange}
                                className={`w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? "email-error" : undefined}
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
                                value={buyerData.phone}
                                type="tel"
                                onChange={handleOnChange}
                                className={`w-full ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                aria-invalid={!!errors.phone}
                                aria-describedby={errors.phone ? "phone-error" : undefined}
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
                                value={buyerData.role}
                                type="text"
                                className="w-full bg-gray-100 cursor-not-allowed"
                                disabled
                            />
                        </div>

                        {/* Domicilio */}
                        <div className="space-y-2">
                            <label htmlFor="buyerAddress" className="block text-sm font-medium text-gray-700">
                                Domicilio:
                            </label>
                            <FieldOutlined
                                id="buyerAddress"
                                name="buyerAddress"
                                value={buyerData.buyerAddress}
                                type="text"
                                onChange={handleOnChange}
                                className={`w-full ${errors.buyerAddress ? 'border-red-500' : 'border-gray-300'}`}
                                aria-invalid={!!errors.buyerAddress}
                                aria-describedby={errors.buyerAddress ? "address-error" : undefined}
                            />
                            {errors.buyerAddress && (
                                <p id="address-error" className="mt-1 text-sm text-red-600">
                                    {errors.buyerAddress}
                                </p>
                            )}
                        </div>

                        {/* Contraseña */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña:
                            </label>
                            <FieldOutlined
                                id="password"
                                name="password"
                                value={buyerData.password}
                                type="password"
                                onChange={handleOnChange}
                                className={`w-full ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? "password-error" : undefined}
                            />
                            {errors.password && (
                                <p id="password-error" className="mt-1 text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirmar Contraseña */}
                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                                Confirma la contraseña:
                            </label>
                            <FieldOutlined
                                id="password2"
                                name="password2"
                                value={buyerData.password2}
                                type="password"
                                onChange={handleOnChange}
                                className={`w-full ${errors.password2 ? 'border-red-500' : 'border-gray-300'}`}
                                aria-invalid={!!errors.password2}
                                aria-describedby={errors.password2 ? "password2-error" : undefined}
                            />
                            {errors.password2 && (
                                <p id="password2-error" className="mt-1 text-sm text-red-600">
                                    {errors.password2}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center pt-4">
                    <ButtonContained
                      type="submit"
                      disabled={isLoading}
                      backgroundColor="bg-primary-blue"
                      colorText="text-white"
                      width="w-full max-w-md"
                      className={isLoading ? 'opacity-75' : ''}
                    >
                      {isLoading ? (
                        <>
                          <Spinner className="mr-2" />
                          Registrando...
                        </>
                      ) : (
                        "Registrarse"
                      )}
                    </ButtonContained>
                    </div>

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
            </div>
        </section>
    );
}