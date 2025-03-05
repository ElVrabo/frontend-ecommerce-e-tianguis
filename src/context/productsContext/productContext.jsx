import { createContext,useState } from "react";
import { addNewProductRequest, getAllProductsRequest } from "../../api/products";


export const productContext = createContext()

export const ProductContextProvider = ({children})=>{
    const [listProducts,setListProducts] = useState(null)
    const [isLoading,setIsLoading] = useState(true)

async function getAllProducts(){
    try {
        const res = await getAllProductsRequest()
        setListProducts(res.data)
        setIsLoading(false)
        console.log(res.data)
    } catch (error) {
        console.log('A ocurrido el siguiente error', error.response.data.error)
    }
}
async function addNewProduct(data){
    try {
        const res = await addNewProductRequest(data)
        setIsLoading(false)
        console.log(res.data.message)
    } catch (error) {
        console.log('a ocurrido el siguiente error', error.response.data.error)
    }
}

return (
    <productContext.Provider value={{
        getAllProducts,
        addNewProduct,
        listProducts,
        isLoading
    }} >{children}</productContext.Provider>
)
}