import Aside from "../../Aside/Aside";
import Card from "../../Common/Card/Card";
import { ButtonOutlined } from "../../Common/Buttons/Buttons";
import PlusIcon from "../../Common/Icons/Icons";

export default function DashboardSeller() {

  const metrics = [
    { title: "Productos Activos", value: "24", change: "+2 esta semana", trend: "up" },
    { title: "Ventas este mes", value: "$1,850", change: "12% vs mes pasado", trend: "up" },
    { title: "Órdenes pendientes", value: "5", change: "-3 esta semana", trend: "down" },
    { title: "Rating promedio", value: "4.7", change: "+0.2 este mes", trend: "up" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Aside />
      
      {/* Contenido principal */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Panel de Vendedor</h1>
            <p className="text-sm text-gray-500">Resumen de tu actividad comercial</p>
          </div>
          <ButtonOutlined 
            className="flex items-center gap-2 whitespace-nowrap"
            onClick={() => {/* Lógica para añadir producto */}}
          >
            <PlusIcon className="w-5 h-5" />
            Añadir Producto
          </ButtonOutlined>
        </div>
        
        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-md transition-shadow"
              shadow="sm"
              rounded="lg"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
                {metric.trend === "up" ? (
                  <span className="text-green-500">↑</span>
                ) : (
                  <span className="text-red-500">↓</span>
                )}
              </div>
              <p className="text-2xl font-bold mt-2 text-gray-800">{metric.value}</p>
              <p className={`text-xs mt-1 ${
                metric.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {metric.change}
              </p>
            </Card>
          ))}
        </div>
        
        {/* Secciones adicionales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de ventas */}
          <Card 
            className="p-6"
            shadow="sm"
            rounded="lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Ventas Recientes</h2>
              <select className="text-sm border border-gray-300 rounded px-2 py-1">
                <option>Últimos 7 días</option>
                <option>Este mes</option>
                <option>Este año</option>
              </select>
            </div>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
              <p>Gráfico de Ventas (Chart.js)</p>
            </div>
          </Card>
          
          {/* Productos más vendidos */}
          <Card 
            className="p-6"
            shadow="sm"
            rounded="lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Productos Destacados</h2>
              <button className="text-sm text-primary-blue hover:text-primary-blue-dark">
                Ver todos
              </button>
            </div>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
              <p>Lista de Productos Populares</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}