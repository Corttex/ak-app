'use client';
import React, { useState } from 'react';
import { ArrowRight, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    phone: '',
    inviteSlug: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Here we would call our internal API which then posts to Elegis
    // e.g. await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(formData) })
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background py-10 px-6">
      <div className="max-w-sm w-full mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary-container">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-headline font-black text-primary">Junte-se à Tropa</h1>
          <p className="text-sm text-on-surface-variant mt-2">
            Cadastre-se para participar ativamente da campanha, ganhar pontos e convidar amigos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              Nome Completo
            </label>
            <input 
              type="text" 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full bg-surface-container border border-surface-bright rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              CPF
            </label>
            <input 
              type="text" 
              value={formData.cpf}
              onChange={(e) => setFormData({...formData, cpf: e.target.value})}
              placeholder="000.000.000-00"
              className="w-full bg-surface-container border border-surface-bright rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              WhatsApp
            </label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="(00) 90000-0000"
              className="w-full bg-surface-container border border-surface-bright rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              Código de Convite (Opcional)
            </label>
            <input 
              type="text" 
              value={formData.inviteSlug}
              onChange={(e) => setFormData({...formData, inviteSlug: e.target.value})}
              placeholder="Ex: bruno-machado-123"
              className="w-full bg-surface-container border border-surface-bright rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary-container text-on-primary-container font-black text-lg py-4 rounded-xl flex justify-center items-center gap-2 shadow-lg hover:brightness-110 transition-all active:scale-95 disabled:opacity-70 mt-4"
          >
            {loading ? 'Cadastrando...' : (
              <>Concluir Cadastro <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-on-surface-variant">
            Já tem conta?{' '}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Fazer Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
