import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductView.css'; 
import { productContext } from '../../../context/productsContext/productContext';
import Header from "../../Header/Header";
import ProductDetails from '../ProductDetails/ProductDetails';

const ProductView = () => {
  const { id } = useParams();                     // 1. Extraemos el ID
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);   // 3. Estado de carga
  const [error, setError] = useState(null);
  const { getProduct } = useContext(productContext);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct(id);         // 2. Esperamos la llamada
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };
    if (id) loadProduct();
  }, [id, getProduct]);

  if (loading) return <p className="loading">Cargando producto…</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="product-container">
      <Header />

      <div className="product-content">
        <div className="side-images">
          {product.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Preview ${i + 1}`}
              className="side-image"
            />
          ))}
        </div>

        <div className="main-image-container">
          <div className="favorite-icons">
            <span>❤️</span>
            <span>🖤</span>
          </div>
          <img
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-card"
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="description">
          <h2>{product.name}</h2>
          <p className="price">
            <span>${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="old-price">${product.oldPrice.toFixed(2)}</span>
            )}
          </p>
          <p>{product.description}</p>
          <button className="add-to-cart">Añadir al carrito</button>
        </div>
      </div>

      <ProductDetails productId={product.id} />
    </div>
  );
};

export default ProductView;

