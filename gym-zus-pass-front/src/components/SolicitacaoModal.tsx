'use client';

import { FormEvent } from 'react';

interface Solicitacao {
  id: number;
  nome: string;
  contato: string;
  tipoAula: string;
  descricao: string;
  status: string;
}

interface SolicitacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (solicitacao: Solicitacao) => void;
}

export default function SolicitacaoModal({ isOpen, onClose, onAdd }: SolicitacaoModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const novaSolicitacao: Solicitacao = {
      id: Date.now(),
      nome: formData.get('nome') as string,
      contato: formData.get('contato') as string,
      tipoAula: formData.get('tipoAula') as string,
      descricao: formData.get('descricao') as string,
      status: "Enviada"
    };

    onAdd(novaSolicitacao);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold">Nova Solicitação</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
            <input name="nome" type="text" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contato</label>
            <input name="contato" type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="(Opcional)" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Aula</label>
            <input name="tipoAula" type="text" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Musculação" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea name="descricao" rows={3} required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Objetivos e horários..."></textarea>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Fechar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold">Enviar Solicitação</button>
          </div>
        </form>
      </div>
    </div>
  );
}