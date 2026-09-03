'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ApoiadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMaster, setIsMaster] = useState(false);

  useEffect(() => {
    // Simulação de verificação de autenticação no App Apoiador
    const validated = localStorage.getItem('whatsapp_validado');
    if (!validated) {
      router.push('/validar-whatsapp');
    } else {
      setIsAuthenticated(true);
      if (localStorage.getItem('master_access') === 'true') {
        setIsMaster(true);
      }
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; // Evita piscar a tela antes de redirecionar
  }

  return (
    <>
      {/* TopAppBar (Mobile) */}
      <header className="md:hidden sticky bg-primary top-0 z-40 w-full px-container-padding py-5 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-surface border-2 border-secondary overflow-hidden flex-shrink-0 relative shadow-sm">
            <img
              alt="Foto de perfil"
              className="w-full h-full object-cover"
              src="/candidato.jpg"
              onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Bruno+M&background=0053d6&color=fff"; }}
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-secondary rounded-full border-2 border-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[10px] text-on-secondary">
                photo_camera
              </span>
            </div>
          </div>
          <div>
            <h1 className="text-headline-md font-headline text-on-primary font-bold">Olá, BRUNO!</h1>
            <p className="text-body-md font-body text-primary-container opacity-90">Bem-vindo de volta</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-on-primary relative">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-primary"></span>
          </button>
          
          {isMaster && (
            <button onClick={() => router.push('/admin')} className="p-2 rounded-full hover:bg-white/10 transition-colors text-secondary" title="Acessar Painel Admin">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
            </button>
          )}

          <button onClick={() => { localStorage.removeItem('whatsapp_validado'); localStorage.removeItem('master_access'); window.location.href = '/validar-whatsapp'; }} className="p-2 rounded-full hover:bg-white/10 transition-colors text-on-primary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>logout</span>
          </button>
        </div>
      </header>

      {/* SideNavBar (Desktop) */}
      <nav className="hidden md:flex flex-col h-full w-72 fixed left-0 top-0 z-50 bg-surface border-r border-outline-variant shadow-lg py-8">
        <div className="px-container-padding mb-8 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-surface-container-high border-4 border-primary overflow-hidden mb-4 relative shadow-md">
            <img
              alt="Avatar do usuário"
              className="w-full h-full object-cover"
              src="/candidato.jpg"
              onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Bruno+M&background=0053d6&color=fff"; }}
            />
          </div>
          <h2 className="text-headline-lg font-headline font-bold text-on-surface">Bruno Machado</h2>
          <p className="text-body-md font-body text-primary font-semibold mt-1">Nível 1 • Bebê Leão</p>
          <button className="mt-6 text-label-bold font-label-bold bg-secondary text-on-secondary px-6 py-2.5 rounded-full hover:bg-[#e6b400] transition-colors shadow-sm font-bold">
            Editar Perfil
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto px-4 text-label-bold font-label-bold">
          <Link
            className="bg-primary text-on-primary rounded-xl px-4 py-3.5 flex items-center gap-3 shadow-md shadow-primary/20"
            href="/painel"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            <span className="text-base">Início</span>
          </Link>
          <Link
            className="text-on-surface-variant px-4 py-3.5 flex items-center gap-3 hover:bg-primary-container hover:text-primary transition-colors rounded-xl"
            href="/minha-equipe"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>group</span>
            <span className="text-base">Minha Equipe</span>
          </Link>
          <Link
            className="text-on-surface-variant px-4 py-3.5 flex items-center gap-3 hover:bg-primary-container hover:text-primary transition-colors rounded-xl"
            href="/moldura"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>monochrome_photos</span>
            <span className="text-base">Apoio</span>
          </Link>
          <Link
            className="text-on-surface-variant px-4 py-3.5 flex items-center gap-3 hover:bg-primary-container hover:text-primary transition-colors rounded-xl"
            href="/missoes"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>ads_click</span>
            <span className="text-base">Missões</span>
          </Link>
          <Link
            className="text-on-surface-variant px-4 py-3.5 flex items-center gap-3 hover:bg-primary-container hover:text-primary transition-colors rounded-xl"
            href="/minha-colinha"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>assignment</span>
            <span className="text-base">Minha Colinha</span>
          </Link>
          
          {isMaster && (
            <Link
              className="text-[#ffc800] px-4 py-3.5 flex items-center gap-3 hover:bg-[#ffc800]/10 transition-colors rounded-xl border border-[#ffc800]/20 mt-4 font-extrabold"
              href="/admin"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
              <span className="text-base">Painel Master</span>
            </Link>
          )}
        </div>
        <div className="mt-auto pt-6 border-t border-outline-variant px-4 text-label-bold font-label-bold flex flex-col gap-2">
          <button
            onClick={() => { localStorage.removeItem('whatsapp_validado'); localStorage.removeItem('master_access'); window.location.href = '/validar-whatsapp'; }}
            className="w-full text-on-surface-variant px-4 py-3 flex items-center gap-3 hover:bg-surface-variant transition-colors rounded-xl text-left"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>logout</span>
            <span className="text-base">Sair</span>
          </button>
          <Link
            className="text-on-surface-variant px-4 py-3 flex items-center gap-3 hover:bg-surface-variant transition-colors rounded-xl"
            href="https://wa.me/5561900000000"
            target="_blank"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>help</span>
            <span className="text-base">Suporte</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 md:ml-72 min-h-screen bg-background overflow-x-hidden">
        {children}
      </div>

      {/* BottomNavBar (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 pb-safe bg-surface border-t border-outline-variant shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <Link
          className="flex flex-col items-center justify-center text-primary py-1.5 transition-all"
          href="/painel"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[11px] font-label-bold font-bold mt-1">Home</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all py-1.5"
          href="/minha-equipe"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>group</span>
          <span className="text-[11px] font-label-bold mt-1">Equipe</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all py-1.5"
          href="/moldura"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>photo_camera</span>
          <span className="text-[11px] font-label-bold mt-1">Apoio</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all py-1.5"
          href="/missoes"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>ads_click</span>
          <span className="text-[11px] font-label-bold mt-1">Missões</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all py-1.5"
          href="/minha-colinha"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>how_to_vote</span>
          <span className="text-[11px] font-label-bold mt-1">Colinha</span>
        </Link>
      </nav>
    </>
  );
}
