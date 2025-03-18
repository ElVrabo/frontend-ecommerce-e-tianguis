import axios from "./axios"

export const getProductsCartRequest = ()=> axios.get('/cartProducts')
export const saveProductsCartRequest = (product)=> axios.post('/cartProducts', product)
export const deleteProductsCartRequest = (id)=> axios.delete(`/cartProducts/${id}`)