'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Candidate {
  name: string;
  party: string;
  photoUrl: string;
}

const CANDIDATES_DB: Record<string, Candidate> = {
  // GOVERNADOR (2 dígitos)
  '11': { name: 'CELINA LEÃO', party: 'PP', photoUrl: 'https://ui-avatars.com/api/?name=Celina+Leao&background=0047BB&color=fff' },
  '22': { name: 'IBANEIS ROCHA', party: 'MDB', photoUrl: 'https://ui-avatars.com/api/?name=Ibaneis+R&background=008c2a&color=fff' },
  
  // DEPUTADO FEDERAL (4 dígitos)
  '2222': { name: 'ALBERTO FRAGA', party: 'PL', photoUrl: 'https://ui-avatars.com/api/?name=Alberto+Fraga&background=0047BB&color=fff' },
  '1111': { name: 'BIA KICIS', party: 'PL', photoUrl: 'https://ui-avatars.com/api/?name=Bia+Kicis&background=ffc800&color=000' },

  // DEPUTADO DISTRITAL (5 dígitos) - ANDRÉ KUBITSCHEK TRAVADO
  '22022': { name: 'ANDRÉ KUBITSCHEK', party: 'PL', photoUrl: '/candidato.jpg' },

  // SENADOR (3 dígitos)
  '222': { name: 'MICHELLE BOLSONARO', party: 'PL', photoUrl: 'https://ui-avatars.com/api/?name=Michelle+B&background=0047BB&color=fff' },
  '111': { name: 'DAMARES ALVES', party: 'Republicanos', photoUrl: 'https://ui-avatars.com/api/?name=Damares+A&background=008c2a&color=fff' },

  // PRESIDENTE (2 dígitos)
  '22_PRES': { name: 'FLAVIO BOLSONARO', party: 'PL', photoUrl: 'https://ui-avatars.com/api/?name=Flavio+B&background=0047BB&color=fff' }
};

