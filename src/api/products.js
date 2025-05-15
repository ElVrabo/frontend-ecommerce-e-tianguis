import axios from "./axios"


export const getAllProductsRequest = () => axios.get('/products')
export const getProductsOfferRequest = ()=>axios.get('/productsOffer')
export const getProductsOfferCategoryRequest = (categoryOffer)=>axios.get(`/productsOfferCategory?category=${categoryOffer}`)
export const getProductByIdRequest = (id)=>axios.get(`/products/${id}`)
export const addNewProductRequest = (data)=> axios.post('/products',data)
export const getAllProductByNameRequest = (productName) => axios.get(`/searchProduct?productName=${productName}`)
export const getAllProductByCategoryRequest = (productCategory) => axios.get(`searchProductByCategory?category=${productCategory}`)

export const deleteProductByIdRequest = (id) => axios.delete(`/products/${id}`)
export const updateProductByIdRequest = (id,productData) => axios.put(`/products/${id}`, productData)

export const insertReviewProductRequest = (data)=>axios.post('/reviewProducts', data)
export const getReviewProductRequest = (id)=>axios.get(`/reviewProducts/${id}`)
export const getFavoriteProductsRequest = ()=>axios.get('/favoriteProducts')
export const saveFavoriteProductRequest = (data)=>axios.post('/favoriteProducts',data)
export const deleteFavoriteProductRequest = (id)=>axios.delete(`/favoriteProducts/${id}`)