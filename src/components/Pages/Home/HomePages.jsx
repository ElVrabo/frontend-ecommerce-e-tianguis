import Header from "../../Header/Header";
import { useContext, useEffect, useState } from "react";
import { productContext } from "../../../context/productsContext/productContext";
import CardProducts from "../../CardProducts/CardProducts";
import { Spinner } from "../../Common/Spinner/Spinner";

export default function HomePages() {
    const [category, setCategory] = useState("");
    const { getAllProducts, getProductByCategory, listProducts, isLoading } = useContext(productContext);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    useEffect(() => {
        if (category) {
            getProductByCategory(category);
        }
    }, [category]);

    return (
        <div className="min-h-screen bg-background-paper">
            <Header />
            
            {/* Filtros y categorías */}
            <section className="mt-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                    <select 
                        className="
                            w-full sm:w-auto px-8 py-2 rounded-card border border-input-border
                            bg-input-filled-bg text-card-text focus:border-input-focus
                            focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50
                            transition-input cursor-pointer hover:border-primary-blue
                            max-w-xs
                        "
                        value={category} 
                        onChange={handleCategoryChange}
                    >
                        <option value="" disabled>Categorías</option>
                        <option value="artesanias">Artesanías</option>
                        <option value="pinturas">Pinturas</option>
                        <option value="cocina">Cocina</option>
                        <option value="accesorios">Accesorios</option>
                    </select>
                    
                    <div className="flex gap-6">
                        <button className="text-lg font-medium text-card-text hover:text-primary-blue transition-colors">
                            Tendencias
                        </button>
                        <button className="text-lg font-medium text-card-text hover:text-primary-blue transition-colors">
                            Ofertas
                        </button>
                        <button className="text-lg font-medium text-card-text hover:text-primary-blue transition-colors">
                            Ayuda
                        </button>
                    </div>
                </div>
            </section>

            {/* Listado de productos */}
            <section className="py-8 px-4 sm:px-6 lg:px-8">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spinner className="h-12 w-12 text-primary-blue" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                        {listProducts?.map((product) => (
                            <CardProducts
                                key={product._id}
                                name={product.name}
                                image={product.file}
                                productID={product._id}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}