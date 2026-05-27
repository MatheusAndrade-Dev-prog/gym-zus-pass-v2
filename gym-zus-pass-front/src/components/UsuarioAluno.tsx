'use client';
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase"; // ajuste o caminho

interface AlunoData {
  nome_completo: string;
  email: string;
  cidade: string;
  bairro: string;
  plano?: string;
}

export default function UsuarioAluno({ id }: { id: string }) {
  const [aluno, setAluno] = useState<AlunoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) return <div className="text-center p-10">Carregando perfil...</div>;
  if (!aluno) return <div className="text-center p-10">Aluno não encontrado.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold">
          {aluno.nome_completo.split(' ').map(n => n[0]).join('').toUpperCase()}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{aluno.nome_completo}</h2>
          <p className="text-gray-500">{aluno.email}</p>
          <p className="text-gray-500">{aluno.bairro} - {aluno.cidade}</p>
        </div>
      </div>
    </div>
  );
}