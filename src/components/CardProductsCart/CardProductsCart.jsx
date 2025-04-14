import "./cardProductsCart.css"
import { ButtonContained } from "../Common/Buttons/Buttons"
import { useContext } from "react"
import { productContext } from "../../context/productsContext/productContext"

export default function CardProductsCart(props){
   const {deleteProductCart,getProductsCart} = useContext(productContext)
    const {name,category,description,price,image,productID} = props

    return (
      <div className="card-products-cart" >
        <img src={image} alt="imagen del producto en el carrito" />
          <h2>{name}</h2>
          <p>{category}</p>
          <p>{description}</p>
          <p>{price}</p>
          {/* <p>{stock}</p> */}
         <div className="button-cardProductsCart-container" >
         <ButtonContained
          text="Eliminar"
          backgroundColor="#2713C2"
          colorText="#fff"
          width="250px"
          height="45px"
          onClick={async()=>{
           await deleteProductCart(productID)
           getProductsCart()
          }}
          />
         </div>
      </div>
    )
}