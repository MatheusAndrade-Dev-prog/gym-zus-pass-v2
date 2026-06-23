'use client';
import { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

// 1. Substituímos 'plano' por 'descricao' na tipagem do TypeScript
interface AlunoData {
  nome_completo: string;
  email: string;
  cidade: string;
  bairro: string;
  descricao?: string; 
}

export default function UsuarioAluno({ id }: { id: string }) {
  const [aluno, setAluno] = useState<AlunoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
  
    const buscarAluno = async () => {
      const docRef = doc(db, "cadastroAluno", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAluno(docSnap.data() as AlunoData);
      }
      setLoading(false);
    };
    buscarAluno();
  }, [id]);

  const handleExcluirConta = async () => {
    const confirmar = window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");
    
    if (!confirmar) return;

    try {
      setLoading(true);
      const docRef = doc(db, "cadastroAluno", id);
      await deleteDoc(docRef);
      
      alert("Conta excluída com sucesso!");
      window.location.href = "/"; 
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      alert("Ocorreu um erro ao tentar excluir a conta. Tente novamente.");
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div
        className="text-center p-10 text-sm"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        Carregando perfil...
      </div>
    );

  if (!aluno)
    return (
      <div
        className="text-center p-10 text-sm"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        Aluno não encontrado.
      </div>
    );

  const initials = aluno.nome_completo
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">

      {/* Card de perfil */}
      <div
        className="relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-6 p-8 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,107,0,0.2)',
        }}
      >
        {/* Glow decorativo */}
        <div
          className="absolute -top-12 -right-12 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'rgba(255,107,0,0.05)' }}
        />

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-semibold"
            style={{
              background: 'rgba(255,107,0,0.15)',
              border: '2px solid rgba(255,107,0,0.4)',
              color: '#ff6b00',
            }}
          >
            {initials}
          </div>
          {/* Indicador online */}
          <span
            className="absolute bottom-1 right-1 w-4 h-4 rounded-full"
            style={{
              background: '#00c853',
              border: '2px solid #0f172a',
            }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{
              background: 'rgba(255,107,0,0.1)',
              border: '1px solid rgba(255,107,0,0.25)',
              color: '#ff6b00',
            }}
          >
            Aluno
          </span>
          <h2 className="text-2xl font-semibold text-white mb-1">
            {aluno.nome_completo}
          </h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-1">
            <span className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              ✉ {aluno.email}
            </span>
            <span className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              📍 {aluno.bairro} — {aluno.cidade}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center md:items-end gap-3 flex-shrink-0">
          {/* O badge do plano antigo foi removido daqui para focar na descrição abaixo */}
          
          <button
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-opacity hover:opacity-80"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            ✏ Editar perfil
          </button>

          <button
            onClick={handleExcluirConta}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-opacity hover:opacity-80"
            style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#ef4444',
            }}
          >
            🗑 Excluir perfil
          </button>
        </div>
      </div>

      {/* Grid de Informações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dados pessoais */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <h3
            className="text-xs font-medium uppercase tracking-widest mb-4 flex items-center gap-2"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            <span style={{ color: '#ff6b00' }}>◈</span> Dados pessoais
          </h3>
          {[
            { label: 'Nome completo', value: aluno.nome_completo },
            { label: 'E-mail', value: aluno.email },
            { label: 'Bairro', value: aluno.bairro },
            { label: 'Cidade', value: aluno.cidade },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between items-center py-2.5"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {label}
              </span>
              <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* 2. Nova Aba Substituta: Descrição / Objetivos */}
        <div
          className="rounded-2xl p-6 flex flex-col justify-between"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div>
            <h3
              className="text-xs font-medium uppercase tracking-widest mb-4 flex items-center gap-2"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              <span style={{ color: '#ff6b00' }}>◈</span> Descrição & Foco
            </h3>
            <p 
              className="text-sm leading-relaxed min-h-[80px]" 
              style={{ color: aluno.descricao ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.3)' }}
            >
              {aluno.descricao ? `"${aluno.descricao}"` : "Nenhuma descrição ou objetivo informado ainda."}
            </p>
          </div>
          
          <div 
            className="pt-3 mt-4 flex justify-between items-center text-xs"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }}
          >
            <span>Status da Conta</span>
            <span style={{ color: '#00c853', fontWeight: 'bold' }}>● Ativo</span>
          </div>
        </div>
      </div>

    </div>
  );
}