import { ButtonContained } from "../Common/Buttons/Buttons";
import "./formSignIn.css";
import { useContext, useState } from "react";
import googleIcon from "../../assets/images/google-removebg-preview.png"
import { FieldOutlined } from "../Common/Inputs/TextFields";
import { signInRequest } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { ErrorAlert } from "../Common/Alerts/Alerts";
import { userContext } from "../../context/userContext/userContext";

export default function FormSignIn() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const {signIn,alerts,setAlerts} = useContext(userContext)

  async function handleOnSubmit(event){
    event.preventDefault();
    await signIn(userData)
  }


  function handleOnChange(event) {
    setUserData((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <section className="form-signin-container">
        <h1>Inicia Sesión</h1>
      <form className="form-signIn" onSubmit={handleOnSubmit} >
        <div className="fields-signIn-container" >
          <div className="email-signIn" >
            <label>Email:</label>
            <FieldOutlined type='text' name='email' value={userData.email} onChange={handleOnChange} className='field-email-signIn'  />
          </div>
          <div className="password-signIn" >
            <label>Password:</label>
            <FieldOutlined type='password' name='password' value={userData.password} onChange={handleOnChange} className='field-password-signIn' />
          </div>
        </div>
          <div className="link-register-container" >
            <p>¿Eres nuevo?</p>
            <Link to='/selectAccount' className="link-register" >¡Registrate!</Link>
          </div>
          <div className="btn-send-formSignIn" >
          <ButtonContained
                     text="Enviar"
                     backgroundColor="#2713C2"
                     colorText="#fff"
                     width="250px"
                     height="45px"
                     type="submit"
                   />
          </div>
          <div className="alerts-container-signIn" >
         {alerts.error && <ErrorAlert type='error' text={alerts.error} onClose={() => setAlerts({ ...alerts, error: "" })} />}
        </div>
            {/* <div className="signin-google">
                <h2>O ingresa con</h2>
                <div onClick={()=>{
                    alert('deseas iniciar sesion con google')
                }} className="google-container">
                    <img src={googleIcon} />
                     <h2>Google</h2>
                    
                </div>
            </div> */}
      </form>
    </section>
  );
}
