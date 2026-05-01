import Link from 'next/link';

export default function Topo() {
  return (
    <nav>
    <div className="flex flex-col w-full">
     
      <nav className="h-16 bg-white text-black flex items-center px-5 gap-4 w-full">
        
        
        <div className="shrink-0 mr-4">
          <h1 className="text-ml font-bold text-green-500 tracking-tight">
            GymZus Pass
          </h1>
        </div>

    
        <div className="flex-1 flex justify-center">
  <ul className="hidden lg:flex flex-row gap-6 font-medium">
    <li>
      <Link href="/" className="text-gray-600 hover:text-black active:text-gray-600 visited:text-gray-600 outline-none">
        Home
      </Link>
    </li>
    <li>
      <Link href="/explorar" className="text-gray-600 hover:text-black active:text-gray-600 visited:text-gray-600 outline-none">
        Explorar
      </Link>
    </li>
    <li>
      <Link href="/solicitacoes" className="text-black-600 hover:text-black active:text-gray-600 visited:text-gray-600 outline-none">
        Solicitações
      </Link>
    </li>
    <li>
      <Link href="/sobre" className="text-gray-600 hover:text-black active:text-gray-600 visited:text-gray-600 outline-none">
        Sobre
      </Link>
    </li>
  </ul>
</div>

        
        <div className="flex flex-row items-center gap-3 ml-auto">
        
          <div className="relative">
            <input 
              className="w-48 xl:w-64 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-400 shadow-sm" 
              type="search" 
              placeholder="Search..." 
            />
          </div>

          
          <Link href="/login" className="border border-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium whitespace-nowrap">
            Fazer Login
          </Link>

          
          <Link href="/cadastro-aluno" className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md text-black font-bold transition-all text-sm whitespace-nowrap">
            Sou Aluno
          </Link>

          <Link href="/cadastro-instrutor" className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md text-black font-bold transition-all text-sm whitespace-nowrap">
            Sou Professor
          </Link>
        </div>
      </nav>

      {/* FAIXA VERDE (Que aparece na base das suas duas imagens) */}
      <div className="cabecario"></div>
    </div>
    </nav>
  );
}
