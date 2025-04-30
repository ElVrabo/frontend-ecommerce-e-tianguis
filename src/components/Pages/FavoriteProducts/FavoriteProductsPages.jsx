import "./favoriteProductsPages.css"
import { CardFavoriteProducts } from "../../CardFavoriteProducts/CardFavoriteProducts"
import { useFavoriteProducts } from "../../hooks/useFavoriteProducts/UseFavoriteProducts"


export default function FavoriteProductsPages(){
    const {favoriteProducts,isLoading} = useFavoriteProducts()
    if(favoriteProducts.length === 0 && !isLoading){
        return <h1>No hay productos favoritos</h1>
    }
   return (
   <>
   <h1>Mis favoritos</h1>
    <main className="container-favorite-products" >
        {favoriteProducts.map((product)=>(
            <CardFavoriteProducts
            key={product._id}
            name={product.name}
            category={product.category}
            description={product.description}
            price={product.price}
            image={product.image}
            productID={product._id}
            />
        ))}
    </main>
   </>
   )
}