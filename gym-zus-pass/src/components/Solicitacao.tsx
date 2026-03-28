'use client';

import { useState } from 'react';
import SolicitacaoModal from './SolicitacaoModal';

// Define a interface localmente ou importe de um arquivo de tipos
interface SolicitacaoItem {
  id: number;
  nome: string;
  contato: string;
  tipoAula: string;
  descricao: string;
  status: string;
}

export default function Solicitacao() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoItem[]>([
    {
      id: 1,
      nome: "Exemplo Usuário",
      tipoAula: "Musculação",
      descricao: "Gostaria de um treino focado em hipertrofia para membros superiores.",
      contato: "11 99999-9999",
      status: "Aguardando resposta do professor"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSolicitacao = (novaSolicitacao: SolicitacaoItem) => {
    setSolicitacoes([novaSolicitacao, ...solicitacoes]);
  };

  const excluirSolicitacao = (id: number) => {
    setSolicitacoes(solicitacoes.filter(s => s.id !== id));
  };

  return (
    <main className="max-w-5xl mx-auto mt-10 px-4">
      <div className="p-10 mb-8 bg-gray-100 rounded-2xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Solicite sua Aula Particular</h1>
        <p className="text-xl text-gray-600 mb-6 max-w-2xl">
          Encontre o personal trainer ideal para você. Clique no botão abaixo para preencher o formulário de solicitação.
        </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
        >
          Fazer Solicitação
        </button>
      </div>

      <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Acompanhamento de Solicitações</h2>
        <div className="space-y-4">
          {solicitacoes.map((s) => (
            <div key={s.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 font-semibold">
                Solicitação de: <span className="text-blue-600">{s.nome}</span>
              </div>
              <div className="p-5">
                <h5 className="font-bold text-lg mb-2">Tipo de Aula: {s.tipoAula}</h5>
                <p className="text-gray-700 mb-2">{s.descricao}</p>
                {s.contato && <p className="text-sm text-gray-500 italic">Contato: {s.contato}</p>}
              </div>
              <div className="px-5 py-3 bg-gray-50 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Status: {s.status}</span>
                <button onClick={() => excluirSolicitacao(s.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold border border-red-200 px-3 py-1 rounded hover:bg-red-50 transition-colors">Excluir</button>
              </div>
            </div>
          ))}
          {solicitacoes.length === 0 && (
            <p className="text-center text-gray-500 py-10">Nenhuma solicitação encontrada.</p>
          )}
        </div>
      </section>

      <SolicitacaoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddSolicitacao} />
    </main>
  );
}