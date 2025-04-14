import "./formProductReview.css";
import { useContext, useState } from "react";
import { productContext } from "../../../../context/productsContext/productContext";
import { SuccessAlert } from "../../../Common/Alerts/Alerts";
import { ButtonContained } from "../../../Common/Buttons/Buttons";

export default function FormProductReview({ productId, userId }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const { insertReviewProduct,alerts,setAlerts } = useContext(productContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const review = {
        productId,
        userId,
        rating,
        comment,
      };
      await insertReviewProduct(review);
      setRating('');
      setComment('');
    } catch (error) {
      console.log('Ha ocurrido el siguiente error:', error);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Deja tu reseña</h3>
      <div className="form-group">
        <label htmlFor="rating">Calificación (1 a 5)</label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="comment">Comentario</label>
        <textarea
          id="comment"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <div className="btn-send-review" >
      <ButtonContained
                      text="Enviar"
                      backgroundColor="#2713C2"
                      colorText="#fff"
                      width="400px"
                      height="45px"
                      type='submit'
                    />
      </div>
                    <div className="alerts-formInsertReview">
                      {alerts.success && (
                        <SuccessAlert
                          type="success"
                          text={alerts.success}
                          onClose={() => setAlerts({ ...alerts, success: "" })}
                        />
                      )}
                      </div>
    </form>
  );
}
