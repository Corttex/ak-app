export default function MissoesApoiadorPage() {
  return (
    <div className="pb-28 pt-8 px-6 max-w-5xl mx-auto w-full flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold text-on-surface">Central de Missões</h1>
        <p className="text-body-lg font-body text-on-surface-variant">
          Complete tarefas, suba de nível e ganhe destaque na campanha.
        </p>
      </div>

      {/* Gamification Status Bar (Compact) */}
      <section className="bg-surface rounded-2xl p-6 border border-outline-variant flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container shadow-inner">
            <span className="material-symbols-outlined text-3xl">star</span>
          </div>
          <div>
            <p className="text-sm font-label-bold font-bold text-on-surface-variant uppercase tracking-wider">Pontos Totais</p>
            <h2 className="text-3xl font-gamified-stat font-extrabold text-primary">1.450</h2>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-label-bold font-bold text-on-surface-variant uppercase tracking-wider">Nível Atual</p>
          <h2 className="text-xl font-headline font-bold text-on-surface">Nível 1 • Bebê Leão</h2>
        </div>
      </section>

      {/* Missions Tabs */}
      <div className="flex gap-4 border-b border-outline-variant overflow-x-auto no-scrollbar">
        <button className="px-4 py-3 font-label-bold font-bold text-primary border-b-2 border-primary whitespace-nowrap">
          Missões Abertas (3)
        </button>
        <button className="px-4 py-3 font-label-bold font-bold text-on-surface-variant hover:text-on-surface whitespace-nowrap transition-colors">
          Concluídas
        </button>
        <button className="px-4 py-3 font-label-bold font-bold text-on-surface-variant hover:text-on-surface whitespace-nowrap transition-colors">
          Recompensas
        </button>
      </div>

      {/* Mission List */}
      <div className="flex flex-col gap-4">
        {/* Mission Card 1 */}
        <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm hover:border-primary/40 transition-colors flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center flex-shrink-0 text-primary">
            <span className="material-symbols-outlined text-3xl">share</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-headline font-bold text-on-surface">Compartilhar Vídeo Oficial</h3>
              <span className="bg-secondary text-on-secondary text-xs font-bold px-2 py-1 rounded-md">+50 PTS</span>
            </div>
            <p className="text-body-md font-body text-on-surface-variant">
              Compartilhe o nosso mais novo vídeo de campanha nos seus grupos de WhatsApp e envie o print para validar.
            </p>
          </div>
          <button className="w-full sm:w-auto bg-primary text-on-primary font-bold py-3 px-6 rounded-xl hover:bg-[#0042aa] transition-colors shadow-md">
            Começar
          </button>
        </div>

        {/* Mission Card 2 */}
        <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm hover:border-primary/40 transition-colors flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center flex-shrink-0 text-primary">
            <span className="material-symbols-outlined text-3xl">group_add</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-headline font-bold text-on-surface">Convide 5 Amigos</h3>
              <span className="bg-secondary text-on-secondary text-xs font-bold px-2 py-1 rounded-md">+200 PTS</span>
            </div>
            <p className="text-body-md font-body text-on-surface-variant">
              Utilize seu link de indicação para convidar 5 amigos para se cadastrarem no aplicativo.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 bg-surface-dim rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '40%' }}></div>
              </div>
              <span className="text-xs font-bold text-on-surface-variant">2/5</span>
            </div>
          </div>
          <button className="w-full sm:w-auto bg-surface-container border border-outline-variant text-on-surface font-bold py-3 px-6 rounded-xl hover:bg-surface-dim transition-colors shadow-sm">
            Ver Detalhes
          </button>
        </div>

        {/* Mission Card 3 */}
        <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm hover:border-primary/40 transition-colors flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center flex-shrink-0 text-primary">
            <span className="material-symbols-outlined text-3xl">photo_camera</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-headline font-bold text-on-surface">Criar Moldura</h3>
              <span className="bg-secondary text-on-secondary text-xs font-bold px-2 py-1 rounded-md">+30 PTS</span>
            </div>
            <p className="text-body-md font-body text-on-surface-variant">
              Crie sua moldura personalizada "Eu Apoio" e atualize sua foto de perfil do WhatsApp.
            </p>
          </div>
          <button className="w-full sm:w-auto bg-primary text-on-primary font-bold py-3 px-6 rounded-xl hover:bg-[#0042aa] transition-colors shadow-md">
            Começar
          </button>
        </div>
      </div>
    </div>
  );
}
