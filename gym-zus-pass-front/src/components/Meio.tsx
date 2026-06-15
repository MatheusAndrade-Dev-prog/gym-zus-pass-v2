'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function Meio() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/resultados?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
   <section className="relative w-full overflow-hidden">
  <div className="relative w-full min-h-screen bg-gray-950 flex items-center ">

    {/* grade de fundo */}
    <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

    {/* degradê vermelho */}
    <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-transparent to-transparent" />
        {/* coluna esquerda — texto + form */}
        <div className="relative z-10 flex-1 flex flex-col gap-8 pl-16 pr-8 p-1">
          <h1 className="font-display text-white text-red-700 text-6xl sm:text-7xl lg:text-8xl leading-[0.9] uppercase">
            Transforme e evolua seu corpo com o GymZus Pass, uma plataforma inovadora de aulas particulares!
          </h1>
          <p className="text-gray-400 text-lg">Intermediação precisa entre aluno e professor</p>

          {/* form de busca */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar professor, modalidade..."
                aria-label="Buscar"
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-gray-800 border  border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="h-12 px-6  rounded-full border border-red-600 bg-red-700 hover:bg-red-600 text-white font-medium transition-colors whitespace-nowrap"
            >
              Buscar
            </button>
          </form>
        </div>

        {/* coluna direita — imagem */}
        <div className="relative z-10 flex-1 flex justify-end">
          <img
            src="/image/Studio Shot 02.jpg"
            alt="Atleta treinando"
            className="h-screen w-auto object-cover shadow-2xl shadow-black/60"
          />
          {/* gradiente transparente nas bordas */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/10 to-transparent" />
        </div>

      </div>
    </section>
  );
}