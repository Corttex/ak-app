'use client';
import React from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex w-full bg-background text-on-background">
      {/* SideNavBar (Hidden on md, visible on lg) */}
      <nav className="bg-surface border-r border-outline-variant h-screen w-72 left-0 top-0 fixed flex-col py-8 hidden lg:flex z-50 shadow-md">
        <div className="px-6 pb-8 flex flex-col items-center border-b border-outline-variant/30 mb-6">
          <img
            className="w-16 h-16 rounded-2xl mb-4 object-cover shadow-sm border border-outline-variant"
            alt="Mobilização Pro Logo"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4w-M2Gn3QzWceansW1d9868-mizmiPKhIBcHeUDghCzVU2xqpcR5Mcn1FUl46-1uoCkdYWYhIoMMJRqRTjpc6yJ8A1flJBI2Hn_0qz8erGcSJYdPgyVdFQI4Fg9ZFnGylivPiD40TFBjfuNnfMAdMMl0gHBIQszCuDe1STuyoxK19hst6zGYoP8yA_lDCZfi8Eno0h_8n1ahLC9ERZ2a8yAWsZWm66rbF0y1WGZU5mM3bsTsl4WfK"
          />
          <h1 className="font-headline-lg text-headline-md font-bold text-primary text-center">Mobilização Pro</h1>
          <p className="font-body-md text-body-sm text-on-surface-variant text-center font-medium">Control Center</p>
          <button className="mt-6 w-full bg-primary text-on-primary font-label-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0042aa] transition-colors shadow-sm">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
            Nova Missão
          </button>
        </div>
        
        <ul className="flex-1 overflow-y-auto w-full px-4 space-y-1">
          <li className="bg-primary-container text-primary rounded-xl cursor-pointer active:scale-95 duration-200 ease-in-out">
            <Link className="flex items-center gap-3 px-4 py-3" href="/admin">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
              <span className="font-label-bold text-sm font-bold">Dashboard Geral</span>
            </Link>
          </li>
          <li className="text-on-surface-variant hover:text-primary hover:bg-surface-dim rounded-xl transition-all cursor-pointer active:scale-95 duration-200 ease-in-out">
            <Link className="flex items-center gap-3 px-4 py-3" href="/admin/conexoes">
              <span className="material-symbols-outlined">webhook</span>
              <span className="font-label-bold text-sm font-semibold">Integrações (Elegis)</span>
            </Link>
          </li>
          <li className="text-on-surface-variant hover:text-primary hover:bg-surface-dim rounded-xl transition-all cursor-pointer active:scale-95 duration-200 ease-in-out">
            <Link className="flex items-center gap-3 px-4 py-3" href="/admin/missoes">
              <span className="material-symbols-outlined">assignment_turned_in</span>
              <span className="font-label-bold text-sm font-semibold">Gestão de Missões</span>
            </Link>
          </li>
          <li className="text-on-surface-variant hover:text-primary hover:bg-surface-dim rounded-xl transition-all cursor-pointer active:scale-95 duration-200 ease-in-out">
            <Link className="flex items-center gap-3 px-4 py-3" href="/admin/embaixadores">
              <span className="material-symbols-outlined">group_add</span>
              <span className="font-label-bold text-sm font-semibold">Embaixadores</span>
            </Link>
          </li>
          <li className="text-on-surface-variant hover:text-primary hover:bg-surface-dim rounded-xl transition-all cursor-pointer active:scale-95 duration-200 ease-in-out">
            <Link className="flex items-center gap-3 px-4 py-3" href="/admin/config">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-bold text-sm font-semibold">Configurações Base</span>
            </Link>
          </li>
        </ul>

        <div className="px-4 pt-6 border-t border-outline-variant/30 space-y-1">
          <ul>
            <li className="text-primary hover:text-primary hover:bg-primary-container rounded-xl transition-all cursor-pointer active:scale-95 duration-200 ease-in-out mb-2">
              <Link className="flex items-center gap-3 px-4 py-3" href="/painel">
                <span className="material-symbols-outlined">smartphone</span>
                <span className="font-label-bold text-sm font-bold">App do Apoiador</span>
              </Link>
            </li>
            <li className="text-on-surface-variant hover:text-error hover:bg-error-container rounded-xl transition-all cursor-pointer active:scale-95 duration-200 ease-in-out">
              <Link className="flex items-center gap-3 px-4 py-3" href="/validar-whatsapp" onClick={() => { localStorage.removeItem('whatsapp_validado'); localStorage.removeItem('master_access'); }}>
                <span className="material-symbols-outlined">logout</span>
                <span className="font-label-bold text-sm font-semibold">Sair da Sessão</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 w-full flex flex-col min-h-screen relative">
        {/* TopNavBar */}
        <header className="bg-surface border-b border-outline-variant w-full top-0 sticky z-40 flex justify-between items-center px-8 py-4 h-20 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="font-headline-md text-headline-md text-primary font-bold lg:hidden">Master Panel</span>
          </div>
          <div className="flex items-center gap-6 flex-1 justify-end">
            <div className="relative hidden sm:flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-outline">search</span>
              <input
                className="bg-surface-dim border border-outline-variant text-on-surface text-body-md font-body-md rounded-full py-2.5 pl-12 pr-6 w-72 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
                placeholder="Buscar embaixador, missão..."
                type="text"
              />
            </div>
            <button className="text-on-surface-variant hover:bg-surface-dim transition-colors p-2.5 rounded-full cursor-pointer relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <div className="w-px h-8 bg-outline-variant hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-on-surface">Admin Global</p>
                <p className="text-xs text-on-surface-variant font-medium">Diretório Estadual</p>
              </div>
              <img
                alt="Admin Profile Picture"
                className="w-10 h-10 rounded-full border-2 border-primary object-cover shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYSHoJN1vJMv2YHW3A7ThJTTGJsYaIVtanMvbhRpz79adWm2MvDk9k67cN2AtjFXFGHtD1G0RDM4tCTy_8kj8S3JWt5exCDGB258zfXy8uS7XT5IHUsKsmV4ofK8-v3mQzBXUWITNjek-12C505-HEDF8-LF94zdiHg5BSqHIVp83Oa2Xjh7aKBNpDQazUIDvDNU5j4NLMd4ONhDi7C7m3aw2uFjlmQZlggjZ8vHyeJ-CrEyoZqqr2"
              />
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 flex-1 overflow-y-auto bg-surface-dim">
          {children}
        </div>
      </main>
    </div>
  );
}
