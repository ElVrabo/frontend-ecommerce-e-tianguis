import React, { useContext, useEffect, useState } from "react";
import "./formSignUpSeller.css";
import { FieldOutlined } from "../Common/Inputs/TextFields";
import { ButtonContained } from "../Common/Buttons/Buttons";
import { SuccessAlert, ErrorAlert } from "../Common/Alerts/Alerts";
import { userContext } from "../../context/userContext/userContext";

export default function FormSignUpSeller() {
  const [sellerData, setSellerData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "vendedor",
    bussinessName: "",
    bussinessType: "",
    ine: "",
    password: "",
    password2: "",
  });
  const {signUpSeller,alerts,setAlerts} = useContext(userContext)

  function handleChange(e) {
    setSellerData({ ...sellerData, [e.target.name]: e.target.value });
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    await signUpSeller(sellerData)
  }

  useEffect(()=>{
    setTimeout(()=>{
     setAlerts({...alerts,success:null})
    },0)
  },[])

  return (
    <section className="form-signUp-container">
      <h1>Regístrate como vendedor</h1>
      <form className="form-signUp" onSubmit={handleOnSubmit}>
        <div className="fields-grid">
          <div className="field left">
            <label style={{ color: "black" }}>Nombre completo:</label>
            <FieldOutlined name="name" value={sellerData.name} onChange={handleChange} type="text" className="field border" required />
          </div>
          <div className="field right">
            <label style={{ color: "black" }}>Correo electrónico:</label>
            <FieldOutlined name="email" value={sellerData.email} onChange={handleChange} type="text" className="field border" required />
          </div>
          <div className="field left">
            <label style={{ color: "black" }}>Teléfono:</label>
            <FieldOutlined name="phone" value={sellerData.phone} onChange={handleChange} type="text" className="field border" required />
          </div>
          <div className="field left">
            <label style={{ color: "black" }}>Tipo de cliente:</label>
            <FieldOutlined name="role" value={sellerData.role} disabled onChange={handleChange} type="text" className="field border" required />
          </div>
          <div className="field full-width">
            <label style={{ color: "black" }}>Nombre del negocio:</label>
            <FieldOutlined name="bussinessName" value={sellerData.bussinessName} onChange={handleChange} type="text" className="field border" required />
          </div>
          <div className="field full-width">
            <label style={{ color: "black" }}>Tipo de negocio:</label>
            <FieldOutlined name="bussinessType" value={sellerData.bussinessType} onChange={handleChange} type="text" className="field border" required />
          </div>
          <div className="field full-width">
            <label style={{ color: "black" }}>INE/Pasaporte:</label>
            <FieldOutlined name="ine" value={sellerData.ine} onChange={handleChange} type="text" className="field border" required />
          </div>
          <div className="password-group">
            <div className="field passwordSignUpSeller">
              <label style={{ color: "black" }}>Crear contraseña:</label>
              <FieldOutlined name="password" value={sellerData.password} onChange={handleChange} type="password" className="field border"required />
            </div>
            <div className="field passwordSignUpSeller">
              <label style={{ color: "black" }}>Confirmar contraseña:</label>
              <FieldOutlined name="password2" value={sellerData.password2} onChange={handleChange} type="password" className="field border" required />
            </div>
          </div>
        </div>
        <div className="button-container">
          <ButtonContained text="Enviar" backgroundColor="#2713C2" colorText="#fff" width="350px" height="45px" type="submit" />
        </div>
        <div className="alerts-container">
          {alerts.success && <SuccessAlert type="success" text={alerts.success} onClose={() => setAlerts({ ...alerts, success: "" })} />}
          {alerts.error && <ErrorAlert type="error" text={alerts.error} onClose={() => setAlerts({ ...alerts, error: "" })} />}
        </div>
      </form>
    </section>
  );
}
