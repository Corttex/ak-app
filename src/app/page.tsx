'use client';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 text-white font-sans relative overflow-hidden">
      
      {/* 5-Point Mesh Gradient / Aurora Background */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(0.95); }
          66% { transform: translate(20px, -40px) scale(1.05); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.1); }
        }
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -20px) scale(1.15); }
        }
        @keyframes float5 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -60px) scale(0.85); }
        }
      `}</style>
      
      {/* Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#002b7a] rounded-full blur-[100px] opacity-40 mix-blend-screen pointer-events-none" style={{ animation: 'float1 12s ease-in-out infinite' }}></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#0053d6] rounded-full blur-[120px] opacity-30 mix-blend-screen pointer-events-none" style={{ animation: 'float2 15s ease-in-out infinite' }}></div>
      <div className="absolute bottom-[-20%] left-[10%] w-[60%] h-[50%] bg-[#00a8ff] rounded-full blur-[140px] opacity-20 mix-blend-screen pointer-events-none" style={{ animation: 'float3 18s ease-in-out infinite' }}></div>
      <div className="absolute bottom-[10%] right-[10%] w-[45%] h-[45%] bg-[#3a0ca3] rounded-full blur-[120px] opacity-30 mix-blend-screen pointer-events-none" style={{ animation: 'float4 14s ease-in-out infinite' }}></div>
      <div className="absolute top-[40%] left-[30%] w-[35%] h-[35%] bg-[#001f54] rounded-full blur-[90px] opacity-50 mix-blend-screen pointer-events-none" style={{ animation: 'float5 16s ease-in-out infinite' }}></div>


      {/* Header Logo */}
      <div className="flex flex-col items-center gap-3 mb-10 z-10 w-full max-w-[280px]">
        <img src="/Logo AK (3).svg" alt="Logo André Kubitschek" className="w-full h-auto brightness-0 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
      </div>

      {/* Main Card */}
      <main className="w-full max-w-sm bg-[#0a1532]/80 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 shadow-2xl z-10 flex flex-col items-center">
        
        {/* Candidate Avatar */}
        <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden mb-8 relative bg-primary-container shadow-inner border border-white/5">
          {/* Constellation/Stars background behind avatar (mimicking the reference) */}
          <div className="absolute inset-0 bg-[#0047BB]">
            <div className="absolute top-8 left-6 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"></div>
            <div className="absolute top-24 right-8 w-2 h-2 bg-[#ffc800] rounded-full shadow-[0_0_8px_#ffc800]"></div>
            <div className="absolute bottom-12 left-12 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"></div>
            
            {/* Dynamic Banner curve */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-tr from-[#002a7a] to-transparent opacity-80 rounded-bl-[1.5rem] rounded-br-[1.5rem]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#ffc800] w-[150%] -rotate-12 translate-y-12 -translate-x-8"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-[#008c2a] w-[150%] -rotate-12 translate-y-16 -translate-x-8"></div>
          </div>
          
          <img
            src="/candidato.jpg"
            alt="André Kubitschek"
            className="absolute inset-0 w-full h-[115%] -top-[7.5%] object-cover object-center z-10 drop-shadow-2xl"
            onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Andre+K&background=transparent&color=fff"; }}
          />
        </div>

        {/* Action Button */}
        <Link 
          href="/validar-whatsapp"
          className="w-full bg-[#ffc800] hover:bg-[#e6b400] text-[#060e22] font-label-bold font-bold text-lg py-4 rounded-2xl flex items-center justify-between px-6 transition-all shadow-[0_4px_20px_rgba(255,200,0,0.4)] hover:shadow-[0_6px_25px_rgba(255,200,0,0.5)] hover:-translate-y-1 active:translate-y-0"
        >
          <span>Entrar</span>
          <span className="material-symbols-outlined font-bold text-2xl">chevron_right</span>
        </Link>

        {/* Grid Buttons */}
        <div className="grid grid-cols-2 gap-4 w-full mt-4">
          <a href="https://instagram.com/andrekubitschek" target="_blank" rel="noreferrer" className="bg-[#0f1d40] border border-white/5 rounded-2xl p-4 flex flex-col items-start gap-2 hover:bg-[#162752] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm flex items-center gap-1">Instagram <span className="material-symbols-outlined text-[14px]">chevron_right</span></p>
              <p className="text-[#a4b5d8] text-xs font-medium mt-1 leading-tight">Siga o André.</p>
            </div>
          </a>

          <Link href="https://chat.whatsapp.com/campanha22022" target="_blank" className="bg-[#0f1d40] border border-white/5 rounded-2xl p-4 flex flex-col items-start gap-2 hover:bg-[#162752] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#ffc800] flex items-center justify-center text-[#060e22] shadow-md shadow-[#ffc800]/20">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm flex items-center gap-1">Avisos <span className="material-symbols-outlined text-[14px]">chevron_right</span></p>
              <p className="text-[#a4b5d8] text-xs font-medium mt-1 leading-tight">Ative as notificações.</p>
            </div>
          </Link>
        </div>

      </main>
    </div>
  );
}
