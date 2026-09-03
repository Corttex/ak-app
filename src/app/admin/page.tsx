'use client';
import React, { useState, useEffect } from 'react';

// Helper: Tocar som da urna
const playUrnaSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    // Frequência próxima ao som clássico da Urna (aprox 1200Hz - 1500Hz)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    
    osc.start();
    // Duração do PIIIIII
    gain.gain.setTargetAtTime(0, ctx.currentTime + 1.2, 0.1);
    osc.stop(ctx.currentTime + 1.5);
  } catch (e) {
    console.error("Audio não suportado", e);
  }
};

const playKeySound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {}
}

export default function AdminDashboard() {
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [isColinhaModalOpen, setIsColinhaModalOpen] = useState(false);
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  // Colinha State
  const [activeCargo, setActiveCargo] = useState('FEDERAL');
  const [digits, setDigits] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [candidateFound, setCandidateFound] = useState<any>(null);

  const cargos = [
    { id: 'PRESIDENTE', name: 'Presidente', digits: 2, num: '1' },
    { id: 'GOVERNADOR', name: 'Governador', digits: 2, num: '2' },
    { id: 'SENADOR', name: 'Senador', digits: 3, num: '3' },
    { id: 'FEDERAL', name: 'Deputado Federal', digits: 4, num: '4' },
    { id: 'DISTRITAL', name: 'Deputado Distrital', digits: 5, num: '5' }
  ];

  const currentCargoData = cargos.find(c => c.id === activeCargo)!;

  // Lógica de digitação
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isColinhaModalOpen || isSearching || candidateFound) return;
      if (e.key >= '0' && e.key <= '9') {
        if (digits.length < currentCargoData.digits) {
          playKeySound();
          setDigits(prev => prev + e.key);
        }
      } else if (e.key === 'Backspace') {
        setDigits(prev => prev.slice(0, -1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [digits, isColinhaModalOpen, isSearching, candidateFound, currentCargoData.digits]);

  // Efeito de busca no "TSE"
  useEffect(() => {
    if (digits.length === currentCargoData.digits && !isSearching && !candidateFound) {
      setIsSearching(true);
      
      // Simula latência de rede do TSE
      setTimeout(() => {
        setIsSearching(false);
        // Toca o som de Confirma!
        playUrnaSound();
        
        // Mock de resposta do TSE
        setCandidateFound({
          name: digits === '22022' ? 'ANDRÉ KUBITSCHEK' : 'CANDIDATO EXEMPLO',
          partido: digits.startsWith('22') ? 'PL - PARTIDO LIBERAL' : 'PARTIDO GENÉRICO',
          foto: digits === '22022' ? '/candidato.jpg' : 'https://ui-avatars.com/api/?name=Cand&background=ccc&color=fff'
        });
      }, 1500);
    }
  }, [digits, currentCargoData.digits, isSearching, candidateFound]);

  const resetCargo = () => {
    setDigits('');
    setCandidateFound(null);
    setIsSearching(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h2 className="font-display-lg text-4xl font-bold text-on-surface mb-2">Painel Geral</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant font-medium">Visão em tempo real da mobilização de campanha.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface border border-outline-variant text-on-surface font-label-bold text-sm py-2.5 px-5 rounded-xl flex items-center gap-2 hover:bg-surface-dim transition-colors shadow-sm font-semibold">
            <span className="material-symbols-outlined">campaign</span>
            Comunicado
          </button>
          <button className="bg-primary text-on-primary font-label-bold text-sm py-2.5 px-5 rounded-xl flex items-center gap-2 hover:bg-[#0042aa] transition-colors shadow-md shadow-primary/30 font-bold">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_task</span>
            Nova Missão
          </button>
        </div>
      </div>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-2xl flex flex-col relative overflow-hidden group shadow-sm border border-outline-variant hover:border-primary/50 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="font-label-bold text-xs text-on-surface-variant uppercase tracking-widest font-bold">Total Cadastros</span>
            <div className="p-2.5 bg-primary-container rounded-full text-primary">
              <span className="material-symbols-outlined">groups</span>
            </div>
          </div>
          <div className="mt-auto relative z-10">
            <h3 className="font-gamified-stat font-extrabold text-on-surface text-4xl mb-2">14.289</h3>
            <div className="flex items-center gap-1.5 text-tertiary font-label-bold text-sm">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="font-bold">+12% na semana</span>
            </div>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl flex flex-col relative overflow-hidden group shadow-sm border border-outline-variant hover:border-tertiary/50 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="font-label-bold text-xs text-on-surface-variant uppercase tracking-widest font-bold">Missões Ativas</span>
            <div className="p-2.5 bg-tertiary-container rounded-full text-tertiary">
              <span className="material-symbols-outlined">rocket_launch</span>
            </div>
          </div>
          <div className="mt-auto relative z-10">
            <h3 className="font-gamified-stat font-extrabold text-on-surface text-4xl mb-3">24</h3>
            <div className="w-full bg-surface-container-high rounded-full h-2">
              <div className="bg-tertiary h-2 rounded-full" style={{ width: "70%" }}></div>
            </div>
            <p className="font-body-md text-on-surface-variant mt-2 text-xs font-semibold">70% de taxa de conclusão</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl flex flex-col relative overflow-hidden group shadow-sm border-l-4 border-l-tertiary border-y border-r border-y-outline-variant border-r-outline-variant">
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="font-label-bold text-xs text-on-surface-variant uppercase tracking-widest font-bold">Sync Elegis</span>
            <div className="flex items-center gap-2 bg-tertiary-container text-tertiary px-3 py-1 rounded-full">
              <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
              <span className="font-label-bold text-xs font-bold">Conectado</span>
            </div>
          </div>
          <div className="mt-auto relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-tertiary">sync</span>
              <span className="font-body-lg text-on-surface font-semibold">Último sync: 2m</span>
            </div>
            <p className="font-body-md text-on-surface-variant text-xs font-medium">1.402 registros atualizados hoje</p>
          </div>
        </div>

        <div className="bg-primary p-6 rounded-2xl flex flex-col relative overflow-hidden group shadow-lg shadow-primary/20 text-white">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="font-label-bold text-xs text-primary-fixed uppercase tracking-widest font-bold">Pontos Distribuídos</span>
            <div className="p-2.5 bg-white/20 rounded-full text-secondary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            </div>
          </div>
          <div className="mt-auto relative z-10">
            <h3 className="font-gamified-stat font-extrabold text-secondary text-5xl mb-2 drop-shadow-md">842k</h3>
            <div className="flex items-center gap-2 text-white/90 font-body-md text-sm font-medium">
              <span>Engajamento total da rede</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Log */}
        <div className="lg:col-span-2 bg-surface rounded-2xl overflow-hidden flex flex-col shadow-sm border border-outline-variant">
          <div className="px-6 py-5 border-b border-outline-variant/50 flex justify-between items-center bg-surface-dim/50">
            <h3 className="font-headline-md text-xl font-bold text-on-surface">Log de Atividades</h3>
            <button onClick={() => setIsLogsModalOpen(true)} className="text-primary font-label-bold text-sm font-bold hover:underline">Ver Todos</button>
          </div>
          <div className="p-0 flex-1 overflow-y-auto max-h-[400px]">
            <ul className="divide-y divide-outline-variant/50">
              <li className="px-6 py-4 hover:bg-surface-dim transition-colors flex gap-4 items-start">
                <div className="mt-1 p-2 bg-tertiary-container rounded-full">
                  <span className="material-symbols-outlined text-tertiary text-sm">task_alt</span>
                </div>
                <div className="flex-1">
                  <p className="font-body-md text-on-surface"><span className="font-bold">Missão Concluída:</span> Compartilhar Vídeo</p>
                  <p className="font-body-md text-on-surface-variant text-xs mt-1 font-medium">Por <span className="text-primary font-semibold">@joao_silva</span> • +50 pontos</p>
                </div>
                <span className="font-body-md text-on-surface-variant text-xs font-semibold whitespace-nowrap">2m atrás</span>
              </li>
              <li className="px-6 py-4 hover:bg-surface-dim transition-colors flex gap-4 items-start">
                <div className="mt-1 p-2 bg-primary-container rounded-full">
                  <span className="material-symbols-outlined text-primary text-sm">person_add</span>
                </div>
                <div className="flex-1">
                  <p className="font-body-md text-on-surface"><span className="font-bold">Novo Cadastro:</span> Mariana Costa</p>
                  <p className="font-body-md text-on-surface-variant text-xs mt-1 font-medium">Indicada por <span className="text-primary font-semibold">@pedro_alves</span></p>
                </div>
                <span className="font-body-md text-on-surface-variant text-xs font-semibold whitespace-nowrap">15m atrás</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Actions & Highlights */}
        <div className="flex flex-col gap-6">
          {/* Mini Colinha Preview */}
          <div className="bg-surface rounded-2xl p-6 border border-outline-variant flex flex-col relative overflow-hidden shadow-sm">
            <h4 className="font-headline-md text-lg font-bold text-on-surface mb-4 relative z-10">Layout Ativo da Colinha</h4>
            <div className="bg-surface-dim rounded-xl p-4 border border-outline-variant relative z-10 transform origin-top shadow-inner">
              <div className="text-primary font-bold text-[10px] uppercase mb-2">Prefeito</div>
              <div className="flex gap-1.5 mb-4">
                <div className="w-8 h-10 bg-white border border-outline-variant rounded-md flex items-center justify-center font-bold text-lg text-primary shadow-sm">1</div>
                <div className="w-8 h-10 bg-white border border-outline-variant rounded-md flex items-center justify-center font-bold text-lg text-primary shadow-sm">2</div>
              </div>
              <div className="text-primary font-bold text-[10px] uppercase mb-2 mt-2">Vereador</div>
              <div className="flex gap-1.5">
                <div className="w-8 h-10 bg-white border border-outline-variant rounded-md flex items-center justify-center font-bold text-lg text-primary shadow-sm">4</div>
                <div className="w-8 h-10 bg-white border border-outline-variant rounded-md flex items-center justify-center font-bold text-lg text-primary shadow-sm">5</div>
                <div className="w-8 h-10 bg-white border border-outline-variant rounded-md flex items-center justify-center font-bold text-lg text-primary shadow-sm">6</div>
                <div className="w-8 h-10 bg-white border border-outline-variant rounded-md flex items-center justify-center font-bold text-lg text-primary shadow-sm">7</div>
                <div className="w-8 h-10 bg-white border border-outline-variant rounded-md flex items-center justify-center font-bold text-lg text-primary shadow-sm">8</div>
              </div>
            </div>
            <button onClick={() => setIsColinhaModalOpen(true)} className="mt-5 text-primary font-bold text-sm border-2 border-primary/20 rounded-xl py-2.5 px-4 hover:bg-primary/5 transition-colors w-full relative z-10">
                Editar Estrutura
            </button>
          </div>
          
          {/* Landing Page Links Config */}
          <div className="bg-surface rounded-2xl p-6 border border-outline-variant flex flex-col relative overflow-hidden shadow-sm">
            <div className="flex justify-between items-center mb-4 relative z-10">
              <h4 className="font-headline-md text-lg font-bold text-on-surface">Links da Home</h4>
              <span className="material-symbols-outlined text-on-surface-variant">link</span>
            </div>
            <div className="flex flex-col gap-3 relative z-10">
              <div className="bg-surface-dim rounded-xl p-3 border border-outline-variant flex items-center gap-3">
                <div className="p-2 bg-[#E1306C]/10 text-[#E1306C] rounded-lg">
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface">Instagram</p>
                  <p className="text-xs text-on-surface-variant">Siga o André.</p>
                </div>
              </div>
              <div className="bg-surface-dim rounded-xl p-3 border border-outline-variant flex items-center gap-3">
                <div className="p-2 bg-[#ffc800]/20 text-[#cc9f00] rounded-lg">
                  <span className="material-symbols-outlined text-sm">notifications_active</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface">Avisos</p>
                  <p className="text-xs text-on-surface-variant">Ative as notificações.</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsLinksModalOpen(true)} className="mt-5 text-primary font-bold text-sm border-2 border-primary/20 rounded-xl py-2.5 px-4 hover:bg-primary/5 transition-colors w-full relative z-10">
                Editar Botões
            </button>
          </div>
          
          {/* Google Auth Config */}
          <div className="bg-surface rounded-2xl p-6 border border-outline-variant flex flex-col relative overflow-hidden shadow-sm">
            <div className="flex justify-between items-center mb-4 relative z-10">
              <h4 className="font-headline-md text-lg font-bold text-on-surface">Login via Google</h4>
              <span className="material-symbols-outlined text-on-surface-variant">shield_person</span>
            </div>
            
            <div className="bg-surface-dim rounded-xl p-4 border border-outline-variant relative z-10 shadow-inner flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-on-surface">Status do Login Social</span>
                <div className="flex items-center gap-2 bg-success/10 text-success px-2 py-1 rounded-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
                  <span className="font-bold text-[10px] uppercase">Ativo</span>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant">
                Permite que os usuários ignorem a digitação de celular e entrem usando a conta Google.
              </p>
            </div>
            
            <button onClick={() => setIsGoogleModalOpen(true)} className="mt-5 text-primary font-bold text-sm border-2 border-primary/20 rounded-xl py-2.5 px-4 hover:bg-primary/5 transition-colors w-full relative z-10">
                Configurar Credenciais
            </button>
          </div>
          
        </div>
      </div>

      {/* MODAL: LOGS DE ATIVIDADE */}
      {isLogsModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center bg-surface-dim">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">list_alt</span>
                <h3 className="font-display-md text-2xl font-bold text-on-surface">Histórico Completo</h3>
              </div>
              <button onClick={() => setIsLogsModalOpen(false)} className="p-2 hover:bg-outline-variant/30 rounded-full transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-0 overflow-y-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-dim/50 sticky top-0 backdrop-blur-md">
                  <tr>
                    <th className="px-6 py-3 font-label-bold text-xs text-on-surface-variant uppercase tracking-wider border-b border-outline-variant">Evento</th>
                    <th className="px-6 py-3 font-label-bold text-xs text-on-surface-variant uppercase tracking-wider border-b border-outline-variant">Detalhes</th>
                    <th className="px-6 py-3 font-label-bold text-xs text-on-surface-variant uppercase tracking-wider border-b border-outline-variant">Usuário</th>
                    <th className="px-6 py-3 font-label-bold text-xs text-on-surface-variant uppercase tracking-wider border-b border-outline-variant">Tempo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50">
                  {Array.from({length: 15}).map((_, i) => (
                    <tr key={i} className="hover:bg-surface-dim/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-primary-container text-primary">
                          <span className="material-symbols-outlined text-[14px]">person_add</span>
                          Cadastro
                        </span>
                      </td>
                      <td className="px-6 py-4 font-body-md text-on-surface text-sm">
                        Mariana Costa entrou na rede.
                      </td>
                      <td className="px-6 py-4 font-body-md text-on-surface-variant text-sm font-semibold">@mari_costa</td>
                      <td className="px-6 py-4 font-body-md text-on-surface-variant text-sm">Há {i * 15} min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDITOR DA COLINHA (SIMULAÇÃO TSE) */}
      {isColinhaModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#e4e5e6] w-full max-w-5xl h-[80vh] rounded-xl shadow-2xl flex overflow-hidden border-4 border-[#b4b5b6] animate-in slide-in-from-bottom-10 duration-300">
            
            {/* Lado Esquerdo: Tela da Urna */}
            <div className="flex-1 bg-[#cfd1d2] p-8 flex flex-col">
              <div className="bg-[#f4f5f6] flex-1 rounded-sm border-4 border-[#b4b5b6] shadow-inner p-8 flex flex-col relative overflow-hidden">
                <h3 className="font-bold text-xl uppercase tracking-widest text-[#2a2a2a] mb-8">Justiça Eleitoral</h3>
                
                <div className="flex-1 flex flex-col">
                  <p className="text-sm font-bold uppercase mb-2 text-[#2a2a2a]">Seu voto para</p>
                  <p className="text-3xl font-extrabold uppercase mb-6 text-[#2a2a2a] tracking-wider">{currentCargoData.name}</p>
                  
                  <div className="flex gap-2 mb-8">
                    <span className="text-lg font-bold mr-4 self-end mb-2 text-[#2a2a2a]">Número:</span>
                    {Array.from({length: currentCargoData.digits}).map((_, idx) => (
                      <div key={idx} className={`w-12 h-16 border-2 flex items-center justify-center text-4xl font-bold font-mono text-[#2a2a2a] bg-white
                        ${digits.length === idx ? 'border-black animate-pulse' : 'border-[#2a2a2a]'}
                        ${digits[idx] ? 'border-black' : ''}
                      `}>
                        {digits[idx] || ''}
                      </div>
                    ))}
                  </div>

                  {isSearching && (
                    <div className="flex items-center gap-3 text-[#2a2a2a] animate-pulse">
                      <span className="material-symbols-outlined animate-spin">sync</span>
                      <span className="font-bold uppercase tracking-widest">Buscando candidato no banco de dados do TSE...</span>
                    </div>
                  )}

                  {candidateFound && (
                    <div className="flex gap-6 items-start border-t-2 border-black/20 pt-6 animate-in fade-in">
                      <div className="flex-1 space-y-4">
                        <p className="text-lg font-bold text-[#2a2a2a]">Nome: <span className="text-2xl">{candidateFound.name}</span></p>
                        <p className="text-lg font-bold text-[#2a2a2a]">Partido: <span className="text-xl">{candidateFound.partido}</span></p>
                      </div>
                      <div className="w-32 h-40 border-2 border-black bg-white p-1">
                        <img src={candidateFound.foto} className="w-full h-full object-cover grayscale" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer da tela da urna */}
                <div className="border-t-2 border-black/20 pt-2 mt-4 text-xs font-bold uppercase tracking-wider text-[#2a2a2a]">
                  <p>Aperte a tecla:</p>
                  <p>VERDE para CONFIRMAR este voto</p>
                  <p>LARANJA para REINICIAR este voto</p>
                </div>
              </div>
            </div>

            {/* Lado Direito: Editor/Teclado */}
            <div className="w-[350px] bg-[#2a2a2a] p-6 flex flex-col text-white shadow-[-10px_0_20px_rgba(0,0,0,0.2)] z-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-lg uppercase tracking-widest text-[#ccc]">Simulador TSE</h3>
                <button onClick={() => setIsColinhaModalOpen(false)} className="text-[#ccc] hover:text-white">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="mb-6 space-y-2">
                <p className="text-xs uppercase font-bold text-[#888] mb-4">Selecione o Cargo para Editar:</p>
                {cargos.map(cargo => (
                  <button 
                    key={cargo.id}
                    onClick={() => { setActiveCargo(cargo.id); resetCargo(); }}
                    className={`w-full text-left px-4 py-3 rounded text-sm font-bold uppercase transition-colors flex justify-between items-center
                      ${activeCargo === cargo.id ? 'bg-[#ffc800] text-black' : 'bg-[#444] text-[#aaa] hover:bg-[#555]'}
                    `}
                  >
                    <span>{cargo.name} ({cargo.digits} dígitos)</span>
                    {activeCargo === cargo.id && <span className="material-symbols-outlined text-sm">edit</span>}
                  </button>
                ))}
              </div>

              <div className="mt-auto bg-[#1a1a1a] p-4 rounded-lg border border-[#333]">
                <p className="text-xs text-[#888] font-medium leading-relaxed">
                  <strong className="text-[#ffc800]">Instruções:</strong> Digite os números usando o teclado do seu computador. O sistema simulará uma requisição à base do TSE para validar a Colinha.
                </p>
                <div className="flex gap-2 mt-4">
                  <button onClick={resetCargo} className="flex-1 bg-[#ff6b00] hover:bg-[#e56000] text-black font-bold uppercase py-2 rounded shadow-[0_4px_0_#b34b00] active:translate-y-1 active:shadow-none transition-all">Corrige</button>
                  <button onClick={() => {
                    if (candidateFound) {
                      alert("Voto Confirmado no Layout da Colinha!");
                    }
                  }} className="flex-1 bg-[#00a859] hover:bg-[#009650] text-black font-bold uppercase py-2 rounded shadow-[0_4px_0_#006b39] active:translate-y-1 active:shadow-none transition-all">Confirma</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIÇÃO DE LINKS DA LANDING PAGE */}
      {isLinksModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center bg-surface-dim">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">edit_square</span>
                <h3 className="font-display-md text-xl font-bold text-on-surface">Editar Botões da Home</h3>
              </div>
              <button onClick={() => setIsLinksModalOpen(false)} className="p-2 hover:bg-outline-variant/30 rounded-full transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Botão 1 */}
              <div className="space-y-3 bg-surface-dim p-4 rounded-xl border border-outline-variant">
                <h4 className="font-bold text-sm text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#E1306C] text-lg">photo_camera</span>
                  Botão 1 (Rede Social)
                </h4>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">Título</label>
                  <input type="text" defaultValue="Instagram" className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">Subtítulo</label>
                  <input type="text" defaultValue="Siga o André." className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">Link / URL</label>
                  <input type="text" defaultValue="https://instagram.com/andrekubitschek" className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
              </div>

              {/* Botão 2 */}
              <div className="space-y-3 bg-surface-dim p-4 rounded-xl border border-outline-variant">
                <h4 className="font-bold text-sm text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffc800] text-lg">notifications_active</span>
                  Botão 2 (Ação Secundária)
                </h4>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">Título</label>
                  <input type="text" defaultValue="Avisos" className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">Subtítulo</label>
                  <input type="text" defaultValue="Ative as notificações." className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">Link / URL</label>
                  <input type="text" defaultValue="/avisos" className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
              </div>

            </div>
            <div className="px-6 py-4 border-t border-outline-variant bg-surface-dim flex justify-end gap-3">
              <button onClick={() => setIsLinksModalOpen(false)} className="px-4 py-2 text-sm font-bold text-on-surface-variant hover:bg-outline-variant/20 rounded-xl transition-colors">Cancelar</button>
              <button onClick={() => {
                alert("Links atualizados com sucesso!");
                setIsLinksModalOpen(false);
              }} className="px-4 py-2 text-sm font-bold bg-primary text-on-primary hover:bg-[#0042aa] rounded-xl transition-colors shadow-sm">Salvar Alterações</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CONFIGURAÇÃO DO GOOGLE AUTH */}
      {isGoogleModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center bg-surface-dim">
              <div className="flex items-center gap-3">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
                <h3 className="font-display-md text-xl font-bold text-on-surface">Credenciais do Google</h3>
              </div>
              <button onClick={() => setIsGoogleModalOpen(false)} className="p-2 hover:bg-outline-variant/30 rounded-full transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              
              <div className="bg-primary/10 border border-primary/30 p-4 rounded-xl">
                <p className="text-sm text-on-surface font-medium">
                  Para ativar o Login Social, você precisa criar um projeto no <a href="https://console.cloud.google.com" target="_blank" className="text-primary font-bold hover:underline">Google Cloud Console</a> e configurar a Tela de Consentimento OAuth e Credenciais de API.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">Google Client ID</label>
                  <input type="text" placeholder="1039824...apps.googleusercontent.com" className="w-full bg-surface-dim border border-outline-variant text-on-surface rounded-lg px-3 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none font-mono" />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">Google Client Secret</label>
                  <input type="password" placeholder="GOCSPX-..." className="w-full bg-surface-dim border border-outline-variant text-on-surface rounded-lg px-3 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none font-mono" />
                  <p className="text-xs text-on-surface-variant mt-1">Mantenha esta chave em segredo absoluto.</p>
                </div>
                
                <div className="flex justify-between items-center bg-surface-dim p-4 rounded-xl border border-outline-variant mt-2">
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">Login Social Habilitado</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">Permite login na rede usando Google.</p>
                  </div>
                  <div className="w-12 h-6 rounded-full bg-success p-1 cursor-pointer transition-colors relative">
                    <div className="w-4 h-4 bg-white rounded-full shadow-md absolute right-1"></div>
                  </div>
                </div>
              </div>

            </div>
            <div className="px-6 py-4 border-t border-outline-variant bg-surface-dim flex justify-end gap-3">
              <button onClick={() => setIsGoogleModalOpen(false)} className="px-4 py-2 text-sm font-bold text-on-surface-variant hover:bg-outline-variant/20 rounded-xl transition-colors">Cancelar</button>
              <button onClick={() => {
                alert("Credenciais do Google salvas com sucesso!");
                setIsGoogleModalOpen(false);
              }} className="px-4 py-2 text-sm font-bold bg-primary text-on-primary hover:bg-[#0042aa] rounded-xl transition-colors shadow-sm">Salvar Credenciais</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
