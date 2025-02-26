import React, { useState } from "react";
import "./formSignUpSeller.css";
import { FieldOutlined } from "../Common/Inputs/TextFields";
import { ButtonContained } from "../Common/Buttons/Buttons";
import { signUpSellerRequest } from "../../api/authSellers";
import { SuccessAlert, ErrorAlert } from "../Common/Alerts/Alerts";

export default function FormSignUpSeller() {
  const [sellerData, setSellerData] = useState({
    name: "",
    email: "",
    phone: "",
    bussinessName: "",
    bussinessType: "",
    ine: "",
    password: "",
    password2: "",
  });
  const [alert, setAlert] = useState({
    success: "",
    error: "",
  });
  const formFields = [
    {
      id: 1,
      name: "name",
      label: "Nombre completo:",
      placeholder: "Nombre",
      type: "text",
      className: "left",
      border:'border'
    },
    {
      id: 2,
      name: "email",
      label: "Correo electrónico:",
      placeholder: "Correo",
      type: "text",
      className: "right",
       border:'border'
    },
    {
      id: 3,
      name: "phone",
      label: "Teléfono:",
      placeholder: "Teléfono",
      type: "text",
      className: "left",
       border:'border'
    },
    {
      //   id: 4,
      //   label: "RFC",
      //   placeholder: "RFC",
      //   type: "text",
      //   className: "right",
      // },
      // {
      id: 4,
      name: "bussinessName",
      label: "Nombre del negocio:",
      placeholder: "Negocio",
      type: "text",
      className: "full-width",
       border:'border'
    },
    {
      id: 5,
      name: "bussinessType",
      label: "Tipo de negocio:",
      placeholder: "Ej: Restaurante, Tienda, etc",
      type: "text",
      className: "full-width",
       border:'border'
    },
    {
      id: 6,
      name: "ine",
      label: "INE/Pasaporte:",
      placeholder: 'Ine o pasaporte',
      type: "text",
      className: "full-width",
       border:'border'
    },
    {
      id: 7,
      name: "password",
      label: "Crear contraseña:",
      placeholder: "Contraseña",
      type: "password",
      className: "passwordSignUpSeller",
       border:'border'
    },
    {
      id: 8,
      name: "password2",
      label: "Confirmar contraseña:",
      placeholder: "Confirmar",
      type: "password",
      className: "passwordSignUpSeller",
       border:'border'
    },
  ];
  function handleChange(e) {
    setSellerData({ ...sellerData, [e.target.name]: e.target.value });
  }
  async function handleOnSubmit(e) {
    e.preventDefault();
    console.log(sellerData);
    try {
      const newSeller = { ...sellerData };
      const res = await signUpSellerRequest(newSeller);
      console.log(res.data);
      if (res.data.message) {
        return setAlert((prevValue) => ({
          ...prevValue,
          success: res.data.message,
        }));
      }
    } catch (error) {
      setAlert((prevValue) => ({
        ...prevValue,
        error: error.response.data.error,
      }));
    }
  }

  return (
    <section className="form-signUp-container">
      <h1>Regístrate como vendedor</h1>
      <form className="form-signUp" onSubmit={handleOnSubmit}>
        <div className="fields-grid">
          {formFields.map((field) => (
            <div key={field.id} className={`field ${field.className}`}>
              <label style={{color:'black'}} >{field.label}</label>
              <FieldOutlined
                onChange={handleChange}
                name={field.name}
                value={sellerData[field.name]}
                // placeholder={field.placeholder}
                type={field.type}
                className={`field ${field.border}`}
              />
            </div>
          ))}
        </div>

        <div className="button-container">
          <ButtonContained
            text="Enviar"
            backgroundColor="#2713C2"
            colorText="#fff"
            width="350px"
            height="45px"
            type="submit"
          />
        </div>
        <div className="alerts-container">
          <div className="success">
            {alert.success ? (
              <SuccessAlert
                type="success"
                text={alert.success}
                style={{ marginTop: "20px" }}
                onClose={() => {
                  setAlert((prevValue)=>({...prevValue,success:false}))
                }}
              />
            ) : (
              ""
            )}
          </div>
          <div className="error" >
            {alert.error ? (
              <ErrorAlert
                type="error"
                text={alert.error}
                style={{ marginTop: "20px" }}
                onClose={() => {
                  setAlert((prevValue)=>({...prevValue,error:false}))
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
