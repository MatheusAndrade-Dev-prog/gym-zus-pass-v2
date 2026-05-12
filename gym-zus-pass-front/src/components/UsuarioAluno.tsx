'use client';
import { useEffect, useState } from "react";

// Interface para um treino individual
interface Treino {
  id: number;
  titulo: string;
  ultima_vez: number;
}

interface AlunoData {
  nome: string;
  email: string;
  plano: string;
  ativo: boolean;
  treinos: Treino[];
  // Adicione outros campos que possam vir do backend, como frequência, metas, etc.
  frequencia_semanal?: string; // Ex: "4/5"
}

export default function UsuarioAluno() {
  const [aluno, setAluno] = useState<AlunoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca dados da API Python
    fetch("http://localhost:8000/alunos/1") // ID 1 como exemplo
      .then((res) => res.json())
      .then((data) => {
        setAluno(data);
        setLoading(false);
      })
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  if (loading) return <div className="text-center p-10">Carregando perfil...</div>;
  if (!aluno) return <div className="text-center p-10">Aluno não encontrado.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Cabeçalho do Perfil */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold">
          {aluno.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{aluno.nome}</h2>
          <p className="text-gray-500">{aluno.email}</p>
          <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2 text-sm">
            {aluno.plano && (
              <span className="px-3 py-1 bg-green-100 text-green-700 font-semibold rounded-full">Plano {aluno.plano}</span>
            )}
            {aluno.ativo !== undefined && (
              <span className={`px-3 py-1 ${aluno.ativo ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'} font-semibold rounded-full`}>
                {aluno.ativo ? 'Ativo' : 'Inativo'}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coluna Principal: Meus Treinos */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Meus Treinos</h3>
            <div className="space-y-4">
              {aluno.treinos.map((treino) => (
                <div key={treino.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">{treino.titulo}</p>
                    <p className="text-sm text-gray-500">Última vez: {treino.ultima_vez} dias atrás</p>
                  </div>
                  <button className="text-blue-600 hover:underline text-sm font-semibold">Iniciar</button>
                </div>
              ))}
              {aluno.treinos.length === 0 && <p className="text-gray-400 italic">Nenhum treino atribuído.</p>}
            </div>
          </div>
        </div>

        {/* Coluna Lateral: Estatísticas */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-sm mb-1 font-medium uppercase">Frequência Semanal</p>
            <p className="text-4xl font-bold text-blue-600">{aluno.frequencia_semanal || 'N/A'}</p>
            <p className="text-xs text-gray-400 mt-2 italic">Você está quase na meta!</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold mb-3 uppercase text-gray-400 tracking-wider">Minhas Metas</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">Perda de peso</span>
                  <span className="font-bold text-blue-600">75%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}