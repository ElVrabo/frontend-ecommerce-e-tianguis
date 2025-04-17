import { useContext, useState } from "react";
import { productContext } from "../../../../context/productsContext/productContext";
import { SuccessAlert } from "../../../Common/Alerts/Alerts";
import { ButtonContained } from "../../../Common/Buttons/Buttons";
import { Spinner } from "../../../Common/Spinner/Spinner";

export default function FormProductReview({ productId, userId }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const { insertReviewProduct, alerts, setAlerts } = useContext(productContext);

  const validateRating = (value) => {
    if (value < 1 || value > 5) {
      setErrors({...errors, rating: 'La calificación debe ser entre 1 y 5'});
      return false;
    }
    setErrors({...errors, rating: ''});
    return true;
  };

  const handleCommentChange = (e) => {
    const text = e.target.value;
    setComment(text);
    setCharCount(text.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateRating(rating)) return;
    
    setIsSubmitting(true);
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
      setCharCount(0);
    } catch (error) {
      console.error('Error al enviar reseña:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="
        w-full max-w-[500px] mx-auto my-8 p-6 
        bg-background-paper rounded-card 
        shadow-md hover:shadow-lg transition-shadow
        font-sans border border-card-border
      "
    >
      <h3 className="text-center mb-6 text-xl font-semibold text-card-title">
        Deja tu reseña
      </h3>
      
      {/* Rating con estrellas */}
      <div className="flex flex-col mb-5">
        <label className="mb-2 font-medium text-card-text">
          Calificación
        </label>
        <div className="flex items-center gap-1 mb-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => {
                setRating(star.toString());
                validateRating(star);
              }}
              className={`
                text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}
                hover:text-yellow-400 transition-colors
              `}
            >
              ★
            </button>
          ))}
          <span className="ml-2 text-sm text-card-text">
            ({rating}/5)
          </span>
        </div>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
            validateRating(e.target.value);
          }}
          className="hidden"
          required
        />
        {errors.rating && (
          <p className="text-sm text-red-500 mt-1">{errors.rating}</p>
        )}
      </div>
      
      {/* Campo de comentario */}
      <div className="flex flex-col mb-5">
        <label 
          htmlFor="comment"
          className="mb-2 font-medium text-card-text"
        >
          Comentario
          <span className="ml-2 text-sm text-gray-500">
            ({charCount}/500 caracteres)
          </span>
        </label>
        <textarea
          id="comment"
          rows="4"
          value={comment}
          onChange={handleCommentChange}
          maxLength="500"
          className="
            p-3 border border-input-border rounded-lg
            focus:border-input-focus focus:ring-2 focus:ring-primary-blue
            transition-input resize-none
          "
          required
        />
      </div>
      
      {/* Botón de envío */}
      <div className="flex justify-center mb-4">
        <ButtonContained
          className="w-full max-w-[400px] h-[45px]"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner className="h-5 w-5 text-white" />
              Enviando...
            </div>
          ) : (
            "Enviar reseña"
          )}
        </ButtonContained>
      </div>
      
      {/* Alertas y mensajes */}
      <div className="mt-4 space-y-3">
        {alerts.success && (
          <SuccessAlert
            text={alerts.success}
            onClose={() => setAlerts({ ...alerts, success: "" })}
            className="border-l-4 border-green-500 bg-green-50"
          />
        )}
        
        {charCount > 450 && (
          <div className="text-sm text-yellow-600">
            Estás cerca del límite de caracteres ({charCount}/500)
          </div>
        )}
      </div>
    </form>
  );
}