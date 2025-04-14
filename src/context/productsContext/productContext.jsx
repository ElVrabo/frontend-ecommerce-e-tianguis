import { createContext,useState } from "react";
import { addNewProductRequest, deleteProductByIdRequest, getAllProductByCategoryRequest, getAllProductByNameRequest, getAllProductsRequest, getProductByIdRequest, getReviewProductRequest, insertReviewProductRequest, updateProductByIdRequest } from "../../api/products";
import { deleteProductsCartRequest, getProductsCartRequest, saveProductsCartRequest } from "../../api/cartProducts";


export const productContext = createContext()

export const ProductContextProvider = ({children})=>{
    const [listProducts,setListProducts] = useState(null)
    const [listProductsCart,setListProductsCart] = useState(null)
    const [product,setProduct] = useState(null)
    const [alerts,setAlerts] = useState({
        success:'',
        error:''
    })
    const [isLoading,setIsLoading] = useState(true)
    // const [isChangeProducts,setIsChangeProducts] = useState(false)

async function getAllProducts(){
    try {
        const res = await getAllProductsRequest()
        setListProducts(res.data)
        setIsLoading(false)
    } catch (error) {
        // console.log('A ocurrido el siguiente error', error.response.data.error)
    }
}
async function getProductByName(productName){
  try {
    const res = await getAllProductByNameRequest(productName)
    setListProducts(res.data)
  } catch (error) {
    // console.log('a ocurrido el siguiente error', error.response.data.error)
  }
}
async function getProductByCategory(productCategory){
    try {
        const res = await getAllProductByCategoryRequest(productCategory)
        setListProducts(res.data)
    } catch (error) {
    }
}
async function getProduct(id){
    try {
        const res = await getProductByIdRequest(id)
        return res.data
    } catch (error) {
    }
}
async function addNewProduct(data){
    try {
        const res = await addNewProductRequest(data)
        if (res.status === 201){
            setAlerts({...alerts,success:res.data.message})
            return
        }
        //    return
        // setIsChangeProducts(true)
    } catch (error) {
        setAlerts({...alerts,error:error.response.data.error})

    }
}

async function deleteProduct(id){
    try {
        const res = await deleteProductByIdRequest(id)
        if(res.status === 204){
            setListProducts(prevProducts=>listProducts.filter((product) => product._id !==id))
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

async function getProductsCart(){
    try {
        const res = await getProductsCartRequest()
        setListProductsCart(res.data)
        setIsLoading(false)
        setAlerts({...alerts, error:null})
    } catch (error) {
        setAlerts({...alerts,error:error.response.data.error})
    }
}
async function saveProductsCart(product){
    try {
        const res = await saveProductsCartRequest(product)
        setAlerts({...alerts, success:res.data.message})
    } catch (error) {
        console.log('ocurrio el siguiente error', error.response.data.error)
        setAlerts({...alerts,error:error.response.data.error})
    }
}
async function deleteProductCart(id) {
    try {
        const res = await deleteProductsCartRequest(id)
        if(res.status === 204){
          setListProductsCart(listProductsCart.filter((product)=>product._id !== id))
        }
    } catch (error) {
        
    }
}

async function insertReviewProduct(data){
try {
    const res = await insertReviewProductRequest(data)
    console.log(res.data.message)
} catch (error) {
    console.log('A ocurrido el siguiente error', error.response.data.error)
}
}
async function getReviewProduct(id){
    try {
        const res = await getReviewProductRequest(id)
        console.log(res)
    } catch (error) {
        console.log(' a ocurrido el siguiente error', error.response.data.error)
    }
}
return (
    <productContext.Provider value={{
        getAllProducts,
        getProduct,
        getProductByName,
        getProductByCategory,
        addNewProduct,
        deleteProduct,
        updateProduct,
        getProductsCart,
        saveProductsCart,
        deleteProductCart,
        listProducts,
        listProductsCart,
        product,
        isLoading,
        alerts,
        setAlerts,
        insertReviewProduct,
        getReviewProduct
        // isChangeProducts,
        // setIsChangeProducts
    }} >{children}</productContext.Provider>
)
}