import { useContext,useEffect, useState } from "react";
import { productContext } from "../../../context/productsContext/productContext";
import axios from "axios";


export function useFavoriteProducts(){
  /*Este custom hook solo se encarga de separar la logica de negocio de datos, es decir su unica responsabilidad es llamar a los datos*/
    const {getFavoriteProducts,favoriteProducts,isLoading} = useContext(productContext)
    useEffect(() => {
        const loadFavoriteProducts = async () => {
          await getFavoriteProducts();
        };
    
        loadFavoriteProducts();
      }, []);
   /*el custom hook retorna la data (favoriteProducts) y el estado de carga de la llamada*/
      return {
        favoriteProducts,
        isLoading
      }
}

export function useFetch(uri){
     const [data,setData] = useState([])
     const [isLoading,setIsLoaging] = useState(true)
     useEffect(()=>{
      async function loadData(){
        const res = await axios.get(uri)
        setData(res.data)
        setIsLoaging(false)
      }
      loadData()
     },[])
     return {
      data,
      isLoading
     }
}