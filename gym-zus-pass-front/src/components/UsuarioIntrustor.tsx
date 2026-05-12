'use client';
import { useEffect, useState } from "react";

// Interfaces para os dados do instrutor
interface Aula {
  id: number;
  horario: string;
  aluno_nome: string;
  status: string; // Ex: Agendada, Concluída, Cancelada
}

interface Feedback {
  id: number;
  aluno_nome: string;
  avaliacao: number; // Ex: 1 a 5 estrelas
  comentario: string;
}

interface InstrutorData {
  id: number;
  nome: string;
  email: string;
  especialidade: string;
  avaliacao_media: number;
  cref: string;
  alunos_count: number;
  aulas_hoje_count: number;
  solicitacoes_pendentes: number;
  agenda_hoje: Aula[];
  feedbacks_recentes: Feedback[];
}

export default function UsuarioInstrutor() {
  const [instrutor, setInstrutor] = useState<InstrutorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca dados da API Python para o instrutor
    fetch("http://localhost:8000/instrutores/2") // ID 2 como exemplo para instrutor
      .then((res) => res.json())
      .then((data) => {
        setInstrutor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados do instrutor:", err);
        setLoading(false); // Finaliza o loading mesmo com erro
      });
  }, []);

  if (loading) return <div className="text-center p-10">Carregando perfil do instrutor...</div>;
  if (!instrutor) return <div className="text-center p-10">Instrutor não encontrado ou erro ao carregar.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Cabeçalho Profissional */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-3xl font-bold">
          {instrutor.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{instrutor.nome}</h2>
          <p className="text-gray-500">{instrutor.especialidade}</p>
          <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2 text-sm">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 font-semibold rounded-full">⭐ {instrutor.avaliacao_media}</span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 font-semibold rounded-full">CREF: {instrutor.cref}</span>
          </div>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
          Nova Aula
        </button>
      </div>
      {/* Dashboard de Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-xs mb-1 font-medium uppercase">Alunos</p>
          <p className="text-2xl font-bold text-gray-800">{instrutor.alunos_count}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-xs mb-1 font-medium uppercase">Aulas Hoje</p>
          <p className="text-2xl font-bold text-gray-800">{instrutor.aulas_hoje_count}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-xs mb-1 font-medium uppercase">Média Avaliação</p>
          <p className="text-2xl font-bold text-orange-500">{instrutor.avaliacao_media}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-xs mb-1 font-medium uppercase">Solicitações</p>
          <p className="text-2xl font-bold text-blue-600">{instrutor.solicitacoes_pendentes}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agenda do Dia */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Agenda de Hoje</h3>
            <span className="text-sm text-gray-400">{new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}</span>
          </div>
          <div className="space-y-4">
             {instrutor.agenda_hoje.length > 0 ? instrutor.agenda_hoje.map((aula) => (
                <div key={aula.id} className="flex items-center justify-between p-4 border-l-4 border-indigo-500 bg-gray-50 rounded-r-lg">
                  <span className="font-medium text-gray-700">{aula.horario} - {aula.aluno_nome}</span>
                  <div className="space-x-3">
                    <button className="text-indigo-600 text-sm font-semibold hover:text-indigo-800">Detalhes</button>
                    <button className="bg-white border border-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-100">Presença</button>
                  </div>
                </div>
             )) : <p className="text-gray-400 italic">Nenhuma aula agendada para hoje.</p>}
          </div>
        </div>
        {/* Alunos Recentes/Atalhos */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Últimos Feedbacks</h3>
          {instrutor.feedbacks_recentes.length > 0 ? instrutor.feedbacks_recentes.map((feedback) => (
               <div key={feedback.id} className="flex flex-col gap-1 border-b border-gray-50 pb-3 last:border-0">
                 <div className="flex justify-between items-center">
                   <p className="text-sm font-medium text-gray-800">{feedback.aluno_nome}</p>
                   <span className="text-xs text-yellow-500">{'⭐'.repeat(feedback.avaliacao)}</span>
                 </div>
                 <p className="text-xs text-gray-500 italic">"{feedback.comentario}"</p>
               </div>
             )) : <p className="text-gray-400 italic">Nenhum feedback recente.</p>}
        </div>
      </div>
    </div>
  );
}