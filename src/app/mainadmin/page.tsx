'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';

export default function MainAdminLogin() {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, pin }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('master_access', 'true');
        window.location.href = '/mainadmin/dashboard'; // Redirects to admin panel
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040d21] flex items-center justify-center p-4">
      <div className="bg-[#0a1738] p-8 rounded-3xl shadow-2xl border border-white/10 w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#ffc800]/20 rounded-full flex items-center justify-center border-2 border-[#ffc800]/30 mb-4 shadow-lg">
            <ShieldAlert className="w-8 h-8 text-[#ffc800]" />
          </div>
          <h1 className="text-2xl font-black text-white">Painel Master</h1>
          <p className="text-gray-400 text-sm mt-1">Acesso Restrito</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-xl mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
              Administrador
            </label>
            <select
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffc800] transition-colors"
              required
            >
              <option value="" disabled>Selecione seu perfil...</option>
              <option value="Bruno">Bruno</option>
              <option value="Fellipe">Fellipe</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
              PIN de Acesso
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••••"
              maxLength={6}
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffc800] transition-colors text-center tracking-widest text-lg font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ffc800] hover:bg-[#e6b400] text-[#06102b] font-black text-sm py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? 'Acessando...' : 'Entrar no Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
}
