import { useNavigate } from "react-router-dom"
import "./accountTypesPages.css"
export default function AccountTypePages(){
    const navigate = useNavigate()
    return (
        <section className="account-type-container">
            <div className="select-account-type" >
                <h2>¿Que tipo de cuenta deseas?</h2>
                <div className="type-accounts" >
                    <div onClick={()=>{
                        navigate('/signUpBuyer')
                    }} >
                        <h3>Comprador</h3>
                    </div>
                    <div onClick={()=>{
                        navigate('/signUpSeller')
                    }} >
                        <h3>Vendedor</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}