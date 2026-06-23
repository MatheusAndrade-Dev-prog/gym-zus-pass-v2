"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

// ─────────────────────────────────────────────
// TIPOS E INTERFACES
// ─────────────────────────────────────────────

interface Badge {
  label: string;
  variant: "green" | "orange" | "red";
}

interface Trainer {
  id: string;
  nome: string;
  contato: string;
  localizacao: string;
  imagemUrl: string | null;
  iniciais: string;
  corAvatar: string;
  status: "online" | "offline";
  badges: Badge[];
  especialidade: string;
  academia: string;
  preco: string;
  descricao: string;
}

interface CardTrainerProps {
  trainer: Trainer;
  onVerPerfil: (t: Trainer) => void;
  onContato: (t: Trainer) => void;
}

// ─────────────────────────────────────────────
// COMPONENTES DE MODAL
// ─────────────────────────────────────────────

function PerfilModal({ trainer, onClose }: { trainer: Trainer; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a2e] border border-white/10 p-6 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-white font-bold text-2xl mb-1">{trainer.nome}</h3>
        <p className="text-[#ff6b00] text-sm font-medium mb-6">{trainer.especialidade}</p>

        {/* Descrição atualizada */}
        <div className="mb-6">
          <p className="text-gray-400 text-xs uppercase mb-2">Descrição do Profissional</p>
          <div className="bg-[#0d0d1a] p-4 rounded-xl border border-white/5 text-gray-200 leading-relaxed italic">
            "{trainer.descricao}"
          </div>
        </div>

        {/* Grid de Informações */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#0d0d1a] p-3 rounded-lg border border-white/5">
            <p className="text-gray-500 text-[10px] uppercase">Academia</p>
            <p className="text-white text-sm font-medium">{trainer.academia}</p>
          </div>
          <div className="bg-[#0d0d1a] p-3 rounded-lg border border-white/5">
            <p className="text-gray-500 text-[10px] uppercase">Localização</p>
            <p className="text-white text-sm font-medium">{trainer.localizacao}</p>
          </div>
          <div className="bg-[#0d0d1a] p-3 rounded-lg border border-white/5 col-span-2">
            <p className="text-gray-500 text-[10px] uppercase">Valor da Aula</p>
            <p className="text-[#00c853] text-lg font-bold">{trainer.preco}</p>
          </div>
        </div>

        <button 
          onClick={onClose} 
          className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

function ContatoModal({ trainer, onClose }: { trainer: Trainer; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a2e] border border-white/10 p-6 rounded-2xl w-full max-w-sm shadow-2xl">
        <h3 className="text-white font-bold text-lg mb-4">Contato: {trainer.nome}</h3>
        <div className="bg-[#0d0d1a] p-4 rounded-xl border border-white/5 mb-6 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">WhatsApp de contato</p>
          <p className="text-[#00c853] font-bold text-xl">{trainer.contato}</p>
        </div>
        <button onClick={onClose} className="w-full py-2.5 rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 transition-colors">Fechar</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPONENTES AUXILIARES
// ─────────────────────────────────────────────

const badgeStyles = {
  green: "bg-[#00c853]/10 text-[#00c853]",
  orange: "bg-[#ff6b00]/10 text-[#ff6b00]",
  red: "bg-[#ad1b2a]/10 text-[#ef5350]",
};

function BadgePill({ badge }: { badge: Badge }) {
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badgeStyles[badge.variant]}`}>
      {badge.label}
    </span>
  );
}

function CardTrainer({ trainer, onVerPerfil, onContato }: CardTrainerProps) {
  return (
    <div className="bg-[#1a1a2e] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors cursor-pointer group">
      <div className="relative w-full h-36 flex items-center justify-center" style={{ background: "#0d0d1a" }} onClick={() => onVerPerfil(trainer)}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-medium" style={{ background: trainer.corAvatar }}>
          {trainer.iniciais}
        </div>
      </div>

      <div className="p-4" onClick={() => onVerPerfil(trainer)}>
        <p className="text-white text-sm font-medium leading-tight">{trainer.nome}</p>
        <p className="text-gray-400 text-xs mt-0.5">{trainer.especialidade}</p>
        
        <p className="text-[#ff6b00] text-xs mt-2 font-medium bg-[#ff6b00]/10 px-2 py-1 rounded inline-block">
          🏋️ {trainer.academia}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {trainer.badges.map((b) => <BadgePill key={b.label} badge={b} />)}
        </div>

        <p className="text-gray-500 text-xs mt-2.5 flex items-center gap-1">📍 {trainer.localizacao}</p>
        
        <div className="flex items-center justify-start mt-3 pt-3 border-t border-white/5">
          <span className="text-[#00c853] text-sm font-medium">{trainer.preco}</span>
        </div>
      </div>

      <div className="px-4 pb-4 flex gap-2">
        <button onClick={() => onVerPerfil(trainer)} className="flex-1 py-1.5 rounded-lg bg-[#00c853] hover:bg-[#00b34a] text-black text-xs font-medium">Ver perfil</button>
        <button onClick={() => onContato(trainer)} className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-gray-300 text-xs">Contato</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────

export default function Explorar() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [categorias, setCategorias] = useState<string[]>(["Todos"]);
  
  const [modalContato, setModalContato] = useState<Trainer | null>(null);
  const [perfilSelecionado, setPerfilSelecionado] = useState<Trainer | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'Solicitações'), (snapshot) => {
      const lista = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          nome: data.seu_nome || "Usuário",
          contato: data.contato || "Não informado",
          iniciais: (data.seu_nome || "U").substring(0, 2).toUpperCase(),
          corAvatar: "#1565c0",
          especialidade: data.tipoAula || "Geral",
          localizacao: data.localizacao || "Não informada",
          preco: `R$ ${data.valorPorHora || "0"}/h`,
          academia: data.academiaFrequente || "Não informada",
          descricao: data.descrição || "Nenhuma descrição fornecida.",
          status: "online",
          badges: [{ label: "Solicitação", variant: "orange" }],
          imagemUrl: null
        } as Trainer;
      });
      setTrainers(lista);
    });

    const fetchCategorias = async () => {
      const querySnapshot = await getDocs(collection(db, 'especialidades'));
      let chaves: string[] = [];
      querySnapshot.forEach((doc) => {
        chaves = [...chaves, ...Object.keys(doc.data())];
      });
      setCategorias(["Todos", ...Array.from(new Set(chaves))]);
    };

    fetchCategorias();
    return () => unsub();
  }, []);

  const trainersFiltrados = filtroAtivo === "Todos" 
    ? trainers 
    : trainers.filter((t) => t.especialidade === filtroAtivo);

  return (
    <div className="min-h-screen bg-[#0d0d1a] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-10">Explorar</h1>
        
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categorias.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setFiltroAtivo(cat)} 
              className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
                filtroAtivo === cat ? "bg-[#00c853] border-[#00c853] text-black font-medium" : "border-white/10 text-gray-400 hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {trainersFiltrados.map((trainer) => (
            <CardTrainer
              key={trainer.id}
              trainer={trainer}
              onVerPerfil={(t) => setPerfilSelecionado(t)}
              onContato={(t) => setModalContato(t)}
            />
          ))}
        </div>
      </div>

      {perfilSelecionado && (
        <PerfilModal 
          trainer={perfilSelecionado} 
          onClose={() => setPerfilSelecionado(null)} 
        />
      )}
      
      {modalContato && (
        <ContatoModal 
          trainer={modalContato} 
          onClose={() => setModalContato(null)} 
        />
      )}
    </div>
  );
}