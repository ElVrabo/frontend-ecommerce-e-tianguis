import "./formSignUpBuyer.css";
import { FieldOutlined } from "../Common/Inputs/TextFields";
import { ButtonContained } from "../Common/Buttons/Buttons";
import { useContext, useEffect, useState } from "react";
import { SuccessAlert, ErrorAlert } from "../Common/Alerts/Alerts";
import { userContext } from "../../context/userContext/userContext";
// import { SuccessAlert } from "../Common/Alerts/Alerts";

export default function FormSignUpBuyer() {
    const[buyerData,setBuyerData] = useState({
        name:'',
        email:'',
        phone:'',
        role:'comprador',
        buyerAddress:'',
        password:'',
        password2:''
    })
    const {signUpBuyer,alerts,setAlerts} = useContext(userContext)

    function handleOnChange(event){
        const {name,value} = event.target
        setBuyerData({...buyerData,[name]:value})
    }
    async function handleOnSubmit(event){
        event.preventDefault()
        await signUpBuyer(buyerData)
    }

    useEffect(()=>{
       setTimeout(()=>{
         setAlerts({...alerts,success:null})
       },0)
    },[])
  return (
    <section className="form-signUp-buyer-container">
        <h1>Regístrate como comprador</h1>
      <div className="form-signUp-buyer-card">
        <form className="form-signUp-buyer" onSubmit={handleOnSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Nombre:</label>
              <FieldOutlined
                name="name"
                value={buyerData.name}
                type="text"
                className="form-input"
                onChange={handleOnChange}
                required
                // placeholder="Ingresa tu nombre"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email:</label>
              <FieldOutlined
                name="email"
                value={buyerData.email}
                type="email"
                className="form-input"
                onChange={handleOnChange}
                required
                // placeholder="Ingresa tu email"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Teléfono:</label>
              <FieldOutlined
                name="phone"
                value={buyerData.phone}
                type="tel"
                className="form-input"
                onChange={handleOnChange}
                required
                // placeholder="Ingresa tu teléfono"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tipo de cliente:</label>
              <FieldOutlined
                name="role"
                value={buyerData.role}
                type="text"
                className="form-input"
                // placeholder="Selecciona tu rol"
                disabled // Deshabilitado si el rol se asigna automáticamente
              />
            </div>
            <div className="form-group">
              <label className="form-label">Domicilio:</label>
              <FieldOutlined
                name="buyerAddress"
                value={buyerData.buyerAddress}
                type="text"
                className="form-input"
                onChange={handleOnChange}
                required
                // placeholder="Ingresa tu domicilio"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contraseña:</label>
              <FieldOutlined
                name="password"
                value={buyerData.password}
                type="password"
                className="form-input"
                onChange={handleOnChange}
                required
                // placeholder="Ingresa tu contraseña"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirma la contraseña:</label>
              <FieldOutlined
                name="password2"
                value={buyerData.password2}
                type="password"
                className="form-input"
                onChange={handleOnChange}
                required
                // placeholder="Confirma tu contraseña"
              />
            </div>
          </div>
          {/* <button type="submit" className="form-button">
            Registrarse
          </button> */}
          <div className="form-button" >
          <ButtonContained text="Enviar" backgroundColor="#2713C2" colorText="#fff" width="350px" height="45px" type="submit" />
          </div>
          <div className="alerts-signUpBuyer" >
            {alerts.success && <SuccessAlert type="success" text={alerts.success} onClose={() => setAlerts({ ...alerts, success: "" })} />}
             {alerts.error && <ErrorAlert type="error" text={alerts.error} onClose={() => setAlerts({ ...alerts, error: "" })} />}
          </div>
        </form>
      </div>
    </section>
  );
}