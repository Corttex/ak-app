'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';

export default function MolduraPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedMoldura, setSelectedMoldura] = useState<string>('/molduras/Bottom AK-01.png');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setPhoto(event.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDownload = () => {
    if (!photo) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const userImg = new Image();
    userImg.crossOrigin = 'anonymous';
    userImg.onload = () => {
      // Cover crop user image
      const size = Math.min(userImg.width, userImg.height);
      const x = (userImg.width - size) / 2;
      const y = (userImg.height - size) / 2;
      ctx.drawImage(userImg, x, y, size, size, 0, 0, 1080, 1080);
      
      const overlayImg = new Image();
      overlayImg.crossOrigin = 'anonymous';
      overlayImg.onload = () => {
        ctx.drawImage(overlayImg, 0, 0, 1080, 1080);
        
        const link = document.createElement('a');
        link.download = 'minha-moldura-ak22022.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      overlayImg.src = selectedMoldura;
    };
    userImg.src = photo;
  };

  return (
    <div className="min-h-screen bg-background text-on-background pb-32">
      {/* Header */}
      <header className="bg-primary p-4 flex items-center justify-between shadow-md relative z-40">
        <Link href="/" className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl">chevron_left</span>
        </Link>
        <h1 className="text-xl font-headline font-bold text-white">Moldura Oficial</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="px-6 py-8">
        <div className="flex flex-col items-center gap-8 max-w-md mx-auto">
          
          {/* Header Text */}
          <div className="text-center">
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">Crie sua arte</h2>
            <p className="text-body-md text-on-surface-variant font-medium">
              Faça upload de uma foto sua e gere sua moldura de apoio para usar no WhatsApp e Redes Sociais.
            </p>
          </div>

          {/* Moldura Selection */}
          <div className="w-full">
            <h3 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider text-center">Escolha a Moldura</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 px-2 no-scrollbar">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                const molduraPath = `/molduras/Bottom AK-0${num}.png`;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedMoldura(molduraPath)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${selectedMoldura === molduraPath ? 'border-primary scale-110 shadow-lg z-10' : 'border-gray-200 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={molduraPath} alt={`Opção ${num}`} className="w-full h-full object-cover bg-gray-100" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* MOLDURA CONTAINER (The specific blue/yellow layout) */}
          <div className="relative w-full aspect-square bg-[#0047BB] overflow-hidden rounded-xl shadow-2xl shadow-primary/30" id="moldura-canvas">
            
            {/* The User Photo (Fills the back) */}
            <div className="absolute inset-0">
              {photo ? (
                <img src={photo} alt="Sua Foto" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 gap-4 cursor-pointer hover:bg-gray-300 transition-colors" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-sm">
                    <span className="material-symbols-outlined text-4xl">add_a_photo</span>
                  </div>
                  <span className="text-primary font-bold text-lg font-headline">Toque para adicionar foto</span>
                </div>
              )}
            </div>

            {/* PNG Overlay */}
            <img src={selectedMoldura} alt="Moldura Overlay" className="absolute inset-0 w-full h-full object-cover pointer-events-none z-20" />
            
            {/* Hidden Input */}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileUpload} 
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 w-full mt-4">
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="w-full bg-white text-primary border-2 border-primary font-bold text-lg py-4 rounded-2xl flex justify-center items-center gap-3 transition-all active:scale-95 shadow-sm hover:bg-primary/5"
            >
              <span className="material-symbols-outlined">flip_camera_ios</span> 
              {photo ? "Trocar Foto" : "Escolher Foto"}
            </button>
            
            <button 
              onClick={handleDownload} 
              disabled={!photo} 
              className="w-full bg-secondary text-on-secondary font-black text-lg py-4 rounded-2xl flex justify-center items-center gap-3 disabled:opacity-50 disabled:grayscale transition-all active:scale-95 shadow-md hover:bg-[#e6b400]"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>download</span> 
              Baixar e Compartilhar
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
