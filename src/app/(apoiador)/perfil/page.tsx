'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PerfilPage() {
  const router = useRouter();
  
  // Perfil States
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [cidade, setCidade] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [showInLeaderboard, setShowInLeaderboard] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Senha States
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/supporter/me')
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          router.push('/validar-whatsapp');
          return;
        }
        if (data.supporter) {
          setNome(data.supporter.fullName || '');
          setEmail(data.supporter.email || '');
          setInstagram(data.supporter.instagram || '');
          setCidade(data.supporter.city || '');
          setShowInLeaderboard(data.supporter.showInLeaderboard ?? true);
          setAvatarUrl(data.supporter.avatarUrl || null);
        }
      })
      .finally(() => setIsLoading(false));
  }, [router]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setAvatarUrl(event.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/supporter/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          instagram,
          cidade,
          showInLeaderboard,
          avatarUrl // saved back to the database as base64 string
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
    if (senha !== confirmSenha) {
      return alert("As senhas não coincidem.");
    }
    if (!reqLen || !reqUpper || !reqLower || !reqNum) {
      return alert("A senha não atende aos requisitos mínimos.");
    }
    alert('Senha salva com sucesso!');
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">Carregando...</div>;
  }

  // Password Requirements Logic
  const reqLen = senha.length >= 8;
  const reqUpper = /[A-Z]/.test(senha);
  const reqLower = /[a-z]/.test(senha);
  const reqNum = /[0-9]/.test(senha);

  const renderReq = (met: boolean, text: string) => (
    <div className={`flex items-center gap-2 text-xs font-bold ${met ? 'text-green-600' : 'text-red-500'}`}>
      <span className="material-symbols-outlined text-[14px]">
        {met ? 'check_circle' : 'cancel'}
      </span>
      {text}
    </div>
  );

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
            <div 
              onClick={() => fileInputRef.current?.click()} 
              className="w-32 h-32 bg-white rounded-full shadow-sm flex flex-col items-center justify-center border border-outline-variant/30 relative overflow-hidden cursor-pointer"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-gray-400 text-5xl">face</span>
              )}
              
              <div className="absolute -bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white flex items-center justify-center hover:scale-105 transition-transform z-10 pointer-events-none">
                <span className="material-symbols-outlined text-sm">add_a_photo</span>
              </div>
            </div>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileUpload} 
            />
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
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
              Salvar Perfil
            </button>
          </form>

          {/* Divider */}
          <hr className="my-8 border-outline-variant/50" />

          {/* Senha de Acesso */}
          <div className="flex flex-col gap-4 mb-8">
            <div>
              <h3 className="text-lg font-bold text-[#020617]">Senha de acesso</h3>
              <p className="text-sm text-gray-500 leading-relaxed mt-1">
                Com senha, você pode logar em qualquer aparelho usando apenas o seu celular e senha.
              </p>
            </div>
            
            <form onSubmit={handleSavePassword} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-bold text-[#020617] mb-2 block">Nova senha</label>
                <input 
                  type="password" 
                  placeholder="Digite a senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full bg-white border border-outline-variant/50 text-[#020617] rounded-2xl px-4 py-3.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-medium shadow-sm"
                />
              </div>

              {senha.length > 0 && (
                <div className="bg-gray-100 p-3 rounded-xl flex flex-col gap-1.5 border border-gray-200">
                  {renderReq(reqLen, "Mínimo de 8 caracteres")}
                  {renderReq(reqUpper, "Pelo menos 1 letra maiúscula")}
                  {renderReq(reqLower, "Pelo menos 1 letra minúscula")}
                  {renderReq(reqNum, "Pelo menos 1 número")}
                </div>
              )}

              <div>
                <label className="text-sm font-bold text-[#020617] mb-2 block">Repetir senha</label>
                <input 
                  type="password" 
                  placeholder="Confirme a senha"
                  value={confirmSenha}
                  onChange={(e) => setConfirmSenha(e.target.value)}
                  className="w-full bg-white border border-outline-variant/50 text-[#020617] rounded-2xl px-4 py-3.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-medium shadow-sm"
                />
              </div>

              <button type="submit" className="w-full bg-white border-2 border-primary text-primary hover:bg-primary/5 font-extrabold text-lg py-3.5 rounded-2xl transition-all active:scale-95 mt-2">
                Atualizar senha
              </button>
            </form>
          </div>

          <hr className="my-8 border-outline-variant/50" />

          {/* Toggle de Privacidade */}
          <div className="flex justify-between items-center gap-4 mb-10">
            <div>
              <h3 className="text-lg font-bold text-[#020617]">Aparecer no placar de pontos</h3>
              <p className="text-sm text-gray-500 leading-relaxed mt-1">
                Seu nome e sua foto aparecem no placar público, com seus pontos.
              </p>
            </div>
            {/* Custom Toggle */}
            <div 
              className={`w-14 h-8 rounded-full p-1 flex-shrink-0 cursor-pointer transition-colors ${showInLeaderboard ? 'bg-[#22c55e]' : 'bg-gray-300'}`}
              onClick={() => setShowInLeaderboard(!showInLeaderboard)}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${showInLeaderboard ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
