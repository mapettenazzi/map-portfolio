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
  MessageSquare,
  LayoutDashboard,
  UserCheck,
  PackageSearch,
  ShieldCheck,
  Target as TargetIcon,
  ShoppingCart,
  Store,
  BadgePercent,
  CheckCircle,
  Truck,
  Speaker
} from 'lucide-react';

// Componente SafeImage para garantir a integridade visual
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

// Inteligência Territorial: Perfil Económico por Pólo
const CITY_INTEL = {
  "Campinas": { pib: "R$ 72 bi", focus: "Hub Tecnológico", consumer: "Executivo de Alta Renda", trait: "exigência por inovação e agilidade global." },
  "Ribeirão Preto": { pib: "R$ 38 bi", focus: "Elite do Agronegócio", consumer: "Público de Luxo/Agro", trait: "valorização de marcas de autoridade e exclusividade." },
  "Sorocaba": { pib: "R$ 35 bi", focus: "Pólo Industrial", consumer: "Operário/Gestor", trait: "demanda por giro rápido e custo-benefício técnico." },
  "São José do Rio Preto": { pib: "R$ 22 bi", focus: "Centro de Serviços", consumer: "Comercial Premium", trait: "fidelidade a marcas tradicionais com suporte técnico local." },
  "Bauru": { pib: "R$ 18 bi", focus: "Logistic/Edu Hub", consumer: "Misto/Universitário", trait: "necessidade de capilaridade logística e mix diversificado." },
  "Piracicaba": { pib: "R$ 25 bi", focus: "Bioindústria", consumer: "Agroindustrial", trait: "estabilidade de consumo e foco em nutrição consolidada." },
  "São Carlos": { pib: "R$ 15 bi", focus: "Tecnologia/Ciência", consumer: "Técnico/Académico", trait: "argumentação baseada em evidência e pureza de produto." },
  "Jundiaí": { pib: "R$ 55 bi", focus: "Distribuição", consumer: "Premium/Misto", trait: "proximidade com a capital que exige reposição ultra-rápida." },
  "Marília": { pib: "R$ 16 bi", focus: "Alimentar", consumer: "Fidelizado Regional", trait: "penetração forte no varejo de vizinhança e empórios." },
  "Araraquara": { pib: "R$ 14 bi", focus: "Agroindustrial", consumer: "Consumo Estável", trait: "presença constante para manutenção de share de gôndola." },
  "Botucatu": { pib: "R$ 10 bi", focus: "Biotecnologia/Saúde", consumer: "Especialista", trait: "validação técnica via corpo médico e universitário." },
  "Presidente Prudente": { pib: "R$ 11 bi", focus: "Regional Oeste", consumer: "Pólo Regional", trait: "domínio do canal farma em cidades satélite." },
  "Araçatuba": { pib: "R$ 12 bi", focus: "Agroenergia", consumer: "Desenvolvimento", trait: "oportunidade em novos canais de varejo em expansão." },
  "Franca": { pib: "R$ 13 bi", focus: "Industrial", consumer: "Operário/Varejo", trait: "foco em volume e campanhas agressivas de sell-out." },
  "Limeira": { pib: "R$ 17 bi", focus: "Metalurgia", consumer: "Industrial Dinâmico", trait: "alta frequência de compra em redes de conveniência." }
};

