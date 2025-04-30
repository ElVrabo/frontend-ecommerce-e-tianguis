import { Star } from "../../../../Common/Icons/Icons";

export default function CardReviewsProduct({ rating, comment, date }) {
  return (
    <article className="
      bg-background-paper border border-card-border rounded-card
      p-5 mb-4 shadow-sm hover:shadow-md
      transition-all duration-card hover:-translate-y-1
      will-change-transform
    ">
      {/* Sistema de rating con estrellas */}
      <div className="flex items-center mb-3" aria-label={`Calificación: ${rating} de 5 estrellas`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
            aria-hidden="true"
          />
        ))}
        <span className="ml-2 text-sm text-card-text">
          {Number(rating).toFixed(1)} {/* Asegura que rating sea tratado como número */}
        </span>
      </div>
      
      {/* Comentario */}
      <blockquote className="text-base text-card-title mb-2">
        "{comment}"
      </blockquote>
      
      {/* Fecha */}
      <time 
        className="text-sm text-card-text"
        dateTime={new Date(date).toISOString()}
      >
        {new Date(date).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
    </article>
  );
}