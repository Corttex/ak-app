'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardApoiador() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userPhone = localStorage.getItem('user_phone');
    if (!userPhone) {
      router.push('/validar-whatsapp');
      return;
    }

    fetch(`/api/supporter/me?phone=${userPhone}`)
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUserData(data.user);
        }
      })
      .finally(() => setIsLoading(false));
  }, [router]);

  if (isLoading) {
    return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">Carregando painel...</div>;
  }

  const nome = userData?.fullName || "Sem Nome";
  const slug = userData?.inviteSlug || "convite";
  const points = userData?.totalPoints || 0;
  
  // Gamification logic
  let level = "Bebê Leão";
  let nextLevel = "Filhote";
  let nextPoints = 100;
  let progress = (points / nextPoints) * 100;
  if (progress > 100) progress = 100;
  if (points >= 100) {
    level = "Filhote";
    nextLevel = "Jovem Leão";
    nextPoints = 500;
    progress = ((points - 100) / 400) * 100;
  }

  const inviteUrl = `https://ak.app.br/convite/${slug}`;

  return (
    <div className="pb-28 pt-8 px-6 max-w-5xl mx-auto w-full flex flex-col gap-8">
      {/* Candidate Profile Bio */}
      <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-outline-variant flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none"></div>
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-primary overflow-hidden shadow-md flex-shrink-0">
          <img
            alt="André Kubitschek"
            className="w-full h-full object-cover"
            src="/candidato.jpg"
            onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Andre+K&background=0053d6&color=fff"; }}
          />
        </div>
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1 z-10">
          <h2 className="text-headline-lg font-headline font-bold text-on-surface mb-1">Olá, {nome.split(' ')[0]}!</h2>
          <p className="text-body-lg font-body text-primary font-bold mb-3 flex items-center justify-center sm:justify-start gap-1">
            Seja bem-vindo(a) à equipe de André Kubitschek!
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
            <span className="bg-surface-dim text-on-surface-variant text-xs font-bold px-3 py-1 rounded-full border border-outline-variant">Ex-Secretário da Juventude</span>
            <span className="bg-surface-dim text-on-surface-variant text-xs font-bold px-3 py-1 rounded-full border border-outline-variant">Cristão</span>
            <span className="bg-surface-dim text-on-surface-variant text-xs font-bold px-3 py-1 rounded-full border border-outline-variant">Empresário</span>
            <span className="bg-surface-dim text-on-surface-variant text-xs font-bold px-3 py-1 rounded-full border border-outline-variant">Advogado</span>
          </div>
          <a href="https://www.instagram.com/andrekubitschek/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:scale-105 transition-transform">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            @andrekubitschek
          </a>
        </div>
      </div>

      {/* Gamification Progress */}
      <section className="bg-surface rounded-2xl p-6 border border-outline-variant flex flex-col gap-5 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary"></div>
        <div className="flex items-center gap-5 relative z-10 mt-2">
          <div className="w-20 h-20 bg-secondary-container rounded-full border-4 border-secondary flex items-center justify-center relative shadow-md">
            <span className="material-symbols-outlined text-on-secondary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-2">
              <h3 className="text-headline-lg font-headline font-bold text-on-surface">Nível {points >= 100 ? '2' : '1'} <span className="text-primary font-normal text-headline-md ml-1">• {level}</span></h3>
              <span className="material-symbols-outlined text-primary text-3xl">chevron_right</span>
            </div>
            <div className="flex justify-between text-body-lg font-body text-on-surface-variant mb-3 font-medium">
              <span>Próximo nível: {nextLevel}</span>
              <span className="text-primary font-bold">{points}/{nextPoints}</span>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-3 overflow-hidden shadow-inner">
              <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Invite Link Section - Highly Vibrant */}
      <section className="bg-primary rounded-3xl p-8 shadow-xl flex flex-col gap-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>
        <div className="relative z-10">
          <p className="text-body-md font-label-bold font-bold text-primary-fixed-dim uppercase tracking-widest mb-3">CONVIDE E GANHE PONTOS</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-on-surface text-body-lg font-body bg-white p-4 rounded-xl shadow-inner w-full">
            <span className="material-symbols-outlined text-primary text-2xl">link</span>
            <span className="font-semibold text-lg flex-1 text-center sm:text-left overflow-hidden text-ellipsis whitespace-nowrap" id="invite-link">
              {inviteUrl}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-between mt-2 relative z-10">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(inviteUrl);
              alert('Link copiado para a área de transferência!');
            }}
            className="flex-1 bg-white hover:bg-surface-dim text-primary py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-colors font-bold shadow-md"
          >
            <span className="material-symbols-outlined text-2xl">content_copy</span>
            <span>Copiar Link</span>
          </button>
          <button className="flex-1 bg-white hover:bg-surface-dim text-primary py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-colors font-bold shadow-md">
            <span className="material-symbols-outlined text-2xl">qr_code_2</span>
            <span>QR Code</span>
          </button>
          <a 
            href={`https://api.whatsapp.com/send?text=Apoie%20o%20Andr%C3%A9%20Kubitschek!%20Fa%C3%A7a%20parte%20da%20equipe:%20${encodeURIComponent(inviteUrl)}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 bg-secondary hover:bg-[#e6b400] text-on-secondary py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-colors font-bold shadow-md text-lg"
          >
            <span className="material-symbols-outlined text-2xl">share</span>
            <span>Convidar</span>
          </a>
        </div>
      </section>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WhatsApp */}
        <a className="bg-surface rounded-2xl p-6 border border-outline-variant flex items-center justify-between hover:shadow-md transition-shadow group" href="https://chat.whatsapp.com/campanha22022" target="_blank">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center text-white shadow-md shadow-[#25D366]/30 group-hover:scale-105 transition-transform">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path>
              </svg>
            </div>
            <span className="text-headline-md font-headline font-bold text-on-surface">WhatsApp da Campanha</span>
          </div>
          <span className="text-primary font-label-bold font-bold bg-primary-container px-4 py-2 rounded-full">Entrar</span>
        </a>

        {/* Radio */}
        <a className="bg-surface rounded-2xl p-6 border border-outline-variant flex items-center justify-between hover:shadow-md transition-shadow group" href="https://youtube.com/andrekubitschek" target="_blank">
          <div className="flex items-center gap-5">
            <img alt="Capa rádio" className="w-14 h-14 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" src="https://ui-avatars.com/api/?name=Radio+AK&background=0047BB&color=fff" />
            <div>
              <h4 className="text-headline-md font-headline font-bold text-on-surface">Rádio do Candidato</h4>
              <p className="text-body-md font-body text-on-surface-variant font-medium mt-1">André Kubitschek</p>
            </div>
          </div>
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-md shadow-primary/30">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </div>
        </a>
      </div>

      {/* Proposals Grid Section */}
      <section className="bg-surface rounded-3xl p-8 border border-outline-variant shadow-sm flex flex-col gap-6 mt-4">
        <div className="flex items-center gap-5 mb-2">
          <div className="w-14 h-14 bg-primary-container rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
          </div>
          <div>
            <h3 className="text-headline-lg font-headline font-bold text-on-surface">Propostas</h3>
            <p className="text-body-lg font-body text-on-surface-variant mt-1 font-medium">O que já fiz. E o que vou fazer.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button className="bg-surface-container hover:bg-primary hover:text-white border border-outline-variant hover:border-primary rounded-2xl p-6 text-center transition-all shadow-sm group">
            <span className="text-body-lg font-body font-bold text-on-surface group-hover:text-white">Saúde</span>
          </button>
          <button className="bg-surface-container hover:bg-primary hover:text-white border border-outline-variant hover:border-primary rounded-2xl p-6 text-center transition-all shadow-sm group">
            <span className="text-body-lg font-body font-bold text-on-surface group-hover:text-white">Economia</span>
          </button>
          <button className="bg-surface-container hover:bg-primary hover:text-white border border-outline-variant hover:border-primary rounded-2xl p-6 text-center transition-all shadow-sm group">
            <span className="text-body-lg font-body font-bold text-on-surface group-hover:text-white">Segurança</span>
          </button>
          <button className="bg-surface-container hover:bg-primary hover:text-white border border-outline-variant hover:border-primary rounded-2xl p-6 text-center transition-all shadow-sm group">
            <span className="text-body-lg font-body font-bold text-on-surface group-hover:text-white">Educação</span>
          </button>
          <button className="bg-surface-container hover:bg-primary hover:text-white border border-outline-variant hover:border-primary rounded-2xl p-6 text-center transition-all shadow-sm group">
            <span className="text-body-lg font-body font-bold text-on-surface group-hover:text-white">Transporte</span>
          </button>
          <button className="bg-surface-container hover:bg-primary hover:text-white border border-outline-variant hover:border-primary rounded-2xl p-6 text-center transition-all shadow-sm group">
            <span className="text-body-lg font-body font-bold text-on-surface group-hover:text-white">Emprego</span>
          </button>
        </div>
      </section>
    </div>
  );
}
