import "./home.css"
import Header from "../../Header/Header"
import { useContext, useEffect, useState } from "react"
import { productContext } from "../../../context/productsContext/productContext"
import CardProducts from "../../CardProducts/CardProducts"
import { ErrorAlert } from "../../Common/Alerts/Alerts"

export default function HomePages(){
    const [category,setCategory] = useState("")
    const {getAllProducts,getProductsOffer,getProductByCategory,listProducts,setListProducts,isLoading, alerts,setAlerts} = useContext(productContext)

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
         <div className="alertError-category">
                        {alerts.error && (
                          <ErrorAlert
                            type="error"
                            text={alerts.error}
                            onClose={() => setAlerts({ ...alerts, error: "" })}
                          />
                        )}
                      </div>
        <section className="categorys-container" >
         
            <div className="items-category">
             <select className="select-category" value={category} onChange={handleOnChange} >
                <option value="" disabled >Categorias</option>
                <option value="artesanias"  >artesanias</option>
                <option value="pinturas"  >pinturas</option>
                <option value="cocina"  >cocina</option>
                <option value="accesorios"  >accesorios</option>
             </select>
              <h2 onClick={async()=>{
              await getProductsOffer()
             }}  >Ofertas</h2>
             <h2 onClick={()=>{
          setListProducts([...listProducts].sort((a,b)=>a.name.localeCompare(b.name,'es',{sensitivity:'base'})))
        }} >Ordenar alfabeticamente (A-Z)</h2>
             <h2 onClick={()=>{
          setListProducts([...listProducts].sort((a,b)=>parseFloat(a.price.split(" ")[1]) - parseFloat(b.price.split(" ")[1])))
        }}  >Ordenar por precios (menor-mayor) </h2>
             <h2 onClick={()=>{
          setListProducts([...listProducts].sort((a,b)=>a.stock - b.stock))
        }}  >Ordenar por disponibilidad (menor-mayor) </h2>
            </div>
        </section>
        <section className="cards-products-container" >
          {listProducts && !isLoading && (
            listProducts.map((product)=>(
               <CardProducts
               key={product._id}
               name={product.name}
               image={product.file}
               productID={product._id}
               />
            ))
          )}
        </section>
        </>

    )
}