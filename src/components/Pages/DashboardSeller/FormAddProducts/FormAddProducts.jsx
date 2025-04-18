import { useContext, useEffect, useState } from "react";
import { ButtonContained } from "../../../Common/Buttons/Buttons";
import { productContext } from "../../../../context/productsContext/productContext";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorAlert, InfoAlert, SuccessAlert } from "../../../Common/Alerts/Alerts";
import { Spinner } from "../../../Common/Spinner/Spinner";

export default function FormAddProducts({ handleCloseModal }) {
    const [productData, setProductData] = useState(new FormData());
    const [loadImage, setLoadImage] = useState(false);
    const { addNewProduct, getProduct, updateProduct, product, alerts, setAlerts } = useContext(productContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProduct() {
            if (id) {
                await getProduct(id);
            }
        }
        loadProduct();
    }, [id]);

    useEffect(() => {
        if (product) {
            const formData = new FormData();
            formData.append("name", product.name || "");
            formData.append("description", product.description || "");
            formData.append("category", product.category || "");
            formData.append("price", product.price || "");
            formData.append("stock", product.stock || "");
            setProductData(formData);
        }
    }, [product]);

    useEffect(() => {
        if (loadImage === true) {
            setAlerts({ ...alerts, info: 'Cargando imagen...' });
        } else {
            setAlerts({ ...alerts, info: "" });
        }
    }, [loadImage]);

    async function handleOnSubmit(event) {
        event.preventDefault();

        if (!productData.has('file') && !id) {
            setAlerts({ ...alerts, error: "Debes subir una imagen del producto" });
            return;
        }

        if (id) {
            await updateProduct(id, productData);
            setProductData(new FormData());
            handleCloseModal?.() || navigate("/productsSeller");
        } else {
            await addNewProduct(productData);
            setProductData(new FormData());
            handleCloseModal?.();
        }

        
    }

    function handleOnChange(event) {
        const { name, value } = event.target;
        const newFormData = new FormData();
        productData.forEach((val, key) => newFormData.append(key, val));
        newFormData.set(name, value);
        setProductData(newFormData);
    }

    async function removeBackground(file) {
        const formData = new FormData();
        formData.append("image_file", file);
        formData.append("size", "auto");

        try {
            const res = await fetch("https://api.remove.bg/v1.0/removebg", {
                method: "POST",
                headers: {
                    "X-Api-Key": "mqVS62XPUsEP6EQoDn3waA7Y",
                },
                body: formData,
            });

            if (!res.ok) return null;
            return await res.blob();
        } catch (error) {
            console.error("Error en remove.bg", error);
            return null;
        }
    }

    async function handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        setLoadImage(true);

        const imageUrlWithoutBg = await removeBackground(file);
        if (!imageUrlWithoutBg) {
            setLoadImage(false);
            return;
        }

        const fileWithoutBg = new File([imageUrlWithoutBg], "image.png", { type: "image/png" });
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", fileWithoutBg);
        cloudinaryFormData.append("upload_preset", "project-react-ecommerce");
        cloudinaryFormData.append("cloud_name", "dc16nkez3");

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dc16nkez3/image/upload", {
                method: "POST",
                body: cloudinaryFormData,
            });

            if (!res.ok) {
                setLoadImage(false);
                return;
            }

            const imageUrl = await res.json();
            const updatedFormData = new FormData();
            productData.forEach((val, key) => updatedFormData.append(key, val));
            updatedFormData.append("file", imageUrl.url);
            setProductData(updatedFormData);
            setLoadImage(false);
            setAlerts({ ...alerts, info: 'Imagen cargada correctamente' });
        } catch (error) {
            setLoadImage(false);
            setAlerts({ ...alerts, error: "Error al subir la imagen" });
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md mt-8 transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {id ? "Editar Producto" : "Añadir Producto"}
                </h2>
                {handleCloseModal && (
                    <button 
                        onClick={handleCloseModal}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        ✕
                    </button>
                )}
            </div>

            <form onSubmit={handleOnSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombre */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={productData.get('name') || ''}
                            onChange={handleOnChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Nombre del producto"
                            required
                        />
                    </div>

                    {/* Descripción */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={productData.get('description') || ''}
                            onChange={handleOnChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Descripción del producto"
                            required
                            rows={3}
                        />
                    </div>

                    {/* Categoría */}
                    <div className="space-y-2">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Categoría
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={productData.get('category') || ''}
                            onChange={handleOnChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            required
                        >
                            <option value="" disabled className="text-gray-400">Selecciona una categoría</option>
                            <option value="artesanias">Artesanías</option>
                            <option value="pinturas">Pinturas</option>
                            <option value="cocina">Cocina</option>
                            <option value="accesorios">Accesorios</option>
                        </select>
                    </div>

                    {/* Precio */}
                    <div className="space-y-2">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Precio
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={productData.get('price') || ''}
                            onChange={handleOnChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Precio del producto"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>

                    {/* Stock */}
                    <div className="space-y-2">
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Stock
                        </label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={productData.get('stock') || ''}
                            onChange={handleOnChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Stock disponible"
                            required
                            min="0"
                        />
                    </div>

                    {/* Imagen */}
                    <div className="space-y-2">
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Imagen del producto
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={handleFileUpload}
                                className="block w-full text-sm text-gray-500 dark:text-gray-400
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-lg file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-primary-blue file:text-white
                                  hover:file:bg-primary-blue-dark
                                  dark:file:bg-primary-blue-dark dark:hover:file:bg-primary-blue-darker"
                                required={!id}
                                accept="image/*"
                            />
                            {loadImage && <Spinner className="h-5 w-5 text-primary-blue dark:text-primary-blue-light" />}
                        </div>
                    </div>
                </div>

                {/* Alertas */}
                <div className="space-y-2">
                    {alerts.success && (
                        <SuccessAlert
                            type="success"
                            text={alerts.success}
                            onClose={() => setAlerts({ ...alerts, success: "" })}
                        />
                    )}
                    {alerts.error && (
                        <ErrorAlert
                            type="error"
                            text={alerts.error}
                            onClose={() => setAlerts({ ...alerts, error: "" })}
                        />
                    )}
                    {alerts.info && (
                        <InfoAlert
                            type="info"
                            text={alerts.info}
                            onClose={() => setAlerts({ ...alerts, info: "" })}
                        />
                    )}
                </div>

                {/* Botón de envío */}
                <div className="flex justify-center pt-4">
                    <ButtonContained
                        type="submit"
                        className="w-full max-w-md"
                        disabled={loadImage}
                    >
                        {loadImage ? (
                            <div className="flex items-center justify-center gap-2">
                                <Spinner className="h-5 w-5" />
                                Procesando...
                            </div>
                        ) : (
                            id ? "Actualizar Producto" : "Añadir Producto"
                        )}
                    </ButtonContained>
                </div>
            </form>
        </div>
    );
}