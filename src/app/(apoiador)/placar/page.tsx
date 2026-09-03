'use client';
import React, { useState, useEffect } from 'react';

type UserRank = {
  id: string;
  nome: string;
  avatarUrl: string;
  tier: string;
  pontos: number;
  cadastros: number;
};

export default function PlacarPage() {
  const [ranking, setRanking] = useState<UserRank[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/supporter/ranking')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRanking(data.ranking);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="pb-28 pt-8 px-6 max-w-5xl mx-auto w-full flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-black text-white flex items-center gap-3">
          <span className="material-symbols-outlined text-[#ffc800] text-4xl">social_leaderboard</span>
          Placar de Líderes
        </h1>
        <p className="text-body-lg font-body text-gray-300">
          Veja quem são os maiores mobilizadores da campanha.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-400">Carregando placar...</div>
      ) : ranking.length === 0 ? (
        <div className="text-center py-12 bg-surface rounded-3xl border border-white/10">
          <p className="text-gray-400">Nenhum apoiador no placar ainda.</p>
        </div>
      ) : (
        <div className="bg-surface rounded-[2rem] border border-outline-variant overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 divide-y divide-white/10">
            {ranking.map((user, index) => (
              <div 
                key={user.id}
                className={`p-5 flex items-center gap-4 transition-colors hover:bg-white/5 ${index < 3 ? 'bg-primary/5' : ''}`}
              >
                {/* Pos */}
                <div className="flex-shrink-0 w-8 text-center">
                  {index === 0 && <span className="material-symbols-outlined text-[#ffc800] text-3xl" style={{fontVariationSettings:"'FILL' 1"}}>workspace_premium</span>}
                  {index === 1 && <span className="material-symbols-outlined text-[#C0C0C0] text-3xl" style={{fontVariationSettings:"'FILL' 1"}}>workspace_premium</span>}
                  {index === 2 && <span className="material-symbols-outlined text-[#CD7F32] text-3xl" style={{fontVariationSettings:"'FILL' 1"}}>workspace_premium</span>}
                  {index > 2 && <span className="font-bold text-gray-400 text-lg">{index + 1}º</span>}
                </div>

                {/* Avatar */}
                <div className="w-14 h-14 rounded-full border-2 border-white/10 overflow-hidden flex-shrink-0 bg-surface-dim">
                  <img src={user.avatarUrl} alt={user.nome} className="w-full h-full object-cover" />
                </div>

                {/* Name & Title */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-white text-lg truncate">{user.nome}</h3>
                  <p className="text-xs text-gray-400 truncate">{user.tier}</p>
                </div>

                {/* Stats */}
                <div className="flex gap-4 text-right">
                  <div className="hidden sm:block">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Cadastros</p>
                    <p className="font-bold text-white bg-white/10 px-2 py-0.5 rounded-md inline-block">{user.cadastros}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#ffc800] uppercase tracking-wider mb-0.5">Pontos</p>
                    <p className="font-black text-[#ffc800] text-lg leading-none">{user.pontos}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
