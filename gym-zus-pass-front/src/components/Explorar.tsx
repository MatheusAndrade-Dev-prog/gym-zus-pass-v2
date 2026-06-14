"use client";

import { useState } from "react";

// ─────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────

type BadgeVariant = "green" | "orange" | "red";

interface Badge {
  label: string;
  variant: BadgeVariant;
}

interface Trainer {
  id: number;
  nome: string;
  localizacao: string;
  imagemUrl: string | null; // null = usa avatar com iniciais
  iniciais: string;
  corAvatar: string;
  status: "online" | "offline";
  badges: Badge[];
  especialidade: string;
  academia: string;
  distancia: string;
  rating: number;
  avaliacoes: number;
  preco: string;
}

// ─────────────────────────────────────────────
// DADOS MOCK — substitua pela chamada à API
// ─────────────────────────────────────────────

const TRAINERS: Trainer[] = [
  {
    id: 1,
    nome: "Lucas Ferreira",
    localizacao: "Pinheiros, SP",
    imagemUrl: null,
    iniciais: "LF",
    corAvatar: "#1565c0",
    status: "online",
    badges: [
      { label: "Top Avaliado", variant: "green" },
      { label: "Certificado", variant: "orange" },
    ],
    especialidade: "Musculação",
    academia: "Smart Fit Pinheiros",
    distancia: "0,8 km",
    rating: 4.9,
    avaliacoes: 128,
    preco: "R$120/h",
  },
  {
    id: 2,
    nome: "Carla Mendes",
    localizacao: "Vila Madalena, SP",
    imagemUrl: null,
    iniciais: "CM",
    corAvatar: "#6a1b9a",
    status: "online",
    badges: [
      { label: "Nova", variant: "orange" },
      { label: "Funcional", variant: "green" },
    ],
    especialidade: "Funcional",
    academia: "Bodytech Vila Madalena",
    distancia: "1,2 km",
    rating: 4.7,
    avaliacoes: 89,
    preco: "R$95/h",
  },
  {
    id: 3,
    nome: "Rafael Costa",
    localizacao: "Moema, SP",
    imagemUrl: null,
    iniciais: "RC",
    corAvatar: "#ad1b2a",
    status: "offline",
    badges: [
      { label: "Premium", variant: "red" },
      { label: "Crossfit", variant: "green" },
    ],
    especialidade: "Crossfit",
    academia: "CrossFit Moema",
    distancia: "2,1 km",
    rating: 4.8,
    avaliacoes: 204,
    preco: "R$140/h",
  },
  {
    id: 4,
    nome: "Ana Souza",
    localizacao: "Itaim Bibi, SP",
    imagemUrl: null,
    iniciais: "AS",
    corAvatar: "#00695c",
    status: "online",
    badges: [
      { label: "Top Avaliado", variant: "green" },
      { label: "Yoga", variant: "green" },
    ],
    especialidade: "Yoga",
    academia: "Academia Life Itaim",
    distancia: "0,5 km",
    rating: 5.0,
    avaliacoes: 56,
    preco: "R$110/h",
  },
  {
    id: 5,
    nome: "Pedro Lima",
    localizacao: "Brooklin, SP",
    imagemUrl: null,
    iniciais: "PL",
    corAvatar: "#e65100",
    status: "offline",
    badges: [{ label: "Cardio", variant: "orange" }],
    especialidade: "Cardio",
    academia: "Academia Total Brooklin",
    distancia: "3,0 km",
    rating: 4.6,
    avaliacoes: 142,
    preco: "R$80/h",
  },
  {
    id: 6,
    nome: "Julia Rocha",
    localizacao: "Jardins, SP",
    imagemUrl: null,
    iniciais: "JR",
    corAvatar: "#880e4f",
    status: "online",
    badges: [
      { label: "Mais Buscada", variant: "red" },
      { label: "Certificada", variant: "orange" },
    ],
    especialidade: "Musculação",
    academia: "Bodytech Jardins",
    distancia: "1,5 km",
    rating: 4.9,
    avaliacoes: 317,
    preco: "R$130/h",
  },
  {
    id: 7,
    nome: "Bruno Alves",
    localizacao: "Lapa, SP",
    imagemUrl: null,
    iniciais: "BA",
    corAvatar: "#1b5e20",
    status: "online",
    badges: [{ label: "Funcional", variant: "green" }],
    especialidade: "Funcional",
    academia: "Smart Fit Lapa",
    distancia: "2,4 km",
    rating: 4.5,
    avaliacoes: 73,
    preco: "R$90/h",
  },
  {
    id: 8,
    nome: "Mariana Pinto",
    localizacao: "Tatuapé, SP",
    imagemUrl: null,
    iniciais: "MP",
    corAvatar: "#0d47a1",
    status: "offline",
    badges: [
      { label: "Premium", variant: "red" },
      { label: "Crossfit", variant: "green" },
    ],
    especialidade: "Crossfit",
    academia: "CrossFit Tatuapé",
    distancia: "4,2 km",
    rating: 4.7,
    avaliacoes: 181,
    preco: "R$135/h",
  },
  {
    id: 9,
    nome: "Diego Neves",
    localizacao: "Santana, SP",
    imagemUrl: null,
    iniciais: "DN",
    corAvatar: "#37474f",
    status: "online",
    badges: [
      { label: "Corrida", variant: "orange" },
      { label: "Certificado", variant: "green" },
    ],
    especialidade: "Cardio",
    academia: "Run Academy Santana",
    distancia: "1,9 km",
    rating: 4.8,
    avaliacoes: 95,
    preco: "R$85/h",
  },
  {
    id: 10,
    nome: "Fernanda Torres",
    localizacao: "Morumbi, SP",
    imagemUrl: null,
    iniciais: "FT",
    corAvatar: "#4a148c",
    status: "online",
    badges: [
      { label: "Top Avaliado", variant: "green" },
      { label: "Pilates", variant: "orange" },
    ],
    especialidade: "Yoga",
    academia: "Studio Morumbi",
    distancia: "0,3 km",
    rating: 4.9,
    avaliacoes: 221,
    preco: "R$125/h",
  },
];

