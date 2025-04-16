import { useNavigate } from "react-router-dom";
import Header from "../../../Header/Header";
import "./MenuProfile.css";

const menuItems = [
    { icon: "👤", text: "Mi cuenta", path: "/profile" },
    { icon: "⚙️", text: "Configuración", path: "/settings" },
    { icon: "📦", text: "Pedidos", path: "/orders" },
    { icon: "❤️", text: "Direcciones", path: "/direcctions" },
    { icon: "💳", text: "Métodos de pago", path: "/payments" },
    { icon: "🚪", text: "Servicio al cliente", path: "/coustomerServices" },
];

export default function MenuProfilePages() {
    const navigate = useNavigate();

    return (
        <>
            <Header />
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