export default function AdminEmbaixadoresPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h2 className="font-display-lg text-4xl font-bold text-on-surface mb-2">Gestão de Embaixadores</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant font-medium">Acompanhe o desempenho e a rede de indicações da campanha.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface border border-outline-variant text-on-surface font-label-bold text-sm py-2.5 px-5 rounded-xl flex items-center gap-2 hover:bg-surface-dim transition-colors shadow-sm font-semibold">
            <span className="material-symbols-outlined">download</span>
            Exportar CSV
          </button>
          <button className="bg-primary text-on-primary font-label-bold text-sm py-2.5 px-5 rounded-xl flex items-center gap-2 hover:bg-[#0042aa] transition-colors shadow-md shadow-primary/30 font-bold">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
            Novo Cadastro
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-surface rounded-2xl p-4 border border-outline-variant shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            className="w-full bg-surface-dim border border-outline-variant text-on-surface text-body-md font-body-md rounded-xl py-3 pl-12 pr-4 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="Buscar por nome, telefone ou CPF..."
            type="text"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <button className="bg-primary-container text-primary font-bold px-4 py-2 rounded-lg text-sm border border-primary/20 whitespace-nowrap">
            Todos
          </button>
          <button className="bg-surface text-on-surface-variant font-bold px-4 py-2 rounded-lg text-sm border border-outline-variant hover:bg-surface-dim whitespace-nowrap">
            Top 100
          </button>
          <button className="bg-surface text-on-surface-variant font-bold px-4 py-2 rounded-lg text-sm border border-outline-variant hover:bg-surface-dim whitespace-nowrap">
            Nível: Leão
          </button>
          <button className="bg-surface text-on-surface-variant font-bold px-4 py-2 rounded-lg text-sm border border-outline-variant hover:bg-surface-dim flex items-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filtros
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-dim border-b border-outline-variant text-on-surface-variant font-label-bold text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Embaixador</th>
                <th className="px-6 py-4 font-bold">Contato</th>
                <th className="px-6 py-4 font-bold">Rede Direta</th>
                <th className="px-6 py-4 font-bold">Pontuação</th>
                <th className="px-6 py-4 font-bold">Nível</th>
                <th className="px-6 py-4 font-bold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              <tr className="hover:bg-surface-dim/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold font-headline overflow-hidden border border-primary/20">
                      <img src="https://ui-avatars.com/api/?name=Bruno+M&background=0053d6&color=fff" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-on-surface font-bold text-sm">Bruno Machado</p>
                      <p className="text-on-surface-variant text-xs font-medium">Cadastrado há 2 meses</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-on-surface text-sm font-medium">(61) 99999-0000</p>
                  <p className="text-primary text-xs font-bold mt-0.5">Validado</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-on-surface">
                    <span className="material-symbols-outlined text-outline text-lg">group</span>
                    <span className="font-bold text-sm">142</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-secondary font-gamified-stat font-extrabold text-lg">12.450</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-secondary-container text-on-secondary-container text-xs font-bold px-3 py-1.5 rounded-full border border-secondary/30">
                    Rei Leão
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-on-surface-variant hover:text-primary transition-colors p-2">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </td>
              </tr>
              
              <tr className="hover:bg-surface-dim/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold font-headline">
                      MC
                    </div>
                    <div>
                      <p className="text-on-surface font-bold text-sm">Mariana Costa</p>
                      <p className="text-on-surface-variant text-xs font-medium">Cadastrado há 5 dias</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-on-surface text-sm font-medium">(61) 98888-1111</p>
                  <p className="text-error text-xs font-bold mt-0.5">Pendente</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-on-surface">
                    <span className="material-symbols-outlined text-outline text-lg">group</span>
                    <span className="font-bold text-sm">5</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-secondary font-gamified-stat font-extrabold text-lg">250</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-surface-dim text-on-surface-variant text-xs font-bold px-3 py-1.5 rounded-full border border-outline-variant">
                    Bebê Leão
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-on-surface-variant hover:text-primary transition-colors p-2">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-outline-variant bg-surface-dim/50 flex justify-between items-center">
          <span className="text-sm font-medium text-on-surface-variant">Exibindo 1 a 10 de 14.289</span>
          <div className="flex gap-2">
            <button className="p-1.5 rounded-lg border border-outline-variant text-outline bg-surface cursor-not-allowed">
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button className="p-1.5 rounded-lg border border-outline-variant text-on-surface bg-surface hover:bg-surface-dim transition-colors">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
