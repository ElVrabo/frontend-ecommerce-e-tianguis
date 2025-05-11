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
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { isLoading, isAuth, userData } = useContext(userContext);
  const {
    listProducts,
    saveProductsCart,
    alerts,
    setAlerts,
    getProduct,
    product,
    saveFavoriteProduct,
  } = useContext(productContext);
  const { id } = useParams();
  const navigate = useNavigate();
  // const productData = listProducts.find((product) => product._id === id)

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    async function loadProduct() {
      await getProduct(id);
      setIsLoadingProduct(false);
    }
    loadProduct();
  }, [id]);

  if (!product && isLoadingProduct) {
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
          <img src={product.file} alt="imagen del producto" />

          <div className="product-info">
            <h2 className="product-title">{product.name}</h2>
            <p>Categoria: {product.category}</p>
            <p className="product-description">{product.description}</p>
            <p
              className="product-stock"
              style={{ color: product.stock <= 1 ? "red" : "black" }}
            >
              Stock: {product.stock}
            </p>
            <div className="product-price-container">
              {product.offer ? (
                <>
                  <p className="product-notOffer-price">
                    {product.price}
                  </p>
                  <p className="product-offer-price">{product.offerPrice}</p>
                </>
              ) : (
                <p className="original-price">{product.price}</p>
              )}
            </div>
           

            <h2 className="product-offer">
              {product.offer
                ? `Oferta valida hasta el ${product.offerExpire}`
                : ""}
            </h2>

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
                  await saveProductsCart(product);
                }}
              />
              <ButtonContained
                text="Añadir a favoritos"
                backgroundColor="#2713C2"
                colorText="#fff"
                width="250px"
                height="45px"
                onClick={async () => {
                  if (!isLoading && !isAuth && !userData) {
                    navigate("/signIn");
                    return;
                  }
                  await saveFavoriteProduct(product);
                }}
              />
              <ButtonContained
                text="Comprar ahora"
                className="btn-insert-review"
                backgroundColor="#ffffff"
                colorText="black"
                border="1px solid #2713C2 "
                width="250px"
                height="45px"
                onClick={handleOpenModal}
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
