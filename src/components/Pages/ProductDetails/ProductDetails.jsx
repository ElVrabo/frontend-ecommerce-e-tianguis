import { useContext } from "react";
import { useParams } from "react-router-dom";
import { productContext } from "../../../context/productsContext/productContext";
import "./ProductDetails.css"; // Importamos el archivo CSS

export default function ProductDetails() {
  const { listProducts } = useContext(productContext);
  const { id } = useParams();
  const productData = listProducts.find((product) => product._id === id);

  if (!productData) {
    return <p className="error-message">Producto no encontrado.</p>;
  }

  return (
   <section className="product-detail-container" >
     <div className="product-detail-card">
      <h2 className="product-title">{productData.name}</h2>
      <p className="product-description">{productData.description}</p>
      <p className="product-price">$ {productData.price}</p>
      <p className="product-stock">Stock: {productData.stock}</p>
    </div>
   </section>
  );
}
