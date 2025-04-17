import Header from "../../../Header/Header";
import { useNavigate } from "react-router-dom";
import { ButtonOutlined } from "../../../Common/Buttons/Buttons";
import { useContext } from "react";
import { userContext } from "../../../../context/userContext/userContext";
import { 
  UserIcon, 
  ShoppingCartIcon, 
  HeartIcon, 
  CogIcon, 
  LogoutIcon 
} from "../../../Common/Icons/Icons";

export default function MenuProfilePages() {
  const navigate = useNavigate();
  const { userData, logout } = useContext(userContext);

  const menuItems = [
    {
      icon: <UserIcon className="w-5 h-5" />,
      text: "Mi Perfil",
      action: () => navigate('/profile/edit')
    },
    {
      icon: <ShoppingCartIcon className="w-5 h-5" />,
      text: "Mis Compras",
      action: () => navigate('/profile/orders')
    },
    {
      icon: <HeartIcon className="w-5 h-5" />,
      text: "Favoritos",
      action: () => navigate('/profile/favorites')
    },
    {
      icon: <CogIcon className="w-5 h-5" />,
      text: "Configuración",
      action: () => navigate('/profile/settings')
    },
    {
      icon: <LogoutIcon className="w-5 h-5" />,
      text: "Cerrar Sesión",
      action: logout
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado del perfil */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-primary-blue flex items-center justify-center text-white text-3xl font-bold">
            {userData?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-card-title">
              {userData?.name || 'Usuario'}
            </h1>
            <p className="text-card-text">{userData?.email}</p>
          </div>
        </div>

        {/* Menú de opciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="
                flex items-center gap-4 p-6
                bg-white rounded-card shadow-sm
                hover:shadow-md transition-all
                hover:-translate-y-1
                border border-gray-200
                text-left
              "
            >
              <div className="text-primary-blue">
                {item.icon}
              </div>
              <span className="font-medium text-card-title">{item.text}</span>
            </button>
          ))}
        </div>

        {/* Sección adicional para vendedores */}
        {userData?.role === 'seller' && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-card-title mb-6">Panel de Vendedor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ButtonOutlined 
                onClick={() => navigate('/dashboard-seller')}
                className="flex items-center gap-3 p-6"
              >
                <CogIcon className="w-5 h-5" />
                <span>Mi Dashboard</span>
              </ButtonOutlined>
              <ButtonOutlined 
                onClick={() => navigate('/dashboard-seller/products')}
                className="flex items-center gap-3 p-6"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span>Mis Productos</span>
              </ButtonOutlined>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}