const SEGMENTS = [
  { id: "hosp", name: "Hospitalar", baseScore: 94, slogan: "Precisão cirúrgica na abertura de portas." },
  { id: "suple", name: "Suplementação", baseScore: 91, slogan: "Ciência que gera demanda no balcão." },
  { id: "perf", name: "Performance", baseScore: 88, slogan: "Onde a técnica encontra o endurance." },
  { id: "esporte", name: "Nutrição Esportiva", baseScore: 85, slogan: "Dominando o giro no varejo fitness." },
  { id: "alimentos", name: "Alimentos", baseScore: 89, slogan: "Sabor funcional, venda recorrente." }
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
    }, 1200);
  };

  const currentSegment = SEGMENTS.find(s => s.id === segmentId) || SEGMENTS[0];
  const intel = CITY_INTEL[city] || CITY_INTEL["Campinas"];

  // Motor de Inteligência Comercial (Cruzamento Total Segmento x Cidade)
  const generateDiagnosis = () => {
    const seg = currentSegment.name;
    const cty = city;
    const isTopTier = city === "Campinas" || city === "Ribeirão Preto" || city === "Jundiaí";

    let mkt = "";
    let trade = "";
    let sellIn = "";
    let sellOut = "";
    let expansion = "";

    if (segmentId === "hosp") {
      mkt = `Comunicação de Valor: Foco na redução de custos hospitalares através da tecnologia da sua marca.`;
      trade = `Educação técnica intra-muros para compradores e decisores clínicos do pólo de ${cty}.`;
      sellIn = `Gestão de contratos de longo prazo com foco na economia de ${intel.focus} da região.`;
      sellOut = `Presença técnica constante para garantir que a sua marca seja a 'Primeira Escolha' cirúrgica.`;
      expansion = `Abertura estratégica em ${isTopTier ? '15 a 20' : '6 a 8'} novos hospitais e clínicas oncológicas.`;
    } else if (segmentId === "suple") {
      mkt = `Marketing de Prescrição: Fortalecimento da autoridade junto aos prescritores A/B de ${cty}.`;
      trade = `Exposição premium com foco no perfil ${intel.consumer}, priorizando bioidenticidade.`;
      sellIn = `Mix completo focado em longevidade e prevenção para o ticket elevado de ${cty}.`;
      sellOut = `Treinamento de balcão para converter o shopper que busca ${intel.trait}`;
      expansion = `Mapeamento de 100% das farmácias independentes premium e empórios de luxo de ${cty}.`;
    } else if (segmentId === "perf" || segmentId === "esporte") {
      mkt = `Marketing de Influência Local: Conexão com as principais assessorias desportivas de ${cty}.`;
      trade = `Sampling e eventos 'Race-Day' para gerar experimentação e Brand Equity imediato.`;
      sellIn = `Campanhas agressivas de giro rápido para ocupar o share of shelf das lojas de suplemento.`;
      sellOut = `Ações de incentivo para balconistas e demonstração técnica de performance no PDV.`;
      expansion = `Inserção em ${isTopTier ? '25+' : '10+'} novos ginásios boutique e lojas especializadas.`;
    } else { // Alimentos
      mkt = `Comunicação de Conveniência: Foco no 'Saudável On-the-go' para o público de ${cty}.`;
      trade = `Visual Merchandising em 'Hot Zones' de checkout para capturar a compra por impulso.`;
      sellIn = `Logística de reposição ágil MAP para evitar a ruptura no varejo de proximidade.`;
      sellOut = `Degustação estratégica e cross-merchandising com o mix alimentar regional.`;
      expansion = `Expansão para redes de cafetarias corporativas e conveniências premium rodoviárias.`;
    }

    return { mkt, trade, sellIn, sellOut, expansion, score: currentSegment.baseScore + (isTopTier ? 4 : 1) };
  };

  const diag = generateDiagnosis();

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
            <a href="#simulador" className="text-black font-black flex items-center gap-1 border-b border-black">Diagnóstico <span className="animate-pulse">✨</span></a>
            <a href="#segmentos" className="hover:text-black transition">Segmentos</a>
            <a href="#contato" className="hover:text-black transition">Contato</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - LIMPEZA VISUAL CORRIGIDA */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-2">
        {/* Padrão de Fundo - Opacidade 20% e Escala 125% - Posicionado para não sujar a logo */}
        <div className="absolute inset-0 opacity-[0.20] scale-[1.25] pointer-events-none transition-opacity duration-1000 flex items-center justify-center">
          <SafeImage src={ASSETS.introPattern} alt="Background MAP" className="w-full h-full object-cover grayscale brightness-105" />
        </div>
        
        {/* Máscara Radial Sólida no Centro - Garante que a logo reine sozinha */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_white_25%,_white_40%,_transparent_100%)] sm:bg-[radial-gradient(circle,_white_35%,_white_50%,_transparent_100%)]"></div>

        <div className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center px-4">
          {/* Logo Principal - Impacto Magnus no Mobile (w-[130%]) */}
          <div className="relative inline-block transition-transform hover:scale-[1.01] duration-1000 max-sm:w-[130%] max-sm:ml-[-15%] sm:w-full sm:max-w-4xl mx-auto flex items-center justify-center">
            {/* Glow Branco para isolamento extra no Desktop */}
            <div className="absolute inset-0 bg-white/70 blur-[120px] rounded-full scale-150 -z-10 hidden sm:block"></div>
            
            <SafeImage src={ASSETS.logoFullBlack} alt="MAP Representações" className="w-full h-auto object-contain mx-auto" />
          </div>
          
          <div className="absolute bottom-16 sm:relative sm:mt-28 sm:bottom-auto">
             <a href="#simulador" className="inline-block animate-bounce opacity-40 hover:opacity-100 transition-opacity">
                <ChevronRight className="rotate-90 w-12 h-12 text-black/20" />
             </a>
          </div>
        </div>
      </section>

      {/* SIMULADOR COMERCIAL - FOCO EM VENDAS E INTELIGÊNCIA REAL */}
      <section id="simulador" className="py-24 sm:py-32 px-6 bg-gray-50 border-y border-gray-100 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-2 px-4">
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 block italic">Business Intelligence & Expansão de Mercado</span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-balance leading-tight">Relatório de Viabilidade</h2>
            <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">Cruzamento estratégico de PIB regional e vertical de produto.</p>
          </div>

          <div className="bg-white p-6 sm:p-14 shadow-2xl rounded-sm border border-gray-100">
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Globe size={12}/> Pólo Regional Seleccionado
                </label>
                <select 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-4 bg-gray-50 border-2 border-gray-100 focus:border-black outline-none font-bold text-lg transition-all cursor-pointer rounded-none appearance-none hover:bg-gray-100/50"
                >
                  {Object.keys(CITY_INTEL).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <ShoppingBag size={12}/> Vertical de Produto
                </label>
                <select 
                  value={segmentId}
                  onChange={(e) => setSegmentId(e.target.value)}
                  className="w-full p-4 bg-gray-50 border-2 border-gray-100 focus:border-black outline-none font-bold text-lg transition-all cursor-pointer rounded-none appearance-none hover:bg-gray-100/50"
                >
                  {SEGMENTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>

            <button 
              onClick={handleSimulate}
              disabled={isSimulating}
              className="w-full bg-black text-white py-8 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-gray-800 transition-all flex items-center justify-center gap-4 active:scale-[0.98] shadow-2xl"
            >
              {isSimulating ? (
                <><Loader2 className="animate-spin" size={20} /> COMPILANDO PARECER COMERCIAL...</>
              ) : (
                <><BarChart size={20} /> GERAR PARECER COMERCIAL ✨</>
              )}
            </button>

            {showResult && (
              <div className="mt-10 pt-10 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="grid lg:grid-cols-4 gap-10 items-start">
                  <div className="lg:col-span-1 space-y-6 text-center lg:text-left">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Aderência Técnica</p>
                      <div className="text-7xl font-black tracking-tighter text-black flex items-baseline justify-center lg:justify-start">
                        {diag.score}<span className="text-xl opacity-20 ml-1">%</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white rounded-none w-full justify-center lg:justify-start shadow-xl">
                       <TrendingIcon size={14} />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Pólo: {intel.focus}</span>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-3 space-y-8">
                    <div className="bg-gray-50 p-6 sm:p-10 border-l-8 border-black shadow-inner space-y-8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-black text-white flex items-center justify-center shadow-2xl">
                            <ShieldCheck size={36} strokeWidth={1.2} />
                          </div>
                          <div>
                            <h4 className="text-[18px] font-black uppercase tracking-[0.3em] leading-tight">Parecer Comercial</h4>
                            <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mt-1">Especialista: Mariá Pettenazzi</p>
                          </div>
                        </div>
                        <div className="px-4 py-1.5 border-2 border-black/10">
                           <span className="text-[10px] font-black uppercase italic text-black/40 tracking-[0.1em]">{currentSegment.slogan}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-10 text-gray-800">
                        <div className="space-y-2">
                           <h5 className="text-[11px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                              <MessageSquare size={16} className="text-black/30" /> Resumo Estratégico - Polo {city}
                           </h5>
                           <p className="text-base font-medium text-justify leading-snug">
                              {diag.analysis || `O pólo de ${city} é impulsionado por ${intel.focus}. Para a vertical de ${currentSegment.name}, identificamos uma oportunidade baseada no perfil ${intel.consumer}, que possui ${intel.trait}`}
                           </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-12">
                          <div className="space-y-3">
                             <h5 className="text-[11px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                                <Zap size={16} className="text-black" /> Marketing & Vendas
                             </h5>
                             <p className="text-sm leading-snug text-gray-700 font-medium italic border-l-2 border-gray-300 pl-4 text-justify">
                                "{diag.mkt}"
                             </p>
                          </div>
                          <div className="space-y-3">
                             <h5 className="text-[11px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                                <ShoppingBag size={16} className="text-black" /> Trade Marketing & Sell-out
                             </h5>
                             <p className="text-sm leading-snug text-gray-700 font-medium italic border-l-2 border-gray-300 pl-4 text-justify">
                                "{diag.trade}"
                             </p>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-12">
                          <div className="space-y-3">
                             <h5 className="text-[11px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                                <PackageSearch size={16} className="text-black" /> Gestão de Sell-in
                             </h5>
                             <p className="text-sm leading-snug text-gray-700 font-medium border-l-2 border-gray-200 pl-4 text-justify">
                                {diag.sellIn}
                             </p>
                          </div>
                          <div className="space-y-3">
                             <h5 className="text-[11px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                                <Truck size={16} className="text-black" /> Ativação de Sell-out Regional
                             </h5>
                             <p className="text-sm leading-snug text-gray-700 font-medium border-l-2 border-gray-200 pl-4 text-justify">
                                {diag.sellOut}
                             </p>
                          </div>
                        </div>

                        <div className="bg-black text-white p-8 space-y-3 shadow-2xl relative overflow-hidden">
                           <div className="relative z-10">
                              <h5 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                 <TargetIcon size={14} /> Expansão e Abertura de Novos PDVs em {city}
                              </h5>
                              <p className="text-base leading-snug font-bold tracking-tight mt-1">
                                 {diag.expansion}
                              </p>
                           </div>
                           <div className="absolute -right-4 -bottom-4 opacity-10">
                              <TargetIcon size={100} />
                           </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-6 border-t border-gray-200">
                         <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Embasaamento Económico (Pólo {city}):</p>
                            <p className="text-sm text-gray-600 font-bold leading-tight uppercase tracking-tight">PIB: {intel.pib} | Foco em {intel.focus}</p>
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
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 italic block">Especialista em Vendas Consultivas</span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tighter uppercase text-balance">Gestão de Marcas.</h2>
              <p className="text-gray-500 leading-relaxed text-lg sm:text-xl font-medium text-justify lg:text-left max-w-xl mx-auto lg:mx-0">
                A MAP Representações atua no desenvolvimento comercial de marcas no interior paulista. Conectamos a indústria a canais especializados através de um trabalho estratégico focado em resultados.
              </p>
            </div>
            
            <div className="grid gap-10">
              {[
                { title: "Presença em campo", desc: "Visitação ativa e relacionamento direto em cada pólo regional estratégico.", icon: <MapPin /> },
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