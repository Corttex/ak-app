'use client';
import React, { useState } from 'react';
import { Settings, Save, Palette } from 'lucide-react';

export default function ConfigAdmin() {
  const [flags, setFlags] = useState({
    pointsVisible: true,
    leaderboardVisible: false,
    allowAccountDelete: true
  });

  const [theme, setTheme] = useState({
    primary: '#ffe4af',
    surface: '#111415'
  });

  const toggleFlag = (key: keyof typeof flags) => {
    setFlags(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center bg-surface-container p-6 rounded-2xl border border-surface-bright shadow-sm">
        <div>
          <h2 className="text-xl font-headline font-bold flex items-center gap-2">
            <Settings className="text-primary" /> Configurações & White-label
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">Gerencie a identidade visual e as funcionalidades do aplicativo.</p>
        </div>
        <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <Save className="w-5 h-5" /> Salvar Alterações
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Feature Flags */}
        <div className="bg-surface-container rounded-2xl border border-surface-bright shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4 border-b border-surface-bright pb-2">Feature Flags</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">Exibir Pontuação</p>
                <p className="text-xs text-on-surface-variant">Mostra os pontos no painel do apoiador</p>
              </div>
              <button 
                onClick={() => toggleFlag('pointsVisible')}
                className={`w-12 h-6 rounded-full relative transition-colors ${flags.pointsVisible ? 'bg-primary' : 'bg-surface-bright'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${flags.pointsVisible ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">Exibir Leaderboard</p>
                <p className="text-xs text-on-surface-variant">Mostra o ranking global de embaixadores</p>
              </div>
              <button 
                onClick={() => toggleFlag('leaderboardVisible')}
                className={`w-12 h-6 rounded-full relative transition-colors ${flags.leaderboardVisible ? 'bg-primary' : 'bg-surface-bright'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${flags.leaderboardVisible ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">Permitir Exclusão de Conta</p>
                <p className="text-xs text-on-surface-variant">Usuários podem excluir seus dados via App</p>
              </div>
              <button 
                onClick={() => toggleFlag('allowAccountDelete')}
                className={`w-12 h-6 rounded-full relative transition-colors ${flags.allowAccountDelete ? 'bg-primary' : 'bg-surface-bright'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${flags.allowAccountDelete ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="bg-surface-container rounded-2xl border border-surface-bright shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4 border-b border-surface-bright pb-2 flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" /> Identidade Visual
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Cor Primária (Destaque)</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={theme.primary} 
                  onChange={(e) => setTheme({...theme, primary: e.target.value})}
                  className="w-10 h-10 rounded border border-surface-bright cursor-pointer bg-transparent"
                />
                <input 
                  type="text" 
                  value={theme.primary} 
                  onChange={(e) => setTheme({...theme, primary: e.target.value})}
                  className="flex-1 bg-surface border border-surface-bright rounded px-3 text-sm font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Cor de Fundo (Superfície)</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={theme.surface} 
                  onChange={(e) => setTheme({...theme, surface: e.target.value})}
                  className="w-10 h-10 rounded border border-surface-bright cursor-pointer bg-transparent"
                />
                <input 
                  type="text" 
                  value={theme.surface} 
                  onChange={(e) => setTheme({...theme, surface: e.target.value})}
                  className="flex-1 bg-surface border border-surface-bright rounded px-3 text-sm font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
