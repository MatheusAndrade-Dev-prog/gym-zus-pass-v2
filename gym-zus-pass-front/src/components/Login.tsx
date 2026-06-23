"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoSimulado, setTipoSimulado] = useState("aluno"); 
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Como já importamos o 'auth' lá em cima, removemos o "const auth = getAuth();" daqui.
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), senha);
      const uid = userCredential.user.uid;

      if (tipoSimulado === "instrutor") {
        router.push(`/usuario-instrutor/${uid}`);
      } else {
        router.push(`/usuario-aluno/${uid}`);
      }
    } catch (error: any) {
      console.error("Código do erro:", error.code);
      console.error("Mensagem do erro:", error.message);
      
      if (error.code === 'auth/user-not-found') {
        alert("Nenhum usuário encontrado com este email.");
      } else if (error.code === 'auth/wrong-password') {
        alert("Senha incorreta.");
      } else if (error.code === 'auth/invalid-credential') {
        alert("Credenciais inválidas. Verifique o email e a senha.");
      } else {
        alert("Erro ao fazer login. Verifique o console.");
      }
    }
  };
  return (
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{
        background: "linear-gradient(180deg, #0f2042 0%, #0f172a 40%, #090d16 100%)",
      }}
    >
      <main className="w-full max-w-md p-10 rounded-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.10)",
          backdropFilter: "blur(12px)",
        }}
      >
        <form onSubmit={handleLogin} className="flex flex-col text-center">

          {/* Logo */}
          <div className="flex justify-center mb-3">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl tracking-widest"
              style={{
                background: "#ff6b00",
                boxShadow: "0 0 0 4px rgba(255, 107, 0, 0.18)",
              }}
            >
              GZ
            </div>
          </div>

          <h1 className="text-xl font-semibold text-white mb-1">
            Entrar na sua conta
          </h1>
          <p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.4)" }}>
            GymZus Pass
          </p>

          {/* Perfil */}
          <div className="mb-4 text-left">
            <label
              className="block text-xs font-medium mb-1.5 uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Perfil
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              value={tipoSimulado}
              onChange={(e) => setTipoSimulado(e.target.value)}
            >
              <option className="text-black" value="aluno">Aluno</option>
              <option className="text-black" value="instrutor">Instrutor</option>
            </select>
          </div>

          {/* Email */}
          <div className="text-left mb-4">
            <label
              htmlFor="email"
              className="block text-xs font-medium mb-1.5 uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Senha */}
          <div className="text-left mb-6">
            <label
              htmlFor="senha"
              className="block text-xs font-medium mb-1.5 uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Senha
            </label>
            <input
              type="password"
              id="senha"
              className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full text-white font-bold py-3 rounded-xl transition-all active:scale-95 mb-5"
            style={{ background: "#ff6b00" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e55e00")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ff6b00")}
          >
            Entrar
          </button>

          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Não tem conta?{" "}
            <Link
              href="/"
              className="font-semibold no-underline hover:underline"
              style={{ color: "#ff6b00" }}
            >
              Voltar
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}