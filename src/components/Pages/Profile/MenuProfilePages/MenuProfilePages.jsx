import { useNavigate } from "react-router-dom";
import Header from "../../../Header/Header";
import "./menuProfilePages.css";

const menuItems = [
    { icon: "👤", text: "Mi cuenta", path: "/profile" },
    { icon: "⚙️", text: "Configuración", path: "/settings" },
    { icon: "🛒", text: "Mi carrito", path: "/orders" },
    { icon: "❤️", text: "Mis favoritos", path: "/direcctions" },
    { icon: "💳", text: "Métodos de pago", path: "/payments" },
    { icon: "🚪", text: "Servicio al cliente", path: "/coustomerServices" },
];

export default function MenuProfilePages() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Menu</h1>
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