'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const BADGES_DB = [
  { id: 1, name: 'Primeiro Passo', description: 'Você completou seu cadastro e entrou para a equipe.', icon: 'directions_walk', color: 'from-blue-400 to-blue-600', earned: true },
  { id: 2, name: 'Adesivo no Carro', description: 'Colou o adesivo oficial no carro e enviou a foto.', icon: 'directions_car', color: 'from-yellow-400 to-yellow-600', earned: false },
  { id: 3, name: 'Voz da Rua', description: 'Enviou sua primeira proposta para o projeto.', icon: 'record_voice_over', color: 'from-green-400 to-green-600', earned: false },
  { id: 4, name: 'Rede Crescente', description: 'Convidou 5 amigos com seu link exclusivo.', icon: 'hub', color: 'from-purple-400 to-purple-600', earned: false },
  { id: 5, name: 'Multiplicador Nato', description: 'Convidou 20 amigos e subiu de nível.', icon: 'group_add', color: 'from-red-400 to-red-600', earned: false },
  { id: 6, name: 'Embaixador Digital', description: 'Compartilhou a moldura oficial nas redes sociais.', icon: 'share', color: 'from-pink-400 to-pink-600', earned: false },
  { id: 7, name: 'Lenda', description: 'Atingiu o nível máximo de engajamento.', icon: 'workspace_premium', color: 'from-yellow-300 via-yellow-500 to-yellow-700', earned: false },
];

export default function ConquistasPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [missions, setMissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/supporter/me').then(res => res.json()),
      fetch('/api/supporter/missions').then(res => res.json())
    ]).then(([userRes, missionsData]) => {
      if (!userRes.success) {
        router.push('/validar-whatsapp');
        return;
      }
      setUserData(userRes.supporter);
      if (!missionsData.error) {
        setMissions(missionsData);
      }
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, [router]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Carregando conquistas...</div>;
  }

  // Calculate logic for badges based on real data
  const checkEarned = (badgeId: number) => {
    if (!userData) return false;
    const pts = userData.totalPoints || 0;
    
    switch(badgeId) {
      case 1: return true; // Primeiro Passo (always true if logged in)
      case 2: // Adesivo no Carro
        return missions.some(m => m.title.includes('Carro') && m.status === 'APPROVED');
      case 3: // Voz da Rua
        return missions.some(m => m.title.includes('Desenvolvimento') && m.status === 'APPROVED');
      case 4: // Rede Crescente (Convidou 5 amigos) - simplificando pra pontos
        return pts >= 100;
      case 5: // Multiplicador Nato (Convidou 20 amigos)
        return pts >= 500;
      case 6: // Embaixador Digital
        return pts >= 1000;
      case 7: // Lenda
        return pts >= 5000;
      default: return false;
    }
  };

  const activeBadges = BADGES_DB.map(b => ({ ...b, earned: checkEarned(b.id) }));
  const earnedCount = activeBadges.filter(b => b.earned).length;

  return (
    <div className="pb-28 pt-8 px-6 max-w-5xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-headline font-black text-white mb-2 tracking-tight flex items-center gap-3">
            <span className="material-symbols-outlined text-[#ffc800] text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
            Sala de Troféus
          </h1>
          <p className="text-lg text-gray-300 font-medium">
            Colecione selos completando missões e mostrando seu apoio.
          </p>
        </div>
        
        {/* Progress Summary */}
        <div className="bg-surface/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-4 w-full md:w-auto shadow-lg">
          <div className="w-16 h-16 rounded-full bg-[#040d21] border-2 border-white/20 flex items-center justify-center relative shadow-inner">
            <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#ffc800]"
                strokeWidth="3"
                strokeDasharray={`${(earnedCount / BADGES_DB.length) * 100}, 100`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="text-white font-black text-lg">{earnedCount}/{BADGES_DB.length}</span>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg">Seu Progresso</h4>
            <p className="text-[#ffc800] text-sm font-bold">{Math.round((earnedCount / BADGES_DB.length) * 100)}% Completado</p>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {activeBadges.map((badge) => (
          <div 
            key={badge.id} 
            className={`relative group bg-[#040d21]/60 backdrop-blur-md rounded-3xl p-5 border flex flex-col items-center text-center transition-all duration-500 overflow-hidden ${
              badge.earned 
                ? 'border-[#ffc800]/50 shadow-[0_0_20px_rgba(255,200,0,0.15)] hover:shadow-[0_0_30px_rgba(255,200,0,0.3)] hover:-translate-y-2' 
                : 'border-white/5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 cursor-not-allowed'
            }`}
          >
            {/* Background Glow for earned badges */}
            {badge.earned && (
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            )}
            
            {/* Badge Icon / Trophy Image */}
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 relative z-10 shadow-lg ${
              badge.earned ? `bg-gradient-to-br ${badge.color}` : 'bg-gray-800'
            }`}>
              <div className="absolute inset-1 bg-[#040d21] rounded-full opacity-40 mix-blend-overlay"></div>
              <span className="material-symbols-outlined text-4xl text-white drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>
                {badge.icon}
              </span>
            </div>

            <h3 className={`font-black text-sm mb-1 z-10 ${badge.earned ? 'text-white' : 'text-gray-400'}`}>
              {badge.name}
            </h3>
            
            {/* Description Tooltip on Hover */}
            <div className="absolute inset-0 bg-[#0047BB]/95 backdrop-blur-sm p-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <p className="text-white text-xs font-medium">{badge.description}</p>
            </div>
            
            {/* Status Badge */}
            {!badge.earned && (
              <div className="absolute top-3 right-3 bg-black/50 rounded-full p-1 border border-white/10 z-10">
                <span className="material-symbols-outlined text-[10px] text-gray-400">lock</span>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
