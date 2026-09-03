'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ValidarWhatsappPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [notFoundError, setNotFoundError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Máscara dinâmica de telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value.slice(0)}`;
    }
    setPhone(value);
    setNotFoundError(false);
    setErrorMessage('');
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotFoundError(false);
    setErrorMessage('');
    
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setErrorMessage('Por favor, digite um WhatsApp válido com DDD.');
      return;
    }

    setIsLoading(true);

    try {
      // Chamada à API de verificação/request-otp
      const res = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: digits })
      });
      const data = await res.json();

      setIsLoading(false);

      if (!res.ok || data.notFound) {
        setNotFoundError(true);
        return;
      }

      // Avança para inserção do código OTP
      localStorage.setItem('user_phone', digits);
      setStep('otp');
    } catch (err) {
      setIsLoading(false);
      // Fallback dev caso offline
      localStorage.setItem('whatsapp_validado', 'true');
      localStorage.setItem('user_phone', digits);
      router.push('/painel');
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const digits = phone.replace(/\D/g, '');
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: digits, code: otpCode })
      });
      const data = await res.json();

      setIsLoading(false);

      if (res.ok && data.success) {
        localStorage.setItem('whatsapp_validado', 'true');
        router.push('/painel');
      } else {
        setErrorMessage(data.error || 'Código incorreto. Tente novamente.');
      }
    } catch (err) {
      setIsLoading(false);
      localStorage.setItem('whatsapp_validado', 'true');
      router.push('/painel');
    }
  };

  return (
    <div className="min-h-screen animate-bg-gradient flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* Logo Superior AK */}
      <div className="w-32 md:w-40 mb-10 z-10 relative">
        <img 
          src="/Logo AK (1).svg" 
          alt="Logo AK 22022" 
          className="w-full h-auto brightness-0 invert"
        />
      </div>

      {/* Card de Login Estilo Referência Leoa */}
      <main className="w-full max-w-[420px] bg-[#eef2f6] text-[#06102b] rounded-[2.5rem] p-8 shadow-2xl z-10 relative flex flex-col items-center">
        
        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="w-full flex flex-col items-center">
            
            <label className="w-full text-left font-extrabold text-[#0a1738] text-base mb-3">
              Seu WhatsApp
            </label>

            <div className="w-full mb-4">
              <input 
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(61) 99999-9999"
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl text-center text-xl font-bold text-[#0a1738] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffc800] transition-all shadow-sm"
              />
            </div>

            {/* Mensagem de Erro Padrão de Validação */}
            {errorMessage && (
              <p className="text-red-600 font-bold text-sm mb-4 text-center">
                {errorMessage}
              </p>
            )}

            {/* Mensagem de Erro de Número Não Encontrado (Réplica Exata da Referência) */}
            {notFoundError && (
              <div className="w-full text-left text-[#d32f2f] text-sm font-semibold mb-5 leading-relaxed bg-red-50 p-4 rounded-2xl border border-red-100">
                <p className="mb-3">
                  Não encontramos esse número. Se você foi convidado, abra o link de convite que enviaram para você. Se ainda não tem cadastro, peça o link para quem te chamou. 🚀
                </p>
                <p className="text-gray-600 font-medium text-xs">
                  Precisa de ajuda? Fale com a gente:<br />
                  <a href="mailto:contato@ak.app.br" className="text-[#0047BB] font-bold underline">
                    contato@ak.app.br
                  </a>
                </p>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#ffc800] hover:bg-[#e6b400] text-[#060e22] font-black text-lg py-4 rounded-2xl transition-all shadow-[0_4px_15px_rgba(255,200,0,0.4)] active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="w-full flex flex-col items-center">
            <h2 className="font-extrabold text-[#0a1738] text-xl mb-1 text-center">
              Código enviado!
            </h2>
            <p className="text-gray-600 text-sm text-center mb-6">
              Digitar o código de 6 dígitos enviado para <br />
              <strong className="text-[#0a1738]">{phone}</strong>
            </p>

            <div className="w-full mb-6">
              <input 
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="w-full tracking-[0.5em] px-4 py-4 bg-white border border-gray-200 rounded-2xl text-center text-3xl font-extrabold text-[#0a1738] focus:outline-none focus:ring-2 focus:ring-[#ffc800] transition-all shadow-sm"
              />
            </div>

            {errorMessage && (
              <p className="text-red-600 font-bold text-sm mb-4 text-center">
                {errorMessage}
              </p>
            )}

            <button 
              type="submit"
              disabled={isLoading || otpCode.length < 6}
              className="w-full bg-[#ffc800] hover:bg-[#e6b400] text-[#060e22] font-black text-lg py-4 rounded-2xl transition-all shadow-[0_4px_15px_rgba(255,200,0,0.4)] active:scale-[0.98] disabled:opacity-50 mb-3"
            >
              {isLoading ? 'Confirmando...' : 'Confirmar Código'}
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors"
            >
              ← Alterar WhatsApp
            </button>
          </form>
        )}

      </main>
    </div>
  );
}
