import { useContext, useEffect } from "react";
import { productContext } from "../../../../context/productsContext/productContext";
import CardReviewsProduct from "./CardReviewsProduct/CardReviewsProduct";
import { Spinner } from "../../../Common/Spinner/Spinner";

export default function ListReviewsProducts({ productId }) {
  const { getReviewProduct, listReviewsProduct, isLoading } = useContext(productContext);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        await getReviewProduct(productId);
      } catch (error) {
        console.error("Error loading reviews:", error);
      }
    };

    loadReviews();
  }, [productId, getReviewProduct]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spinner className="h-12 w-12 text-primary-blue" />
        <span className="sr-only">Cargando reseñas...</span>
      </div>
    );
  }

  if (!listReviewsProduct || listReviewsProduct.length === 0) {
    return (
      <section className="text-center my-12 px-4">
        <h2 className="text-3xl md:text-4xl font-medium text-card-text mb-4">
          No hay reseñas aún
        </h2>
        <p className="text-lg text-card-text">
          Sé el primero en opinar sobre este producto
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <header className="text-center mb-10 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-card-title">
          Opiniones sobre el producto
        </h1>
        <div className="mt-2 flex justify-center items-center">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${
                  calculateAverageRating(listReviewsProduct) >= star
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-lg text-card-text">
              ({calculateAverageRating(listReviewsProduct).toFixed(1)}/5.0)
            </span>
          </div>
          <span className="mx-4 text-card-text">|</span>
          <span className="text-card-text">
            {listReviewsProduct.length} {listReviewsProduct.length === 1 ? 'reseña' : 'reseñas'}
          </span>
        </div>
      </header>

      <div className="space-y-6">
        {listReviewsProduct
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((review) => (
            <CardReviewsProduct
              key={review._id}
              rating={review.rating}
              comment={review.comment}
              date={review.date}
              userName={review.user?.name || 'Anónimo'}
            />
          ))}
      </div>
    </section>
  );
}

// Función helper para calcular el rating promedio
function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}