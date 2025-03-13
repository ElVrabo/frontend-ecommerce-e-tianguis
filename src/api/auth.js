import axios from "./axios"

export const signUpRequest=(data)=>axios.post('/signUp',data)
export const signInRequest=(data)=>axios.post('/signIn',data)
export const getUserByIdRequest=(id)=>axios.get(`/user/${id}`)
export const verifyTokenRequest=()=>axios.get('/verifyToken')