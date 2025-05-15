import { userContext } from "../../context/userContext/userContext";
import { ErrorAlert, SuccessAlert } from "../Common/Alerts/Alerts";
import { ButtonContained } from "../Common/Buttons/Buttons";
import "./formPassword.css";
import React, { useContext, useState } from "react";

export default function FormPassword() {
  const [passwords, setPasswords] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { changePassword, alerts, setAlerts } = useContext(userContext);
  async function handleOnSubmit(e) {
    e.preventDefault();
    await changePassword(passwords);
    setPasswords({
      password: "",
      newPassword: "",
      confirmPassword: "",
    });
  }
  function handleOnChange(e) {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  }
  return (
    <form className="passwordUser-container" onSubmit={handleOnSubmit}>
      <h1 className="password-title" >Cambiar contraseña</h1>
      <label>Contraseña actual</label>
      <input
        type="password"
        name="password"
        value={passwords.password}
        className="passwordUser"
        onChange={handleOnChange}
      />
      <label>Nueva contraseña</label>
      <input
        type="password"
        name="newPassword"
        value={passwords.newPassword}
        className="passwordUser"
        onChange={handleOnChange}
      />
      <label>Confirmar contraseña</label>
      <input
        type="password"
        name="confirmPassword"
        value={passwords.confirmPassword}
        className="passwordUser"
        onChange={handleOnChange}
      />
      <div className="button-changePassword-container">
        <ButtonContained
          text="Cambiar contraseña"
          backgroundColor="#2713C2"
          colorText="#fff"
          width="250px"
          height="45px"
          type="submit"
        />
      </div>
      <div className="alerts-formPassword">
        {alerts.success && (
          <SuccessAlert
            type="success"
            text={alerts.success}
            onClose={() => setAlerts({ ...alerts, success: "" })}
          />
        )}
        {alerts.error && (
          <ErrorAlert
            type="error"
            text={alerts.error}
            onClose={() => setAlerts({ ...alerts, error: "" })}
          />
        )}
      </div>
    </form>
  );
}
