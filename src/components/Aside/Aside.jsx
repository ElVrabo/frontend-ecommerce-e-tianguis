import React, { useContext, useState } from 'react';
import { userContext } from '../../context/userContext/userContext';
import { useNavigate } from 'react-router-dom';
import FormAddProducts from '../Pages/DashboardSeller/FormAddProducts/FormAddProducts';
import ReusableModal from '../../components/AddProductModal/AddProductModal';
import { ThemeToggle } from '../Common/ThemeToggle/ThemeToggle';

export default function Aside() {
  const { userData, isLoading, logout, theme } = useContext(userContext);
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const [showOrdersMenu, setShowOrdersMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const toggleProductsMenu = () => {
    setShowProductsMenu(!showProductsMenu);
    setShowOrdersMenu(false);
  };

  const toggleOrdersMenu = () => {
    setShowOrdersMenu(!showOrdersMenu);
    setShowProductsMenu(false);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Barra lateral */}
      <aside className="w-64 bg-primary-blue dark:bg-gray-800 text-white p-5 flex flex-col gap-5 transition-colors duration-300">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-center mb-5 font-semibold">Dashboard</h2>
          <ThemeToggle />
        </div>
        
        <ul className="flex flex-col gap-2">
          <li 
            className="p-2 hover:bg-primary-blue-dark dark:hover:bg-gray-700 rounded transition-colors cursor-pointer duration-200"
            onClick={() => navigate('/dashboardSeller')}
          >
            Inicio
          </li>
          
          <li 
            className="p-2 hover:bg-primary-blue-dark dark:hover:bg-gray-700 rounded transition-colors cursor-pointer duration-200"
            onClick={toggleProductsMenu}
          >
            Productos
            {showProductsMenu && (
              <ul className="mt-2 ml-4 bg-primary-blue-dark dark:bg-gray-700 rounded transition-colors duration-200">
                <li 
                  className="p-2 hover:bg-primary-blue-darker dark:hover:bg-gray-600 rounded transition-colors cursor-pointer duration-200"
                  onClick={handleOpenModal}
                >
                  Añadir Producto
                </li>
                <li 
                  className="p-2 hover:bg-primary-blue-darker dark:hover:bg-gray-600 rounded transition-colors cursor-pointer duration-200"
                  onClick={() => navigate('/productsSeller')}
                >
                  Ver Productos
                </li>
              </ul>
            )}
          </li>
          
          <li 
            className="p-2 hover:bg-primary-blue-dark dark:hover:bg-gray-700 rounded transition-colors cursor-pointer duration-200"
            onClick={toggleOrdersMenu}
          >
            Pedidos
            {showOrdersMenu && (
              <ul className="mt-2 ml-4 bg-primary-blue-dark dark:bg-gray-700 rounded transition-colors duration-200">
                <li className="p-2 hover:bg-primary-blue-darker dark:hover:bg-gray-600 rounded transition-colors cursor-pointer duration-200">
                  Ver Mis Pedidos
                </li>
              </ul>
            )}
          </li>
          
          <li 
            className="p-2 hover:bg-primary-blue-dark dark:hover:bg-gray-700 rounded transition-colors cursor-pointer duration-200"
            onClick={logout}
          >
            Cerrar sesión
          </li>
        </ul>
      </aside>

      {/* Área principal */}
      <main className="flex-1 p-10 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300">
        {/* Contenido principal */}
      </main>

      {/* Modal */}
      <ReusableModal open={openModal} handleClose={handleCloseModal}>
        <FormAddProducts handleCloseModal={handleCloseModal} />
      </ReusableModal>
    </div>
  );
}