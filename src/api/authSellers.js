import axios from "./axios"

export const signUpSellerRequest=(data)=>axios.post('/signUp',data)
export const signInSellerRequest=(data)=>axios.post('/signIn',data)
export const verifyTokenSellerRequet=()=>axios.get('/verifyToken')