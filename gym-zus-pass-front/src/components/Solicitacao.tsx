'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase'; 
import SolicitacaoModal from './SolicitacaoModal';

interface SolicitacaoItem {
  id: string; 
  nome: string;
  contato: string;
  tipoAula: string;
  descricao: string;
  localizacao: string;
  valorPorHora: string;
  academiaFrequente: string; 
  status: string;
}

export default function Solicitacao() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Solicitações'), 
      (querySnapshot) => {
        const lista = querySnapshot.docs.map(doc => {
          const data = doc.data();
          
          // Lógica forçada para substituir o texto antigo
          let statusFinal = data.status;
          if (statusFinal === 'Aguardando resposta do professor' || !statusFinal) {
            statusFinal = 'Minhas solicitações';
          }

          return {
            id: doc.id,
            nome: data.seu_nome || '',       
            contato: data.contato || '',
            tipoAula: data.tipoAula || '',
            descricao: data.descrição || '',
            localizacao: data.localizacao || 'Não informado',
            valorPorHora: data.valorPorHora || '0',
            academiaFrequente: data.academiaFrequente || 'Não informada',
            status: statusFinal
          };
        });
        
        setSolicitacoes(lista.reverse());
        setIsLoading(false);
      },
      (error) => {
        console.error("Erro ao buscar solicitações:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const excluirSolicitacao = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'Solicitações', id)); 
    } catch (error) {
      console.error("Erro ao excluir solicitação:", error);
      alert("Erro ao excluir.");
    }
  };

  const getInitials = (nome: string) =>
    nome ? nome.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : 'EU';

  return (
    <main className="max-w-5xl mx-auto mt-10 px-4 m-1 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden p-10 mb-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,107,0,0.25)' }}>
        <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full pointer-events-none" style={{ background: 'rgba(255,107,0,0.06)' }} />
        <h1 className="text-4xl font-extrabold text-white mb-3 leading-tight">
          Solicite sua <span style={{ color: '#ff6b00' }}>Aula Particular</span>
        </h1>
        <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 font-semibold py-3 px-6 rounded-xl transition-opacity hover:opacity-90" style={{ background: '#ff6b00', color: '#fff' }}>
          + Fazer Solicitação
        </button>
      </div>

      <section className="rounded-2xl p-8 m-1 sm:px-6 lg:px-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-10 text-gray-400">Carregando...</div>
          ) : solicitacoes.length === 0 ? (
            <div className="text-center py-16 text-gray-500">Nenhuma solicitação.</div>
          ) : (
            solicitacoes.map((s) => (
              <div key={s.id} className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center justify-between px-5 py-3" style={{ background: 'rgba(255,107,0,0.06)', borderBottom: '1px solid rgba(255,107,0,0.12)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'rgba(255,107,0,0.2)', color: '#ff6b00' }}>
                      {getInitials(s.nome)}
                    </div>
                    <p className="text-sm font-semibold" style={{ color: '#ff6b00' }}>{s.nome}</p>
                  </div>
                </div>

                <div className="p-5">
                  <h5 className="font-bold text-base mb-2 text-white">Tipo de Aula: {s.tipoAula}</h5>
                  <p className="text-sm mb-3 text-gray-400">{s.descricao}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 bg-white/5">📞 {s.contato}</span>
                    <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 bg-white/5">📍 {s.localizacao}</span>
                    <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-blue-500/20 text-blue-400 bg-blue-500/10">🏋️ {s.academiaFrequente}</span>
                    <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-orange-500/20 text-orange-500 bg-orange-500/10">💰 R$ {s.valorPorHora}/h</span>
                  </div>
                </div>

                <div className="px-5 py-3 flex justify-between items-center bg-black/20 border-t border-white/5">
                  <span className="text-xs text-gray-500">{s.status}</span>
                  <button onClick={() => excluirSolicitacao(s.id)} className="text-xs text-red-400 hover:underline">Excluir</button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <SolicitacaoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={() => setIsModalOpen(false)}
      />
    </main>
  );
}