'use client';
import { useEffect, useState } from "react";
// 1. Adicionamos o 'deleteDoc' nos imports do firestore
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

interface InstrutorData {
  nome_completo: string;
  email: string;
  cref: string;
  cidade: string;
  bairro: string;
  descricao?: string;
}

export default function UsuarioInstrutor({ id }: { id: string }) {
  const [instrutor, setInstrutor] = useState<InstrutorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarInstrutor = async () => {
      const docRef = doc(db, "cadastroInstrutor", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setInstrutor(docSnap.data() as InstrutorData);
      setLoading(false);
    };
    buscarInstrutor();
  }, [id]);

  // 2. Nova função para excluir a conta do usuário
  const handleExcluirConta = async () => {
    const confirmar = window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");
    
    if (!confirmar) return;

    try {
      setLoading(true);
      const docRef = doc(db, "cadastroInstrutor", id);
      await deleteDoc(docRef);
      
      alert("Conta excluída com sucesso!");
      // Aqui você pode redirecionar o usuário, por exemplo:
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
        className="flex items-center justify-center min-h-screen text-sm"
        style={{
          background: "linear-gradient(180deg,#0f2042 0%,#0f172a 40%,#090d16 100%)",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        Carregando perfil do instrutor...
      </div>
    );

  if (!instrutor)
    return (
      <div
        className="flex items-center justify-center min-h-screen text-sm"
        style={{
          background: "linear-gradient(180deg,#0f2042 0%,#0f172a 40%,#090d16 100%)",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        Instrutor não encontrado.
      </div>
    );

  const initials = instrutor.nome_completo
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(180deg,#0f2042 0%,#0f172a 40%,#090d16 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto space-y-4">

        {/* Logo / topbar */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs tracking-widest"
            style={{ background: "#ff6b00" }}
          >
            GZ
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">GymZone</p>
            <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
              Perfil profissional
            </p>
          </div>
        </div>

        {/* Hero card */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">

            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shrink-0"
              style={{
                background: "rgba(255,107,0,0.12)",
                border: "2px solid rgba(255,107,0,0.35)",
                color: "#ff6b00",
              }}
            >
              {initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white mb-1">{instrutor.nome_completo}</h2>
              <div className="flex flex-col gap-1 mb-3">
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {instrutor.email}
                </p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {instrutor.bairro} — {instrutor.cidade}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(0,200,83,0.10)",
                    border: "1px solid rgba(0,200,83,0.30)",
                    color: "#00c853",
                  }}
                >
                  CREF: {instrutor.cref}
                </span>
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,107,0,0.10)",
                    border: "1px solid rgba(255,107,0,0.30)",
                    color: "#ff6b00",
                  }}
                >
                  ✓ Profissional
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 items-start md:items-end shrink-0">
              <button
                className="text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-colors"
                style={{ background: "#ff6b00" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e55e00")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#ff6b00")}
              >
                Entrar em contato
              </button>
              <button
                className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                Agendar aula
              </button>
              
              {/* 3. Botão de Excluir Conta adicionado mantendo o padrão visual */}
              <button
                onClick={handleExcluirConta}
                className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#ef4444",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)")}
              >
                Excluir Conta
              </button>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: "#00c853" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Disponível para novos alunos
                </span>
              </div>
            </div>
          </div>

          {/* Descrição */}
          {instrutor.descricao && (
            <>
              <div className="my-4" style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
              <p
                className="text-sm italic leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                "{instrutor.descricao}"
              </p>
            </>
          )}
        </div>

        {/* Info grid */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <p
            className="text-[11px] font-bold tracking-widest uppercase mb-4"
            style={{ color: "#ff6b00" }}
          >
            Informações profissionais
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "CREF", value: instrutor.cref },
              { label: "Bairro", value: instrutor.bairro },
              { label: "Cidade", value: instrutor.cidade },
              { label: "E-mail", value: instrutor.email },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl p-3"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {label}
                </p>
                <p className="text-sm font-medium text-white truncate">{value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}