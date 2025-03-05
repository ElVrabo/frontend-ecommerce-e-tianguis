  export default function CardProducts(props){
      const {name,description,price,stock,image} = props

      return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{price}</p>
            <p>{stock}</p>
            <p>{image}</p>
        </div>
      )
  }