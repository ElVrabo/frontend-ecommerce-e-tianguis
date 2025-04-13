import React, { useContext, useState } from 'react';
import './aside.css';
import { userContext } from '../../context/userContext/userContext';
import AddProductModal from '../../components/AddProductModal/AddProductModal';
import { useNavigate} from 'react-router-dom';
import FormAddProducts from '../Pages/DashboardSeller/FormAddProducts/FormAddProducts';
import ReusableModal from '../../components/AddProductModal/AddProductModal';

export default function Aside() {
  const { userData, isLoading,logout } = useContext(userContext);
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const [showOrdersMenu, setShowOrdersMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate()

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
                <li onClick={()=>{
                   navigate('/productsSeller')
                }} >Ver Productos</li>
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
          <li onClick={logout} >Cerrar sesión</li>
        </ul>
      </aside>
      <main className="main-content">
        {/* {!isLoading && userData ? (
          <h1>Bienvenido {userData.name}</h1>
        ):''} */}
        {/* <p>Contenido principal aquí...</p> */}
      </main>

      <ReusableModal open={openModal} handleClose={handleCloseModal}>
        <FormAddProducts/>
      </ReusableModal>
    </div>
  );
}
