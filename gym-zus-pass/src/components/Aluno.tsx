export default function Aluno() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h4 className="text-2xl font-bold mb-6 text-blue-600">Cadastro de Aluno</h4>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            <div className="md:col-span-12">
              <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">Nome Completo</label>
              <input type="text" id="fullName" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Digite seu nome completo" required />
            </div>

            <div className="md:col-span-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">E-mail</label>
              <input type="email" id="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="email@exemplo.com" required />
            </div>

            <div className="md:col-span-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Senha</label>
              <input type="password" id="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Crie uma senha" required />
            </div>

            <div className="md:col-span-4">
              <label htmlFor="birthDate" className="block text-gray-700 font-medium mb-1">Data de Nascimento</label>
              <input type="date" id="birthDate" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div className="md:col-span-4">
              <label htmlFor="zip" className="block text-gray-700 font-medium mb-1">CEP</label>
              <input type="text" id="zip" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="00000-000" required />
            </div>

            <div className="md:col-span-4">
              <label htmlFor="address" className="block text-gray-700 font-medium mb-1">Endereço (Rua/Av)</label>
              <input type="text" id="address" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Rua..." required />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="number" className="block text-gray-700 font-medium mb-1">Número</label>
              <input type="text" id="number" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nº" required />
            </div>

            <div className="md:col-span-9">
              <label htmlFor="address2" className="block text-gray-700 font-medium mb-1">
                Complemento <span className="text-gray-400 text-sm">(Opcional)</span>
              </label>
              <input type="text" id="address2" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Apartamento, bloco, fundos..." />
            </div>

            <div className="md:col-span-6">
              <label htmlFor="neighborhood" className="block text-gray-700 font-medium mb-1">Bairro</label>
              <input type="text" id="neighborhood" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div className="md:col-span-6">
              <label htmlFor="city" className="block text-gray-700 font-medium mb-1">Cidade</label>
              <input type="text" id="city" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors shadow-lg"
          >
            Finalizar Cadastro
          </button>
        </form>
      </div>
    </div>
  );
}