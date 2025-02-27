
import CartIcon, { AccountIcon } from "../Common/Icons/Icons"
import "./header.css"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useContext, useEffect, useState } from "react"
import { verifyTokenRequest } from "../../api/auth"
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
                 navigate('/Cart')
                }
            }}/>
            <div className="account-icon-container" >
            <AccountIcon color='black' height='55px' width='50px' className='account-icon'  onClick={()=>{
                navigate('/selectAccount')
            }} />
         
            </div>

        </div>
    )
}