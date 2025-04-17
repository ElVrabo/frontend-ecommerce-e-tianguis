import { useContext } from "react";
import { productContext } from "../../context/productsContext/productContext";
import Card from "../Common/Card/Card";

export default function CardProductsCart({
  name, 
  category, 
  description, 
  price, 
  image, 
  productID,
  quantity = 1 
}) {
  const { deleteProductCart, updateProductQuantity } = useContext(productContext);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity > 0) {
      await updateProductQuantity(productID, newQuantity);
    }
  };

  return (
    <Card className="flex flex-col md:flex-row w-full" shadow="sm">
      {/* Imagen del producto */}
      <div className="w-full md:w-1/3 h-48 bg-gray-100 flex items-center justify-center p-4">
        <img 
          className="h-full w-full object-contain" 
          src={image} 
          alt={name}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Detalles del producto */}
      <div className="w-full md:w-2/3 p-4 flex flex-col">
        <div className="flex-1">
          <h2 className="text-lg font-medium text-card-title mb-1">{name}</h2>
          <p className="text-sm text-card-text mb-2">{category}</p>
          <p className="text-sm text-card-text line-clamp-2 mb-3">{description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-primary-blue">
              ${parseFloat(price).toFixed(2)}
            </span>
            
            {/* Selector de cantidad */}
            <div className="flex items-center border border-input-border rounded-lg">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-input-filled-bg transition-colors"
                aria-label="Reducir cantidad"
              >
                -
              </button>
              <span className="w-10 text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-input-filled-bg transition-colors"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Botón de eliminar */}
        <div className="flex justify-end">
          <button
            onClick={async () => {
              await deleteProductCart(productID);
            }}
            className="text-sm text-icon-danger hover:text-icon-danger flex items-center gap-1 transition-colors"
            aria-label="Eliminar producto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
    </Card>
  );
}