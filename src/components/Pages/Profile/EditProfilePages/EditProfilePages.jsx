import "./editProfilePages.css";
import { useState, useContext, useEffect } from "react";
// import { userContext } from "../../../context/userContext/userContext";
import { useNavigate } from "react-router-dom";
import { ButtonContained } from "../../../Common/Buttons/Buttons";
import { userContext } from "../../../../context/userContext/userContext";

export default function EditProfile() {
//   const { userData, updateUserById } = useContext(userContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const {userData, updateUserById,getUserById} = useContext(userContext)
  const navigate = useNavigate()

  useEffect(()=>{
      if(userData){
        setFormData({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone ||''
        })
      }
  },[])

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) =>{
    e.preventDefault()
    await updateUserById(userData.id, formData)
    await getUserById(userData.id)
    navigate('/profile')
  }



  return (
    <section className="edit-profile-section">
      <div className="edit-profile-container">
        <h1 className="edit-title">Editar Perfil</h1>
        <form className="edit-form" onSubmit={handleOnSubmit} >
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleOnChange}
            placeholder="Ingresa tu nombre"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            placeholder="Ingresa tu email"
            required
          />

          <label>Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleOnChange}
            placeholder="Ingresa tu teléfono"
            required
          />

          <div className="button-container">
            <ButtonContained
              text="Guardar Cambios"
              backgroundColor="#2713C2"
              colorText="#fff"
              width="250px"
              height="45px"
              type='submit'
            />
          </div>
        </form>
      </div>
    </section>
  );
}
