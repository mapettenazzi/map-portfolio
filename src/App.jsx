import React, { useState, useEffect, useRef } from 'react';
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
  Sparkles,
  Loader2,
  X,
  Send,
  Building2,
  MessageSquare,
  Zap,
  Camera,
  ImageIcon,
  Lightbulb,
  CheckCircle2,
  Map as MapIcon,
  Search,
  Handshake
} from 'lucide-react';

// Ícone do LinkedIn Manual para estabilidade total
const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Componente SafeImage com tratamento de erro e proporção
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

// Mapeamento de Assets - Mantendo .png como solicitado
const ASSETS = {
  logoFullBlack: "logo-full-black.png",
  logoHorizontal: "logo-horizontal.png",
  introPattern: "intro-pattern.png", 
  footerPattern: "footer-pattern.png", 
  photoRunning: "mari-running.png", 
  photoSpeaking: "mari-speaking.png",
  logoCircle: "logo-circle.png"
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [activeAiTab, setActiveAiTab] = useState('simulator'); 
  const [productInfo, setProductInfo] = useState("");
  const [targetCities, setTargetCities] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Olá! Sou o Assistente Estratégico da MAP. Como posso ajudar na sua expansão hoje? ✨' }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleEmailClick = () => {
    window.location.href = "mailto:maaprroyo@outlook.com?subject=Contato Estratégico - MAP Representações";
  };

  const callGemini = async (prompt, systemInstruction) => {
    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] }
    };
    try {
      const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      return result.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (err) {
      return "IA temporariamente indisponível.";
    }
  };

  const handleAiConsultancy = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await callGemini(`Analise estratégica: ${productInfo} em ${targetCities}`, "Estrategista Comercial MAP.");
    setAiResponse(res);
    setIsLoading(false);
  };

  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msgs = [...chatMessages, { role: 'user', text: chatInput }];
    setChatMessages(msgs);
    setChatInput("");
    setIsLoading(true);
    const res = await callGemini(chatInput, "Assistente Virtual MAP Representações.");
    setChatMessages([...msgs, { role: 'ai', text: res }]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
          html { scroll-behavior: smooth; }
          body { font-family: 'Montserrat', sans-serif; margin: 0; padding: 0; overflow-x: hidden; }
          .text-balance { text-wrap: balance; }
          .hero-mask {
            mask-image: radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0.5) 70%, transparent 100%);
            -webkit-mask-image: radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0.5) 70%, transparent 100%);
          }
        `}
      </style>

      {/* Navegação Fixa */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-white/95 backdrop-blur-md py-4 border-b border-gray-100 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-center">
          <div className="hidden lg:flex gap-10 text-[10px] font-extrabold uppercase tracking-[0.4em] items-center">
            <a href="#atuacao" className="hover:opacity-40 transition">Atuação</a>
            <a href="#fundadora" className="hover:opacity-40 transition">Fundadora</a>
            <a href="#segmentos" className="hover:opacity-40 transition">Segmentos</a>
            <button onClick={() => setIsAiModalOpen(true)} className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-xl flex items-center gap-2">
              IA SIMULADOR ✨
            </button>
            <a href="#contato" className="hover:opacity-40 transition">Contato</a>
          </div>
          <button onClick={() => setIsAiModalOpen(true)} className="lg:hidden p-2.5 bg-black text-white rounded-full">
            <Sparkles size={18} />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-4">
        <div className="absolute inset-0 opacity-[0.35] pointer-events-none transition-opacity duration-1000 flex items-center justify-center blur-[1.5px]">
          <SafeImage src={ASSETS.introPattern} alt="Background MAP" className="w-full h-full object-cover grayscale brightness-110" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_10%,_white_85%)]"></div>

        <div className="relative z-10 text-center space-y-12 animate-fade-in w-full max-w-5xl">
          <div className="space-y-6">
            <p className="text-[12px] sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] sm:tracking-[0.8em] text-gray-500 drop-shadow-sm text-balance">
              Saúde <span className="mx-1 text-black/10">·</span> Inovação <span className="mx-1 text-black/10">·</span> Performance
            </p>
          </div>
          <div className="relative inline-block transition-transform hover:scale-[1.01] duration-700 p-8 sm:p-12">
            <div className="absolute inset-0 bg-white/80 blur-[60px] rounded-full scale-110 -z-10"></div>
            <SafeImage 
              src={ASSETS.logoFullBlack} 
              alt="MAP Representações" 
              className="w-full max-w-[280px] sm:max-w-2xl md:max-w-4xl mx-auto object-contain" 
            />
          </div>
          <div className="pt-8">
             <a href="#atuacao" className="inline-block animate-bounce opacity-30 hover:opacity-100 transition-opacity">
                <ChevronRight className="rotate-90 w-10 h-10 sm:w-12" />
             </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO: ATUAÇÃO */}
      <section id="atuacao" className="py-24 sm:py-32 px-6 max-w-7xl mx-auto border-t border-gray-50">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-8">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.5em] text-gray-300 italic">Interior de São Paulo</span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tighter uppercase text-balance">Expansão Comercial.</h2>
              <p className="text-gray-500 leading-relaxed text-lg sm:text-xl font-light text-justify max-w-xl">
                A MAP Representações atua no desenvolvimento comercial de marcas no interior paulista. Conectamos a indústria a canais especializados através de um trabalho consultivo.
              </p>
            </div>
            <div className="grid gap-10 sm:gap-12">
              {[
                { title: "Presença em campo", desc: "Visitação activa e relacionamento directo.", icon: <MapPin /> },
                { title: "Inteligência comercial", desc: "Mapeamento e desenvolvimento regional.", icon: <Search /> },
                { title: "Relacionamento técnico", desc: "Conexão com profissionais de saúde.", icon: <Handshake /> }
              ].map((p, i) => (
                <div key={i} className="flex gap-6 sm:gap-10 group items-start">
                  <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                    {React.cloneElement(p.icon, { size: 28, strokeWidth: 1.5 })}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-[15px] sm:text-[16px] uppercase tracking-widest">{p.title}</h4>
                    <p className="text-base sm:text-lg text-gray-400 font-light leading-snug">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl rounded-sm">
              <SafeImage src={ASSETS.photoRunning} alt="Performance" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: FUNDADORA */}
      <section id="fundadora" className="bg-gray-50 py-24 sm:py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative order-2 lg:order-1">
             <div className="aspect-[3/4] overflow-hidden grayscale border-[1px] border-gray-200 shadow-2xl rounded-sm relative">
                <SafeImage src={ASSETS.photoSpeaking} alt="Mariá Pettenazzi" className="w-full h-full object-cover" />
                <div className="absolute top-6 right-6 bg-black text-white px-5 py-3 shadow-2xl backdrop-blur-md opacity-90 border-l-4 border-white/20">
                   <p className="text-[9px] font-black uppercase tracking-[0.3em] leading-tight">Expertise Técnica<br/>& Comercial</p>
                </div>
             </div>
             <div className="mt-8 border-l-4 border-black pl-6">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 italic">Nutricionista & Gestora Comercial</p>
             </div>
          </div>
          <div className="space-y-10 order-1 lg:order-2">
            <div className="space-y-6 pt-20">
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-gray-300">Fundadora</span>
              <h3 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-balance leading-none mt-6">Mariá Pettenazzi</h3>
              <p className="text-xl sm:text-2xl font-medium text-black/70 italic border-l-8 border-black pl-6 sm:pl-10 leading-tight">Autoridade técnica para expansão regional.</p>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed text-justify text-lg font-light max-w-xl">
              <p>Com vasta experiência em vendas consultivas e expansão territorial, Mariá utiliza a formação técnica para educar o PDV e garantir que o valor real da marca seja comunicado com precisão técnica.</p>
              <div className="pt-8 border-t border-gray-200">
                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-8 italic uppercase">Trajetória na Mercur S.A.</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Expansão de Território", "Treinamento de Equipas", "Foco no PDV", "Relacionamento Técnico"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-white border border-gray-100 shadow-sm transition-all hover:translate-x-1">
                       <CheckCircle2 size={20} className="text-black shrink-0" />
                       <span className="text-[11px] font-extrabold uppercase tracking-widest leading-none">{item}</span>
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
          <div className="text-center mb-24 space-y-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.6em] opacity-30 block italic">Portfólio Estratégico</span>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase text-balance">Segmentos Estratégicos</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
            {[
              { title: "Nutracêuticos", icon: <Apple />, items: ["Ômega-3", "NAC", "Vitaminas"] },
              { title: "Nutrição Esportiva", icon: <Dumbbell />, items: ["Whey", "Creatina", "Aminoácidos"] },
              { title: "Snacks Funcionais", icon: <Activity />, items: ["Barras", "Cookies", "Saudáveis"] },
              { title: "Performance", icon: <Target />, items: ["Géis", "Eletrólitos", "Endurance"] },
              { title: "Nutrição Clínica", icon: <Stethoscope />, items: ["Enteral", "Hospitalar", "Clínica"] }
            ].map((s, i) => (
              <div key={i} className="bg-black p-10 hover:bg-white hover:text-black transition-all duration-700 group text-left">
                <div className="mb-8 opacity-30 group-hover:opacity-100 transition-opacity">
                  {React.cloneElement(s.icon, { size: 32, strokeWidth: 1 })}
                </div>
                <h4 className="text-[14px] font-extrabold uppercase tracking-widest mb-6 h-10 flex items-center border-b border-current pb-4 leading-none">{s.title}</h4>
                <ul className="space-y-4">
                  {s.items.map((item, idx) => (
                    <li key={idx} className="text-[10px] sm:text-[11px] uppercase tracking-widest opacity-30 group-hover:opacity-100 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-current rounded-full"></div> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: TERRITÓRIO */}
      <section id="territorio" className="py-24 sm:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-12">
            <h3 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tighter border-b-[8px] sm:border-b-[10px] border-black pb-6 inline-block">Área de Atuação</h3>
            <div className="space-y-16">
                <div>
                  <h4 className="text-[12px] font-extrabold text-gray-300 uppercase tracking-widest mb-8 italic font-bold">Polos Regionais Prioritários</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["Bauru", "Botucatu", "Marília", "Ourinhos", "Araraquara", "Ribeirão Preto", "São Carlos"].map((c, i) => (
                      <div key={i} className="py-4 border-b border-gray-100 text-base sm:text-lg font-extrabold uppercase tracking-widest flex items-center gap-4 group cursor-default text-balance">
                        <span className="w-2 h-2 bg-black scale-0 group-hover:scale-100 transition-transform"></span>
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-8 rounded-sm border-l-4 border-black">
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-4">Cidades Complementares</h4>
                  <p className="text-[11px] text-gray-400 uppercase tracking-widest leading-relaxed text-balance">
                    Lençóis Paulista, Ibitinga, Matão, Lins, Tupã, Catanduva, Olímpia, Barretos, Araçatuba, Franca.
                  </p>
                </div>
            </div>
          </div>
          <div className="bg-black text-white p-12 sm:p-16 shadow-2xl relative overflow-hidden flex flex-col justify-between rounded-sm">
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tighter mb-12 sm:mb-16 border-b border-white/20 pb-6">Canais Estratégicos</h3>
              <ul className="space-y-8">
                  {["Lojas de Suplementos", "Academias e CrossFit", "Empórios Saudáveis", "Farmácias & Drogarias", "Profissionais da Saúde", "Varejo Regional"].map((c, i) => (
                  <li key={i} className="flex items-center gap-6 sm:gap-8 text-[12px] sm:text-[14px] font-extrabold uppercase tracking-widest group leading-none">
                      <ArrowRight size={20} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-4 transition-all" /> {c}
                  </li>
                  ))}
              </ul>
            </div>
            <SafeImage src={ASSETS.logoCircle} alt="" className="absolute -bottom-40 -right-40 w-[600px] h-[600px] opacity-[0.03] pointer-events-none" />
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
               <div className="space-y-2">
                 <p className="text-[12px] font-bold uppercase tracking-widest opacity-40 italic font-bold tracking-[0.2em]">Contacto Comercial Direto</p>
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

      {/* BOTÃO CHAT FLUTUANTE */}
      <button 
        onClick={() => { setIsAiModalOpen(true); setActiveAiTab('chat'); }}
        className="fixed bottom-10 right-10 z-[60] bg-black text-white p-6 sm:p-7 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-4 group"
      >
        <MessageSquare size={28} />
        <span className="text-[11px] sm:text-[13px] font-black uppercase tracking-widest hidden lg:inline-block w-0 group-hover:w-auto overflow-hidden transition-all duration-500 whitespace-nowrap font-extrabold">CONSULTORIA ONLINE ✨</span>
      </button>

      {/* MODAL IA */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsAiModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden rounded-sm">
            <div className="flex border-b border-gray-100 bg-gray-50/50 text-center font-bold">
              <button onClick={() => setActiveAiTab('simulator')} className={`flex-1 p-6 sm:p-8 text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all ${activeAiTab === 'simulator' ? 'bg-white text-black' : 'hover:bg-gray-50 opacity-40'}`}>Simulador ✨</button>
              <button onClick={() => setActiveAiTab('chat')} className={`flex-1 p-6 sm:p-8 text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all ${activeAiTab === 'chat' ? 'bg-black text-white' : 'hover:bg-gray-50 opacity-40'}`}>Assistente ✨</button>
              <button onClick={() => setIsAiModalOpen(false)} className="p-6 sm:p-8 hover:text-red-500 transition-colors"><X size={28} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 md:p-20">
              {activeAiTab === 'simulator' ? (
                <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in">
                  <div className="text-center space-y-6">
                    <h4 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black/90 text-balance leading-tight">Valide sua Marca no Interior</h4>
                    <p className="text-gray-400 text-lg sm:text-xl font-light italic">Inteligência Comercial MAP & Gemini AI</p>
                  </div>
                  {!aiResponse && !isLoading ? (
                    <form onSubmit={handleAiConsultancy} className="space-y-10 sm:space-y-12">
                      <textarea required value={productInfo} onChange={e => setProductInfo(e.target.value)} placeholder="Descreva o Produto..." className="w-full bg-gray-50 border-2 border-gray-100 p-8 sm:p-10 h-60 focus:border-black outline-none text-lg sm:text-xl transition-colors font-light" />
                      <button className="w-full bg-black text-white py-8 sm:py-10 text-[11px] sm:text-[12px] font-black uppercase tracking-[0.6em] hover:bg-gray-800 transition-all shadow-2xl">PROCESSAR ANÁLISE</button>
                    </form>
                  ) : isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-10 animate-pulse text-center">
                      <Loader2 className="animate-spin text-black" size={64} />
                      <p className="text-[12px] sm:text-[14px] font-black uppercase tracking-[0.4em] mt-4">Cruzando dados técnicos...</p>
                    </div>
                  ) : (
                    <div className="space-y-12 sm:space-y-16 animate-in zoom-in-95 text-balance">
                       <div className="bg-gray-50 p-10 sm:p-14 border-l-[10px] sm:border-l-[12px] border-black text-lg sm:text-xl leading-relaxed whitespace-pre-wrap italic shadow-inner">
                        {aiResponse}
                       </div>
                       <button onClick={() => setAiResponse(null)} className="w-full border-4 border-black text-black py-8 text-[11px] sm:text-[12px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Nova Simulação</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-8 sm:space-y-10 mb-10 pr-4 custom-scrollbar">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[85%] p-8 sm:p-10 text-lg sm:text-xl font-light leading-relaxed shadow-sm ${msg.role === 'ai' ? 'bg-gray-50 border-l-[10px] border-black text-gray-800' : 'bg-black text-white'}`}>{msg.text}</div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  <form onSubmit={handleChat} className="flex gap-4 sm:gap-8 border-t border-gray-100 pt-10">
                    <input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Tire sua dúvida técnica sobre expansão regional..." className="flex-1 bg-gray-50 border-2 border-gray-100 p-8 sm:p-10 outline-none focus:border-black text-lg sm:text-xl font-light" />
                    <button type="submit" className="bg-black text-white px-10 sm:px-16 p-10 hover:bg-gray-800 transition-all shadow-xl"><Send size={32} /></button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;