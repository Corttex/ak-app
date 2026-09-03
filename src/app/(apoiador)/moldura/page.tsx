'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';

export default function MolduraPage() {
  const [photo, setPhoto] = useState<string | null>(null);
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
    const link = document.createElement('a');
    link.download = 'minha-moldura-22022.png';
    link.href = photo; // placeholder for real canvas logic
    link.click();
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

          {/* MOLDURA CONTAINER (The specific blue/yellow layout) */}
          <div className="relative w-full aspect-square bg-[#0047BB] overflow-hidden rounded-xl shadow-2xl shadow-primary/30">
            
            {/* The User Photo Circle */}
            <div className="absolute top-[-5%] left-[-5%] w-[110%] h-[105%]">
              <div className="w-full h-full bg-white rounded-full overflow-hidden border-[16px] border-[#FFC800] relative shadow-inner">
                {photo ? (
                  <img src={photo} alt="Sua Foto" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-surface-dim gap-4 cursor-pointer hover:bg-surface-high transition-colors" onClick={() => fileInputRef.current?.click()}>
                    <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined text-4xl">add_a_photo</span>
                    </div>
                    <span className="text-primary font-bold text-lg font-headline">Toque para adicionar foto</span>
                  </div>
                )}
              </div>
            </div>

            {/* Candidate Cutout Photo (Bottom Right) */}
            <div className="absolute bottom-0 right-[-5%] w-[45%] h-auto z-10 drop-shadow-2xl">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCv66Xh_L9K0xR3aPjPnbZt-wS-rQ6h3z3E6K0E0x3K_3_b-J-P_M_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0" 
                alt="André Kubitschek" 
                className="w-full h-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
                onError={(e) => {
                  // Fallback silhouette if image fails
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=Andre+K&background=0047BB&color=fff&size=512";
                }}
              />
            </div>

            {/* Name Tag (André Kubitschek) */}
            <div className="absolute bottom-[18%] left-6 bg-[#FFC800] text-[#0047BB] font-headline font-black rounded-t-2xl rounded-bl-2xl rounded-br-md px-6 pt-3 pb-8 z-20 leading-[1.1] shadow-lg">
              <span className="text-2xl tracking-tight block">André</span>
              <span className="text-2xl tracking-tight block">Kubitschek</span>
            </div>

            {/* Number Tag (22022) */}
            <div className="absolute bottom-4 left-4 bg-[#F2F1ED] rounded-full pl-6 pr-10 py-0 z-30 shadow-2xl flex items-center justify-center">
              <span className="text-[#0053D6] font-display font-black text-[4.5rem] italic tracking-tighter leading-none" style={{ transform: 'scaleX(1.1)' }}>
                22022
              </span>
            </div>
            
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
