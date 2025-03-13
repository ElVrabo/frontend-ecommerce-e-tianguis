import { useContext, useEffect } from "react"
import { userContext } from "../../../context/userContext/userContext"

export default function ProfilePages(){
    const {userData,isLoading,getUserById} = useContext(userContext)
 useEffect(()=>{
     async function getUser(){
        if(!userData && !isLoading){
            return 1
        }else{
            await getUserById(userData._id)
        }
     }
     getUser()
 },[])
// if(!isAuth && !userData && !isLoading){
//     return <h1>No se encontro al usuario</h1>
// }
    return (
        <>
        <h1>nombre: {userData?.name}</h1>
        <h2>Email: {userData?.email}</h2>
        <h2>Email: {userData?.phone}</h2>
        </>
    )
}


