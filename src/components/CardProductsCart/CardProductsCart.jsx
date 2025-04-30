import "./cardProductsCart.css"
import { ButtonContained } from "../Common/Buttons/Buttons"
import { useContext } from "react"
import { productContext } from "../../context/productsContext/productContext"

export default function CardProductsCart(props){
   const {deleteProductCart,getProductsCart} = useContext(productContext)
    const {name,category,description,price,image,productID} = props

    return (
<>
<div className="card-products-cart" >
        <img src={image} alt="imagen del producto en el carrito" />
         <div className="body-cardProducts-cart" >
         <h2>{name}</h2>
          <p>Categoria: {category}</p>
          <p className='productCart-description' >{description}</p>
          <p className='productCart-price' >{price}</p>
          {/* <p>{stock}</p> */}
         <div className="button-cardProductsCart-container" >
         <ButtonContained
          text="Descartar"
          backgroundColor="#2713C2"
          colorText="#fff"
          width="250px"
          height="45px"
          onClick={async()=>{
           await deleteProductCart(productID)
        //    await getProductsCart()
          }}
          />
          <ButtonContained
          text='Ir a pagar'
           backgroundColor="#ffffff"
           colorText="black"
           border="1px solid #2713C2 "
          width="250px"
          height="45px"
          />
         </div>
         </div>
         
      </div>
     
</>
    )
}