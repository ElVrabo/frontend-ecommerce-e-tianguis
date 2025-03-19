import "./profilePages.css";
import { useContext, useEffect } from "react";
import { userContext } from "../../../context/userContext/userContext";
import { ButtonContained } from "../../Common/Buttons/Buttons";
import { useNavigate } from "react-router-dom";

export default function ProfilePages() {
  const { userData, isAuth, isLoading, getUserById } = useContext(userContext);
  const navigate = useNavigate()


  useEffect(() => {
    async function getUser() {
      if (!userData && !isLoading) return;
      await getUserById(userData.id);
      
    }
    getUser();
  }, []);

  if (userData && !isLoading && isAuth) {
    return (
      <section className="profile-section-main" >
        <div className="profile-container">
        <h1 className="profile-title">Perfil de Usuario</h1>
        <div className="profile-card">
          <p><span>Nombre:</span> {userData?.name}</p>
          <p><span>Email:</span> {userData?.email}</p>
          <p><span>Teléfono:</span> {userData?.phone}</p>
          <p><span>Rol:</span> {userData?.role}</p>
          <p><span>Creado el:</span> {new Date(userData?.date).toLocaleDateString()}</p>
          <div className="button-edit-profile-container" >
          <ButtonContained
           text="Editar informacion"
           backgroundColor="#2713C2"
           colorText="#fff"
           width="250px"
           height="45px"
           onClick={()=>{
              navigate(`/editProfile`)
           }}
          />
          </div>
        </div>
      </div>
      </section>
    );
  }

  return <h1 className="no-user">No se encontró al usuario</h1>;
}
