import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonContained } from "../../../Common/Buttons/Buttons";
import { userContext } from "../../../../context/userContext/userContext";
import { Spinner } from "../../../Common/Spinner/Spinner";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userData, updateUserById, getUserById } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || ''
      });
    }
  }, [userData]);

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setErrors({...errors, email: 'Ingresa un email válido'});
          return false;
        }
        break;
      case 'phone':
        if (!/^\d{10,15}$/.test(value)) {
          setErrors({...errors, phone: 'Ingresa un teléfono válido (10-15 dígitos)'});
          return false;
        }
        break;
      case 'name':
        if (value.length < 2) {
          setErrors({...errors, name: 'El nombre debe tener al menos 2 caracteres'});
          return false;
        }
        break;
      default:
        break;
    }
    setErrors({...errors, [name]: ''});
    return true;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateForm = () => {
    let isValid = true;
    isValid = validateField('name', formData.name) && isValid;
    isValid = validateField('email', formData.email) && isValid;
    isValid = validateField('phone', formData.phone) && isValid;
    return isValid;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await updateUserById(userData.id, formData);
      await getUserById(userData.id);
      navigate('/profile');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setErrors({...errors, form: 'Ocurrió un error al actualizar el perfil'});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-center text-primary-blue border-b-2 border-primary-blue pb-3">
            Editar Perfil
          </h1>
        </div>
        
        <form className="px-8 py-6 space-y-4" onSubmit={handleOnSubmit}>
          {errors.form && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {errors.form}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-card-title">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
              onBlur={() => validateField('name', formData.name)}
              placeholder="Ingresa tu nombre"
              required
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50 transition-input ${
                errors.name ? 'border-red-500' : 'border-gray-300 focus:border-primary-blue'
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-card-title">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              onBlur={() => validateField('email', formData.email)}
              placeholder="Ingresa tu email"
              required
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50 transition-input ${
                errors.email ? 'border-red-500' : 'border-gray-300 focus:border-primary-blue'
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-card-title">
              Teléfono
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleOnChange}
              onBlur={() => validateField('phone', formData.phone)}
              placeholder="Ingresa tu teléfono"
              required
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50 transition-input ${
                errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-primary-blue'
              }`}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="pt-4">
            <ButtonContained
              className="w-full py-3 flex items-center justify-center"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner className="h-5 w-5 mr-2" />
                  Guardando...
                </>
              ) : (
                'Guardar Cambios'
              )}
            </ButtonContained>
          </div>
        </form>
      </div>
    </section>
  );
}