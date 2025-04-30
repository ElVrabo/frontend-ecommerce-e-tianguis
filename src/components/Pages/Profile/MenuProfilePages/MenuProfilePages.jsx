import { useNavigate } from "react-router-dom";
import Header from "../../../Header/Header";
import "./menuProfilePages.css";
import { useContext } from "react";
import { userContext } from "../../../../context/userContext/userContext";

const menuItems = [
    { icon: "👤", text: "Mis datos", path: "/profile" },
    { icon: "⚙️", text: "Configuración", path: "/settings" },
    { icon: "🛒", text: "Mi carrito", path: "/cart" },
    { icon: "❤️", text: "Mis favoritos", path: "/favoriteProducts" },
    { icon: "💳", text: "Métodos de pago", path: "/payments" },
    { icon: "🚪", text: "Servicio al cliente", path: "/coustomerServices" },
];

export default function MenuProfilePages() {
    const {userData} = useContext(userContext)
    const navigate = useNavigate();

    return (
        <>
            <h1>Hola {userData?.name}</h1>
            <div className="body">
                <div className="menu-container">
                    {menuItems.map((item, index) => (
                        <div key={index} className="menu-card" onClick={() => navigate(item.path)}>
                            <span className="menu-icon">{item.icon}</span>
                            <span className="menu-text">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}