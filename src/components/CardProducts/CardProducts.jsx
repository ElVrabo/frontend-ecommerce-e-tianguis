  import "./cardProducts.css"
  export default function CardProducts(props){
      const {name,description,price,stock,image} = props

      return (
        <div className="card-products" >
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{price}</p>
            <p>{stock}</p>
            <p>{image}</p>
        </div>
      )
  }