'use client';
import React, { useState, useEffect } from 'react';
import { Hub, CheckCircle, RefreshCw, Key, ShieldCheck, Activity, Send, AlertTriangle } from 'lucide-react';

interface WebhookLog {
  id: string;
  endpoint: string;
  eventType: string;
  status: number;
  payload: string;
  createdAt: string;
}

export default function ConexoesAdminPage() {
  const [logs, setLogs] = useState<WebhookLog[]>([]);
  const [stats, setStats] = useState({
    totalLogs: 0,
    successfulLogs: 0,
    uptimePercentage: '100.0%',
    apiUsage: '0 / 50k'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('elegis_key_8f92j3n4v8d7s6f5g4h3j2k1');
  const [tseUrl, setTseUrl] = useState('https://api.elegis.com.br/v2/mobilizacao');
  const [showApiKey, setShowApiKey] = useState(false);

  const fetchConnections = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/conexoes');
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error('Erro ao carregar logs de conexão:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleTestConnection = async () => {
    setIsLoading(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/admin/conexoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test', endpoint: '/api/webhooks/elegis' })
      });
      const data = await res.json();
      if (data.success) {
        setTestResult('Conexão com Elegis testada com sucesso! Log gerado.');
        fetchConnections();
      } else {
        setTestResult(`Erro no teste: ${data.error}`);
      }
    } catch (err: any) {
      setTestResult('Erro ao conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfig = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/conexoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_config', apiKey, tseUrl })
      });
      const data = await res.json();
      if (data.success) {
        alert('Configurações salvas com sucesso!');
      }
    } catch (err) {
      alert('Erro ao salvar configurações.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-surface-container p-6 rounded-2xl border border-surface-bright shadow-sm gap-4">
        <div>
          <h1 className="text-2xl font-headline font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">hub</span>
            Conexões & Webhooks Elegis
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Gerencie integrações externas, monitore saúde de endpoints e webhooks em tempo real.
          </p>
        </div>
        <button
          onClick={fetchConnections}
          disabled={isLoading}
          className="bg-surface-bright hover:bg-surface-variant text-on-surface px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors border border-outline-variant"
        >
          <span className={`material-symbols-outlined ${isLoading ? 'animate-spin' : ''}`}>refresh</span>
          Atualizar Logs
        </button>
      </div>

      {testResult && (
        <div className="bg-primary/10 border border-primary text-primary p-4 rounded-xl font-bold flex items-center justify-between">
          <span>{testResult}</span>
          <button onClick={() => setTestResult(null)} className="text-sm underline">Fechar</button>
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Panel (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Integration Card */}
          <section className="bg-surface-container rounded-2xl border border-surface-bright p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-surface-bright">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">api</span>
                <h2 className="text-lg font-bold text-on-surface">Integração Elegis CRM</h2>
              </div>
              <span className="bg-tertiary-container/20 text-tertiary font-bold text-xs px-3 py-1 rounded-full border border-tertiary/30 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span> Ativo
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                  Endpoint Base Webhook (Recepção de Leads)
                </label>
                <input 
                  type="text" 
                  value={tseUrl}
                  onChange={(e) => setTseUrl(e.target.value)}
                  className="w-full bg-surface-dim border border-outline-variant rounded-xl p-3 text-on-surface text-sm font-mono focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                  Chave API (Secret)
                </label>
                <div className="flex gap-2">
                  <input 
                    type={showApiKey ? "text" : "password"} 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-1 bg-surface-dim border border-outline-variant rounded-xl p-3 text-on-surface text-sm font-mono focus:border-primary focus:outline-none"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="bg-surface-bright hover:bg-surface-variant text-on-surface p-3 rounded-xl border border-outline-variant"
                  >
                    <span className="material-symbols-outlined text-sm">{showApiKey ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                <p className="text-xs text-on-surface-variant mt-1">Mantenha sua chave API protegida contra acessos não autorizados.</p>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-surface-bright">
                <button 
                  onClick={handleTestConnection}
                  disabled={isLoading}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold border border-outline-variant text-on-surface hover:bg-surface-bright transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">sync</span> Testar Webhook
                </button>
                <button 
                  onClick={handleSaveConfig}
                  disabled={isLoading}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold bg-primary text-on-primary hover:bg-[#e6b400] transition-colors shadow-md"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </section>

          {/* Webhooks Log List */}
          <section className="bg-surface-container rounded-2xl border border-surface-bright overflow-hidden">
            <div className="p-4 border-b border-surface-bright flex justify-between items-center">
              <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">receipt_long</span> Histórico de Disparos Webhook
              </h2>
              <span className="text-xs text-on-surface-variant font-bold">{logs.length} registros no banco</span>
            </div>

            <div className="divide-y divide-surface-bright">
              {logs.length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant text-sm">
                  Nenhum evento registrado até o momento. Faça um teste enviando um disparo webhook.
                </div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="p-4 flex items-center justify-between hover:bg-surface-bright/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center border mt-1 ${log.status === 200 ? 'bg-tertiary-container/20 border-tertiary text-tertiary' : 'bg-error-container/20 border-error text-error'}`}>
                        <span className="material-symbols-outlined text-sm">{log.status === 200 ? 'check' : 'warning'}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-on-surface">{log.eventType || 'WEBHOOK_EVENT'}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${log.status === 200 ? 'bg-tertiary-container/30 text-tertiary' : 'bg-error-container/30 text-error'}`}>
                            {log.status}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-on-surface-variant mt-0.5">{log.endpoint}</p>
                        <p className="text-[11px] text-on-surface-variant mt-1">
                          {new Date(log.createdAt).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <pre className="text-[10px] bg-surface-dim p-2 rounded-lg font-mono text-on-surface-variant max-w-[200px] overflow-hidden truncate">
                        {log.payload}
                      </pre>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Right Stats Sidebar */}
        <div className="space-y-6">
          
          {/* Uptime & System Health Card */}
          <div className="bg-surface-container rounded-2xl border border-surface-bright p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <h3 className="text-lg font-bold text-on-surface mb-2">Saúde do Sistema</h3>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-black text-primary font-headline">{stats.uptimePercentage}</span>
              <span className="text-xs font-bold text-on-surface-variant mb-1">Uptime Integrado</span>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-on-surface">Consumo de Disparos API</span>
                  <span className="text-primary">{stats.apiUsage}</span>
                </div>
                <div className="w-full bg-surface-dim h-2 rounded-full overflow-hidden border border-outline-variant/30">
                  <div className="bg-primary h-full rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>

              <div className="pt-3 border-t border-surface-bright text-xs space-y-2">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Total de Disparos:</span>
                  <span className="font-bold text-on-surface">{stats.totalLogs}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Processados com Sucesso:</span>
                  <span className="font-bold text-tertiary">{stats.successfulLogs}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Features Card */}
          <div className="bg-surface-container rounded-2xl border border-surface-bright p-6 space-y-4">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified</span> Recursos de Gamificação
            </h3>
            
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-surface-dim rounded-xl border border-outline-variant/30 flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary text-lg">workspace_premium</span>
                <div>
                  <p className="font-bold text-on-surface">+50 Pontos Automáticos</p>
                  <p className="text-on-surface-variant mt-0.5">Disparado no webhook Elegis quando um novo líder indica apoiadores.</p>
                </div>
              </div>

              <div className="p-3 bg-surface-dim rounded-xl border border-outline-variant/30 flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg">sync_alt</span>
                <div>
                  <p className="font-bold text-on-surface">Sincronização Bidirecional</p>
                  <p className="text-on-surface-variant mt-0.5">Leads criados via WhatsApp no Elegis são convertidos no app.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
