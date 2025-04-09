import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productContext } from "../../../context/productsContext/productContext";
import "./ProductDetails.css"; // Importamos el archivo CSS
import { ButtonContained } from "../../Common/Buttons/Buttons";
import { userContext } from "../../../context/userContext/userContext";
import { SuccessAlert } from "../../Common/Alerts/Alerts";

export default function ProductDetails() {
  const {isLoading,isAuth,userData} = useContext(userContext)
  const { listProducts,saveProductsCart,alerts,setAlerts } = useContext(productContext);
  const { id } = useParams();
  const navigate = useNavigate()
  const productData = listProducts.find((product) => product._id === id);

  if (!productData) {
    return <p className="error-message">Producto no encontrado.</p>;
  }

  return (
    <section className="product-detail-container">
    <div className="product-detail-card">
      <img src={productData.file} alt="imagen del producto" />
  
      <div className="product-info">
        <h2 className="product-title">{productData.name}</h2>
        <p className="product-description">{productData.description}</p>
        <p className="product-price">{productData.price}</p>
        <p className="product-stock" style={{color: productData.stock <= 1 ? 'red' : 'black'}} >Stock: {productData.stock}</p>
  
        <div className="button-add-cart">
          <ButtonContained
            text="Añadir al carrito"
            backgroundColor="#2713C2"
            colorText="#fff"
            width="250px"
            height="45px"
            onClick={async () => {
              if (!isLoading && !isAuth && !userData) {
                navigate('/signIn');
                return;
              }
              await saveProductsCart(productData);
            }}
          />
          <div className="alerts-signUpBuyer">
            {alerts.success && (
              <SuccessAlert type="success" text={alerts.success} onClose={() => setAlerts({ ...alerts, success: "" })} />
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
