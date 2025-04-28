import React from 'react';
import './ProductView.css'; 
import { useContext, useEffect, useState } from "react";
import { productContext } from '../../../context/productsContext/productContext';
import Header from "../../Header/Header";
import ProductDetails from '../ProductDetails/ProductDetails';



const ProductView = () => {
  return (
    <div className="product-container">
        <Header />
      
      <div className="product-content">
        <div className="side-images">
          <img src="image1.jpg" alt="Product Preview 1" className="side-image" />
          <img src="image2.jpg" alt="Product Preview 2" className="side-image" />
          <img src="image3.jpg" alt="Product Preview 3" className="side-image" />
        </div>
        <div className="main-image-container">
          <div className="favorite-icons">
            <span>❤️</span>
            <span>🖤</span>
          </div>
          <img 
    //       className="w-full h-full object-cover hover:scale-105 transition-transform duration-card"
      //     src={image} 
      //     alt={`Producto: ${name}`}
      //     loading="lazy"
      //     decoding="async"
          />
        </div>
        <div className="description"
      //    name={product.name}
          >
          <h2>Titulo de producto</h2>
          <p className="price">
            <span>$00.00</span> <span className="old-price">$00.00</span>
          </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          <button className="add-to-cart">Añadir al carrito</button>
        </div>
      </div>
      <ProductDetails />
    </div>
  );
};

export default ProductView;

