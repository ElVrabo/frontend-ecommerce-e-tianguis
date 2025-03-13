import axios from "./axios"


export const getAllProductsRequest = () => axios.get('/products')
export const getProductByIdRequest = (id)=>axios.get(`/products/${id}`)
export const addNewProductRequest = (data)=> axios.post('/products',data)
export const getAllProductByNameRequest = (productName) => axios.get(`/searchProduct?productName=${productName}`)
export const getAllProductByCategoryRequest = (productCategory) => axios.get(`searchProductByCategory?category=${productCategory}`)

export const deleteProductByIdRequest = (id) => axios.delete(`/products/${id}`)
export const updateProductByIdRequest = (id,productData) => axios.put(`/products/${id}`, productData)