// Filtros disponíveis — adicione quantos quiser
const FILTROS = ["Todos", "Musculação", "Funcional", "Crossfit", "Cardio", "Yoga"];

// ─────────────────────────────────────────────
// COMPONENTE: BADGE
// ─────────────────────────────────────────────

const badgeStyles: Record<BadgeVariant, string> = {
  green: "bg-[#00c853]/10 text-[#00c853]",
  orange: "bg-[#ff6b00]/10 text-[#ff6b00]",
  red: "bg-[#ad1b2a]/10 text-[#ef5350]",
};

function BadgePill({ badge }: { badge: Badge }) {
  return (
    <span
      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badgeStyles[badge.variant]}`}
    >
      {badge.label}
    </span>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE: ESTRELAS
// ─────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i <= Math.round(rating) ? "text-[#f5a623]" : "text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE: CARD DO TRAINER
// ─────────────────────────────────────────────

interface CardTrainerProps {
  trainer: Trainer;
  favoritado: boolean;
  onToggleFav: () => void;
  onVerPerfil: (t: Trainer) => void;
  onContato: (t: Trainer) => void;
}

function CardTrainer({
  trainer: t,
  favoritado,
  onToggleFav,
  onVerPerfil,
  onContato,
}: CardTrainerProps) {
  return (
    <div className="bg-[#1a1a2e] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors cursor-pointer group">
      {/* Imagem / Avatar */}
      <div
        className="relative w-full h-36 flex items-center justify-center"
        style={{ background: "#0d0d1a" }}
        onClick={() => onVerPerfil(t)}
      >
        {t.imagemUrl ? (
          // Quando vier imagem real, use next/image aqui
          <img src={t.imagemUrl} alt={t.nome} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-medium"
            style={{ background: t.corAvatar }}
          >
            {t.iniciais}
          </div>
        )}

        {/* Status online/offline */}
        <span
          className={`absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full border-2 border-[#1a1a2e] ${
            t.status === "online" ? "bg-[#00c853]" : "bg-gray-500"
          }`}
        />

        {/* Botão favoritar */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // não aciona o clique do card
            onToggleFav();
          }}
          aria-label={favoritado ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center transition-colors hover:bg-black/60"
        >
          <svg
            className={`w-3.5 h-3.5 ${favoritado ? "text-[#ff6b00] fill-[#ff6b00]" : "text-gray-300"}`}
            fill={favoritado ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Corpo do card */}
      <div className="p-4" onClick={() => onVerPerfil(t)}>
        <p className="text-white text-sm font-medium leading-tight">{t.nome}</p>
        <p className="text-gray-400 text-xs mt-0.5">{t.especialidade} · {t.academia}</p>

        {/* Badges */}
        {t.badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {t.badges.map((b) => (
              <BadgePill key={b.label} badge={b} />
            ))}
          </div>
        )}

        {/* Distância */}
        <p className="text-gray-500 text-xs mt-2.5 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {t.distancia} · {t.localizacao}
        </p>

        {/* Rating + Preço */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <Stars rating={t.rating} />
            <span className="text-gray-400 text-xs">
              {t.rating.toFixed(1)} ({t.avaliacoes})
            </span>
          </div>
          <span className="text-[#00c853] text-sm font-medium">{t.preco}</span>
        </div>
      </div>

      {/* Ações */}
      <div className="px-4 pb-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => onVerPerfil(t)}
          className="flex-1 py-1.5 rounded-lg bg-[#00c853] hover:bg-[#00b34a] text-black text-xs font-medium transition-colors"
        >
          Ver perfil
        </button>
        <button
          onClick={() => onContato(t)}
          className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-gray-300 text-xs transition-colors"
        >
          Contato
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL: EXPLORAR
// ─────────────────────────────────────────────

export default function Explorar() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const [favoritos, setFavoritos] = useState<Set<number>>(new Set());

  // Filtra os trainers pelo filtro ativo
  const trainersFiltrados =
    filtroAtivo === "Todos"
      ? TRAINERS
      : TRAINERS.filter((t) => t.especialidade === filtroAtivo);

  // Alterna o estado de favorito de um trainer pelo id
  function toggleFavorito(id: number) {
    setFavoritos((prev) => {
      const novo = new Set(prev);
      if (novo.has(id)) novo.delete(id);
      else novo.add(id);
      return novo;
    });
  }

  // Callbacks — conecte ao roteador / modal do seu projeto
  function handleVerPerfil(t: Trainer) {
    console.log("Ver perfil:", t.nome);
    // Exemplo Next.js: router.push(`/trainer/${t.id}`)
  }

  function handleContato(t: Trainer) {
    console.log("Contato:", t.nome);
    // Exemplo: abrir modal de contato
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a] py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Cabeçalho */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white">Explorar Trainers</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Encontre o profissional ideal para o seu objetivo.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {FILTROS.map((filtro) => (
            <button
              key={filtro}
              onClick={() => setFiltroAtivo(filtro)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all border ${
                filtroAtivo === filtro
                  ? "bg-[#00c853] border-[#00c853] text-black font-medium"
                  : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {filtro}
            </button>
          ))}
        </div>

        {/* Contagem */}
        <p className="text-gray-500 text-xs text-center mb-6">
          {trainersFiltrados.length} trainer{trainersFiltrados.length !== 1 ? "s" : ""} encontrado
          {trainersFiltrados.length !== 1 ? "s" : ""}
        </p>

        {/* Grade de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {trainersFiltrados.map((trainer) => (
            <CardTrainer
              key={trainer.id}
              trainer={trainer}
              favoritado={favoritos.has(trainer.id)}
              onToggleFav={() => toggleFavorito(trainer.id)}
              onVerPerfil={handleVerPerfil}
              onContato={handleContato}
            />
          ))}
        </div>

        {/* Estado vazio */}
        {trainersFiltrados.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-sm">
              Nenhum trainer encontrado para "{filtroAtivo}".
            </p>
            <button
              onClick={() => setFiltroAtivo("Todos")}
              className="mt-4 text-[#00c853] text-sm hover:underline"
            >
              Ver todos
            </button>
          </div>
        )}

      </div>
    </div>
  );
}