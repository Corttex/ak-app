'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MainAdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('sms');

  const [importing, setImporting] = useState(false);
  const [importMessage, setImportMessage] = useState('');

  // Funcionalidade de Logout
  const handleLogout = () => {
    localStorage.removeItem('master_access');
    router.push('/mainadmin');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImporting(true);
    setImportMessage('Lendo arquivo...');
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n');
        if (lines.length < 2) {
          throw new Error('Arquivo vazio ou sem cabeçalhos.');
        }
        
        const headers = lines[0].toLowerCase().split(';'); // Many Excel pt-br exports use semicolon
        let delimiter = ';';
        if (headers.length < 2) {
          delimiter = ',';
        }
        const actualHeaders = lines[0].toLowerCase().split(delimiter);
        
        const nameIdx = actualHeaders.findIndex(h => h.includes('nome'));
        const phoneIdx = actualHeaders.findIndex(h => h.includes('telefone') || h.includes('celular') || h.includes('fone'));
        const emailIdx = actualHeaders.findIndex(h => h.includes('email'));
        const cityIdx = actualHeaders.findIndex(h => h.includes('cidade') || h.includes('bairro'));
        
        if (nameIdx === -1 || phoneIdx === -1) {
          setImportMessage(`Erro: O arquivo precisa ter as colunas "Nome" e "Telefone". Delimitador usado: "${delimiter}"`);
          setImporting(false);
          return;
        }

        const supporters = [];
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          const cols = line.split(delimiter);
          supporters.push({
            fullName: cols[nameIdx]?.replace(/"/g, '').trim(),
            phone: cols[phoneIdx]?.replace(/"/g, '').trim(),
            email: emailIdx !== -1 ? cols[emailIdx]?.replace(/"/g, '').trim() : undefined,
            city: cityIdx !== -1 ? cols[cityIdx]?.replace(/"/g, '').trim() : undefined
          });
        }
        
        setImportMessage(`Enviando ${supporters.length} registros para o servidor...`);
        
        const res = await fetch('/api/admin/supporters/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ supporters })
        });
        
        const data = await res.json();
        if (res.ok) {
          setImportMessage(`Sucesso! ${data.importedCount} importados, ${data.errorCount} erros.`);
        } else {
          setImportMessage(`Erro: ${data.error}`);
        }
      } catch (err: any) {
        setImportMessage(`Erro ao processar arquivo: ${err.message}`);
      }
      setImporting(false);
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    window.open('/api/admin/supporters/export', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#040d21] text-white flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#020617] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">admin_panel_settings</span>
            <div>
              <h2 className="font-black text-lg">Master Admin</h2>
              <p className="text-xs text-primary font-bold">Acesso Nível Supremo</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 flex flex-col gap-2 p-4">
          <button 
            onClick={() => setActiveTab('sms')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'sms' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-xl">sms</span>
            Central de SMS
          </button>
          
          <button 
            onClick={() => setActiveTab('import')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'import' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-xl">import_export</span>
            Importar / Exportar
          </button>
          
          <button 
            onClick={() => setActiveTab('missions')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'missions' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-xl">verified</span>
            Aprovar Missões
          </button>
          
          <button 
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'media' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-xl">perm_media</span>
            Mídias da Campanha
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-error hover:bg-error/10 font-bold transition-all text-sm">
            <span className="material-symbols-outlined text-xl">logout</span>
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <h1 className="text-3xl font-black mb-8 capitalize">{activeTab === 'sms' ? 'Central de SMS' : activeTab === 'import' ? 'Importador & Exportador' : activeTab === 'missions' ? 'Aprovação de Missões' : 'Gestão de Mídias'}</h1>
        
        {/* TAB: SMS */}
        {activeTab === 'sms' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface p-6 rounded-2xl border border-white/10">
                <h3 className="text-gray-400 text-xs font-bold uppercase mb-1">Disparos Hoje</h3>
                <p className="text-4xl font-black text-white">12.450</p>
              </div>
              <div className="bg-surface p-6 rounded-2xl border border-white/10">
                <h3 className="text-gray-400 text-xs font-bold uppercase mb-1">Saldo Twilio</h3>
                <p className="text-4xl font-black text-secondary">$ 45.20</p>
              </div>
              <div className="bg-surface p-6 rounded-2xl border border-white/10">
                <h3 className="text-gray-400 text-xs font-bold uppercase mb-1">Taxa de Entrega</h3>
                <p className="text-4xl font-black text-[#25D366]">98.5%</p>
              </div>
            </div>

            <div className="bg-surface p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-4">Novo Disparo (Manual / Agendado)</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-gray-400">Público Alvo</label>
                  <select className="w-full bg-[#020617] border border-white/10 p-3 rounded-xl mt-1 text-white">
                    <option>Todos os Apoiadores</option>
                    <option>Apenas Nível 1</option>
                    <option>Embaixadores AK</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-400">Mensagem (Max 160 char)</label>
                  <textarea className="w-full bg-[#020617] border border-white/10 p-3 rounded-xl mt-1 text-white resize-none" rows={3} placeholder="Digite a mensagem do SMS..."></textarea>
                </div>
                <div className="flex gap-4">
                  <button className="bg-primary hover:bg-primary/80 text-white font-bold py-3 px-6 rounded-xl transition-all">Disparar Agora</button>
                  <button className="bg-surface-dim hover:bg-white/10 border border-white/10 text-white font-bold py-3 px-6 rounded-xl transition-all">Agendar (CRON)</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: IMPORTADOR / EXPORTADOR */}
        {activeTab === 'import' && (
          <div className="space-y-6">
            <div className="bg-surface p-8 rounded-2xl border border-white/10 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-8xl text-primary">cloud_upload</span>
              </div>
              <h3 className="text-2xl font-black mb-2">Importar base da Elegis</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto relative z-10">
                Selecione um arquivo CSV com cabeçalho contendo ao menos <strong className="text-white">Nome</strong> e <strong className="text-white">Telefone</strong> para cadastrar automaticamente os apoiadores.
              </p>
              
              <label className="bg-primary hover:bg-primary/80 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer relative z-10">
                {importing ? (
                  <><span className="material-symbols-outlined animate-spin">refresh</span> Processando...</>
                ) : (
                  <><span className="material-symbols-outlined">attach_file</span> Selecionar Arquivo CSV</>
                )}
                <input 
                  type="file" 
                  accept=".csv" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                  disabled={importing}
                />
              </label>
              
              {importMessage && (
                <div className="mt-4 p-3 bg-[#020617] border border-white/10 rounded-xl max-w-md mx-auto text-sm text-yellow-500 font-mono">
                  {importMessage}
                </div>
              )}
            </div>

            <div className="bg-surface p-8 rounded-2xl border border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">Exportar Base de Dados</h3>
                <p className="text-gray-400 text-sm">Baixe a base completa de apoiadores em formato CSV contendo dados de contato e pontuação no ranking.</p>
              </div>
              <button 
                onClick={handleExport}
                className="bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg inline-flex items-center gap-2 flex-shrink-0"
              >
                <span className="material-symbols-outlined">download</span>
                Baixar CSV
              </button>
            </div>
          </div>
        )}

        {/* TAB: APROVAR MISSÕES */}
        {activeTab === 'missions' && (
          <div className="space-y-4">
            <p className="text-gray-400 mb-4">Analise as fotos enviadas pelos apoiadores para liberar os pontos e selos.</p>
            
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-surface p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:w-32 h-32 bg-gray-800 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <img src={`https://picsum.photos/400/400?random=${item}`} alt="Comprovante" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-bold text-lg">Adesivo no Carro</h4>
                  <p className="text-sm text-gray-400">Apoiador: Carlos Almeida (+55 61 9999-8888)</p>
                  <p className="text-sm text-secondary font-bold mt-1">Recompensa: 50 Pontos + Selo</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button className="flex-1 md:flex-none bg-error/20 hover:bg-error/30 text-error font-bold py-2 px-4 rounded-lg transition-all border border-error/50">Rejeitar</button>
                  <button className="flex-1 md:flex-none bg-green-500/20 hover:bg-green-500/30 text-green-400 font-bold py-2 px-4 rounded-lg transition-all border border-green-500/50">Aprovar</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: MÍDIAS */}
        {activeTab === 'media' && (
          <div className="bg-surface p-6 rounded-2xl border border-white/10 space-y-6">
            <div>
              <label className="text-sm font-bold text-gray-400 block mb-1">URL do Jingle (MP3 ou Link Externo)</label>
              <div className="flex gap-2">
                <input type="text" className="flex-1 bg-[#020617] border border-white/10 p-3 rounded-xl text-white" placeholder="https://..." defaultValue="https://ak.app.br/jingle.mp3" />
                <button className="bg-surface-dim border border-white/10 hover:bg-white/10 text-white font-bold px-4 rounded-xl transition-all">Atualizar</button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-bold text-gray-400 block mb-1">Vídeo Oficial da Campanha (YouTube Link)</label>
              <div className="flex gap-2">
                <input type="text" className="flex-1 bg-[#020617] border border-white/10 p-3 rounded-xl text-white" placeholder="https://youtube.com/watch?v=..." defaultValue="https://youtube.com/andrekubitschek" />
                <button className="bg-surface-dim border border-white/10 hover:bg-white/10 text-white font-bold px-4 rounded-xl transition-all">Atualizar</button>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <label className="text-sm font-bold text-gray-400 block mb-2">Fazer Upload Rápido (Cloudflare R2)</label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">cloud_upload</span>
                <p className="text-sm text-gray-300">Arraste arquivos de Áudio (MP3) ou Vídeo (MP4) aqui para subir para o servidor.</p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
