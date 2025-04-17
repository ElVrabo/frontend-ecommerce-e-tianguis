export default function Card({ 
  children, 
  className = "",
  hoverEffect = true,
  shadow = "md",
  rounded = "card" // Usar el valor configurado en tailwind
}) {
  return (
    <div className={`
      bg-background-paper border border-card-border overflow-hidden
      shadow-${shadow}
      rounded-${rounded}
      ${hoverEffect ? 'transition-all duration-card hover:shadow-card-hover' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}