import { Height } from "@mui/icons-material"
import CartIcon, { AccountIcon } from "../Common/Icons/Icons"
import "./header.css"

export default function Header (){
    return (
        <div className="header-container" >
            <h2>E-TIANGUIS</h2>
            <input className="input-search"  type="text" />
            <CartIcon color='black' height='45px' width='50px' />
            <div className="account-icon-container" >
            <AccountIcon color='black' height='55px' width='50px' />
         
            </div>
        </div>
    )
}