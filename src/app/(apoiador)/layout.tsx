'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function ApoiadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMaster, setIsMaster] = useState(false);

  useEffect(() => {
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
    return null;
  }

  return (
    <>
      {/* TopAppBar (Mobile) */}
      <header className="md:hidden sticky bg-[#040d21] top-0 z-40 w-full px-5 py-4 flex justify-between items-center border-b border-white/10 shadow-md text-white">
        <Link href="/perfil" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-[#ffc800] overflow-hidden flex-shrink-0 relative shadow-sm">
            <img
              alt="Foto de perfil"
              className="w-full h-full object-cover"
              src="/candidato.jpg"
              onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Bruno+M&background=0047BB&color=fff"; }}
            />
          </div>
          <div>
            <h1 className="text-sm font-black text-white leading-tight">Olá, BRUNO!</h1>
            <p className="text-[11px] text-gray-400 font-medium">Bebê Leão • Nível 1</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {isMaster && (
            <button onClick={() => router.push('/admin')} className="p-2 rounded-full bg-[#ffc800]/20 text-[#ffc800] border border-[#ffc800]/30" title="Painel Admin">
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
            </button>
          )}

          <button onClick={() => { localStorage.removeItem('whatsapp_validado'); localStorage.removeItem('master_access'); window.location.href = '/validar-whatsapp'; }} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300">
            <span className="material-symbols-outlined text-sm">logout</span>
          </button>
        </div>
      </header>

      {/* SideNavBar (Desktop) */}
      <nav className="hidden md:flex flex-col h-full w-72 fixed left-0 top-0 z-50 bg-[#040d21] border-r border-white/10 shadow-lg py-8 text-white">
        <div className="px-6 mb-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full border-4 border-[#ffc800] overflow-hidden mb-3 relative shadow-md">
            <img
              alt="Avatar do usuário"
              className="w-full h-full object-cover"
              src="/candidato.jpg"
              onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Bruno+M&background=0047BB&color=fff"; }}
            />
          </div>
          <h2 className="text-lg font-black text-white">Bruno Machado</h2>
          <p className="text-xs text-[#ffc800] font-bold mt-0.5">Bebê Leão • Nível 1</p>
          <Link href="/perfil" className="mt-4 text-xs font-black bg-[#ffc800] text-[#040d21] px-5 py-2 rounded-full hover:bg-[#e6b400] transition-colors shadow-sm">
            Editar Perfil
          </Link>
        </div>

        <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto px-4 font-bold text-sm">
          <Link
            className={`px-4 py-3 rounded-2xl flex items-center gap-3 transition-all ${
              pathname === '/painel' ? 'bg-[#0047BB] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
            href="/painel"
          >
            <span className="material-symbols-outlined">home</span>
            <span>Início</span>
          </Link>
          <Link
            className={`px-4 py-3 rounded-2xl flex items-center gap-3 transition-all ${
              pathname === '/minha-equipe' ? 'bg-[#0047BB] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
            href="/minha-equipe"
          >
            <span className="material-symbols-outlined">group</span>
            <span>Minha Equipe</span>
          </Link>
          <Link
            className={`px-4 py-3 rounded-2xl flex items-center gap-3 transition-all ${
              pathname === '/moldura' ? 'bg-[#0047BB] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
            href="/moldura"
          >
            <span className="material-symbols-outlined">photo_camera</span>
            <span>Apoio</span>
          </Link>
          <Link
            className={`px-4 py-3 rounded-2xl flex items-center gap-3 transition-all ${
              pathname === '/missoes' ? 'bg-[#0047BB] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
            href="/missoes"
          >
            <span className="material-symbols-outlined">ads_click</span>
            <span>Missões</span>
          </Link>
          <Link
            className={`px-4 py-3 rounded-2xl flex items-center gap-3 transition-all ${
              pathname === '/minha-colinha' ? 'bg-[#ffc800] text-[#040d21] font-black shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
            href="/minha-colinha"
          >
            <span className="material-symbols-outlined">assignment_turned_in</span>
            <span>Minha Colinha</span>
          </Link>
          
          {isMaster && (
            <Link
              className="text-[#ffc800] px-4 py-3 flex items-center gap-3 hover:bg-[#ffc800]/10 transition-colors rounded-2xl border border-[#ffc800]/20 mt-4 font-black"
              href="/admin"
            >
              <span className="material-symbols-outlined">admin_panel_settings</span>
              <span>Painel Master</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 md:ml-72 min-h-screen bg-background overflow-x-hidden">
        {children}
      </div>

      {/* BottomNavBar (Mobile) - Estilo Réplica Referência */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-between items-center px-4 py-2 bg-[#040d21]/95 backdrop-blur-md border-t border-white/10 z-50 shadow-2xl">
        <Link
          className={`flex flex-col items-center justify-center p-1.5 transition-all ${
            pathname === '/painel' ? 'text-[#ffc800]' : 'text-gray-400 hover:text-white'
          }`}
          href="/painel"
        >
          <span className="material-symbols-outlined text-xl">home</span>
        </Link>
        <Link
          className={`flex flex-col items-center justify-center p-1.5 transition-all ${
            pathname === '/minha-equipe' ? 'text-[#ffc800]' : 'text-gray-400 hover:text-white'
          }`}
          href="/minha-equipe"
        >
          <span className="material-symbols-outlined text-xl">group</span>
        </Link>
        <Link
          className={`flex flex-col items-center justify-center p-1.5 transition-all ${
            pathname === '/moldura' ? 'text-[#ffc800]' : 'text-gray-400 hover:text-white'
          }`}
          href="/moldura"
        >
          <span className="material-symbols-outlined text-xl">photo_camera</span>
        </Link>
        <Link
          className={`flex flex-col items-center justify-center p-1.5 transition-all ${
            pathname === '/missoes' ? 'text-[#ffc800]' : 'text-gray-400 hover:text-white'
          }`}
          href="/missoes"
        >
          <span className="material-symbols-outlined text-xl">ads_click</span>
        </Link>
        
        {/* Botão Destaque Ouro "Minha Colinha" */}
        <Link
          href="/minha-colinha"
          className="bg-[#ffc800] text-[#040d21] font-black text-xs px-3.5 py-2 rounded-2xl flex items-center gap-1.5 shadow-[0_2px_10px_rgba(255,200,0,0.3)] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-base">assignment_turned_in</span>
          <span>Minha Colinha</span>
        </Link>
      </nav>
    </>
  );
}
