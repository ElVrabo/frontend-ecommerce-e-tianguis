import React, { useContext, useState } from 'react';
import { userContext } from '../../context/userContext/userContext';
import AddProductModal from '../../components/AddProductModal/AddProductModal';
import { useNavigate } from 'react-router-dom';
import FormAddProducts from '../Pages/DashboardSeller/FormAddProducts/FormAddProducts';
import ReusableModal from '../../components/AddProductModal/AddProductModal';

export default function Aside() {
  const { userData, isLoading, logout } = useContext(userContext);
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
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-primary-blue text-white p-5 flex flex-col gap-5">
        <h2 className="text-2xl text-center mb-5 font-semibold">Dashboard</h2>
        <ul className="flex flex-col gap-2">
          <li className="p-2 hover:bg-primary-blue-dark rounded transition-colors cursor-pointer">Inicio</li>
          <li 
            className="p-2 hover:bg-primary-blue-dark rounded transition-colors cursor-pointer"
            onClick={toggleProductsMenu}
          >
            Productos
            {showProductsMenu && (
              <ul className="mt-2 ml-4 bg-primary-blue-dark rounded">
                <li 
                  className="p-2 hover:bg-primary-blue-darker rounded transition-colors cursor-pointer"
                  onClick={handleOpenModal}
                >
                  Añadir Producto
                </li>
                <li 
                  className="p-2 hover:bg-primary-blue-darker rounded transition-colors cursor-pointer"
                  onClick={() => navigate('/productsSeller')}
                >
                  Ver Productos
                </li>
              </ul>
            )}
          </li>
          <li 
            className="p-2 hover:bg-primary-blue-dark rounded transition-colors cursor-pointer"
            onClick={toggleOrdersMenu}
          >
            Pedidos
            {showOrdersMenu && (
              <ul className="mt-2 ml-4 bg-primary-blue-dark rounded">
                <li className="p-2 hover:bg-primary-blue-darker rounded transition-colors cursor-pointer">
                  Ver Mis Pedidos
                </li>
              </ul>
            )}
          </li>
          <li 
            className="p-2 hover:bg-primary-blue-dark rounded transition-colors cursor-pointer"
            onClick={logout}
          >
            Cerrar sesión
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-10 bg-white shadow-sm">
        {/* Contenido principal */}
      </main>

      <ReusableModal open={openModal} handleClose={handleCloseModal}>
        <FormAddProducts/>
      </ReusableModal>
    </div>
  );
}