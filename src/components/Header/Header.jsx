
import CartIcon, { AccountIcon } from "../Common/Icons/Icons"
import "./header.css"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../../context/userContext/userContext"

export default function Header (){
    const {isAuth,userData,isLoading} = useContext(userContext)
    
    const navigate = useNavigate()
    return (
        <div className="header-container" >
            <h2>E-TIANGUIS</h2>
            <input className="input-search"  type="text" />
            <CartIcon color='black' height='45px' width='50px' className='cart-icon' onClick={()=>{
                if(!isAuth && !userData && !isLoading){
                 navigate('/selectAccount')
                }else{
                 navigate('/cart')
                }
            }}/>
            <div className="account-icon-container" >
            <AccountIcon color='black' height='55px' width='50px' className='account-icon'  onClick={()=>{
                if(!isAuth && !userData && !isLoading){

                    navigate('/selectAccount')
                }else{
                     navigate('/profile')
                }
            }} />
            <p>{!isAuth && !userData && !isLoading ? 'Ingresar':''}</p>
         
            </div>

        </div>
    )
}