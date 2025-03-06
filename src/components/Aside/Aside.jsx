import React, { useContext, useState } from 'react';
import './aside.css';
import { userContext } from '../../context/userContext/userContext';
import AddProductModal from '../../components/AddProductModal/AddProductModal';

export default function Aside() {
  const { userData } = useContext(userContext);
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const [showOrdersMenu, setShowOrdersMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <ul className="sidebar-menu">
          <li>Inicio</li>
          <li onClick={toggleProductsMenu} className="menu-item">
            Productos
            {showProductsMenu && (
              <ul className="submenu">
                <li onClick={handleOpenModal}>Añadir Producto</li>
                <li>Ver Productos</li>
              </ul>
            )}
          </li>
          <li onClick={toggleOrdersMenu} className="menu-item">
            Pedidos
            {showOrdersMenu && (
              <ul className="submenu">
                <li>Ver Mis Pedidos</li>
              </ul>
            )}
          </li>
          <li>Cerrar sesión</li>
        </ul>
      </aside>
      <main className="main-content">
        <h1>Bienvenido {userData?.name}</h1>
        {/* <p>Contenido principal aquí...</p> */}
      </main>

      <AddProductModal open={openModal} handleClose={handleCloseModal} />
    </div>
  );
}
