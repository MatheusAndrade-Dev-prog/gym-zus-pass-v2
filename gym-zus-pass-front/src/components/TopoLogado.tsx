"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, Pencil, ChevronDown } from "lucide-react";

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface UsuarioLogado {
  nome: string;
  email: string;
  avatarUrl?: string;
}

// ─── Mock: substitua por hook real de autenticação (ex: useAuth do Firebase) ──
const mockUsuario: UsuarioLogado | null = {
  nome: "Carlos Silva",
  email: "carlos@gymzus.com",
};

export default function Topo() {
  // Controla o dropdown de "Cadastrar / Login"
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  // Controla o dropdown do perfil do usuário logado
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  const refCadastro = useRef<HTMLDivElement>(null);
  const refPerfil = useRef<HTMLDivElement>(null);

  // Fecha os dropdowns ao clicar fora deles
  useEffect(() => {
    function handleClickFora(e: MouseEvent) {
      if (refCadastro.current && !refCadastro.current.contains(e.target as Node)) {
        setMostrarCadastro(false);
      }
      if (refPerfil.current && !refPerfil.current.contains(e.target as Node)) {
        setMostrarPerfil(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  // Iniciais do usuário para o avatar fallback
  const iniciais = mockUsuario?.nome
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  function handleSair() {
    // TODO: chamar signOut() do Firebase aqui
    alert("Saindo da conta...");
    setMostrarPerfil(false);
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0f2042]/80 border-b border-white/10">
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">

        {/* ── Logo ─────────────────────────────────────────────── */}
        <Link href="/" className="text-xl font-bold text-[#00c853] tracking-tight no-underline">
          GymZus Pass
        </Link>

        {/* ── Links centrais ────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <Link href="/"           className="hover:text-white transition no-underline">Home</Link>
          <Link href="/explorar"   className="hover:text-white transition no-underline">Explorar</Link>
          <Link href="/solicitacoes" className="hover:text-white transition no-underline">Solicitações</Link>
          <Link href="/sobre"      className="hover:text-white transition no-underline">Sobre</Link>
        </div>

        {/* ── Área direita ──────────────────────────────────────── */}
        <div className="flex items-center gap-3">

          {/* Busca */}
          <input
            type="search"
            placeholder="Buscar..."
            className="hidden lg:block w-48 xl:w-64 bg-white/5 border border-white/10 rounded-md px-3 py-1.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#ff6b00] transition"
          />

          {/* ══ ESTADO: USUÁRIO LOGADO ══════════════════════════════ */}
          {mockUsuario ? (
            <div className="relative" ref={refPerfil}>
              <button
                onClick={() => setMostrarPerfil((v) => !v)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition group"
                aria-label="Menu do perfil"
              >
                {/* Avatar */}
                {mockUsuario.avatarUrl ? (
                  <img
                    src={mockUsuario.avatarUrl}
                    alt={mockUsuario.nome}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#ff6b00]/50"
                  />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-[#ff6b00] flex items-center justify-center text-white text-xs font-bold ring-2 ring-[#ff6b00]/40">
                    {iniciais}
                  </span>
                )}

                {/* Nome (visível em telas maiores) */}
                <span className="hidden sm:block text-sm text-white/80 group-hover:text-white transition max-w-[120px] truncate">
                  {mockUsuario.nome.split(" ")[0]}
                </span>

                <ChevronDown
                  size={14}
                  className={`text-white/40 transition-transform duration-200 ${mostrarPerfil ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown do perfil */}
              {mostrarPerfil && (
                <div className="absolute right-0 mt-2 w-56 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                  
                  {/* Cabeçalho do dropdown */}
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-semibold text-white truncate">{mockUsuario.nome}</p>
                    <p className="text-xs text-white/40 truncate">{mockUsuario.email}</p>
                  </div>

                  {/* Ações */}
                  <div className="p-1.5 flex flex-col gap-0.5">
                    <Link
                      href="/perfil"
                      onClick={() => setMostrarPerfil(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition no-underline"
                    >
                      <User size={15} />
                      Ver perfil
                    </Link>

                    <Link
                      href="/perfil/editar"
                      onClick={() => setMostrarPerfil(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition no-underline"
                    >
                      <Pencil size={15} />
                      Editar perfil
                    </Link>

                    <hr className="border-white/10 my-1" />

                    <button
                      onClick={handleSair}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-[#ad1b2a] hover:bg-[#ad1b2a]/10 transition"
                    >
                      <LogOut size={15} />
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>

          ) : (
            /* ══ ESTADO: NÃO LOGADO ══════════════════════════════════ */
            <div className="relative" ref={refCadastro}>
              <button
                onClick={() => setMostrarCadastro((v) => !v)}
                className="flex items-center gap-1.5 bg-[#ff6b00] hover:bg-[#e55e00] text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition"
              >
                Cadastrar
                <ChevronDown size={14} className={`transition-transform duration-200 ${mostrarCadastro ? "rotate-180" : ""}`} />
              </button>

              {mostrarCadastro && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl z-50 p-1.5 flex flex-col gap-0.5">
                  <Link
                    href="/cadastro"
                    onClick={() => setMostrarCadastro(false)}
                    className="block px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition no-underline"
                  >
                    Criar conta
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMostrarCadastro(false)}
                    className="block px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition no-underline"
                  >
                    Entrar
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}