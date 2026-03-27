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
  Loader2
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

// Base de Dados Linear (Evita erros de referência profunda que causam ecrã branco)
const CITIES = ["Bauru", "Ribeirão Preto", "São Carlos", "Marília", "Araraquara", "Botucatu"];
const SEGMENTS = [
  { id: "hosp", name: "Hospitalar", score: 98, tips: "Alta procura por dietas enterais e materiais cirúrgicos." },
  { id: "nutri", name: "Nutracêuticos", score: 92, tips: "Foco em farmácias de manipulação e redes premium." },
  { id: "perf", name: "Performance", score: 95, tips: "Público de alto ticket em box de CrossFit e ginásios." },
  { id: "sport", name: "Nutrição Esportiva", score: 89, tips: "Mercado consolidado com foco em renovação de portfólio." },
  { id: "snack", name: "Snacks Saudáveis", score: 85, tips: "Crescimento acelerado em empórios e varejo." }
];

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [city, setCity] = useState("Bauru");
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
    }, 800);
  };

  const currentSegment = SEGMENTS.find(s => s.id === segmentId) || SEGMENTS[0];

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
            <a href="#simulador" className="text-black font-black">Diagnóstico ✨</a>
            <a href="#segmentos" className="hover:text-black transition">Segmentos</a>
            <a href="#contato" className="hover:text-black transition">Contato</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - REFINADO E CENTRALIZADO */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-4">
        {/* Padrão de Fundo - Opacidade mínima para elegância */}
        <div className="absolute inset-0 max-sm:opacity-[0.03] sm:opacity-[0.15] pointer-events-none transition-opacity duration-1000 flex items-center justify-center">
          <SafeImage src={ASSETS.introPattern} alt="Padrão MAP" className="w-full h-full object-cover grayscale brightness-105" />
        </div>
        
        <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_30%,_white_95%)] sm:bg-[radial-gradient(circle,_transparent_35%,_white_88%)]"></div>

        <div className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center">
          {/* Logo Principal - CORREÇÃO DE TAMANHO: w-[88%] sem scale para não passar as bordas */}
          <div className="relative inline-block transition-transform hover:scale-[1.01] duration-1000 w-[88%] sm:w-full max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-white/95 blur-[100px] rounded-full scale-125 -z-10 hidden sm:block"></div>
            <div className="absolute inset-0 bg-white/40 blur-[40px] rounded-full scale-110 -z-10 sm:hidden"></div>
            
            <SafeImage 
              src={ASSETS.logoFullBlack} 
              alt="MAP Representações" 
              className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.02)]" 
            />
          </div>
          
          <div className="absolute bottom-16 sm:relative sm:mt-24 sm:bottom-auto">
             <a href="#simulador" className="inline-block animate-bounce opacity-30 hover:opacity-100 transition-opacity">
                <ChevronRight className="rotate-90 w-10 h-10 text-black/10" />
             </a>
          </div>
        </div>
      </section>

      {/* SIMULADOR DE POTENCIAL - LÓGICA LINEAR (Zero Erros) */}
      <section id="simulador" className="py-24 sm:py-32 px-6 bg-gray-50 border-y border-gray-100 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 block">Diagnóstico Técnico</span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-balance leading-tight">Potencial Regional</h2>
            <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">Validação de mercado instantânea para a sua marca.</p>
          </div>

          <div className="bg-white p-6 sm:p-12 shadow-xl rounded-sm border border-gray-100">
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Cidade Alvo</label>
                <select 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-5 bg-gray-50 border border-gray-100 focus:border-black outline-none font-bold text-lg transition-all cursor-pointer rounded-none appearance-none"
                >
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Segmento</label>
                <select 
                  value={segmentId}
                  onChange={(e) => setSegmentId(e.target.value)}
                  className="w-full p-5 bg-gray-50 border border-gray-100 focus:border-black outline-none font-bold text-lg transition-all cursor-pointer rounded-none appearance-none"
                >
                  {SEGMENTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>

            <button 
              onClick={handleSimulate}
              disabled={isSimulating}
              className="w-full bg-black text-white py-8 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-gray-800 transition-all flex items-center justify-center gap-4 active:scale-[0.98]"
            >
              {isSimulating ? (
                <><Loader2 className="animate-spin" size={18} /> A ANALISAR...</>
              ) : (
                <><PieChart size={18} /> GERAR RESULTADO ✨</>
              )}
            </button>

            {showResult && (
              <div className="mt-12 pt-12 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="grid sm:grid-cols-3 gap-10 items-center">
                  <div className="text-center sm:text-left space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Viabilidade</p>
                    <div className="text-6xl font-black tracking-tighter text-black">
                      {currentSegment.score}<span className="text-lg opacity-20 ml-1">%</span>
                    </div>
                  </div>
                  <div className="sm:col-span-2 bg-gray-50 p-6 sm:p-8 border-l-4 border-black italic">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Diretriz MAP</p>
                    <p className="text-lg text-black font-bold leading-relaxed">
                      "Para {city}, o segmento {currentSegment.name} é estratégico. {currentSegment.tips}"
                    </p>
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
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 italic block">Rede Regional de Vendas</span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tighter uppercase text-balance">Expansão Comercial.</h2>
              <p className="text-gray-500 leading-relaxed text-lg sm:text-xl font-medium text-justify lg:text-left max-w-xl mx-auto lg:mx-0">
                A MAP Representações atua no desenvolvimento comercial de marcas no interior paulista. Conectamos a indústria a canais especializados através de um trabalho consultivo.
              </p>
            </div>
            
            <div className="grid gap-10">
              {[
                { title: "Presença em campo", desc: "Visitação ativa e relacionamento direto em cada polo regional.", icon: <MapPin /> },
                { title: "Inteligência comercial", desc: "Mapeamento estratégico e desenvolvimento de canais.", icon: <Search /> },
                { title: "Relacionamento técnico", desc: "Conexão de autoridade com profissionais de saúde.", icon: <Handshake /> }
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
          <div className="relative group p-4 bg-gray-50/50 rounded-sm border border-gray-100 shadow-sm order-last lg:order-none">
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
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400">Direção Geral</span>
              <h3 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-balance leading-none mt-6">Mariá Pettenazzi</h3>
              <p className="text-xl sm:text-2xl font-semibold text-black/70 italic border-l-8 border-black pl-6 sm:pl-10 leading-tight">Autoridade técnica para expansão regional.</p>
            </div>
            <div className="space-y-6 text-gray-500 leading-relaxed text-justify text-lg font-medium max-w-xl">
              <p>Com vasta experiência em vendas consultivas e expansão territorial, Mariá utiliza a formação técnica para educar o PDV e garantir que o valor real da marca seja comunicado com precisão técnica.</p>
              <div className="pt-8 border-t border-gray-200">
                <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8 italic uppercase text-balance">Performance de Mercado</h4>
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