"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import '@/firebase'; 

type UsuarioLogado = {
  nome: string | null;
  email: string | null;
  foto: string | null;
};

export default function Topo() {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUsuario({
          nome: firebaseUser.displayName,
          email: firebaseUser.email,
          foto: firebaseUser.photoURL,
        });
      } else {
        setUsuario(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMostrarMenuUsuario(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleLogout() {
    await signOut(auth);
    setMostrarMenuUsuario(false);
    router.push('/');
  }

  const inicial = usuario?.nome?.charAt(0).toUpperCase() 
    ?? usuario?.email?.charAt(0).toUpperCase() 
    ?? '?';

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="mx-auto px-6 h-16 flex items-center justify-between ">
        <nav className="w-full px-6 h-16 flex items-center justify-between">
          <div className="flex flex-col w-full px-6 py-2">
            
            <nav className="hidden md:flex items-center justify-between flex-wrap px-5 py-2"> 
              
              <div className="font-display text-2xl tracking-wider flex items-center gap-2">
                <h3 className="text-ml text-white font-bold text-green-500 tracking-tight">
                  GymZus Pass
                </h3>
              </div>

              <nav className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
                <a href="/" className="no-underline hover:text-foreground transition text-2xl">Home</a>
                <a href="/explorar" className="no-underline text-muted-foreground hover:text-foreground transition text-2xl">Explorar</a>
                <a href="/solicitacoes" className="no-underline text-muted-foreground hover:text-foreground transition text-2xl">Solicitacoes</a>
                <a href="/sobre" className="no-underline text-muted-foreground hover:text-foreground transition text-2xl">Sobre</a>
              </nav>

              <div className="flex flex-row items-center gap-3 ml-auto"> 
              
                <div className="relative">
                  <input 
                    className="w-48 xl:w-64 border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-400 shadow-sm" 
                    type="search" 
                    placeholder="Search..." 
                  />
                </div>

                {usuario ? (
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => setMostrarMenuUsuario(!mostrarMenuUsuario)}
                      className="flex items-center gap-2 focus:outline-none"
                      title={usuario.nome ?? usuario.email ?? 'Meu perfil'}
                    >
                      {usuario.foto ? (
                        <img
                          src={usuario.foto}
                          alt="Foto do perfil"
                          className="w-9 h-9 rounded-full border-2 border-green-500 object-cover"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-green-500 border-2 border-green-400 flex items-center justify-center text-white font-bold text-sm">
                          {inicial}
                        </div>
                      )}
                    </button>

                    {mostrarMenuUsuario && (
                      <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-xl z-50 flex flex-col p-2 gap-1">
                        <div className="px-3 py-2 border-b border-gray-100 mb-1">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {usuario.nome ?? 'Usuário'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {usuario.email}
                          </p>
                        </div>

                        {/* ✅ ALTERAÇÃO: era "/perfil/editar" com texto "Editar Perfil" */}
                        <Link
                          href="/perfil"
                          className="px-4 py-2 text-sm text-center text-gray-700 bg-yellow-400 hover:bg-yellow-500 rounded-md transition-colors"
                          onClick={() => setMostrarMenuUsuario(false)}
                        >
                          👤 Acessar Perfil
                        </Link>

                        <Link
                          href="/perfil/excluir"
                          className="px-4 py-2 text-sm text-center text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                          onClick={() => setMostrarMenuUsuario(false)}
                        >
                          🗑️ Excluir Conta
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          Sair
                        </button>
                      </div>
                    )}
                  </div>

                ) : (
                  <>
                    <Link href="/login" className="border border-black text-gray-900 px-2 py-1 border-r-2 rounded-md">
                      Fazer Login
                    </Link>

                    <div className="relative border bg-yellow-400 border-black px-1 py-1 border-r-2 rounded-md hover:bg-gray-100 transition-colors">
                      <button 
                        onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
                        className="hover:bg-yellow-500 px-2 py-0 rounded-md text-gray-900 font-bold"
                      >
                        Cadastrar
                      </button>

                      {mostrarOpcoes && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-xl z-50 flex flex-col p-2 gap-2">
                          <Link href="/cadastro-aluno" className="px-4 py-2 text-sm text-center text-gray-700 bg-yellow-400 hover:bg-yellow-500 rounded-md transition-colors" onClick={() => setMostrarOpcoes(false)}>
                            Sou Aluno
                          </Link>
                          <Link href="/cadastro-instrutor" className="px-4 py-2 text-sm text-center text-gray-700 rounded-md bg-yellow-400 hover:bg-yellow-500 transition-colors" onClick={() => setMostrarOpcoes(false)}>
                            Sou Instrutor
                          </Link>
                        </div>
                      )}
                    </div>
                  </>
                )}

              </div>
            </nav>

            <div className="cabecario"></div>
          </div>
        </nav>
      </div>
    </header>
  );
}