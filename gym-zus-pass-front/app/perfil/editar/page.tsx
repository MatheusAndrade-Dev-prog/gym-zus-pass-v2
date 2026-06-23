// src/app/perfil/editar/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import "@/firebase"; // mesmo import do Topo.tsx

export default function EditarPerfil() {
  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);

  const auth = getAuth();
  const router = useRouter();

  // Preenche o campo com o nome atual do usuário
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login"); // redireciona se não estiver logado
        return;
      }
      setNome(user.displayName ?? "");
      setCarregando(false);
    });
    return () => unsubscribe();
  }, [auth, router]);

  async function handleSalvar() {
    const user = auth.currentUser;
    if (!user) return;

    setSalvando(true);
    setMensagem(null);

    try {
      await updateProfile(user, { displayName: nome });
      setMensagem("Perfil atualizado com sucesso!");
    } catch (error) {
      setMensagem("Erro ao salvar. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) return <p className="text-white p-8">Carregando...</p>;

  return (
    <main className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #0f2042, #0f172a, #090d16)" }}
    >
      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10"
        style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)" }}
      >
        <h1 className="text-2xl font-bold text-white mb-6">Editar Perfil</h1>

        <label className="block text-sm text-gray-400 mb-1">Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 mb-4"
          style={{ focusRingColor: "#00c853" } as React.CSSProperties}
        />

        {mensagem && (
          <p className="text-sm mb-4" style={{ color: mensagem.includes("sucesso") ? "#00c853" : "#ad1b2a" }}>
            {mensagem}
          </p>
        )}

        <button
          onClick={handleSalvar}
          disabled={salvando}
          className="w-full py-2 rounded-md font-bold text-white transition-opacity"
          style={{ background: "#00c853", opacity: salvando ? 0.6 : 1 }}
        >
          {salvando ? "Salvando..." : "Salvar alterações"}
        </button>
      </div>
    </main>
  );
}