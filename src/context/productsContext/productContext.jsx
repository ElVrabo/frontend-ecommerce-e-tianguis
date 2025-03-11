import { createContext,useState } from "react";
import { addNewProductRequest, deleteProductByIdRequest, getAllProductByNameRequest, getAllProductsRequest, getProductByIdRequest, updateProductByIdRequest } from "../../api/products";


export const productContext = createContext()

export const ProductContextProvider = ({children})=>{
    const [listProducts,setListProducts] = useState(null)
    const [product,setProduct] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    // const [isChangeProducts,setIsChangeProducts] = useState(false)

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
async function getProductByName(productName){
  try {
    const res = await getAllProductByNameRequest(productName)
    setListProducts(res.data)
  } catch (error) {
    console.log('a ocurrido el siguiente error', error.response.data.error)
  }
}
async function getProduct(id){
    try {
        const res = await getProductByIdRequest(id)
        setProduct(res.data)
    } catch (error) {
        console.log('A ocurrido el siguiente error', error.response.data.error)
    }
}
async function addNewProduct(data){
    try {
        const res = await addNewProductRequest(data)
        // setIsChangeProducts(true)
    } catch (error) {
        console.log('a ocurrido el siguiente error', error.response.data.error)
    }
}

async function deleteProduct(id){
    try {
        const res = await deleteProductByIdRequest(id)
        if(res.status === 204){
            setListProducts(listProducts.filter((product) => product._id !==id))
        }
    } catch (error) {
    }
}

async function updateProduct(id,productData){
    try {
        const res = await updateProductByIdRequest(id,productData)
        console.log(res.data.message)
    } catch (error) {
        console.log('A ocurrido el siguiente error', error.response.data.error)
    }
}

return (
    <productContext.Provider value={{
        getAllProducts,
        getProduct,
        getProductByName,
        addNewProduct,
        deleteProduct,
        updateProduct,
        listProducts,
        product,
        isLoading,
        // isChangeProducts,
        // setIsChangeProducts
    }} >{children}</productContext.Provider>
)
}