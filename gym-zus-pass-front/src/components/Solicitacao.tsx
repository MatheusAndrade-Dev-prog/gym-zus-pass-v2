'use client';

import { useState } from 'react';
import SolicitacaoModal from './SolicitacaoModal';

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

  const getInitials = (nome: string) =>
    nome.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <main className="max-w-5xl mx-auto mt-10 px-4 m-1 sm:px-6 lg:px-8">

      {/* Hero Card */}
      <div
        className="relative overflow-hidden p-10 mb-8 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,107,0,0.25)',
        }}
      >
        {/* Glow decorativo */}
        <div
          className="absolute -top-10 -right-10 w-52 h-52 rounded-full pointer-events-none"
          style={{ background: 'rgba(255,107,0,0.06)' }}
        />

        {/* Eyebrow */}
        <span
          className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
          style={{
            background: 'rgba(255,107,0,0.12)',
            border: '1px solid rgba(255,107,0,0.3)',
            color: '#ff6b00',
          }}
        >
          ⚡ Personal Trainer
        </span>

        <h1 className="text-4xl font-extrabold text-white mb-3 leading-tight">
          Solicite sua{' '}
          <span style={{ color: '#ff6b00' }}>Aula Particular</span>
        </h1>

        <p className="text-base mb-7 max-w-2xl" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Encontre o personal trainer ideal para você. Preencha o formulário de solicitação e aguarde a resposta do professor.
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 font-semibold py-3 px-6 rounded-xl transition-opacity hover:opacity-90"
          style={{ background: '#ff6b00', color: '#fff' }}
        >
          + Fazer Solicitação
        </button>
      </div>

      {/* Lista de Solicitações */}
      <section
        className="rounded-2xl p-8 m-1 sm:px-6 lg:px-8"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Section Header */}
        <div
          className="flex items-center justify-between mb-6 pb-4 "
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            ✅ Acompanhamento de Solicitações
          </h2>
          {solicitacoes.length > 0 && (
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                background: 'rgba(0,200,83,0.12)',
                border: '1px solid rgba(0,200,83,0.25)',
                color: '#00c853',
              }}
            >
              {solicitacoes.length} ativa{solicitacoes.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="space-y-4">
          {solicitacoes.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Item Header */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{
                  background: 'rgba(255,107,0,0.06)',
                  borderBottom: '1px solid rgba(255,107,0,0.12)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                    style={{
                      background: 'rgba(255,107,0,0.2)',
                      border: '1px solid rgba(255,107,0,0.4)',
                      color: '#ff6b00',
                    }}
                  >
                    {getInitials(s.nome)}
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Solicitação de
                    </p>
                    <p className="text-sm font-semibold" style={{ color: '#ff6b00' }}>
                      {s.nome}
                    </p>
                  </div>
                </div>

                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  {s.tipoAula}
                </span>
              </div>

              {/* Item Body */}
              <div className="p-5">
                <h5 className="font-bold text-base mb-2" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  Tipo de Aula: {s.tipoAula}
                </h5>
                <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>
                  {s.descricao}
                </p>
                {s.contato && (
                  <span
                    className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    📞 Contato: {s.contato}
                  </span>
                )}
              </div>

              {/* Item Footer */}
              <div
                className="px-5 py-3 flex justify-between items-center"
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span className="text-sm flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ background: '#ff6b00' }}
                  />
                  {s.status}
                </span>

                <button
                  onClick={() => excluirSolicitacao(s.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                  style={{
                    background: 'rgba(173,27,42,0.1)',
                    border: '1px solid rgba(173,27,42,0.3)',
                    color: '#ad1b2a',
                  }}
                >
                  🗑 Excluir
                </button>
              </div>
            </div>
          ))}

          {solicitacoes.length === 0 && (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Nenhuma solicitação encontrada.
              </p>
            </div>
          )}
        </div>
      </section>

      <SolicitacaoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddSolicitacao}
      />
    </main>
  );
}