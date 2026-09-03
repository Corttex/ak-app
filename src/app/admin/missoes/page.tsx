'use client';
import React, { useState } from 'react';
import { Target, Plus, Edit2, Trash2 } from 'lucide-react';

export default function MissoesAdmin() {
  const [missions] = useState([
    { id: 1, title: 'Compartilhar Post de Propostas', pts: 20, active: true },
    { id: 2, title: 'Confirmar Presença no Adesivaço', pts: 50, active: true },
    { id: 3, title: 'Convidar 5 Amigos', pts: 100, active: false },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-surface-container p-6 rounded-2xl border border-surface-bright shadow-sm">
        <div>
          <h2 className="text-xl font-headline font-bold flex items-center gap-2">
            <Target className="text-primary" /> Gestão de Missões
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">Crie e gerencie as tarefas para gamificação dos apoiadores.</p>
        </div>
        <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <Plus className="w-5 h-5" /> Nova Missão
        </button>
      </div>

      <div className="bg-surface-container rounded-2xl border border-surface-bright shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-bright/50 border-b border-surface-bright">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Missão</th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Recompensa</th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-bright">
            {missions.map((mission) => (
              <tr key={mission.id} className="hover:bg-surface-bright/20 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-bold">{mission.title}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-tertiary/20 text-tertiary font-bold px-3 py-1 rounded-full text-xs">
                    +{mission.pts} pts
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${mission.active ? 'bg-primary/20 text-primary' : 'bg-surface-bright text-on-surface-variant'}`}>
                    {mission.active ? 'Ativa' : 'Inativa'}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <button className="p-2 text-on-surface hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-on-surface hover:text-error hover:bg-error/10 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
