import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  Users, 
  Mail, 
  Phone, 
  ChevronRight,
  Stethoscope,
  Dumbbell,
  Apple, 
  Activity,
  Target,
  Award, 
  ArrowRight,
  Briefcase,
  Building2,
  Zap,
  Camera,
  ImageIcon,
  Lightbulb,
  CheckCircle2,
  Map as MapIcon,
  Search,
  Handshake,
  PieChart,
  Loader2,
  TrendingUp as TrendingIcon,
  ShoppingBag,
  Globe,
  BarChart,
  Truck,
  MessageSquare,
  LayoutDashboard,
  UserCheck,
  PackageSearch
} from 'lucide-react';

// Componente SafeImage com fallback para manter a integridade visual
const SafeImage = ({ src, alt, className, ...props }) => {
  const [error, setError] = useState(false);
  return error ? (
    <div className={`${className} bg-gray-50 flex flex-col items-center justify-center border border-gray-100 text-gray-300 p-4`}>
      <ImageIcon size={24} strokeWidth={1} />
      <span className="text-[8px] font-bold uppercase tracking-widest text-center mt-2">{alt}</span>
    </div>
  ) : (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)} 
      {...props} 
    />
  );
};

const ASSETS = {
  logoFullBlack: "logo-full-black.png",
  logoHorizontal: "logo-horizontal.png",
  introPattern: "intro-pattern.png", 
  footerPattern: "footer-pattern.png", 
  photoRunning: "mari-running.png", 
  photoSpeaking: "mari-speaking.png",
  logoCircle: "logo-circle.png"
};

// Base de Dados de Cidades com Perfil Económico (Embasa o diagnóstico)
const CITY_PROFILES = {
  "Campinas": { pibFocus: "Tecnologia e Serviços", profile: "Maior PIB do interior, hub logístico e alta concentração de renda." },
  "Ribeirão Preto": { pibFocus: "Agronegócio e Saúde", profile: "Capital do agronegócio com um dos maiores pólos médicos do país." },
  "Sorocaba": { pibFocus: "Industrial e Logística", profile: "Crescimento industrial acelerado e proximidade estratégica com a capital." },
  "São José do Rio Preto": { pibFocus: "Comércio e Saúde", profile: "Referência em serviços de saúde para todo o Noroeste Paulista." },
  "Bauru": { pibFocus: "Serviços e Educação", profile: "Pólo geográfico estratégico com forte setor de serviços e logística ferroviária." },
  "Piracicaba": { pibFocus: "Bioenergia e Indústria", profile: "Liderança no setor sucroalcooleiro e forte parque industrial." },
  "São Carlos": { pibFocus: "Educação e Alta Tecnologia", profile: "Densidade intelectual elevada e pólo de inovação tecnológica." },
  "Jundiaí": { pibFocus: "Logística e Manufatura", profile: "Um dos maiores centros logísticos do Brasil com alto IPC per capita." },
  "Marília": { pibFocus: "Indústria Alimentícia", profile: "Pólo nacional de alimentos com forte tradição industrial." },
  "Araraquara": { pibFocus: "Citricultura e Indústria", profile: "Economia sólida baseada no processamento de sucos e manufatura." },
  "Botucatu": { pibFocus: "Saúde e Biotecnologia", profile: "Referência universitária e pólo industrial aeroespacial/saúde." },
  "Presidente Prudente": { pibFocus: "Pecuária e Comércio", profile: "Capital regional do Oeste Paulista com forte influência comercial." },
  "Araçatuba": { pibFocus: "Agronegócio e Energia", profile: "Forte atuação no setor de energia renovável e agroindústria." },
  "Franca": { pibFocus: "Coureiro-Calçadista", profile: "Pólo calçadista com diversificação em serviços e agronegócio." },
  "Limeira": { pibFocus: "Joias e Metalurgia", profile: "Pólo de semi-jóias com economia industrial dinâmica." }
};

