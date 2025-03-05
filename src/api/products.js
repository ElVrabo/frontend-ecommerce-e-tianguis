import axios from "./axios"


export const getAllProductsRequest = () => axios.get('/products')
export const addNewProductRequest = (data)=> axios.post('/products',data)
export const getAllProductByNameRequest = (data) => axios.get(`/searchProduct?productName=${data}`)