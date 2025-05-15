import axios from "./axios"

export const signUpRequest=(data)=>axios.post('/signUp',data)
export const signInRequest=(data)=>axios.post('/signIn',data)
export const getUserByIdRequest=(id)=>axios.get(`/user/${id}`)
export const updateUserByIdRequest = (id,userData) => axios.put(`/user/${id}`,userData)
export const changePasswordRequest = (data) => axios.put('/changePassword',data)
export const verifyTokenRequest=()=>axios.get('/verifyToken')