const SEGMENTS = [
  { 
    id: "hosp", 
    name: "Hospitalar", 
    score: 98, 
    growthPotential: "Crítico/Essencial",
    sellIn: "Estratégia de Sell-in via contratos de fornecimento 'Just-in-Time' para redução de custos de estocagem hospitalar.",
    sellOut: "Treinamento técnico de enfermeiros e compradores para otimizar o uso clínico e garantir a recompra mensal.",
    pdv: "Foco na abertura de canais em hospitais filantrópicos e clínicas de diagnóstico por imagem.",
    slogan: "Precisão que salva, gestão que lucra."
  },
  { 
    id: "suple", 
    name: "Suplementação", 
    score: 95, 
    growthPotential: "Acelerado",
    sellIn: "Utilização de 'Volume Rebates' para garantir o abastecimento completo do mix em redes de farmácias regionais.",
    sellOut: "Trade Marketing intensivo: uso de promotores especializados para educação nutricional direta ao consumidor.",
    pdv: "Expansão para redes independentes de farmácias de manipulação e varejo de luxo.",
    slogan: "Performance técnica no balcão e no treino."
  },
  { 
    id: "perf", 
    name: "Performance", 
    score: 92, 
    growthPotential: "Alto Ticket",
    sellIn: "Estratégia de 'First-to-Market' com lançamentos exclusivos para PDVs conceito.",
    sellOut: "Ativação de Brand Community em clubes de corrida e Triathlon para gerar demanda espontânea.",
    pdv: "Mapeamento e abertura de lojas boutique desportivas e centros de alta performance.",
    slogan: "A ciência do limite ao alcance do mercado."
  },
  { 
    id: "esporte", 
    name: "Nutrição Esportiva", 
    score: 89, 
    growthPotential: "Consolidado",
    sellIn: "Negociação baseada em giro rápido e campanhas de sell-in sazonais.",
    sellOut: "Incentivos diretos para balconistas (Incentive Travel/Bónus) para conversão de marca no momento da compra.",
    pdv: "Capilarização em academias de grande porte e lojas especializadas de rua.",
    slogan: "Potencializando o varejo fitness."
  },
  { 
    id: "alimentos", 
    name: "Alimentos", 
    score: 91, 
    growthPotential: "Giro Elevado",
    sellIn: "Logística integrada MAP para garantir reposição semanal e evitar ruptura de gôndola.",
    sellOut: "Visual Merchandising estratégico: ocupação de 'Hot Zones' e frentes de caixa (impulsividade).",
    pdv: "Abertura em cafetarias corporativas e redes de conveniência de postos premium.",
    slogan: "Sabor que vende, saúde que gira."
  }
];

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [city, setCity] = useState("Campinas");
  const [segmentId, setSegmentId] = useState("hosp");
  const [isSimulating, setIsSimulating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSimulate = () => {
    setIsSimulating(true);
    setShowResult(false);
    setTimeout(() => {
      setIsSimulating(false);
      setShowResult(true);
    }, 1500);
  };

  const currentSegment = SEGMENTS.find(s => s.id === segmentId) || SEGMENTS[0];
  const currentCityData = CITY_PROFILES[city] || CITY_PROFILES["Campinas"];

  const handleEmailClick = () => {
    window.location.href = "mailto:maaprroyo@outlook.com?subject=Contato Estratégico - MAP Representações";
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
          html { scroll-behavior: smooth; }
          body { font-family: 'Montserrat', sans-serif; margin: 0; padding: 0; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        `}
      </style>

      {/* Navegação */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-white/98 backdrop-blur-lg py-4 border-b border-gray-100 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-center">
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.4em] items-center text-gray-500 mx-auto lg:mx-0">
            <a href="#atuacao" className="hover:text-black transition hidden sm:inline">Atuação</a>
            <a href="#fundadora" className="hover:text-black transition hidden sm:inline">Fundadora</a>
            <a href="#simulador" className="text-black font-black flex items-center gap-1">Inteligência <span className="animate-pulse">✨</span></a>
            <a href="#segmentos" className="hover:text-black transition">Segmentos</a>
            <a href="#contato" className="hover:text-black transition">Contato</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - LOGO MÁXIMA PARA IMPACTO PREMIUM */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-2">
        <div className="absolute inset-0 max-sm:opacity-[0.02] sm:opacity-[0.08] pointer-events-none transition-opacity duration-1000 flex items-center justify-center">
          <SafeImage src={ASSETS.introPattern} alt="Background MAP" className="w-full h-full object-cover grayscale brightness-105" />
        </div>
        
        <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_30%,_white_95%)] sm:bg-[radial-gradient(circle,_transparent_35%,_white_88%)]"></div>

        <div className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center px-4">
          {/* Logo Principal - Ajuste Mobile: Super Impacto (w-[115%]) sem passar a página */}
          <div className="relative inline-block transition-transform hover:scale-[1.01] duration-1000 w-[115%] ml-[-7.5%] sm:ml-0 sm:w-full max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-white/95 blur-[120px] rounded-full scale-125 -z-10 hidden sm:block"></div>
            <div className="absolute inset-0 bg-white/40 blur-[60px] rounded-full scale-110 -z-10 sm:hidden"></div>
            
            <SafeImage 
              src={ASSETS.logoFullBlack} 
              alt="MAP Representações" 
              className="w-full h-auto object-contain" 
            />
          </div>
          
          <div className="absolute bottom-16 sm:relative sm:mt-28 sm:bottom-auto">
             <a href="#simulador" className="inline-block animate-bounce opacity-40 hover:opacity-100 transition-opacity">
                <ChevronRight className="rotate-90 w-12 h-12 text-black/20" />
             </a>
          </div>
        </div>
      </section>

      {/* SIMULADOR DE POTENCIAL - PARECER COMERCIAL FUNDAMENTADO */}
      <section id="simulador" className="py-24 sm:py-32 px-6 bg-gray-50 border-y border-gray-100 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4 px-4">
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 block italic">Business Intelligence Territorial</span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-balance leading-tight">Diagnóstico Comercial</h2>
            <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">Validação baseada no PIB e IPC real do interior paulista.</p>
          </div>

          <div className="bg-white p-6 sm:p-14 shadow-2xl rounded-sm border border-gray-100">
            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Globe size={12}/> Polo de Atuação
                </label>
                <select 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-5 bg-gray-50 border-2 border-gray-100 focus:border-black outline-none font-bold text-lg transition-all cursor-pointer rounded-none appearance-none hover:bg-gray-100/50"
                >
                  {Object.keys(CITY_PROFILES).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <ShoppingBag size={12}/> Segmento
                </label>
                <select 
                  value={segmentId}
                  onChange={(e) => setSegmentId(e.target.value)}
                  className="w-full p-5 bg-gray-50 border-2 border-gray-100 focus:border-black outline-none font-bold text-lg transition-all cursor-pointer rounded-none appearance-none hover:bg-gray-100/50"
                >
                  {SEGMENTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>

            <button 
              onClick={handleSimulate}
              disabled={isSimulating}
              className="w-full bg-black text-white py-10 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-gray-800 transition-all flex items-center justify-center gap-4 active:scale-[0.98] shadow-2xl"
            >
              {isSimulating ? (
                <><Loader2 className="animate-spin" size={20} /> COMPILANDO DADOS DE MERCADO...</>
              ) : (
                <><BarChart size={20} /> GERAR PARECER COMERCIAL ✨</>
              )}
            </button>

            {showResult && (
              <div className="mt-14 pt-14 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="grid lg:grid-cols-4 gap-12 items-start">
                  <div className="lg:col-span-1 space-y-8 text-center lg:text-left">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Viabilidade</p>
                      <div className="text-8xl font-black tracking-tighter text-black flex items-baseline justify-center lg:justify-start">
                        {currentSegment.score}<span className="text-xl opacity-20 ml-1">%</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white rounded-none w-full justify-center lg:justify-start">
                       <TrendingIcon size={14} />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Crescimento: {currentSegment.growthPotential}</span>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-3 space-y-10">
                    <div className="bg-gray-50 p-8 sm:p-12 border-l-8 border-black shadow-inner space-y-12">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                            <LayoutDashboard size={24} />
                          </div>
                          <h4 className="text-[14px] font-black uppercase tracking-[0.3em]">Parecer Comercial</h4>
                        </div>
                        <span className="text-[11px] font-black uppercase italic text-gray-400 tracking-widest">{currentSegment.slogan}</span>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-10">
                        <div className="space-y-4">
                           <h5 className="text-[11px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                              <PackageSearch size={16} /> Gestão de Sell-in
                           </h5>
                           <p className="text-base leading-relaxed text-gray-700 font-medium italic border-l-2 border-gray-200 pl-4 text-justify">
                              "{currentSegment.sellIn}"
                           </p>
                        </div>
                        <div className="space-y-4">
                           <h5 className="text-[11px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                              <Zap size={16} /> Ativação de Sell-out
                           </h5>
                           <p className="text-base leading-relaxed text-gray-700 font-medium italic border-l-2 border-gray-200 pl-4 text-justify">
                              "{currentSegment.sellOut}"
                           </p>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <h5 className="text-[11px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                           <UserCheck size={16} /> Abertura e Expansão de Novos PDVs
                        </h5>
                        <p className="text-lg leading-relaxed font-bold text-gray-800 text-justify">
                           {currentSegment.pdv}
                        </p>
                      </div>

                      <div className="mt-6 pt-8 border-t border-gray-200">
                         <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Embasaamento Económico (Pólo {city}):</p>
                            <p className="text-base text-gray-600 font-bold leading-tight">{currentCityData.profile}</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-black italic">Foco Regional: {currentCityData.pibFocus}</p>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEÇÃO: ATUAÇÃO */}
      <section id="atuacao" className="py-24 sm:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-8 text-center lg:text-left">
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 italic block">Autoridade Regional</span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tighter uppercase text-balance">Gestão de Vendas.</h2>
              <p className="text-gray-500 leading-relaxed text-lg sm:text-xl font-medium text-justify lg:text-left max-w-xl mx-auto lg:mx-0">
                A MAP Representações atua no desenvolvimento comercial de marcas no interior paulista. Conectamos a indústria a canais especializados através de um trabalho consultivo.
              </p>
            </div>
            
            <div className="grid gap-10">
              {[
                { title: "Presença em campo", desc: "Visitação ativa e relacionamento direto em cada polo regional estratégico.", icon: <MapPin /> },
                { title: "Inteligência comercial", desc: "Mapeamento estruturado e desenvolvimento de canais de alta performance.", icon: <Search /> },
                { title: "Relacionamento técnico", desc: "Conexão de autoridade com profissionais de saúde e decisores do setor.", icon: <Handshake /> }
              ].map((p, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-6 sm:gap-8 group items-center sm:items-start text-center sm:text-left">
                  <div className="flex-shrink-0 w-20 h-20 bg-black text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xl">
                    {React.cloneElement(p.icon, { size: 28, strokeWidth: 1.5 })}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-[15px] sm:text-[18px] uppercase tracking-widest">{p.title}</h4>
                    <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group p-4 bg-gray-50/50 rounded-sm border border-gray-100 shadow-sm order-last lg:order-none mt-12 lg:mt-0">
            <div className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl rounded-sm">
              <SafeImage src={ASSETS.photoRunning} alt="Performance Técnica" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: FUNDADORA */}
      <section id="fundadora" className="bg-gray-50 py-24 sm:py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative order-2 lg:order-1">
             <div className="aspect-[3/4] overflow-hidden grayscale border border-gray-200 shadow-2xl rounded-sm relative">
                <SafeImage src={ASSETS.photoSpeaking} alt="Mariá Pettenazzi" className="w-full h-full object-cover" />
                <div className="absolute top-6 right-6 bg-black text-white px-5 py-3 shadow-2xl backdrop-blur-md opacity-90 border-l-4 border-white/20">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] leading-tight">Expertise Técnica<br/>& Comercial</p>
                </div>
             </div>
             <div className="mt-8 border-l-4 border-black pl-6">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 italic">Nutricionista & Gestora Comercial</p>
             </div>
          </div>
          <div className="space-y-10 order-1 lg:order-2">
            <div className="space-y-6 pt-10 sm:pt-20">
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400">Direção Executiva</span>
              <h3 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-balance leading-none mt-6">Mariá Pettenazzi</h3>
              <p className="text-xl sm:text-2xl font-semibold text-black/70 italic border-l-8 border-black pl-6 sm:pl-10 leading-tight">Autoridade técnica para expansão regional.</p>
            </div>
            <div className="space-y-6 text-gray-500 leading-relaxed text-justify text-lg font-medium max-w-xl">
              <p>Com vasta experiência em vendas consultivas e expansão territorial, Mariá utiliza a formação técnica para educar o PDV e garantir que o valor real da marca seja comunicado com precisão técnica.</p>
              <div className="pt-8 border-t border-gray-200">
                <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8 italic uppercase text-balance">Focos de Atuação</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Expansão de Território", "Treinamento de Equipes", "Foco no PDV", "Relacionamento Técnico"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-white border border-gray-100 shadow-sm transition-all hover:translate-x-1">
                       <CheckCircle2 size={20} className="text-black shrink-0" />
                       <span className="text-[11px] font-black uppercase tracking-widest leading-none text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: SEGMENTOS */}
      <section id="segmentos" className="py-24 sm:py-32 px-6 bg-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 space-y-8 px-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.6em] opacity-80 block italic text-gray-400">Portfólio Estratégico</span>
            <h3 className="text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase text-balance leading-tight">Segmentos Estratégicos</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/20 border border-white/10">
            {[
              { title: "Nutracêuticos", icon: <Apple />, items: ["Ômega-3", "NAC", "Vitaminas"] },
              { title: "Nutrição Esportiva", icon: <Dumbbell />, items: ["Whey", "Creatina", "Aminoácidos"] },
              { title: "Snacks Funcionais", icon: <Activity />, items: ["Barrinhas Proteicas", "Saudáveis"] },
              { title: "Performance", icon: <Target />, items: ["Eletrólitos", "Endurance", "Acessórios"] },
              { title: "Hospitalar", icon: <Stethoscope />, items: ["Dietas Enterais", "Equipamentos", "Materiais"] }
            ].map((s, i) => (
              <div key={i} className="bg-black p-12 hover:bg-white hover:text-black transition-all duration-700 group text-left">
                <div className="mb-10 opacity-50 group-hover:opacity-100 transition-opacity">
                  {React.cloneElement(s.icon, { size: 44, strokeWidth: 1.5 })}
                </div>
                <h4 className="text-[18px] sm:text-[20px] font-black uppercase tracking-widest mb-8 h-auto sm:h-14 flex items-center border-b border-current pb-4 leading-tight">{s.title}</h4>
                <ul className="space-y-6">
                  {s.items.map((item, idx) => (
                    <li key={idx} className="text-[12px] sm:text-[13px] font-black uppercase tracking-widest opacity-80 group-hover:opacity-100 flex items-center gap-3 transition-opacity">
                      <div className="w-2.5 h-2.5 bg-current rounded-full shrink-0"></div> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" className="relative bg-black text-white py-32 sm:py-40 px-6 overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center blur-[4px]">
           <SafeImage src={ASSETS.footerPattern} alt="Footer Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-16">
          <div className="space-y-8">
            <h4 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white/90 text-balance leading-tight">Sua marca no interior paulista.</h4>
            <div className="w-20 h-1 bg-white/20 mx-auto"></div>
            <p className="text-gray-400 uppercase tracking-widest text-sm sm:text-base font-bold italic">Bauru – São Paulo | Brasil</p>
          </div>
          <div className="bg-white/5 backdrop-blur-3xl p-10 sm:p-14 border border-white/10 shadow-2xl rounded-sm inline-block w-full max-w-2xl">
             <div className="space-y-8">
               <div className="space-y-4">
                 <p className="text-[12px] font-bold uppercase tracking-widest opacity-40 italic font-black tracking-[0.2em]">Contacto Comercial Direto</p>
                 <p className="text-3xl sm:text-4xl font-black tracking-tighter leading-none">(14) 99193-4185</p>
                 <button onClick={handleEmailClick} className="text-lg sm:text-xl font-bold hover:underline opacity-80 block mt-4 break-all mx-auto">maaprroyo@outlook.com</button>
               </div>
               <button onClick={handleEmailClick} className="w-full bg-white text-black py-8 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-gray-100 transition-all shadow-2xl">
                  SOLICITAR PROPOSTA COMERCIAL
               </button>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;