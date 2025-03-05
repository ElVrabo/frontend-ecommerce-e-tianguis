import "./home.css"
import Header from "../../Header/Header"
import { useContext, useEffect } from "react"
import { productContext } from "../../../context/productsContext/productContext"
import CardProducts from "../../CardProducts/CardProducts"

export default function HomePages(){
    const {getAllProducts,listProducts,isLoading} = useContext(productContext)

    useEffect(()=>{
        async function loadProducts(){
           await getAllProducts()
        }
        loadProducts()
    },[])
    return (
        <>
        <Header/>
        <section className="categorys-container" >
            <div className="items-category">
             <select className="select-category" >
                <option value="" disabled >Categorias</option>
                <option value="" >artesanias</option>
                <option value="" >pinturas</option>
                <option value="" >cocina</option>
                <option value="" >accesorios</option>
             </select>
             <h2>Tendencias</h2>
             <h2>Ofertas</h2>
             <h2>Ayuda</h2>
            </div>
        </section>
        <section className="cards-products-container" >
          {listProducts && !isLoading && (
            listProducts.map((product)=>(
               <CardProducts
               key={product._id}
               name={product.name}
               description={product.description}
               price={product.price}
               stock={product.stock}
               image={product.image}
               />
            ))
          )}
        </section>
        </>

    )
}