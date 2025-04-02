  import { useNavigate } from "react-router-dom"
import { ButtonContained } from "../Common/Buttons/Buttons"
import "./cardProducts.css"
  export default function CardProducts(props){
      const {name,category,description,price,stock,image,productID} = props
      const navigate = useNavigate()

      return (
        <div className="card-products" >
             <img src={image} alt='Imagen del producto' />
            <h2>{name}</h2>
            <p>{category}</p>
            <p>{description}</p>
            <p>{price}</p>
            <p>{stock}</p>
           <div className="button-cardProducts-container" >
           <ButtonContained
            text="Detalles"
            backgroundColor="#2713C2"
            colorText="#fff"
            width="250px"
            height="45px"
            onClick={()=>{
              navigate(`/product/${productID}`)
            }}
            />
           </div>
        </div>
      )
  }