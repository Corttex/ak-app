'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardApoiador() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState<string | null>(null);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [suggestionText, setSuggestionText] = useState('');

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

  const nome = userData?.fullName || "";
  const firstName = nome ? nome.split(' ')[0] : "";
  const isProfileIncomplete = !nome || nome.toLowerCase() === "sem nome";
  const slug = userData?.inviteSlug || "ak-22022";
  const points = userData?.totalPoints || 0;
  
  // Gamification logic
  let level = "Apoiador Iniciante";
  let nextLevel = "Multiplicador";
  let nextPoints = 100;
  let progress = (points / nextPoints) * 100;
  if (progress > 100) progress = 100;
  if (points >= 100 && points < 500) {
    level = "Multiplicador";
    nextLevel = "Coordenador de Rede";
    nextPoints = 500;
    progress = ((points - 100) / 400) * 100;
  } else if (points >= 500 && points < 1000) {
    level = "Coordenador de Rede";
    nextLevel = "Embaixador AK";
    nextPoints = 1000;
    progress = ((points - 500) / 500) * 100;
  } else if (points >= 1000) {
    level = "Embaixador AK";
    nextLevel = "Lenda";
    nextPoints = points;
    progress = 100;
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
          <h2 className="text-headline-lg font-headline font-bold text-on-surface mb-1">{firstName ? `Olá, ${firstName}!` : 'Olá!'}</h2>
          <p className="text-body-lg font-body text-primary font-bold mb-3 flex items-center justify-center sm:justify-start gap-1">
            Seja bem-vindo(a) à equipe de André Kubitschek!
          </p>
          {isProfileIncomplete && (
            <div className="bg-[#fff8e1] border border-[#ffc800] rounded-xl p-4 mb-4 flex flex-col sm:flex-row items-center gap-3">
              <span className="material-symbols-outlined text-[#ffc800] text-2xl">account_circle</span>
              <p className="text-sm text-gray-800 font-medium text-left">
                Complete o seu cadastro em <a href="/perfil" className="font-black text-[#d19c00] underline">Editar Perfil</a>. Ao completar ele, você já ganha 50 pontos.
              </p>
            </div>
          )}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
            <span className="bg-surface-dim text-on-surface-variant text-xs font-bold px-3 py-1 rounded-full border border-outline-variant">Ex-Secretário da Juventude</span>
            <span className="bg-surface-dim text-on-surface-variant text-xs font-bold px-3 py-1 rounded-full border border-outline-variant">Cristão</span>
            <span className="bg-surface-dim text-on-surface-variant text-xs font-bold px-3 py-1 rounded-full border border-outline-variant">Empresário</span>
            <span className="bg-surface-dim text-on-surface-variant text-xs font-bold px-3 py-1 rounded-full border border-outline-variant">Advogado</span>
          </div>
        </div>
      </div>

      {/* Gamification Progress */}
      <section className="bg-surface rounded-2xl p-6 border border-outline-variant flex flex-col gap-5 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary"></div>
        <div className="flex items-center gap-5 relative z-10 mt-2">
          <div className="w-20 h-20 bg-secondary-container rounded-full border-4 border-secondary flex items-center justify-center relative shadow-md">
            <span className="material-symbols-outlined text-on-secondary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-2">
              <h3 className="text-headline-lg font-headline font-bold text-on-surface">Nível {points >= 100 ? '2' : '1'} <span className="text-primary font-normal text-headline-md ml-1">• {level}</span></h3>
            </div>
            <div className="flex justify-between text-body-lg font-body text-on-surface-variant mb-3 font-medium">
              <span>Próximo nível: {nextLevel}</span>
              <span className="text-primary font-bold">{points}/{nextPoints}</span>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-3 overflow-hidden shadow-inner mb-3">
              <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
            </div>
            
            {/* Link to Badges Gallery */}
            <a href="/conquistas" className="inline-flex items-center gap-1.5 text-secondary hover:text-primary transition-colors font-bold text-sm">
              <span className="material-symbols-outlined text-lg">emoji_events</span>
              Ver Sala de Troféus
              <span className="material-symbols-outlined text-sm ml-auto">arrow_forward</span>
            </a>
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
          <button 
            onClick={() => setShowQR(true)}
            className="flex-1 bg-white hover:bg-surface-dim text-primary py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-colors font-bold shadow-md"
          >
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

        {/* Media (Videos / Jingle) */}
        <a className="bg-surface rounded-2xl p-6 border border-outline-variant flex items-center justify-between hover:shadow-md transition-shadow group" href="https://www.youtube.com/channel/UCeOj9Vns3WuR9rQ2xcD3aSQ" target="_blank">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#FF0000] rounded-2xl flex items-center justify-center text-white shadow-md shadow-[#FF0000]/30 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-3xl">play_circle</span>
            </div>
            <div>
              <h4 className="text-headline-md font-headline font-bold text-on-surface">Vídeos da Campanha</h4>
              <p className="text-body-md font-body text-on-surface-variant font-medium mt-1">YouTube Oficial</p>
            </div>
          </div>
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-md shadow-primary/30">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </div>
        </a>

        {/* Instagram */}
        <a className="bg-surface rounded-2xl p-6 border border-outline-variant flex items-center justify-between hover:shadow-md transition-shadow group" href="https://www.instagram.com/andrekubitschek" target="_blank">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <span className="text-2xl font-bold font-serif">ig</span>
            </div>
            <div>
              <h4 className="text-headline-md font-headline font-bold text-on-surface">Instagram</h4>
              <p className="text-body-md font-body text-on-surface-variant font-medium mt-1">@andrekubitschek</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-primary">open_in_new</span>
        </a>

        {/* Facebook */}
        <a className="bg-surface rounded-2xl p-6 border border-outline-variant flex items-center justify-between hover:shadow-md transition-shadow group" href="https://www.facebook.com/AndreOctavioKubitschek" target="_blank">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#1877F2] rounded-2xl flex items-center justify-center text-white shadow-md shadow-[#1877F2]/30 group-hover:scale-105 transition-transform">
              <span className="text-2xl font-bold font-serif">fb</span>
            </div>
            <div>
              <h4 className="text-headline-md font-headline font-bold text-on-surface">Facebook</h4>
              <p className="text-body-md font-body text-on-surface-variant font-medium mt-1">Página Oficial</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-primary">open_in_new</span>
        </a>

        {/* TikTok */}
        <a className="bg-surface rounded-2xl p-6 border border-outline-variant flex items-center justify-between hover:shadow-md transition-shadow group" href="https://www.tiktok.com/@andrekubitschek" target="_blank">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-md shadow-black/30 group-hover:scale-105 transition-transform">
              <span className="text-2xl font-bold font-sans">tk</span>
            </div>
            <div>
              <h4 className="text-headline-md font-headline font-bold text-on-surface">TikTok</h4>
              <p className="text-body-md font-body text-on-surface-variant font-medium mt-1">@andrekubitschek</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-primary">open_in_new</span>
        </a>

        {/* X (Twitter) */}
        <a className="bg-surface rounded-2xl p-6 border border-outline-variant flex items-center justify-between hover:shadow-md transition-shadow group" href="https://x.com/andrekubitschek" target="_blank">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-md shadow-black/30 group-hover:scale-105 transition-transform">
              <span className="text-2xl font-bold font-sans">X</span>
            </div>
            <div>
              <h4 className="text-headline-md font-headline font-bold text-on-surface">X (Twitter)</h4>
              <p className="text-body-md font-body text-on-surface-variant font-medium mt-1">@andrekubitschek</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-primary">open_in_new</span>
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
          <button onClick={() => setShowProposalModal('1º Emprego')} className="bg-surface-container hover:bg-primary hover:text-white border border-outline-variant hover:border-primary rounded-2xl p-6 text-center transition-all shadow-sm group">
            <span className="text-body-lg font-body font-bold text-on-surface group-hover:text-white">1º Emprego</span>
          </button>
          <button onClick={() => setShowProposalModal('Qualificação')} className="bg-surface-container hover:bg-primary hover:text-white border border-outline-variant hover:border-primary rounded-2xl p-6 text-center transition-all shadow-sm group">
            <span className="text-body-lg font-body font-bold text-on-surface group-hover:text-white">Qualificação</span>
          </button>
          <button onClick={() => setShowProposalModal('Empreendedorismo')} className="bg-surface-container hover:bg-primary hover:text-white border border-outline-variant hover:border-primary rounded-2xl p-6 text-center transition-all shadow-sm group">
            <span className="text-body-lg font-body font-bold text-on-surface group-hover:text-white">Empreendedorismo</span>
          </button>
          <button onClick={() => setShowProposalModal('Inovação e Tecnologia')} className="bg-surface-container hover:bg-primary hover:text-white border border-outline-variant hover:border-primary rounded-2xl p-6 text-center transition-all shadow-sm group">
            <span className="text-body-lg font-body font-bold text-on-surface group-hover:text-white">Inovação e Tecnologia</span>
          </button>
          <button onClick={() => setShowProposalModal('Mobilidade')} className="bg-surface-container hover:bg-primary hover:text-white border border-outline-variant hover:border-primary rounded-2xl p-6 text-center transition-all shadow-sm group">
            <span className="text-body-lg font-body font-bold text-on-surface group-hover:text-white">Mobilidade</span>
          </button>
          <button onClick={() => setShowProposalModal('Segurança')} className="bg-surface-container hover:bg-primary hover:text-white border border-outline-variant hover:border-primary rounded-2xl p-6 text-center transition-all shadow-sm group">
            <span className="text-body-lg font-body font-bold text-on-surface group-hover:text-white">Segurança</span>
          </button>
        </div>
        
        <div className="mt-8 bg-primary-container p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <h4 className="text-2xl font-black text-on-primary-container mb-2">Que DF você quer ajudar a construir?</h4>
            <p className="text-on-surface-variant font-medium mb-4">
              Quero conhecer os desafios da sua região e ouvir suas ideias para melhorar Brasília. Conte o que precisa mudar no seu bairro ou região administrativa. Sua contribuição ajudará na construção de propostas mais próximas da realidade da população.
            </p>
          </div>
          <button 
            onClick={() => setShowSuggestionModal(true)}
            className="w-full sm:w-auto bg-[#25D366] text-white font-bold py-4 px-6 rounded-xl hover:bg-[#1EBE5D] transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-2xl">chat</span>
            Enviar minha proposta
          </button>
        </div>
      </section>

      {/* Proposal Details Popup */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface p-8 rounded-3xl max-w-lg w-full flex flex-col shadow-2xl relative">
            <button 
              onClick={() => setShowProposalModal(null)} 
              className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
            </div>
            <h3 className="text-3xl font-headline font-black text-on-surface mb-4">{showProposalModal}</h3>
            <p className="text-body-lg text-on-surface-variant font-medium leading-relaxed mb-6">
              Esta é a proposta para {showProposalModal}. Nosso compromisso é atuar fortemente nesta área, garantindo recursos, inovação e execução rápida para gerar os melhores resultados para toda a população do Distrito Federal.
              <br /><br />
              Continuaremos trabalhando para que o legado de realizações cresça ainda mais.
            </p>
            <button 
              onClick={() => setShowProposalModal(null)}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-[#0042aa] transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Suggestion Form Popup */}
      {showSuggestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface p-8 rounded-3xl max-w-lg w-full flex flex-col shadow-2xl relative">
            <button 
              onClick={() => setShowSuggestionModal(false)} 
              className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <h3 className="text-2xl font-headline font-black text-on-surface mb-2">Sua Ideia para o DF</h3>
            <p className="text-on-surface-variant mb-4 font-medium">Escreva abaixo sua proposta. Ela será enviada diretamente para a nossa equipe via WhatsApp.</p>
            
            <textarea 
              value={suggestionText}
              onChange={(e) => setSuggestionText(e.target.value)}
              placeholder="Ex: No meu bairro precisamos de..."
              className="w-full bg-surface-container border border-outline-variant rounded-xl p-4 min-h-[120px] text-on-surface focus:outline-none focus:border-primary resize-none mb-4"
            ></textarea>
            
            <a 
              href={`https://wa.me/5561999531555?text=${encodeURIComponent(`Olá, vim pelo site. Gostaria de enviar uma proposta para o André Kubitschek:\n\n${suggestionText}`)}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => setShowSuggestionModal(false)}
              className="w-full bg-[#25D366] text-white font-bold py-3 rounded-xl hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">send</span>
              Enviar Ideia
            </a>
          </div>
        </div>
      )}

      {/* QR Code Popup */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface p-8 rounded-3xl max-w-sm w-full flex flex-col items-center gap-6 shadow-2xl relative">
            <button 
              onClick={() => setShowQR(false)} 
              className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <h3 className="text-2xl font-headline font-black text-on-surface text-center">Seu Convite</h3>
            <div className="bg-white p-4 rounded-2xl shadow-inner border border-outline-variant">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(inviteUrl)}`} 
                alt="QR Code Convite" 
                className="w-48 h-48"
              />
            </div>
            <p className="text-body-md text-on-surface-variant text-center font-medium">
              Peça para seu amigo escanear este código com a câmera do celular.
            </p>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(inviteUrl);
                alert('Link copiado!');
              }}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-[#0042aa] transition-colors"
            >
              Copiar Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
