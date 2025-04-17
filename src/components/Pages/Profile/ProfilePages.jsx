import { useContext, useEffect } from "react";
import { userContext } from "../../../context/userContext/userContext";
import { ButtonContained } from "../../Common/Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "../../Common/Icons/Icons";
import { Spinner } from "../../Common/Spinner/Spinner";

export default function ProfilePages() {
  const { userData, isAuth, isLoading, getUserById } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      if (!userData && !isLoading) return;
      await getUserById(userData.id);
    }
    getUser();
  }, [userData, isLoading, getUserById]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="h-12 w-12 text-primary-blue" />
      </div>
    );
  }

  if (!userData || !isAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl text-red-500">No se encontró al usuario</h1>
      </div>
    );
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Encabezado */}
        <div className="bg-primary-blue px-6 py-4">
          <h1 className="text-2xl font-bold text-white text-center">
            Perfil de Usuario
          </h1>
        </div>

        {/* Contenido */}
        <div className="p-6 md:p-8">
          {/* Avatar e información básica */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-primary-blue flex items-center justify-center text-white text-2xl font-bold mb-4">
              {userData?.name?.charAt(0).toUpperCase()}
            </div>
            
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-card-title">{userData?.name}</h2>
              <p className="text-card-text">{userData?.email}</p>
              <p className="text-sm text-gray-500">
                Miembro desde {new Date(userData?.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Detalles del perfil */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium text-card-text">Teléfono:</span>
              <span className="text-card-title">{userData?.phone || 'No especificado'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium text-card-text">Rol:</span>
              <span className="text-card-title capitalize">{userData?.role}</span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col items-center space-y-4">
            <ButtonContained
              className="w-full max-w-xs"
              onClick={() => navigate('/editProfile')}
            >
              Editar información
            </ButtonContained>
            
            <button 
              onClick={() => navigate('/')}
              className="flex items-center justify-center text-primary-blue hover:text-primary-blue-dark transition-colors"
            >
              <BackIcon className="w-6 h-6 mr-1" />
              <span>Volver al inicio</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}