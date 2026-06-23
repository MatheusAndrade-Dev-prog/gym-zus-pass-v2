"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function SolicitacaoModal({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: () => void }) {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [valor, setValor] = useState("");
  const [local, setLocal] = useState("");
  const [academia, setAcademia] = useState(""); // Novo estado para o campo solicitado
  const [tipoAula, setTipoAula] = useState("");
  const [descricao, setDescricao] = useState("");
  const [especialidades, setEspecialidades] = useState<string[]>([]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      const snap = await getDocs(collection(db, "especialidades"));
      let arr: string[] = [];
      snap.forEach((d) => arr = [...arr, ...Object.keys(d.data())]);
      setEspecialidades(Array.from(new Set(arr)));
    };
    fetchEspecialidades();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Solicitações"), {
        seu_nome: nome,
        contato,
        valorPorHora: valor,
        localizacao: local,
        academiaFrequente: academia, // Salvando o dado no campo solicitado
        tipoAula,
        descrição: descricao,
        status: "Aguardando resposta do professor",
        dataCriacao: new Date()
      });
      onAdd();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] p-6 rounded-2xl w-full max-w-md border border-white/10 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
        <h2 className="text-2xl font-bold text-white mb-6">Nova Solicitação</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Seu Nome</label>
            <input required type="text" className="w-full bg-[#0d0d1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff6b00]" onChange={e => setNome(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Contato (WhatsApp)</label>
              <input required type="text" className="w-full bg-[#0d0d1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff6b00]" onChange={e => setContato(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Valor h/aula (R$)</label>
              <input required type="number" className="w-full bg-[#0d0d1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff6b00]" onChange={e => setValor(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Endereço</label>
            <input required type="text" className="w-full bg-[#0d0d1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff6b00]" onChange={e => setLocal(e.target.value)} />
          </div>

          {/* Campo de Academia adicionado abaixo */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Academia que frequenta</label>
            <input required type="text" className="w-full bg-[#0d0d1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff6b00]" onChange={e => setAcademia(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1 font-semibold uppercase">Tipo de Aula</label>
            <select required className="w-full bg-[#0d0d1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff6b00]" onChange={e => setTipoAula(e.target.value)}>
              <option value="">Selecione uma especialidade...</option>
              {especialidades.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Objetivo / Descrição</label>
            <textarea required rows={3} className="w-full bg-[#0d0d1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff6b00]" onChange={e => setDescricao(e.target.value)} />
          </div>

          <button type="submit" className="w-full bg-[#ff6b00] hover:bg-[#e66000] text-white font-bold py-3 rounded-lg transition-colors">
            Enviar Solicitação
          </button>
        </form>
      </div>
    </div>
  );
}