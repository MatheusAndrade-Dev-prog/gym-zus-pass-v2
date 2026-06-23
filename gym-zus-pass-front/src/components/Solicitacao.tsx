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
    <main className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">

      {/* ── Hero Banner ── */}
      <div
        className="relative overflow-hidden p-10 mb-6 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,107,0,0.2)',
        }}
      >
        {/* glow orb top-right */}
        <div
          className="absolute -top-12 -right-12 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)' }}
        />
        {/* glow orb bottom-center */}
        <div
          className="absolute -bottom-16 left-1/3 w-72 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)' }}
        />

        {/* eyebrow */}
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: '#ff6b00' }}
        >
          GymZus Pass
        </p>

        <h1 className="text-4xl font-extrabold text-white mb-5 leading-tight">
          Solicite sua{' '}
          <span style={{ color: '#ff6b00' }}>Aula Particular</span>
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 font-semibold py-3 px-6 rounded-xl transition-opacity hover:opacity-90 text-sm"
          style={{ background: '#ff6b00', color: '#fff' }}
        >
          + Fazer Solicitação
        </button>
      </div>

      {/* ── Lista de Solicitações ── */}
      <section
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* section header */}
        <div
          className="flex items-center justify-between mb-5 pb-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Minhas solicitações
          </span>
          {!isLoading && solicitacoes.length > 0 && (
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: 'rgba(255,107,0,0.12)',
                color: '#ff6b00',
                border: '1px solid rgba(255,107,0,0.25)',
              }}
            >
              {solicitacoes.length} {solicitacoes.length === 1 ? 'ativa' : 'ativas'}
            </span>
          )}
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-10" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Carregando...
            </div>
          ) : solicitacoes.length === 0 ? (
            <div className="text-center py-16" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Nenhuma solicitação.
            </div>
          ) : (
            solicitacoes.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,107,0,0.2)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
              >
                {/* Card header */}
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{
                    background: 'rgba(255,107,0,0.06)',
                    borderBottom: '1px solid rgba(255,107,0,0.1)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: 'rgba(255,107,0,0.18)',
                        color: '#ff6b00',
                        border: '1.5px solid rgba(255,107,0,0.3)',
                      }}
                    >
                      {getInitials(s.nome)}
                    </div>
                    <p className="text-sm font-semibold" style={{ color: '#ff6b00' }}>
                      {s.nome}
                    </p>
                  </div>

                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      color: 'rgba(255,255,255,0.35)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {s.status}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h5 className="font-bold text-base mb-2 text-white">
                    Tipo de Aula: {s.tipoAula}
                  </h5>
                  <p
                    className="text-sm mb-4 leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {s.descricao}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        color: 'rgba(255,255,255,0.5)',
                      }}
                    >
                      📞 {s.contato}
                    </span>
                    <span
                      className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        color: 'rgba(255,255,255,0.5)',
                      }}
                    >
                      📍 {s.localizacao}
                    </span>
                    <span
                      className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
                      style={{
                        background: 'rgba(59,130,246,0.08)',
                        border: '1px solid rgba(59,130,246,0.2)',
                        color: '#60a5fa',
                      }}
                    >
                      🏋️ {s.academiaFrequente}
                    </span>
                    <span
                      className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
                      style={{
                        background: 'rgba(255,107,0,0.1)',
                        border: '1px solid rgba(255,107,0,0.22)',
                        color: '#ff6b00',
                      }}
                    >
                      💰 R$ {s.valorPorHora}/h
                    </span>
                  </div>
                </div>

                {/* Card footer */}
                <div
                  className="px-5 py-3 flex justify-between items-center"
                  style={{
                    background: 'rgba(0,0,0,0.2)',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span
                    className="text-xs"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                  >
                    {s.status}
                  </span>
                  <button
                    onClick={() => excluirSolicitacao(s.id)}
                    className="text-xs font-medium hover:underline transition-colors"
                    style={{ color: '#ad1b2a', background: 'none', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e53e3e')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#ad1b2a')}
                  >
                    Excluir
                  </button>
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