'use client';
import React, { useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
  const [phone, setPhone] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login redirect or auth flow
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center px-6">
      <div className="max-w-sm w-full mx-auto">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary-container">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-headline font-black text-primary">Acesse sua Conta</h1>
          <p className="text-sm text-on-surface-variant mt-2">
            Utilize o mesmo número cadastrado na Elegis ou digite seu CPF.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
              Telefone (WhatsApp) ou CPF
            </label>
            <input 
              type="text" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(00) 00000-0000"
              className="w-full bg-surface-container border border-surface-bright rounded-xl px-4 py-4 text-on-surface focus:outline-none focus:border-primary transition-colors text-lg"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary-container text-on-primary-container font-black text-lg py-4 rounded-xl flex justify-center items-center gap-2 shadow-lg hover:brightness-110 transition-all active:scale-95"
          >
            Entrar <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-on-surface-variant">
            Ainda não tem cadastro?{' '}
            <Link href="/cadastro" className="text-primary font-bold hover:underline">
              Crie sua conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
