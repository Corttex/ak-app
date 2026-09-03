'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ValidarWhatsappPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Por favor, insira um número válido com DDD.');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for login/bypass
    setTimeout(() => {
      // Hardcoded Master Access
      if (digits === '61994344843') {
        localStorage.setItem('master_access', 'true');
        localStorage.setItem('whatsapp_validado', 'true');
        localStorage.setItem('user_phone', digits);
        router.push('/admin');
      } else {
        localStorage.setItem('whatsapp_validado', 'true');
        localStorage.setItem('user_phone', digits);
        // Direct Bypass to profile/panel
        router.push('/perfil');
      }
    }, 800);
  };

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
        .bg-grid {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>
      
      {/* Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#002b7a] rounded-full blur-[100px] opacity-40 mix-blend-screen pointer-events-none" style={{ animation: 'float1 12s ease-in-out infinite' }}></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#0053d6] rounded-full blur-[120px] opacity-30 mix-blend-screen pointer-events-none" style={{ animation: 'float2 15s ease-in-out infinite' }}></div>
      <div className="absolute bottom-[-20%] left-[10%] w-[60%] h-[50%] bg-[#00a8ff] rounded-full blur-[140px] opacity-20 mix-blend-screen pointer-events-none" style={{ animation: 'float3 18s ease-in-out infinite' }}></div>
      <div className="absolute bottom-[10%] right-[10%] w-[45%] h-[45%] bg-[#3a0ca3] rounded-full blur-[120px] opacity-30 mix-blend-screen pointer-events-none" style={{ animation: 'float4 14s ease-in-out infinite' }}></div>
      <div className="absolute top-[40%] left-[30%] w-[35%] h-[35%] bg-[#001f54] rounded-full blur-[90px] opacity-50 mix-blend-screen pointer-events-none" style={{ animation: 'float5 16s ease-in-out infinite' }}></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none mix-blend-overlay"></div>

      <div className="w-full max-w-md bg-surface/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-primary/20 border border-white/10 relative z-10">
        <form onSubmit={handlePhoneSubmit}>
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center text-primary mb-6 shadow-inner">
              <span className="material-symbols-outlined text-4xl">how_to_reg</span>
            </div>
            <h1 className="text-headline-lg font-headline font-bold text-on-surface text-center leading-tight mb-2">
              Acesso à Rede
            </h1>
            <p className="text-body-lg text-on-surface-variant text-center font-medium">
              Entre para acessar missões e materiais exclusivos.
            </p>
          </div>
          
          {error && <div className="mb-4 p-3 bg-error-container text-error rounded-xl text-sm font-bold text-center">{error}</div>}
          
          <button 
            type="button"
            className="w-full bg-white hover:bg-gray-50 text-gray-800 font-bold text-lg py-3.5 rounded-xl flex justify-center items-center gap-3 transition-all active:scale-95 shadow-sm border border-outline-variant mb-6"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
            Continuar com Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-outline-variant flex-1"></div>
            <span className="text-on-surface-variant font-bold text-sm uppercase tracking-wider">OU</span>
            <div className="h-px bg-outline-variant flex-1"></div>
          </div>
          
          <div className="mb-6 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">dialpad</span>
            <input 
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(61) 99999-9999"
              className="w-full pl-12 pr-4 py-4 bg-surface-dim border-2 border-outline-variant rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all outline-none text-on-surface font-bold text-lg"
            />
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-[#0042aa] text-white font-bold text-lg py-4 rounded-xl flex justify-center items-center transition-all active:scale-95 shadow-md shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
               <span className="material-symbols-outlined animate-spin">refresh</span>
            ) : (
              'Acessar com Celular'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
