import { useContext, useEffect, useState } from "react";
import { productContext } from "../../../context/productsContext/productContext";
import CardProductsCart from "../../CardProductsCart/CardProductsCart";
import { Spinner } from "../../Common/Spinner/Spinner";
import { ButtonContained } from "../../Common/Buttons/Buttons";
import { SuccessAlert } from "../../Common/Alerts/Alerts";

export default function CartPages() {
    const { 
        getProductsCart, 
        listProductsCart, 
        isLoading,
        clearCart,
        updateProductQuantity
    } = useContext(productContext);

    const [isClearing, setIsClearing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        async function loadProductsCart() {
            await getProductsCart();
        }
        loadProductsCart();
    }, []);

    const calculateTotal = () => {
        return listProductsCart.reduce(
            (total, product) => total + (product.price * (product.quantity || 1)), 
            0
        ).toFixed(2);
    };

    const handleClearCart = async () => {
        setIsClearing(true);
        try {
            await clearCart();
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } finally {
            setIsClearing(false);
        }
    };

    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity > 0) {
            await updateProductQuantity(productId, newQuantity);
        }
    };

    if (listProductsCart.length === 0 && !isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
                    <h1 className="text-2xl font-bold text-gray-800">
                        ¡Tu carrito está vacío!
                    </h1>
                    <p className="mt-4 text-gray-600">
                        Explora nuestros productos y añade algunos a tu carrito.
                    </p>
                    <ButtonContained
                        className="mt-6"
                        text="Ver productos"
                        onClick={() => window.location.href = '/'}
                    />
                </div>
            </div>
        );
    }

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Tu Carrito</h1>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Lista de productos */}
                <div className="lg:w-2/3">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <Spinner className="h-12 w-12" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {listProductsCart.map((product) => (
                                <CardProductsCart
                                    key={product._id}
                                    id={product._id}
                                    name={product.name}
                                    category={product.category}
                                    description={product.description}
                                    price={product.price}
                                    image={product.image}
                                    quantity={product.quantity || 1}
                                    onQuantityChange={handleQuantityChange}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Resumen del pedido */}
                <div className="lg:w-1/3">
                    <div className="bg-gray-50 p-6 rounded-xl sticky top-4">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">Resumen del Pedido</h2>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span>Productos ({listProductsCart.length}):</span>
                                <span>${calculateTotal()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Envío:</span>
                                <span className="text-green-600">Gratis</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-3 mt-2">
                                <span>Total:</span>
                                <span>${calculateTotal()}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <ButtonContained
                                text="Proceder al pago"
                                className="w-full"
                                onClick={() => window.location.href = '/checkout'}
                            />
                            
                            <button
                                onClick={handleClearCart}
                                disabled={isClearing}
                                className={`w-full py-2 px-4 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors ${
                                    isClearing ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {isClearing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Spinner className="h-4 w-4" />
                                        Vaciar carrito
                                    </span>
                                ) : 'Vaciar carrito'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alertas */}
            {showSuccess && (
                <div className="fixed bottom-4 right-4 z-50">
                    <SuccessAlert 
                        text="Carrito vaciado correctamente" 
                        onClose={() => setShowSuccess(false)} 
                    />
                </div>
            )}
        </section>
    );
}