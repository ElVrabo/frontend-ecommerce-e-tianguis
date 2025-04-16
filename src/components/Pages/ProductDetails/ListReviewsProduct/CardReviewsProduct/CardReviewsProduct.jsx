import "./cardReviewsProduct.css";
import Rating from "@mui/material/Rating";
export default function CardReviewsProduct(props) {
  const { rating, comment, date } = props;
  return (
    <div className="card-body-reviews">
      <Rating name="read-only" value={rating} readOnly />
      <p>{comment}</p>
      <p>
        {new Date(date).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
