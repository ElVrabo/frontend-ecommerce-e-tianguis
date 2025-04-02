import "./home.css"
import Header from "../../Header/Header"
import { useContext, useEffect, useState } from "react"
import { productContext } from "../../../context/productsContext/productContext"
import CardProducts from "../../CardProducts/CardProducts"

export default function HomePages(){
    const [category,setCategory] = useState("")
    const {getAllProducts,getProductByCategory,listProducts,isLoading} = useContext(productContext)

    function handleOnChange(event){
      setCategory(event.target.value)
      }

    useEffect(()=>{
        async function loadProducts(){
           await getAllProducts()
        }
        loadProducts()
    },[])
    useEffect(()=>{
      async function loadProductsByCategory(){
        if(!category){
          return
        }else{
          await getProductByCategory(category)
        }
      }
      loadProductsByCategory()
      
    },[category])
 
    return (
        <>
        <Header/>
        <section className="categorys-container" >
            <div className="items-category">
             <select className="select-category" value={category} onChange={handleOnChange} >
                <option value="" disabled >Categorias</option>
                <option value="artesanias"  >artesanias</option>
                <option value="pinturas"  >pinturas</option>
                <option value="cocina"  >cocina</option>
                <option value="accesorios"  >accesorios</option>
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
               category={product.category}
               description={product.description}
               price={product.price}
               stock={product.stock}
               image={product.file}
               productID={product._id}
               />
            ))
          )}
        </section>
        </>

    )
}