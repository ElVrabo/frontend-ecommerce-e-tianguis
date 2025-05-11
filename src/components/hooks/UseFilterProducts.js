import { useContext } from "react";
import { productContext } from "../../context/productsContext/productContext";

  export default function useFilterProducts(){
    const {getProductByName} = useContext(productContext)
    async function filterProducts(productName){
        await getProductByName(productName)
    }
   
    /*retorna la funcion filter products (const {filterProducts} = UseFilterProducts())*/
    return {filterProducts}
  }