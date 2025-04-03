
import CartIcon, { AccountIcon } from "../Common/Icons/Icons"
import "./header.css"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../../context/userContext/userContext"
import { productContext } from "../../context/productsContext/productContext"
import AccountMenu from "c:/Users/Hector/Documents/E-TIANGUIS/frontend-ecommerce-e-tianguis/src/components/Common/Menus/MenuAcount"

export default function Header (){
    const [productName,setProductName] = useState('')
    // const {isAuth,userData,isLoading,logout} = useContext(userContext)
    const {getProductByName} = useContext(productContext)
    
    const navigate = useNavigate()

    useEffect(()=>{
       async function loadProductsByName(){
        /*si no existe o cambia el estado productName, la peticion no se hara*/ 
        if(!productName){
        return
        }else{

            await getProductByName(productName)
        }
       }
       loadProductsByName()
    },[productName])

    function handleOnChange(event){
        setProductName(event.target.value)
    }
    return (
        <div className="header-container" >
            <h2>E-TIANGUIS</h2>
            <input className="input-search"  type="text" onChange={handleOnChange} />
            <CartIcon color='grey' height='45px' width='50px' className='cart-icon' onClick={()=>{
                navigate('/cart')
            }}/>
            <div className="account-icon-container" >
             <AccountMenu /> 
            {/* <p>{!isAuth && !userData && !isLoading ? 'Ingresar':''}</p> */}
         
            </div>
            {/* <button onClick={()=>{
                logout()
            }} >Cerrar sesion</button> */}

        </div>
    )
}