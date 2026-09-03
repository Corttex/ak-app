'use client';
import { useEffect, useState } from 'react';

type Mission = {
  id: string;
  title: string;
  description: string;
  pointsReward: number;
  badgeReward: string;
  requiresProof: boolean;
  status: string; // AVAILABLE, PENDING, APPROVED, REJECTED
};

export default function MissoesApoiadorPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/supporter/missions').then(res => res.json()),
      fetch('/api/supporter/me').then(res => res.json())
    ]).then(([missionsData, userRes]) => {
      if (!missionsData.error) setMissions(missionsData);
      if (userRes.success) setUserData(userRes.supporter);
      setLoading(false);
    });
  }, []);

  const handleStartMission = async (missionId: string, requiresProof: boolean) => {
    if (requiresProof) {
      // In a real app, this would open a modal to upload an image
      alert('Esta missão exige envio de foto! A funcionalidade de envio de mídia está em desenvolvimento e logo estará liberada no app.');
      return;
    }
    
    // Auto-complete non-proof missions
    const res = await fetch('/api/supporter/missions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ missionId })
    });
    
    if (res.ok) {
      alert('Missão concluída com sucesso!');
      window.location.reload();
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PENDING': return <span className="bg-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-md">Em Análise</span>;
      case 'APPROVED': return <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-md">Concluída</span>;
      case 'REJECTED': return <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-md">Recusada</span>;
      default: return null;
    }
  };

  return (
    <div className="pb-28 pt-8 px-6 max-w-5xl mx-auto w-full flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-black text-white">Central de Missões</h1>
        <p className="text-body-lg font-body text-gray-300">
          Complete tarefas, suba de nível e ganhe destaque na campanha.
        </p>
      </div>

      {/* Gamification Status Bar (Compact) */}
      <section className="bg-surface rounded-2xl p-6 border border-outline-variant flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container shadow-inner">
            <span className="material-symbols-outlined text-3xl">star</span>
          </div>
          <div>
            <p className="text-sm font-label-bold font-bold text-on-surface-variant uppercase tracking-wider">Pontos Totais</p>
            <h2 className="text-3xl font-gamified-stat font-extrabold text-primary">{userData?.totalPoints || 0}</h2>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-label-bold font-bold text-on-surface-variant uppercase tracking-wider">Nível Atual</p>
          <h2 className="text-xl font-headline font-bold text-on-surface">{userData?.tier || 'Apoiador Iniciante'}</h2>
        </div>
      </section>

      {/* Missions Tabs */}
      <div className="flex gap-4 border-b border-white/20 overflow-x-auto no-scrollbar">
        <button className="px-4 py-3 font-label-bold font-bold text-primary border-b-2 border-primary whitespace-nowrap">
          Todas as Missões ({missions.length})
        </button>
        <button className="px-4 py-3 font-label-bold font-bold text-gray-400 hover:text-white whitespace-nowrap transition-colors">
          Concluídas ({missions.filter(m => m.status === 'APPROVED').length})
        </button>
      </div>

      {/* Mission List */}
      <div className="flex flex-col gap-4">
        {loading && <p className="text-white text-center py-10">Carregando missões...</p>}
        
        {!loading && missions.map((mission) => (
          <div key={mission.id} className={`bg-surface border ${mission.status === 'APPROVED' ? 'border-green-500' : 'border-outline-variant'} rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center transition-all`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${mission.status === 'APPROVED' ? 'bg-green-100 text-green-600' : 'bg-primary-container text-primary'}`}>
              <span className="material-symbols-outlined text-3xl">
                {mission.status === 'APPROVED' ? 'check_circle' : (mission.requiresProof ? 'photo_camera' : 'thumb_up')}
              </span>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h3 className="text-xl font-headline font-bold text-on-surface">{mission.title}</h3>
                <span className="bg-secondary text-on-secondary text-xs font-bold px-2 py-1 rounded-md">+{mission.pointsReward} PTS</span>
                {getStatusBadge(mission.status)}
              </div>
              <p className="text-body-md font-body text-on-surface-variant">
                {mission.description}
              </p>
            </div>
            
            <div className="w-full sm:w-auto">
              {mission.status === 'AVAILABLE' || mission.status === 'REJECTED' ? (
                <button 
                  onClick={() => handleStartMission(mission.id, mission.requiresProof)}
                  className="w-full bg-primary text-on-primary font-bold py-3 px-6 rounded-xl hover:bg-[#0042aa] transition-colors shadow-md whitespace-nowrap"
                >
                  {mission.requiresProof ? 'Enviar Comprovante' : 'Começar Missão'}
                </button>
              ) : (
                <button disabled className="w-full bg-gray-200 text-gray-500 font-bold py-3 px-6 rounded-xl cursor-not-allowed whitespace-nowrap">
                  {mission.status === 'PENDING' ? 'Aguardando Aprovação' : 'Missão Concluída'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
