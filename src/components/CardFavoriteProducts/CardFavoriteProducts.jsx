import "./cardFavoriteProducts.css"
import { useContext } from "react"
import { productContext } from "../../context/productsContext/productContext"
import { ButtonContained } from "../Common/Buttons/Buttons"


export function CardFavoriteProducts(props){
    const {deleteFavoriteProduct} = useContext(productContext)
    const {name,category,description,price,image,productID} = props
    return (
        <div className="card-favorite-products" >
                <img src={image} alt="imagen del producto en favoritos" />
                 <div className="body-cardFavorite-products" >
                 <h2>{name}</h2>
                  <p>Categoria: {category}</p>
                  <p className='productFavorite-description' >{description}</p>
                  <p className='productFavorite-price' >{price}</p>
                  {/* <p>{stock}</p> */}
                 <div className="button-cardFavoriteProducts-container" >
                 <ButtonContained
                  text="Descartar"
                  backgroundColor="#2713C2"
                  colorText="#fff"
                  width="250px"
                  height="45px"
                  onClick={async()=>{
                     await deleteFavoriteProduct(productID)
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
    )
}