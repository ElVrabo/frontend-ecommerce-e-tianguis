
import CartIcon, { AccountIcon } from "../Common/Icons/Icons"
import "./header.css"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../../context/userContext/userContext"
import { productContext } from "../../context/productsContext/productContext"
import AccountMenu from "../Common/Menus/MenuAccount"
import useFilterProducts from "../hooks/UseFilterProducts"

export default function Header (){
    const [productName,setProductName] = useState('')
    const [productNumbersCart,setProductsNumberCart] = useState(0)
    // const {isAuth,userData,isLoading,logout} = useContext(userContext)
    const {listProductsCart,getProductsCart} = useContext(productContext)
    const {filterProducts} = useFilterProducts()
    
    const navigate = useNavigate()

    useEffect(()=>{
        /*si no existe o cambia el estado productName, la peticion no se hara*/ 
        if(!productName){
        return
        }else{

            filterProducts(productName)
        }
       
    //    loadProductsByName()
    },[productName])

    useEffect(()=>{
         getProductsCart()
    },[])

    useEffect(()=>{
          setProductsNumberCart(listProductsCart.length)
    },[listProductsCart])

    function handleOnChange(event){
        setProductName(event.target.value)
    }
    return (
        <div className="header-container" >
            <h2>E-TIANGUIS</h2>
            <input className="input-search"  type="text" onChange={handleOnChange} />
            <div className="cartIcon-container" >
            <CartIcon color='grey' height='45px' width='50px' className='cart-icon' onClick={()=>{
                navigate('/cart')
            }}/>
            <p style={{color: productNumbersCart.length <= '0' ? 'red':'black'}} >{productNumbersCart}</p>
            </div>
          
           
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