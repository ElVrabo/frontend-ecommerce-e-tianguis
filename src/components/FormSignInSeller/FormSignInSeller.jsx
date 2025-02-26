import { ButtonContained } from "../Common/Buttons/Buttons";
import "./formSignInSeller.css";
import { useState } from "react";
import googleIcon from "../../assets/images/google-removebg-preview.png"
import { FieldOutlined } from "../Common/Inputs/TextFields";

export default function FormSignInSeller() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const formFields = [
    {
      id: 1,
      name: "email",
      label: "Email:",
      placeholder: "Ingresa tu email",
      type: "text",
      className: "emailSignInSeller",
    },
    {
      id: 2,
      name: "password",
      label: "Password:",
      placeholder: "Ingresa tu contraseña",
      type: "password",
      className: "passwordSignInSeller",
    },
  ];

  function handleChange(event) {
    setUserData((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className="form-signin-container">
      <form className="form-signIn">
        <h1>Inicia Sesión</h1>
        {formFields.map((field) => (
          <div className="field-signInSeller-container" key={field.id}>
            <label>{field.label}</label>
            <FieldOutlined
              onChange={handleChange}
              name={field.name}
              value={userData[field.name]}
              type={field.type}
              // placeholder={field.placeholder}
              className={`field  ${field.className}`}
            />
          </div>
        ))}
          <ButtonContained
                     text="Enviar"
                     backgroundColor="#2713C2"
                     colorText="#fff"
                     width="350px"
                     height="45px"
                     type="submit"
                   />
            <div className="signin-google">
                <h2>O ingresa con</h2>
                <div onClick={()=>{
                    alert('deseas iniciar sesion con google')
                }} className="google-container">
                    <img src={googleIcon} />
                     <h2>Google</h2>
                    
                </div>
            </div>
      </form>
    </div>
  );
}
