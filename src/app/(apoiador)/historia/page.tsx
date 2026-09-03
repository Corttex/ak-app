'use client';
import React from 'react';

export default function HistoriaPage() {
  return (
    <div className="pb-28 pt-8 px-6 max-w-4xl mx-auto w-full flex flex-col gap-10">
      
      {/* Header */}
      <div>
        <h1 className="text-4xl md:text-5xl font-headline font-black text-white mb-2 tracking-tight flex items-center gap-3">
          <span className="material-symbols-outlined text-primary-fixed-dim text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
          Minha História
        </h1>
        <p className="text-lg text-gray-300 font-medium">
          Conheça a trajetória de André Kubitschek e seu legado em Brasília.
        </p>
      </div>

      {/* Minha História */}
      <section className="bg-surface rounded-3xl p-6 sm:p-10 border border-outline-variant shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full pointer-events-none"></div>
        
        <p className="text-body-lg text-on-surface-variant font-medium leading-relaxed mb-6">
          Minha história sempre esteve ligada a Brasília. Nasci e cresci na capital que meu bisavô, <strong className="text-on-surface">Juscelino Kubitschek</strong>, construiu. Cresci acompanhando o desenvolvimento do Distrito Federal e aprendendo que grandes projetos precisam de planejamento, coragem e capacidade de execução.
        </p>
        <p className="text-body-lg text-on-surface-variant font-medium leading-relaxed mb-6">
          Também cresci acompanhando a trajetória do meu pai, <strong className="text-on-surface">Paulo Octávio</strong>, um grande empresário. Com ele, aprendi que servir às pessoas exige capacidade de gestão, responsabilidade e o compromisso de transformar boas ideias em resultados concretos para a população.
        </p>
        <p className="text-body-lg text-on-surface-variant font-medium leading-relaxed mb-6">
          Sou administrador e advogado. Construí minha experiência profissional na gestão de grandes empreendimentos da capital. Essa trajetória me ensinou a trabalhar com responsabilidade, eficiência e foco em resultados.
        </p>
        <p className="text-body-lg text-on-surface-variant font-medium leading-relaxed mb-6">
          Como secretário da Juventude do Distrito Federal, tive a oportunidade de levar esse conhecimento para o serviço público. Trabalhei para transformar ideias em programas capazes de abrir caminhos e criar oportunidades para milhares de jovens.
        </p>
        <p className="text-xl font-bold text-primary leading-relaxed border-l-4 border-primary pl-4">
          Quero honrar essa história com um trabalho próprio: presente nas regiões administrativas, aberto ao diálogo e comprometido com entregas concretas.
        </p>
      </section>

      {/* Legado */}
      <section className="bg-primary text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>
        <div className="relative z-10">
          <h3 className="text-4xl font-headline font-black mb-1">LEGADO</h3>
          <p className="text-primary-fixed-dim font-bold tracking-widest uppercase text-sm mb-8">Trabalho. Transparência. Resultado.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm hover:scale-105 transition-transform">
              <h4 className="text-5xl font-black text-secondary mb-3">1.800</h4>
              <p className="text-base font-medium">Entregamos: jovens com renda e capacitação real.</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm hover:scale-105 transition-transform">
              <h4 className="text-5xl font-black text-secondary mb-3">5.000</h4>
              <p className="text-base font-medium">Entregamos: vagas profissionalizantes em diversas áreas.</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm hover:scale-105 transition-transform">
              <h4 className="text-5xl font-black text-secondary mb-3">3.500</h4>
              <p className="text-base font-medium">Entregamos: formados no maior programa de educação financeira do DF.</p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
