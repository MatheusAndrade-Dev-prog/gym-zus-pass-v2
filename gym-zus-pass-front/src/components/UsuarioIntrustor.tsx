'use client';
import { useEffect, useState } from "react";
// [ALTERADO] Adicionamos 'updateDoc' ao lado dos imports já existentes
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
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

  // --- [NOVO] Estados do modo de edição ---
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState<InstrutorData | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  useEffect(() => {
    const buscarInstrutor = async () => {
      const docRef = doc(db, "cadastroInstrutor", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setInstrutor(docSnap.data() as InstrutorData);
      setLoading(false);
    };
    buscarInstrutor();
  }, [id]);

  const handleExcluirConta = async () => {
    const confirmar = window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");
    if (!confirmar) return;

    try {
      setLoading(true);
      const docRef = doc(db, "cadastroInstrutor", id);
      await deleteDoc(docRef);
      alert("Conta excluída com sucesso!");
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      alert("Ocorreu um erro ao tentar excluir a conta. Tente novamente.");
      setLoading(false);
    }
  };

  // --- [NOVO] Abre o modal com os dados atuais pré-preenchidos ---
  const handleAbrirEdicao = () => {
    if (!instrutor) return;
    setEditData({ ...instrutor }); // spread: copia todos os campos atuais
    setEditError(null);
    setIsEditing(true);
  };

  // --- [NOVO] Fecha o modal descartando qualquer mudança ---
  const handleCancelarEdicao = () => {
    setIsEditing(false);
    setEditData(null);
    setEditError(null);
  };

  // --- [NOVO] Salva as alterações no Firestore e reflete localmente ---
  const handleSalvarEdicao = async () => {
    if (!editData) return;

    if (!editData.nome_completo.trim() || !editData.email.trim()) {
      setEditError("Nome completo e e-mail são obrigatórios.");
      return;
    }

    try {
      setSaving(true);
      setEditError(null);
      const docRef = doc(db, "cadastroInstrutor", id);
      await updateDoc(docRef, { ...editData });
      setInstrutor({ ...editData }); // atualiza a UI sem precisar de um novo getDoc
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      setEditError("Não foi possível salvar. Tente novamente.");
    } finally {
      setSaving(false);
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
      style={{ background: "linear-gradient(180deg,#0f2042 0%,#0f172a 40%,#090d16 100%)" }}
    >
      <div className="max-w-4xl mx-auto space-y-4">

        {/* ================================================================
            [NOVO] MODAL DE EDIÇÃO
            – Exatamente o mesmo padrão visual do UsuarioAluno
            – Tem o campo extra de CREF, que é específico do instrutor
            ================================================================ */}
        {isEditing && editData && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          >
            <div
              className="w-full max-w-md rounded-2xl p-6 space-y-4"
              style={{
                background: '#0f172a',
                border: '1px solid rgba(255,107,0,0.3)',
              }}
            >
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <span style={{ color: '#ff6b00' }}>◈</span> Editar perfil profissional
              </h3>

              {/* Campos de texto simples */}
              {(
                [
                  { label: 'Nome completo', key: 'nome_completo' as const },
                  { label: 'E-mail',        key: 'email'         as const },
                  { label: 'Cidade',        key: 'cidade'        as const },
                  { label: 'Bairro',        key: 'bairro'        as const },
                ] as { label: string; key: keyof InstrutorData }[]
              ).map(({ label, key }) => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {label}
                  </label>
                  <input
                    type="text"
                    value={editData[key] ?? ''}
                    onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                    className="rounded-xl px-3 py-2 text-sm text-white outline-none focus:ring-1"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      ['--tw-ring-color' as string]: '#ff6b00',
                    }}
                  />
                </div>
              ))}

              {/* Campo CREF — borda verde para manter o padrão de credencial */}
              <div className="flex flex-col gap-1">
                <label className="text-xs" style={{ color: 'rgba(0,200,83,0.7)' }}>
                  CREF
                </label>
                <input
                  type="text"
                  value={editData.cref}
                  onChange={(e) => setEditData({ ...editData, cref: e.target.value })}
                  className="rounded-xl px-3 py-2 text-sm text-white outline-none"
                  style={{
                    background: 'rgba(0,200,83,0.05)',
                    border: '1px solid rgba(0,200,83,0.25)',
                    color: '#00c853',
                  }}
                />
              </div>

              {/* Descrição */}
              <div className="flex flex-col gap-1">
                <label className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Descrição profissional
                </label>
                <textarea
                  rows={3}
                  value={editData.descricao ?? ''}
                  onChange={(e) => setEditData({ ...editData, descricao: e.target.value })}
                  placeholder="Fale sobre sua experiência e especialidades..."
                  className="rounded-xl px-3 py-2 text-sm text-white outline-none resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                />
              </div>

              {editError && (
                <p className="text-xs" style={{ color: '#ef4444' }}>{editError}</p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  onClick={handleCancelarEdicao}
                  disabled={saving}
                  className="flex-1 text-sm py-2.5 rounded-xl transition-opacity hover:opacity-80"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSalvarEdicao}
                  disabled={saving}
                  className="flex-1 text-sm font-semibold py-2.5 rounded-xl transition-opacity hover:opacity-90"
                  style={{
                    background: saving ? 'rgba(255,107,0,0.4)' : '#ff6b00',
                    color: '#fff',
                  }}
                >
                  {saving ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* FIM DO MODAL */}

        {/* Logo / topbar — sem alterações */}
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

        {/* Hero card — sem alterações de estrutura ou design */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
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

            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white mb-1">{instrutor.nome_completo}</h2>
              <div className="flex flex-col gap-1 mb-3">
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{instrutor.email}</p>
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

            <div className="flex flex-col gap-2 items-start md:items-end shrink-0">
              <button
                className="text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-colors"
                style={{ background: "#ff6b00" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e55e00")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#ff6b00")}
              >
                Entrar em contato
              </button>

              {/* [ALTERADO] onClick agora chama handleAbrirEdicao */}
              <button
                onClick={handleAbrirEdicao}
                className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                Editar perfil
              </button>

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

          {instrutor.descricao && (
            <>
              <div className="my-4" style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
              <p className="text-sm italic leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                "{instrutor.descricao}"
              </p>
            </>
          )}
        </div>

        {/* Info grid — sem alterações */}
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
              { label: "CREF",   value: instrutor.cref },
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