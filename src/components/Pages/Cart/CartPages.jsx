import "./cartPages.css";
import { useContext, useEffect } from "react";
import { productContext } from "../../../context/productsContext/productContext";
import CardProductsCart from "../../CardProductsCart/CardProductsCart";

export default function CartPages() {
    const { getProductsCart, listProductsCart, isLoading } = useContext(productContext);

    useEffect(() => {
        async function loadProductsCart() {
            await getProductsCart();
        }
        loadProductsCart();
    }, []);

    if (listProductsCart.length === 0 && !isLoading) {
        return (
            <div className="alerts-cartPages-container">
                <h1>¡No hay ningun producto en el carrito!</h1>
            </div>
        );
    }

    return (
        <>
            <h1 className="title-section-cart" >Mi carrito</h1>
        <section className="container-card-products-cart">
            {listProductsCart && !isLoading ? (
                listProductsCart.map((product) => (
                    <>
                    <CardProductsCart
                        key={product._id}
                        name={product.name}
                        category={product.category}
                        description={product.description}
                        price={product.price}
                        image={product.image}
                        productID={product._id}
                    />
                
                    </>
                ))
            ) : (
                <p className="loading-message">Cargando productos...</p>
            )}
        </section>
        </>
    );
}
