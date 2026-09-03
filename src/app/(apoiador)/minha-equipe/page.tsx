'use client';
import React from 'react';
import { ChevronLeft, Users, Trophy, ChevronRight, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function MinhaEquipe() {
  const referrals = [
    { id: '1', name: 'Maria Souza', tier: 'FILHOTE', points: 150, date: 'Hoje' },
    { id: '2', name: 'Carlos Andrade', tier: 'LEÃO BEBÊ', points: 45, date: 'Ontem' },
    { id: '3', name: 'Ana Oliveira', tier: 'LEÃO JOVEM', points: 410, date: '21/08' },
  ];

  return (
    <div className="min-h-screen bg-background text-on-background pb-20">
      <header className="bg-surface-container p-4 flex items-center justify-between border-b border-surface-bright">
        <Link href="/" className="p-2 -ml-2 text-on-surface hover:bg-surface rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-headline font-bold flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" /> Minha Equipe
        </h1>
        <div className="w-10"></div>
      </header>

      <main className="p-6">
        <div className="bg-primary-container text-on-primary-container p-5 rounded-2xl mb-8 flex justify-between items-center shadow-lg">
          <div>
            <p className="text-sm font-bold opacity-80 uppercase tracking-wider mb-1">Total de Indicados</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-display font-black">3</span>
              <span className="text-sm font-bold">pessoas</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-primary-fixed/20 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-headline font-bold">Sua Rede</h2>
          <button className="text-sm font-bold text-primary flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors">
            <UserPlus className="w-4 h-4" /> Convidar
          </button>
        </div>

        <div className="space-y-3">
          {referrals.map((user) => (
            <div key={user.id} className="bg-surface-container p-4 rounded-xl border border-surface-bright flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary font-bold shadow-inner">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface">{user.name}</h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-on-surface-variant">{user.tier}</span>
                    <span className="w-1 h-1 bg-surface-bright rounded-full"></span>
                    <span className="text-primary font-bold">{user.points} pts</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-on-surface-variant font-medium">{user.date}</span>
                <ChevronRight className="w-4 h-4 text-outline-variant" />
              </div>
            </div>
          ))}
          
          {referrals.length === 0 && (
            <div className="text-center py-10 bg-surface-container/50 rounded-xl border border-dashed border-outline-variant">
              <Users className="w-10 h-10 mx-auto text-outline-variant mb-2" />
              <p className="text-on-surface-variant text-sm">Você ainda não indicou ninguém.</p>
              <button className="mt-4 bg-primary text-on-primary font-bold px-4 py-2 rounded-lg text-sm">
                Compartilhar Link
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
