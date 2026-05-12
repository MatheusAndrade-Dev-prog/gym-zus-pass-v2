"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Topo() {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md">
    <div className="flex flex-col w-full ">

      <nav className="conteiner-cabecario flex items-center justify-between flex-wrap px-6 py-2"> 
        
        <div className="shrink-0 mr-4">
          <h3 className="text-ml font-bold text-green-500 tracking-tight">
            GymZus Pass
          </h3>
        </div>

<div className="flex-1 flex justify-center "> 
     <ul className="hidden lg:flex flex-row gap-6 font-medium text-3xl md:flex flex-row gap-4 font-medium text-2x1">
    <li>
      <Link href="/" className="text-gray-900 hover:text-black active:text-gray-600 visited:text-gray-600 outline-none">
        Home
      </Link>
    </li>
    <li>
      <Link href="/explorar" className="text-gray-900 hover:text-black active:text-gray-600 visited:text-gray-600 outline-none">
        Explorar
      </Link>
    </li>
    <li>
      <Link href="/solicitacoes" className="text-gray-900 hover:text-black active:text-gray-600 visited:text-gray-600 outline-none">
        Solicitações
      </Link>
    </li>
    <li>
      <Link href="/sobre" className="text-gray-900 hover:text-black active:text-gray-600 visited:text-gray-600 outline-none">
        Sobre
      </Link>
    </li>
  </ul>
</div>

        
        <div className="flex flex-row items-center gap-3 ml-auto"> 
        
          <div className="relative">
            <input 
              className="w-48 xl:w-64 border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-400 shadow-sm" 
              type="search" 
              placeholder="Search..." 
            />
          </div>

          
          <Link href="/login" className="border border-black text-gray-900 px-2 py-1 border-r-2 rounded-md">
            Fazer Login
          </Link>

          <div className="relative border bg-yellow-400 border-black px-1 py-1 border-r-2  rounded-md hover:bg-gray-100 transition-colors">
            <button 
              onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
              className=" hover:bg-yellow-500 px-2 py-0  rounded-md text-gray-900 font-bold"
            >
              Cadastrar
            </button>

            {mostrarOpcoes && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-xl z-50 flex flex-col  p-2 gap-2">
                <Link href="/cadastro-aluno" className="px-4 py-2 text-sm  text-center text-gray-700 bg-yellow-400 hover:bg-yellow-500 rounded-md transition-colors" onClick={() => setMostrarOpcoes(false)}>
                  Sou Aluno
                </Link>
                <Link href="/cadastro-instrutor" className="px-4 py-2 text-sm text-center text-gray-700rounded-md bg-yellow-400 hover:bg-yellow-500 transition-colors" onClick={() => setMostrarOpcoes(false)}>
                  Sou Instrutor
                </Link>
              </div>
            )}
          </div>

        </div>
      </nav>

      
      <div className="cabecario"></div>
    </div>
    </nav>
  );
}
