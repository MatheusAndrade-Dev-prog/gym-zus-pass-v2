"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    console.log("Tentativa de login com:", { email, senha });
    alert("Login realizado com sucesso! (Simulação)");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <main className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <form onSubmit={handleLogin} className="flex flex-col text-center">
          
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-inner">
              GZ
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-primary">Tela de login</h1>

          <div className="relative text-left mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative text-left mb-4">
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              id="senha"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2 mb-6 text-left">
            <input 
              type="checkbox" 
              id="remember" 
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">Lembrar-me</label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all active:scale-95 mb-4"
          >
            Entrar
          </button>

          <p className="text-sm text-gray-600">
            Não tem conta?{" "}
            <Link href="/" className="text-blue-600 font-bold hover:underline">
              Voltar
            </Link>
          </p>

          <p className="mt-8 text-xs text-gray-400 text-muted">© 2026</p>
        </form>
      </main>
    </div>
  );
}