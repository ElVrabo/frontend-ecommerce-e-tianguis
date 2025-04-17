import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productContext } from "../../../context/productsContext/productContext";
import { ButtonContained } from "../../Common/Buttons/Buttons";
import { userContext } from "../../../context/userContext/userContext";
import { ErrorAlert, SuccessAlert } from "../../Common/Alerts/Alerts";
import FormProductReview from "./FormProductReview/FormProductReview";
import { Spinner } from "../../Common/Spinner/Spinner";
import ReusableModal from "../../AddProductModal/AddProductModal";
import ListReviewsProducts from "./ListReviewsProduct/ListReviewsProduct";

export default function ProductDetails() {
  const [productData, setProductData] = useState(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { isLoading, isAuth, userData } = useContext(userContext);
  const { listProducts, saveProductsCart, alerts, setAlerts, getProduct } =
    useContext(productContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProduct() {
      const data = await getProduct(id);
      setProductData(data);
      setIsLoadingProduct(false);
    }
    loadProduct();
  }, [id]);

  if (isLoadingProduct) {
    return (
      <section className="flex justify-center items-center min-h-[70vh]">
        <Spinner className="h-12 w-12 text-primary-blue" />
      </section>
    );
  }

  return (
    <main className="py-8">
      {/* Detalles del producto */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row bg-background-paper rounded-card shadow-md overflow-hidden">
          {/* Imagen del producto */}
          <div className="md:w-1/2 p-6 flex justify-center">
            <img 
              src={productData.file} 
              alt={productData.name}
              className="w-full max-w-md h-auto object-cover rounded-lg"
            />
          </div>

          {/* Información del producto */}
          <div className="md:w-1/2 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-card-title mb-4">
              {productData.name}
            </h2>
            
            <p className="text-base text-card-text mb-6">
              {productData.description}
            </p>
            
            <div className="space-y-3 mb-6">
              <p className="text-xl font-bold text-primary-blue">
                ${parseFloat(productData.price).toFixed(2)}
              </p>
              <p className={`text-lg font-semibold ${
                productData.stock <= 1 ? 'text-red-500' : 'text-card-text'
              }`}>
                Stock: {productData.stock}
              </p>
            </div>

            {/* Botones */}
            <div className="space-y-4">
              <ButtonContained
                text="Añadir al carrito"
                className="w-full md:w-64"
                onClick={async () => {
                  if (!isLoading && !isAuth && !userData) {
                    navigate("/signIn");
                    return;
                  }
                  await saveProductsCart(productData);
                }}
              />
              
              {userData && (
                <ButtonContained
                  text="Insertar una reseña"
                  className="w-full md:w-64 bg-white text-card-title border border-primary-blue hover:bg-gray-50"
                  onClick={handleOpenModal}
                />
              )}

              {/* Alertas */}
              <div className="mt-4 space-y-2">
                {alerts.success && (
                  <SuccessAlert
                    text={alerts.success}
                    onClose={() => setAlerts({ ...alerts, success: "" })}
                  />
                )}
                {alerts.error && (
                  <ErrorAlert
                    text={alerts.error}
                    onClose={() => setAlerts({ ...alerts, error: "" })}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listado de reseñas */}
      <ListReviewsProducts productId={id} />

      {/* Modal para reseñas */}
      <ReusableModal open={openModal} handleClose={handleCloseModal}>
        <FormProductReview productId={id} userId={userData?.id} />
      </ReusableModal>
    </main>
  );
}