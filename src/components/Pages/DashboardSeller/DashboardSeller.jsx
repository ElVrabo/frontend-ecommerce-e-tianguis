import "./dashBoardSeller.css";
import Aside from "../../Aside/Aside";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/userContext/userContext";
import { useNavigate } from "react-router-dom";
import ReusableModal from "../../AddProductModal/AddProductModal";
import FormAddProducts from "./FormAddProducts/FormAddProducts";
import { productContext } from "../../../context/productsContext/productContext";

export default function DashboardSeller() {
  const [openModal, setOpenModal] = useState(false);
  const { isLoading, userData } = useContext(userContext);
  const { getAllProducts, listProducts } = useContext(productContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="dashboard-container">
      <Aside />
      <main className="main-content-dashboard">
        {!isLoading && userData ? (
          <>
            <h1 className="welcome-title">Hola, {userData.name}</h1>
            <p className="welcome-subtitle">¡Bienvenido de nuevo a tu panel de vendedor!</p>

            <div className="dashboard-widgets">
              <div className="widget-card">
                <h3>Productos publicados</h3>
                <p>{listProducts?.length}</p>
              </div>
              <div className="widget-card">
                <h3>Pedidos del mes</h3>
                <p>0</p>
              </div>
              <div className="widget-card">
                <h3>Ventas totales</h3>
                <p>$0</p>
              </div>
            </div>

            <div className="action-buttons">
              <button onClick={handleOpenModal}>+ Añadir producto</button>
              <button onClick={() => navigate("/productsSeller")}>Ver productos</button>
            </div>
          </>
        ) : (
          <p>Cargando información...</p>
        )}

        <ReusableModal open={openModal} handleClose={handleCloseModal}>
          <FormAddProducts />
        </ReusableModal>
      </main>
    </div>
  );
}
