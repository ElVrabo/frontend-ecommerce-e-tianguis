import { useContext } from "react";
import { userContext } from "./context/userContext/userContext";
import { Navigate, Outlet} from "react-router-dom";

export default function ProtectedRoutes(){
    const {isLoading,isAuth} = useContext(userContext)
    if(isLoading){
        return <h1>Verificando</h1>
    }
    return isAuth ? <Outlet /> : <Navigate to="/signIn" replace />;

}