'use client';
import React, { useState } from 'react';
import { ChevronLeft, Share2, Download, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { BallotSlot } from '@/components/BallotSlot';

export default function MinhaColinha() {
  const [gov, setGov] = useState('');
  const [pres, setPres] = useState('');

  // Mock checking logic
  const getCandidateForGov = (val: string) => {
    if (val === '77') return { name: 'Celina Leão', party: 'PP', photoUrl: 'https://ui-avatars.com/api/?name=Celina+Leao&background=ffc107&color=3f2e00' };
    return undefined;
  };

  const getCandidateForPres = (val: string) => {
    if (val === '22') return { name: 'Bolsonaro', party: 'PL', photoUrl: 'https://ui-avatars.com/api/?name=Bolsonaro&background=364571&color=fff' };
    return undefined;
  };

  const playSound = () => {
    // In a real app, play Urna sound
    // const audio = new Audio('/urna-sound.mp3');
    // audio.play();
    console.log("Beep!");
  };

  const govCandidate = getCandidateForGov(gov);
  if (gov.length === 2 && !govCandidate) {
    // maybe play error sound or clear
  } else if (gov.length === 2) {
    playSound();
  }

  return (
    <div className="min-h-screen bg-background text-on-background pb-20">
      {/* Header */}
      <header className="bg-surface-container p-4 flex items-center justify-between border-b border-surface-bright">
        <Link href="/" className="p-2 -ml-2 text-on-surface hover:bg-surface rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-headline font-bold">Minha Colinha</h1>
        <button className="p-2 -mr-2 text-primary hover:bg-surface rounded-full transition-colors">
          <Volume2 className="w-5 h-5" />
        </button>
      </header>

      <main className="p-6">
        <p className="text-sm text-on-surface-variant mb-6 text-center">
          Preencha sua colinha digital. Os números são salvos automaticamente para o dia da eleição.
        </p>

        <div className="space-y-6">
          <BallotSlot 
            label="Governadora" 
            length={2} 
            value={gov} 
            onChange={(val) => setGov(val.substring(0, 2))}
            onClear={() => setGov('')}
            candidateName={govCandidate?.name}
            party={govCandidate?.party}
            photoUrl={govCandidate?.photoUrl}
          />
          
          <BallotSlot 
            label="Presidente" 
            length={2} 
            value={pres} 
            onChange={(val) => setPres(val.substring(0, 2))}
            onClear={() => setPres('')}
            candidateName={getCandidateForPres(pres)?.name}
            party={getCandidateForPres(pres)?.party}
            photoUrl={getCandidateForPres(pres)?.photoUrl}
          />
        </div>

        <div className="mt-12 flex gap-4">
          <button className="flex-1 bg-primary-container text-on-primary-container font-bold py-3 rounded-xl flex justify-center items-center gap-2">
            <Download className="w-5 h-5" /> Baixar Imagem
          </button>
          <button className="flex-1 bg-surface-container border border-outline-variant text-on-surface font-bold py-3 rounded-xl flex justify-center items-center gap-2">
            <Share2 className="w-5 h-5" /> Compartilhar
          </button>
        </div>
      </main>
    </div>
  );
}
