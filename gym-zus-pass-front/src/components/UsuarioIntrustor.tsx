'use client';
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // ajuste o caminho

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

      if (docSnap.exists()) {
        setInstrutor(docSnap.data() as InstrutorData);
      }
      setLoading(false);
    };

    buscarInstrutor();
  }, [id]);

  if (loading) return <div className="text-center p-10">Carregando perfil do instrutor...</div>;
  if (!instrutor) return <div className="text-center p-10">Instrutor não encontrado.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-3xl font-bold">
          {instrutor.nome_completo.split(' ').map(n => n[0]).join('').toUpperCase()}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{instrutor.nome_completo}</h2>
          <p className="text-gray-500">{instrutor.email}</p>
          <p className="text-gray-500">{instrutor.bairro} - {instrutor.cidade}</p>
          <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2 text-sm">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 font-semibold rounded-full">
              CREF: {instrutor.cref}
            </span>
          </div>
          {instrutor.descricao && (
            <p className="mt-3 text-gray-600 italic">{instrutor.descricao}</p>
          )}
        </div>
      </div>
    </div>
  );
}