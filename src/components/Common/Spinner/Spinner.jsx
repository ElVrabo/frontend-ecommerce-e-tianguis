export function Spinner({ className = "" }) {
  return (
    <div className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${className}`}>
      <span className="sr-only">Cargando...</span>
    </div>
  );
}