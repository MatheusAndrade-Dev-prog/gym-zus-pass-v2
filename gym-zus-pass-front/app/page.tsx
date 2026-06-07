'use client';

import './globals.css';
import { useState } from 'react';
import Topo from '@/components/Topo';
import Meio from '@/components/Meio';
import Carrosel from '@/components/Carrosel';
import Rodape from '@/components/Rodape';
import { Trainer } from '@/components/index';
import SolicitacaoModal from '@/components/SolicitacaoModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const personalTrainers: Trainer[] = [
    { id: 1, nome: 'João da Silva', localizacao: 'São Paulo, SP', imagemUrl: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, nome: 'Maria Oliveira', localizacao: 'Rio de Janeiro, RJ', imagemUrl: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, nome: 'Carlos Pereira', localizacao: 'Belo Horizonte, MG', imagemUrl: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, nome: 'Ana Costa', localizacao: 'Salvador, BA', imagemUrl: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, nome: 'Pedro Martins', localizacao: 'Porto Alegre, RS', imagemUrl: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, nome: 'Sofia Almeida', localizacao: 'Curitiba, PR', imagemUrl: 'https://i.pravatar.cc/150?img=6' },
  ];

  return (
    <main>
      <Topo />
      <div className="conteiner-principal">
        <Meio />
        <div className="my-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0 text-white">Personal Trainers em Destaque</h2>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => setIsModalOpen(true)}
            >
              Fazer uma Solicitação
            </button>
          </div>
          <Carrosel trainers={personalTrainers} />
        </div>
        <Rodape />
      </div>
      <SolicitacaoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={() => setIsModalOpen(false)} 
      />
    
    </main>
  );
}
