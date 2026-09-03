'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Referral {
  id: string;
  fullName: string;
  city: string;
  tier: string;
  totalPoints: number;
  createdAt: string;
}

export default function MinhaEquipePage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [inviteSlug, setInviteSlug] = useState('ak-22022');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/supporter/equipe`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReferrals(data.referrals || []);
          if (data.inviteSlug) setInviteSlug(data.inviteSlug);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const inviteUrl = typeof window !== 'undefined' ? `${window.location.origin}/cadastro?ref=${inviteSlug}` : `https://ak.app.br/cadastro?ref=${inviteSlug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`Olá! Venha fazer parte da Mobilização Pro com André Kubitschek 22022! Cadastre-se pelo meu link de convite: ${inviteUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="pb-28 pt-8 px-6 max-w-5xl mx-auto w-full flex flex-col gap-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ffc800] text-3xl">groups</span>
          Minha Equipe
        </h1>
        <span className="bg-[#ffc800]/20 text-[#ffc800] border border-[#ffc800]/30 text-xs font-black px-3 py-1 rounded-full">
          {referrals.length} {referrals.length === 1 ? 'Indicado' : 'Indicados'}
        </span>
      </div>

      {/* Card de Link de Convite Destaque */}
      <div className="bg-gradient-to-br from-[#0047BB] to-[#002b7a] p-6 rounded-3xl shadow-xl border border-white/10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-8xl">share</span>
        </div>

        <h2 className="font-black text-xl text-white mb-1">Convide Novos Apoiadores</h2>
        <p className="text-gray-200 text-xs font-medium mb-5 leading-relaxed">
          Compartilhe seu link exclusivo para acumular pontos na colinha e subir de nível na rede.
        </p>

        {/* Link box */}
        <div className="bg-black/30 backdrop-blur-md p-3.5 rounded-2xl flex items-center justify-between border border-white/10 mb-4">
          <span className="text-xs font-mono text-gray-300 truncate mr-2 select-all">
            {inviteUrl}
          </span>
          <button
            onClick={copyLink}
            className="bg-[#ffc800] hover:bg-[#e6b400] text-[#06102b] font-black text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1 flex-shrink-0"
          >
            <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>

        <button
          onClick={shareWhatsApp}
          className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-sm py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <span className="material-symbols-outlined">send</span>
          Enviar Convite pelo WhatsApp
        </button>
      </div>

      {/* Lista da Rede de Apoiadores */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-black text-white">Sua Rede Direta</h2>
        <span className="text-xs text-gray-400 font-bold">Nível 1</span>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-400">Carregando sua equipe...</div>
      ) : referrals.length > 0 ? (
        <div className="space-y-3">
          {referrals.map((user) => (
            <div
              key={user.id}
              className="bg-[#0a1738] p-4 rounded-2xl border border-white/10 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0047BB] text-[#ffc800] rounded-2xl font-black text-lg flex items-center justify-center border border-white/10 shadow-inner">
                  {user.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">{user.fullName}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5 font-medium">
                    <span>{user.city || 'Brasília'}</span>
                    <span>•</span>
                    <span className="text-[#ffc800] font-bold">{user.totalPoints || 100} pts</span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-black uppercase tracking-wider bg-white/5 border border-white/10 text-gray-300 px-2.5 py-1 rounded-xl">
                {user.tier || 'FILHOTE'}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-[#0a1738] rounded-3xl border border-dashed border-white/10 p-6">
          <span className="material-symbols-outlined text-5xl text-gray-500 mb-2">person_add</span>
          <h3 className="font-extrabold text-white text-base mb-1">Nenhum indicado ainda</h3>
          <p className="text-xs text-gray-400 max-w-xs mx-auto mb-4">
            Compartilhe seu link de convite no WhatsApp para começar a montar sua equipe de apoio!
          </p>
          <button onClick={shareWhatsApp} className="bg-[#ffc800] text-[#06102b] font-black text-xs px-5 py-3 rounded-2xl shadow-md">
            Convidar Amigos
          </button>
        </div>
      )}

    </div>
  );
}
