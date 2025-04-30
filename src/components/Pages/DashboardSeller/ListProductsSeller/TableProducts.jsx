import { useContext, useEffect } from 'react';
import { productContext } from '../../../../context/productsContext/productContext';
import { ButtonContained } from '../../../Common/Buttons/Buttons';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, UpdateIcon } from '../../../Common/Icons/Icons';
import { Spinner } from '../../../Common/Spinner/Spinner';

export default function TableProducts() {
    const navigate = useNavigate();
    const { getAllProducts, deleteProduct, listProducts, isLoading } = useContext(productContext);

    useEffect(() => {
        async function loadProducts() {
            await getAllProducts();
        }
        loadProducts();
    }, []);

    const handleDelete = async (productId) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            await deleteProduct(productId);
            await getAllProducts();
        }
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner className="h-12 w-12" />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Imagen
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Precio
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {listProducts.length > 0 ? (
                                listProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img 
                                                src={product.file} 
                                                alt={product.name} 
                                                className="h-12 w-12 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ${product.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.stock}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => navigate(`/addProducts/${product._id}`)}
                                                    className="text-primary-blue hover:text-primary-blue-dark p-1 rounded hover:bg-blue-50"
                                                    title="Editar"
                                                >
                                                    <UpdateIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                                                    title="Eliminar"
                                                >
                                                    <DeleteIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No hay productos registrados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}