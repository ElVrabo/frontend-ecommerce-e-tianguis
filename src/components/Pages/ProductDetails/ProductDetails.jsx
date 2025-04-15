import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productContext } from "../../../context/productsContext/productContext";
import "./ProductDetails.css"; // Importamos el archivo CSS
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
  // const productData = listProducts.find((product) => product._id === id)

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
      <section className="spinner-product-container">
        <Spinner />
      </section>
    );
  }

  return (
    <main className="product-detail-main">
      <section className="product-detail-container">
        <div className="product-detail-card">
          <img src={productData.file} alt="imagen del producto" />

          <div className="product-info">
            <h2 className="product-title">{productData.name}</h2>
            <p className="product-description">{productData.description}</p>
            <p className="product-price">{productData.price}</p>
            <p
              className="product-stock"
              style={{ color: productData.stock <= 1 ? "red" : "black" }}
            >
              Stock: {productData.stock}
            </p>

            <div className="button-add-cart">
              <ButtonContained
                text="Añadir al carrito"
                backgroundColor="#2713C2"
                colorText="#fff"
                width="250px"
                height="45px"
                onClick={async () => {
                  if (!isLoading && !isAuth && !userData) {
                    navigate("/signIn");
                    return;
                  }
                  await saveProductsCart(productData);
                }}
              />
              {!userData ? (
                ""
              ) : (
                <ButtonContained
                  text="Insertar una reseña"
                  className="btn-insert-review"
                  backgroundColor="#ffffff"
                  colorText="black"
                  border="1px solid #2713C2 "
                  width="250px"
                  height="45px"
                  onClick={handleOpenModal}
                />
              )}
              <div className="alerts-signUpBuyer">
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
              </div>
            </div>
          </div>
        </div>
        {/* <FormProductReview productId={id} userId={userData?.id} /> */}
      </section>
      <ListReviewsProducts productId={id} />
      <ReusableModal open={openModal} handleClose={handleCloseModal}>
        <FormProductReview productId={id} userId={userData?.id} />
      </ReusableModal>
      {/* <section className="form-insertReview-container" >
     <FormProductReview productId={id} userId={userData?.id} />
  </section> */}
    </main>
  );
}
