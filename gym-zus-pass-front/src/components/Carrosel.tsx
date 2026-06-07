'use client';

import { useState, useEffect, useRef } from 'react';
import { Trainer } from '@/components/index';

interface CarroselProps {
  trainers: Trainer[];
}

const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const statusConfig: Record<string, { label: string; color: string }> = {
  online:  { label: 'Online',  color: '#22c55e' },
  offline: { label: 'Offline', color: '#6b7280' },
  busy:    { label: 'Ocupado', color: '#f97316' },
};

export default function Carrosel({ trainers }: CarroselProps) {
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const chunks = chunkArray(trainers, 3);
  const total = chunks.length;

  const goTo = (index: number, dir: 'left' | 'right') => {
    if (sliding) return;
    setDirection(dir);
    setSliding(true);
    setTimeout(() => {
      setCurrent(index);
      setSliding(false);
    }, 400);
  };

  const prev = () => goTo((current - 1 + total) % total, 'right');
  const next = () => goTo((current + 1) % total, 'left');

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(next, 4000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [current]);

  const slideStyle: React.CSSProperties = {
    transition: sliding ? 'opacity 0.4s ease, transform 0.4s ease' : 'none',
    opacity: sliding ? 0 : 1,
    transform: sliding
      ? `translateX(${direction === 'left' ? '-40px' : '40px'})`
      : 'translateX(0)',
  };

  return (
    <div style={{ background: '#0d1117', borderRadius: '16px', padding: '28px 24px 20px' }}>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 600, marginBottom: '4px' }}>
            Personal Trainers <span style={{ color: '#22c55e' }}>em Destaque</span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
            📍 Mostrando profissionais na sua região
          </p>
        </div>
        <div className="d-flex gap-2">
          <button
            onClick={prev}
            aria-label="Anterior"
            style={navBtn}
            onMouseEnter={e => (e.currentTarget.style.background = '#22c55e')}
            onMouseLeave={e => (e.currentTarget.style.background = '#1a2332')}
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Próximo"
            style={navBtn}
            onMouseEnter={e => (e.currentTarget.style.background = '#22c55e')}
            onMouseLeave={e => (e.currentTarget.style.background = '#1a2332')}
          >
            ›
          </button>
        </div>
      </div>

      {/* Cards com animação */}
      <div style={{ overflow: 'hidden' }}>
        <div className="row g-3" style={slideStyle}>
          {chunks[current]?.map((trainer) => {
            const status = statusConfig[trainer.status ?? 'offline'] ?? statusConfig['offline'];
            return (
              <div key={trainer.id} className="col-12 col-md-4">
                <div
                  style={{ background: '#111827', borderRadius: '16px', overflow: 'hidden', border: '1px solid #1f2937', cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  {/* Imagem */}
                  <div style={{ position: 'relative' }}>
                    <img
                      src={trainer.imagemUrl}
                      alt={`Foto de ${trainer.nome}`}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {(trainer as any).badges?.includes('popular') && (
                        <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20, background: '#f59e0b', color: '#1c1407' }}>
                          Mais Procurado
                        </span>
                      )}
                      <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20, border: `1px solid ${status.color}`, color: status.color }}>
                        ● {status.label}
                      </span>
                    </div>
                    <button aria-label="Favoritar" style={{ position: 'absolute', top: 10, right: 10, width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(17,24,39,0.8)', color: '#6b7280', cursor: 'pointer', fontSize: 14 }}>
                      ♡
                    </button>
                  </div>

                  {/* Body */}
                  <div style={{ padding: 14 }}>
                    <div className="d-flex align-items-center gap-1 mb-1">
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#f9fafb' }}>{trainer.nome}</span>
                      <span style={{ color: '#22c55e', fontSize: 13 }}>✓</span>
                    </div>
                    <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 6 }}>📍 {trainer.localizacao}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10, color: '#f59e0b', fontSize: 13 }}>
                      ★★★★★
                    </div>
                    <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 10 }}>
                      <strong style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>R$ 100</strong> / sessão
                    </p>
                    <div className="d-flex gap-2">
                      <button style={{ flex: 1, padding: '8px', fontSize: 12, fontWeight: 600, borderRadius: 8, border: 'none', background: '#22c55e', color: '#0d1117', cursor: 'pointer' }}>
                        Ver Perfil
                      </button>
                      <button style={{ flex: 1, padding: '8px', fontSize: 12, fontWeight: 600, borderRadius: 8, border: '1px solid #374151', background: 'transparent', color: '#d1d5db', cursor: 'pointer' }}>
                        Contato
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="d-flex justify-content-center gap-2 mt-4">
        {chunks.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 'left' : 'right')}
            aria-label={`Slide ${i + 1}`}
            style={{
              height: 6,
              width: i === current ? 20 : 6,
              borderRadius: i === current ? 3 : '50%',
              background: i === current ? '#22c55e' : '#374151',
              border: 'none', padding: 0, cursor: 'pointer', transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

const navBtn: React.CSSProperties = {
  width: 36, height: 36, borderRadius: '50%',
  border: '1px solid #2d3748', background: '#1a2332',
  color: '#fff', fontSize: 20, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'background 0.2s',
};