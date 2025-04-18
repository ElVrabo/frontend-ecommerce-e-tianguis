import CartIcon, { AccountIcon } from "../Common/Icons/Icons";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/userContext/userContext";
import { productContext } from "../../context/productsContext/productContext";
import AccountMenu from "../Common/Menus/MenuAccount";
import { ThemeToggle } from "../Common/ThemeToggle/ThemeToggle";

export default function Header() {
    const [productName, setProductName] = useState('');
    const [productNumbersCart, setProductsNumberCart] = useState(0);
    const { getProductByName, listProductsCart, getProductsCart } = useContext(productContext);
    const { theme } = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProductsByName() {
            if (!productName) return;
            await getProductByName(productName);
        }
        loadProductsByName();
    }, [productName]);

    useEffect(() => {
        getProductsCart();
    }, []);

    useEffect(() => {
        setProductsNumberCart(listProductsCart.length);
    }, [listProductsCart]);

    function handleOnChange(event) {
        setProductName(event.target.value);
    }

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300 sticky top-0 z-50">
            {/* Logo */}
            <h2 
                className="text-4xl font-serif text-gray-800 dark:text-white cursor-pointer hover:text-primary-blue dark:hover:text-primary-blue transition-colors duration-200"
                onClick={() => navigate('/')}
            >
                E-TIANGUIS
            </h2>

            {/* Barra de búsqueda */}
            <div className="flex-1 max-w-2xl mx-8">
                <input
                    type="text"
                    onChange={handleOnChange}
                    placeholder="Buscar productos..."
                    value={productName}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 transition-colors duration-200"
                />
            </div>

            {/* Iconos y controles */}
            <div className="flex items-center gap-6">
                {/* Toggle de Dark Mode */}
                <ThemeToggle />
                
                {/* Carrito */}
                <div 
                    className="flex items-center gap-2 cursor-pointer relative group"
                    onClick={() => navigate('/cart')}
                >
                    <CartIcon 
                        className="text-gray-600 dark:text-gray-300 group-hover:text-primary-blue dark:group-hover:text-primary-blue transition-colors duration-200" 
                        size="28px"
                    />
                    <span className={`text-lg font-medium ${
                        productNumbersCart <= 0 ? 'text-red-500 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'
                    } transition-colors duration-200`}>
                        {productNumbersCart}
                    </span>
                    {productNumbersCart > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary-blue text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                            {productNumbersCart}
                        </span>
                    )}
                </div>

                {/* Menú de cuenta */}
                <div className="account-icon-container">
                    <AccountMenu />
                </div>
            </div>
        </header>
    );
}