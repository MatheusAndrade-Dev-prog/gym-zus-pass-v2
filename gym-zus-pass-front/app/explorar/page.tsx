"use client";

import { useState } from 'react';
import Explorar from '@/components/Explorar';
import SolicitacaoModal from '@/components/SolicitacaoModal';
import Topo from '@/components/Topo';
import Rodape from '@/components/Rodape';

export default function PaginaExplorar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <Topo />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-white text-center mb-4">Página de Exploração</h1>
        <p className="text-white text-center mb-8">Aqui você pode explorar os instrutores disponíveis.</p>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="my-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Fazer Solicitação
        </button>

       <SolicitacaoModal 
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         onAdd={(novaSolicitacao) => {
           console.log("Nova solicitação:", novaSolicitacao);
           
         }}
       />
        <Explorar />

        <Rodape />
      </div>
    </main>
  );
}