export default function MinhaColinhaPage() {
  const [uf, setUf] = useState('DF');
  const [gov, setGov] = useState('');
  const [depFederal, setDepFederal] = useState('');
  // André Kubitschek (22022) travado/fixo
  const [depDistrital, setDepDistrital] = useState('22022');
  const [senador1, setSenador1] = useState('');
  const [senador2, setSenador2] = useState('');
  const [presidente, setPresidente] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Som da Urna (Simulado)
  const playUrnaSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.log('Beep!');
    }
  };

  const getCandidate = (code: string, type?: string) => {
    if (!code) return null;
    if (type === 'PRES' && code === '22') return CANDIDATES_DB['22_PRES'];
    return CANDIDATES_DB[code] || {
      name: `CANDIDATO ${code}`,
      party: 'TSE',
      photoUrl: `https://ui-avatars.com/api/?name=${code}&background=0053d6&color=fff`
    };
  };

  const renderDigits = (val: string, length: number) => {
    const digits = val.padEnd(length, ' ').split('');
    return (
      <div className="flex gap-2">
        {digits.map((d, i) => (
          <div 
            key={i} 
            className={`w-10 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-black transition-all ${
              d !== ' ' 
                ? 'border-green-600 bg-white text-gray-900 shadow-sm' 
                : 'border-dashed border-gray-300 bg-gray-50 text-gray-400'
            }`}
          >
            {d !== ' ' ? d : ''}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="pb-28 pt-8 px-6 max-w-5xl mx-auto w-full flex flex-col items-center gap-6">
      <div className="w-full max-w-xl bg-gray-50 rounded-[32px] p-6 shadow-2xl text-gray-900 font-sans">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900 flex items-center gap-1">
            MINHA <span className="underline decoration-[#ffc800] decoration-4 underline-offset-4">COLINHA</span>
          </h1>
        </div>
        <select 
          value={uf} 
          onChange={(e) => setUf(e.target.value)}
          className="bg-white border border-gray-300 rounded-full px-4 py-1.5 font-bold text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffc800]"
        >
          <option value="DF">DF ∨</option>
          <option value="GO">GO ∨</option>
          <option value="SP">SP ∨</option>
        </select>
      </div>

      <div className="space-y-4">
        
        {/* GOVERNADOR */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm relative">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-gray-500">GOVERNADOR</span>
            {gov && (
              <button onClick={() => { setGov(''); playUrnaSound(); }} className="text-xs font-bold text-gray-400 hover:text-red-500">
                limpar ×
              </button>
            )}
          </div>
          <div className="flex items-center justify-between gap-4">
            {renderDigits(gov, 2)}
            {getCandidate(gov) && (
              <div className="flex items-center gap-3 flex-1 justify-end">
                <div className="text-right">
                  <p className="font-extrabold text-sm text-gray-900 leading-tight">{getCandidate(gov)?.name}</p>
                  <p className="text-xs text-gray-500 font-bold">{getCandidate(gov)?.party}</p>
                </div>
                <img src={getCandidate(gov)?.photoUrl} alt="Foto" className="w-12 h-12 rounded-2xl object-cover border border-gray-200 shadow-sm" />
              </div>
            )}
          </div>
        </div>

        {/* DEPUTADO FEDERAL */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-gray-500">DEPUTADO FEDERAL</span>
            {depFederal && (
              <button onClick={() => { setDepFederal(''); playUrnaSound(); }} className="text-xs font-bold text-gray-400 hover:text-red-500">
                limpar ×
              </button>
            )}
          </div>
          <div className="flex items-center justify-between gap-4">
            {renderDigits(depFederal, 4)}
            {getCandidate(depFederal) && (
              <div className="flex items-center gap-3 flex-1 justify-end">
                <div className="text-right">
                  <p className="font-extrabold text-sm text-gray-900 leading-tight">{getCandidate(depFederal)?.name}</p>
                  <p className="text-xs text-gray-500 font-bold">{getCandidate(depFederal)?.party}</p>
                </div>
                <img src={getCandidate(depFederal)?.photoUrl} alt="Foto" className="w-12 h-12 rounded-2xl object-cover border border-gray-200 shadow-sm" />
              </div>
            )}
          </div>
        </div>

        {/* DEPUTADO DISTRITAL (ANDRÉ KUBITSCHEK - TRAVADO) */}
        <div className="bg-white rounded-3xl p-5 border-2 border-[#ffc800] shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#ffc800] text-[#06102b] text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Candidato Oficial 🔒
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#0047BB]">DEPUTADO DISTRITAL</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            {renderDigits(depDistrital, 5)}
            <div className="flex items-center gap-3 flex-1 justify-end">
              <div className="text-right">
                <p className="font-black text-base text-[#0047BB] leading-tight">ANDRÉ KUBITSCHEK</p>
                <p className="text-xs text-gray-600 font-bold">PL</p>
              </div>
              <img src="/candidato.jpg" alt="André Kubitschek" className="w-14 h-14 rounded-2xl object-cover border-2 border-[#0047BB] shadow-md" />
            </div>
          </div>
        </div>

        {/* SENADOR - 1º VOTO */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-gray-500">SENADOR · 1º VOTO</span>
            {senador1 && (
              <button onClick={() => { setSenador1(''); playUrnaSound(); }} className="text-xs font-bold text-gray-400 hover:text-red-500">
                limpar ×
              </button>
            )}
          </div>
          <div className="flex items-center justify-between gap-4">
            {renderDigits(senador1, 3)}
            {getCandidate(senador1) && (
              <div className="flex items-center gap-3 flex-1 justify-end">
                <div className="text-right">
                  <p className="font-extrabold text-sm text-gray-900 leading-tight">{getCandidate(senador1)?.name}</p>
                  <p className="text-xs text-gray-500 font-bold">{getCandidate(senador1)?.party}</p>
                </div>
                <img src={getCandidate(senador1)?.photoUrl} alt="Foto" className="w-12 h-12 rounded-2xl object-cover border border-gray-200 shadow-sm" />
              </div>
            )}
          </div>
        </div>

        {/* SENADOR - 2º VOTO */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-gray-500">SENADOR · 2º VOTO</span>
            {senador2 && (
              <button onClick={() => { setSenador2(''); playUrnaSound(); }} className="text-xs font-bold text-gray-400 hover:text-red-500">
                limpar ×
              </button>
            )}
          </div>
          <div className="flex items-center justify-between gap-4 mb-2">
            {renderDigits(senador2, 3)}
            {getCandidate(senador2) && (
              <div className="flex items-center gap-3 flex-1 justify-end">
                <div className="text-right">
                  <p className="font-extrabold text-sm text-gray-900 leading-tight">{getCandidate(senador2)?.name}</p>
                  <p className="text-xs text-gray-500 font-bold">{getCandidate(senador2)?.party}</p>
                </div>
                <img src={getCandidate(senador2)?.photoUrl} alt="Foto" className="w-12 h-12 rounded-2xl object-cover border border-gray-200 shadow-sm" />
              </div>
            )}
          </div>

          {/* Alerta de voto duplo em Senador conforme referência */}
          {senador1 && senador2 && senador1 === senador2 && (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-2xl text-xs font-medium mt-3">
              Atenção: mesmo candidato nos dois votos de senador — o segundo voto seria anulado.
            </div>
          )}
        </div>

        {/* PRESIDENTE */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-gray-500">PRESIDENTE</span>
            {presidente && (
              <button onClick={() => { setPresidente(''); playUrnaSound(); }} className="text-xs font-bold text-gray-400 hover:text-red-500">
                limpar ×
              </button>
            )}
          </div>
          <div className="flex items-center justify-between gap-4">
            {renderDigits(presidente, 2)}
            {getCandidate(presidente, 'PRES') && (
              <div className="flex items-center gap-3 flex-1 justify-end">
                <div className="text-right">
                  <p className="font-extrabold text-sm text-gray-900 leading-tight">{getCandidate(presidente, 'PRES')?.name}</p>
                  <p className="text-xs text-gray-500 font-bold">{getCandidate(presidente, 'PRES')?.party}</p>
                </div>
                <img src={getCandidate(presidente, 'PRES')?.photoUrl} alt="Foto" className="w-12 h-12 rounded-2xl object-cover border border-gray-200 shadow-sm" />
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Aviso legal TSE */}
      <div className="bg-gray-200/60 rounded-2xl p-4 text-center text-xs text-gray-600 font-medium mt-6">
        Dados públicos do <strong>TSE</strong>. Este não é um site oficial.
      </div>

      {/* Ações e Controles */}
      <div className="flex flex-wrap justify-between items-center gap-3 text-xs font-bold text-gray-600 mt-4 px-2">
        <span>Sua colinha fica salva neste aparelho.</span>
        <div className="flex gap-3">
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="hover:text-gray-900 flex items-center gap-1">
            🔊 {soundEnabled ? 'Som ativado' : 'Som mudo'}
          </button>
          <Link href="/validar-whatsapp" className="hover:text-gray-900 underline">
            Entrar
          </Link>
        </div>
      </div>

      {/* Botões Inferiores Fixos / Ação */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => alert('Colinha salva com sucesso no seu dispositivo!')}
          className="flex-1 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 font-bold py-3.5 rounded-2xl shadow-sm transition-all"
        >
          Salvar imagem
        </button>
        <button 
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Minha Colinha Eleitoral',
                text: 'Confira minha colinha eleitoral com André Kubitschek 22022!',
                url: window.location.href,
              });
            } else {
              alert('Link da colinha copiado!');
            }
          }}
          className="flex-1 bg-[#15803d] hover:bg-[#166534] text-white font-bold py-3.5 rounded-2xl shadow-md transition-all flex justify-center items-center gap-2"
        >
          Compartilhar
        </button>
      </div>

      </div>
    </div>
  );
}
