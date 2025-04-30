import { createContext,useState } from "react";
import { addNewProductRequest, deleteFavoriteProductRequest, deleteProductByIdRequest, getAllProductByCategoryRequest, getAllProductByNameRequest, getAllProductsRequest, getFavoriteProductsRequest, getProductByIdRequest, getReviewProductRequest, insertReviewProductRequest, saveFavoriteProductRequest, updateProductByIdRequest } from "../../api/products";
import { deleteProductsCartRequest, getProductsCartRequest, saveProductsCartRequest } from "../../api/cartProducts";
import { Try } from "@mui/icons-material";


export const productContext = createContext()

export const ProductContextProvider = ({children})=>{
    const [listProducts,setListProducts] = useState(null)
    const [listProductsCart,setListProductsCart] = useState([])
    const [listReviewsProduct,setListReviewsProducts] = useState([])
    const [favoriteProducts,setFavoriteProducts] = useState([])
    const [productDetails,setProductDetails] = useState(null)
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
        setProductDetails(res.data)
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
    } catch (error) {
    }
}
async function saveProductsCart(product){
    try {
        const res = await saveProductsCartRequest(product)
        setListProductsCart(prev => [...prev, product]);
        setAlerts({...alerts, success:res.data.message})
    } catch (error) {
        setAlerts({...alerts,error:error.response.data.error})
    }
}
async function deleteProductCart(id) {
    try {
        setListProductsCart(listProductsCart.filter((product)=>product._id !== id))
         await deleteProductsCartRequest(id)
        
        
        // getAllProducts()
       
    } catch (error) {
        
    }
}

async function insertReviewProduct(data){
try {
    const res = await insertReviewProductRequest(data)
    setAlerts({...alerts, success:res.data.message})
} catch (error) {
    setAlerts({...alerts,error:error.response.data.error})
}
}
async function getReviewProduct(id){
    try {
        const res = await getReviewProductRequest(id)
        setListReviewsProducts(res.data)
    } catch (error) {
        console.log('a ocurrido el siguiente error', error)
        setListReviewsProducts([])
    }
}
async function getFavoriteProducts(){
    try {
        const res = await getFavoriteProductsRequest()
        setFavoriteProducts(res.data)
        setIsLoading(false)
    } catch (error) {
        console.log('a ocurrido el siguiente error', error)
    }
}
async function saveFavoriteProduct(data){
    try {
       const res = await saveFavoriteProductRequest(data)
        if(res.status === 201){
            console.log('se agrego a favoritos')
            return
        }
    } catch (error) {
        console.log('a ocurrido el siguiente error', error.response.data.error)
    }
}
async function deleteFavoriteProduct(id){
    try {
        setFavoriteProducts(listFavoriteProducts.filter((product)=>product._id !== id))
        await deleteFavoriteProductRequest(id)
    } catch (error) {
        
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
        isLoading,
        alerts,
        setAlerts,
        insertReviewProduct,
        getReviewProduct,
        listReviewsProduct,
        productDetails
        ,getFavoriteProducts,
        favoriteProducts,
        saveFavoriteProduct,
        deleteFavoriteProduct
        // isChangeProducts,
        // setIsChangeProducts
    }} >{children}</productContext.Provider>
)
}