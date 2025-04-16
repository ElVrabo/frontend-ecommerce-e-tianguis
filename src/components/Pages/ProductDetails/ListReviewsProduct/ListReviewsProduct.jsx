import "./listReviewsProduct.css"
import { useContext, useEffect } from "react"
import { productContext } from "../../../../context/productsContext/productContext"
import CardReviewsProduct from "./CardReviewsProduct/CardReviewsProduct"


export default function ListReviewsProducts({productId,reviews}){

    const {getReviewProduct,listReviewsProduct,isLoading} = useContext(productContext)

    useEffect(()=>{
      async function loadReviews(){
            await getReviewProduct(productId)
      }
      loadReviews()
    },[reviews])
    if(listReviewsProduct.length === 0){
        return <h1 style={{fontSize:"50px", color:"#555"}} >No hay reseñas del producto</h1>
    }
    return (
        <main className="reviews-container" >
            <h1 >Reseñas del producto</h1>
            {listReviewsProduct.map((review)=>(
                <CardReviewsProduct
                key={review._id}
                rating={review.rating}
                comment={review.comment}
                date={review.date}
                />
            ))}
        </main>
    )
}