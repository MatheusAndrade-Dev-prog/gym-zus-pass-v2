export default function Explorar() {
 
  const albuns = Array.from({ length: 9 });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
      
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Explorar Unidades</h2>
          <p className="text-gray-600 mt-2">Encontre a academia ideal para o seu treino de hoje.</p>
        </div>

   
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albuns.map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              
             
              <div className="w-full h-48 bg-gray-600 flex items-center justify-center text-gray-200">
                <span className="text-sm font-medium">Thumbnail</span>
              </div>

           
              <div className="p-5">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Esta é uma descrição curta sobre a unidade ou serviço, oferecendo detalhes relevantes para o aluno.
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="space-x-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-600 transition-colors">
                      Ver mais
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-600 transition-colors">
                      Editar
                    </button>
                  </div>
                
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}