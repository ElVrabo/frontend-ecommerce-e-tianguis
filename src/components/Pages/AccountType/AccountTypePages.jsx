import { useNavigate } from "react-router-dom";

export default function AccountTypePages() {
    const navigate = useNavigate();

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="bg-white rounded-xl shadow-xl p-12 flex flex-col items-center justify-center gap-12 w-full max-w-2xl">
                <h2 className="text-4xl font-serif text-gray-800 text-center">
                    ¿Qué tipo de cuenta deseas?
                </h2>
                
                <div className="flex flex-wrap justify-center gap-8 w-full">
                    {/* Tarjeta Comprador */}
                    <div 
                        onClick={() => navigate('/signUpBuyer')}
                        className="flex-1 min-w-[250px] max-w-[300px] h-48 border-2 border-primary-blue rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:bg-primary-blue/5 hover:border-primary-blue-dark cursor-pointer group"
                    >
                        <h3 className="text-2xl font-medium text-gray-700 group-hover:text-primary-blue-dark">
                            Comprador
                        </h3>
                    </div>
                    
                    {/* Tarjeta Vendedor */}
                    <div 
                        onClick={() => navigate('/signUpSeller')}
                        className="flex-1 min-w-[250px] max-w-[300px] h-48 border-2 border-primary-blue rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:bg-primary-blue/5 hover:border-primary-blue-dark cursor-pointer group"
                    >
                        <h3 className="text-2xl font-medium text-gray-700 group-hover:text-primary-blue-dark">
                            Vendedor
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
}