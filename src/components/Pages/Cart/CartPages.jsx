import "./cartPages.css";
import { useContext, useEffect } from "react";
import { productContext } from "../../../context/productsContext/productContext";
import CardProductsCart from "../../CardProductsCart/CardProductsCart";

export default function CartPages() {
    const { getProductsCart, listProductsCart, isLoading, alerts } = useContext(productContext);

    useEffect(() => {
        async function loadProductsCart() {
            await getProductsCart();
        }
        loadProductsCart();
    }, []);

    if (alerts.error) {
        return (
            <div className="alerts-cartPages-container">
                <h1>{alerts.error}</h1>
            </div>
        );
    }

    return (
        <section className="container-card-products-cart">
            {listProductsCart && !isLoading ? (
                listProductsCart.map((product) => (
                    <CardProductsCart
                        key={product._id}
                        name={product.name}
                        category={product.category}
                        description={product.description}
                        price={product.price}
                        stock={product.stock}
                        image={product.image}
                        productID={product._id}
                    />
                ))
            ) : (
                <p className="loading-message">Cargando productos...</p>
            )}
        </section>
    );
}
