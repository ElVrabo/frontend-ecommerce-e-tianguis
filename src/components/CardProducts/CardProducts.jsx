import { useNavigate } from "react-router-dom";
import { ButtonContained } from "../Common/Buttons/Buttons";
import Card from "../Common/Card/Card";

export default function CardProducts({ 
  name, 
  image, 
  productID, 
  className = "" 
}) {
  const navigate = useNavigate();

  return (
    <Card 
      className={`flex flex-col p-5 hover:-translate-y-1 ${className}`}
      hoverEffect
      rounded="xl"
    >
      <div className="w-full h-[200px] mb-4 overflow-hidden rounded-lg">
        <img 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-card"
          src={image} 
          alt={`Producto: ${name}`}
          loading="lazy"
          decoding="async"
        />
      </div>

      <h2 className="text-lg font-semibold text-card-title mb-4 line-clamp-2 text-left">
        {name}
      </h2>

      <ButtonContained
        text="Ver detalles"
        className="w-full"
        onClick={() => navigate(`/product/${productID}`)}
      />
    </Card>
  );
}