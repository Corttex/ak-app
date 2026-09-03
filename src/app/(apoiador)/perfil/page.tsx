'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PerfilPage() {
  const router = useRouter();
  
  // States based on the screenshot fields
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [cidade, setCidade] = useState('');
  const [senha, setSenha] = useState('');
  const [showInLeaderboard, setShowInLeaderboard] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState('');

  // OTP Validation State
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    const userPhone = localStorage.getItem('user_phone');
    if (!userPhone) {
      router.push('/validar-whatsapp');
      return;
    }
    setPhone(userPhone);

    // Fetch user data
    fetch(`/api/supporter/me?phone=${userPhone}`)
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setNome(data.user.fullName || '');
          setEmail(data.user.email || '');
          setInstagram(data.user.instagram || '');
          setCidade(data.user.city || '');
          setShowInLeaderboard(data.user.showInLeaderboard);
        }
      })
      .finally(() => setIsLoading(false));
  }, [router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/supporter/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          nome,
          email,
          instagram,
          cidade,
          showInLeaderboard
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('Perfil atualizado com sucesso!');
      } else {
        alert('Erro ao atualizar perfil.');
      }
    } catch (err) {
      alert('Erro de conexão ao salvar.');
    }
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if(senha.length < 6) return alert("A senha deve ter no mínimo 6 caracteres.");
    alert('Senha salva com sucesso! (Simulação)');
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-[#020617] pb-24 font-sans text-on-surface">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex items-center gap-4 bg-[#020617] sticky top-0 z-40">
        <button onClick={() => router.back()} className="flex items-center gap-2 bg-surface/10 hover:bg-surface/20 px-3 py-1.5 rounded-full transition-colors border border-outline-variant/30 text-white text-sm font-bold">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Voltar
        </button>
        <h1 className="text-2xl font-headline font-bold text-white flex-1 text-center pr-12">
          Editar perfil
        </h1>
      </header>

      {/* Main Form Container */}
      <div className="px-4">
        <div className="bg-[#f2f4f7] rounded-[2rem] p-6 shadow-xl w-full max-w-md mx-auto mb-6 relative">
          
          {/* Avatar Upload */}
          <div className="flex justify-center mb-8 relative">
            <div className="w-32 h-32 bg-white rounded-[2rem] shadow-sm flex flex-col items-center justify-center border border-outline-variant/30 relative">
              <span className="material-symbols-outlined text-outline text-5xl">face</span>
              
              <button className="absolute -bottom-3 right-[-10px] bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white flex items-center justify-center hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-sm">add_a_photo</span>
              </button>
            </div>
            <div className="absolute -bottom-8 text-center w-full">
               <span className="text-primary font-bold text-xs tracking-wider uppercase">Adicionar foto</span>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSaveProfile} className="mt-12 flex flex-col gap-5">
            <div>
              <label className="text-sm font-bold text-[#020617] mb-2 block">Nome</label>
              <input 
                type="text" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-white border border-outline-variant/50 text-[#020617] rounded-2xl px-4 py-3.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-medium shadow-sm"
              />
            </div>
            
            <div>
              <label className="text-sm font-bold text-[#020617] mb-2 block">Email</label>
              <input 
                type="email" 
                placeholder="voce@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-outline-variant/50 text-[#020617] rounded-2xl px-4 py-3.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-medium shadow-sm"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-[#020617] mb-2 block">Instagram</label>
              <input 
                type="text" 
                placeholder="@seuinstagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full bg-white border border-outline-variant/50 text-[#020617] rounded-2xl px-4 py-3.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-medium shadow-sm"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-[#020617] mb-2 block">Cidade</label>
              <input 
                type="text" 
                placeholder="Comece a digitar e escolha na lista"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full bg-white border border-outline-variant/50 text-[#020617] rounded-2xl px-4 py-3.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-medium shadow-sm"
              />
            </div>

            <button type="submit" className="w-full bg-[#ffc800] hover:bg-[#e6b400] text-[#020617] font-extrabold text-lg py-4 rounded-2xl transition-all shadow-md active:scale-95 mt-2">
              Salvar
            </button>
          </form>

          {/* Divider */}
          <hr className="my-8 border-outline-variant/50" />

          {/* Validar Celular (The old Validar WhatsApp) */}
          <div className="flex flex-col gap-2 mb-8">
            <h3 className="text-lg font-bold text-[#020617]">Validar meu celular</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Confirme que o número <span className="font-bold">(61) 99999-9999</span> é seu, enviamos um código por WhatsApp.
            </p>
            <button 
              onClick={() => setIsOtpModalOpen(true)}
              className="bg-[#001f54] text-white hover:bg-[#002b7a] font-bold text-sm py-3 px-6 rounded-full w-max flex items-center gap-2 mt-2 transition-colors"
            >
              Enviar código por WhatsApp
              <span className="material-symbols-outlined text-sm">send_to_mobile</span>
            </button>
          </div>

          {/* Senha de Acesso */}
          <div className="flex flex-col gap-4 mb-8">
            <div>
              <h3 className="text-lg font-bold text-[#020617]">Senha de acesso</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                Com senha, entrar num aparelho novo não depende do WhatsApp, o código vira só a recuperação ("esqueci a senha").
              </p>
            </div>
            
            <form onSubmit={handleSavePassword} className="flex flex-col gap-3">
              <div>
                <label className="text-sm font-bold text-[#020617] mb-2 block">Nova senha</label>
                <input 
                  type="password" 
                  placeholder="Mínimo 6 caracteres"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full bg-white border border-outline-variant/50 text-[#020617] rounded-2xl px-4 py-3.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-medium shadow-sm"
                />
              </div>
              <button type="submit" className="w-full bg-white border-2 border-primary text-primary hover:bg-primary/5 font-extrabold text-lg py-3.5 rounded-2xl transition-all active:scale-95">
                Salvar senha
              </button>
            </form>
          </div>

          {/* Toggle de Privacidade */}
          <div className="flex justify-between items-center gap-4 mb-10">
            <div>
              <h3 className="text-lg font-bold text-[#020617]">Aparecer no placar de pontos</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                Seu nome e sua foto aparecem no placar público, com seus pontos.
              </p>
            </div>
            {/* Custom Toggle */}
            <div 
              className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors ${showInLeaderboard ? 'bg-[#22c55e]' : 'bg-outline-variant'}`}
              onClick={() => setShowInLeaderboard(!showInLeaderboard)}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${showInLeaderboard ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
          </div>

          {/* Excluir Conta */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-[#020617]">Excluir minha conta</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Apaga os seus dados pessoais desta plataforma. Quem você indicou continua cadastrado, passa a ser indicado por quem indicou você. Esta ação não pode ser desfeita.
            </p>
            <button className="text-error font-bold text-left underline decoration-2 underline-offset-4 mt-2 hover:text-red-700 w-max">
              Excluir minha conta
            </button>
          </div>

        </div>
      </div>

      {/* OTP MODAL (Brought from the old page logic) */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/80 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-sm rounded-3xl shadow-2xl p-6 border border-outline-variant animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-on-surface mb-2 text-center">Digite o código</h3>
            <p className="text-sm text-on-surface-variant text-center mb-6">Enviado via WhatsApp para o número cadastrado.</p>
            
            <div className="flex justify-between gap-2 mb-6">
              {otpCode.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const val = e.target.value;
                    if(val.length > 1) return;
                    const newC = [...otpCode]; newC[index] = val; setOtpCode(newC);
                    if (val !== '' && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
                  }}
                  className="w-10 h-12 text-center text-xl font-bold bg-surface-dim border-2 border-outline-variant rounded-lg focus:border-primary text-on-surface outline-none"
                />
              ))}
            </div>
            
            <button onClick={() => { alert('Validado!'); setIsOtpModalOpen(false); }} className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-[#0042aa]">
              Validar Código
            </button>
            <button onClick={() => setIsOtpModalOpen(false)} className="w-full text-on-surface-variant font-bold text-sm py-3 mt-2 hover:underline">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
