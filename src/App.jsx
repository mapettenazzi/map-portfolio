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
  Handshake,
  Mic2
} from 'lucide-react';

// Componente SafeImage para garantir o carregamento correto dos assets
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

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [activeAiTab, setActiveAiTab] = useState('simulator'); 
  const [productInfo, setProductInfo] = useState("");
  const [pitchInput, setPitchInput] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [pitchResponse, setPitchResponse] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Olá! Sou o Assistente Estratégico da MAP. Como podemos expandir sua marca hoje? ✨' }
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
    if (isAiModalOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiModalOpen]);

  // ENGINE IA: Versão Blindada - Estrutura Simplificada para Garantir Sucesso
  const callGemini = async (prompt, systemInstruction) => {
    const apiKey = "AIzaSyCoFg3qKD8iAO91WyO24OhX6QfM3EMJhH8"; 
    
    // Endpoint validado para gemini-flash-latest
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    
    // Payload consolidado (instrução de sistema no prompt para evitar erros de schema)
    const payload = {
      contents: [{
        parts: [{ text: `${systemInstruction}\n\nSolicitação do usuário: ${prompt}` }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error.message);
      }
      
      const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      return responseText || "Ocorreu uma pequena falha na conexão. Por favor, tente novamente.";

    } catch (error) {
      console.error("Falha Técnica IA:", error);
      return "Tivemos um problema momentâneo na rede. Por favor, envie novamente.";
    }
  };

  const handleAiConsultancy = async (e) => {
    e.preventDefault();
    if (!productInfo.trim() || isLoading) return;
    setIsLoading(true);
    const res = await callGemini(
      productInfo,
      "És a Mariá Pettenazzi, estrategista comercial da MAP Representações. Analisa produtos para o interior paulista de forma técnica, direta e executiva."
    );
    setAiResponse(res);
    setIsLoading(false);
  };

  const handlePitchGeneration = async (e) => {
    e.preventDefault();
    if (!pitchInput.trim() || isLoading) return;
    setIsLoading(true);
    const res = await callGemini(
      pitchInput,
      "És a Mariá Pettenazzi, CEO da MAP. Cria um PITCH DE VENDA matador e persuasivo para este produto, focado em convencer lojistas e profissionais de saúde do interior de SP. Usa gatilhos mentais de autoridade e exclusividade."
    );
    setPitchResponse(res);
    setIsLoading(false);
  };

  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;
    const userMsg = { role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsLoading(true);
    
    const res = await callGemini(
      chatInput, 
      "És o Assistente Virtual da MAP Representações. Ajuda no entendimento de mercado regional, nutrição e expansão comercial."
    );
    
    setChatMessages(prev => [...prev, { role: 'ai', text: res }]);
    setIsLoading(false);
  };

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
          <div className="hidden lg:flex gap-10 text-[10px] font-extrabold uppercase tracking-[0.4em] items-center text-gray-500">
            <a href="#atuacao" className="hover:text-black transition">Atuação</a>
            <a href="#fundadora" className="hover:text-black transition">Fundadora</a>
            <a href="#segmentos" className="hover:text-black transition">Segmentos</a>
            <button onClick={() => setIsAiModalOpen(true)} className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-xl flex items-center gap-2 tracking-[0.2em]">
              IA SIMULADOR ✨
            </button>
            <a href="#contato" className="hover:text-black transition">Contato</a>
          </div>
          <div className="lg:hidden flex w-full justify-end items-center">
            <button onClick={() => setIsAiModalOpen(true)} className="p-3 bg-black text-white rounded-full shadow-2xl active:scale-95 transition-transform">
              <Sparkles size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - REVISÃO MOBILE FINAL */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-4">
        {/* Padrão de Fundo - OPACIDADE MÍNIMA MOBILE (0.07) PARA NÃO BRIGAR COM A LOGO */}
        <div className="absolute inset-0 max-sm:opacity-[0.07] sm:opacity-[0.30] pointer-events-none transition-opacity duration-1000 flex items-center justify-center">
          <SafeImage 
            src={ASSETS.introPattern} 
            alt="Padrão MAP" 
            className="w-full h-full object-cover grayscale" 
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_30%,_white_98%)]"></div>

        <div className="relative z-10 text-center animate-fade-in w-full max-w-7xl flex flex-col items-center">
          
          {/* Logo Principal - ESCALA MÁXIMA TOTAL MOBILE (scale-150) */}
          <div className="relative inline-block transition-transform hover:scale-[1.02] duration-1000 w-full max-w-[95vw] sm:max-w-6xl mx-auto scale-[1.50] sm:scale-100">
            <div className="absolute inset-0 bg-white/40 blur-[80px] rounded-full scale-110 -z-10"></div>
            <SafeImage 
              src={ASSETS.logoFullBlack} 
              alt="MAP Representações" 
              className="w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.05)]" 
            />
          </div>

          <div className="mt-32 sm:mt-24">
             <a href="#atuacao" className="inline-block animate-bounce opacity-20 hover:opacity-100 transition-opacity">
                <ChevronRight className="rotate-90 w-12 h-12 text-black/10" />
             </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO: ATUAÇÃO - Letragem Elegante e Legível */}
      <section id="atuacao" className="py-24 sm:py-32 px-6 max-w-7xl mx-auto border-t border-gray-50">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-8 text-center lg:text-left">
              {/* Etiqueta cinza suave - Ponto de Marketing */}
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-gray-400/70 italic block">Interior de São Paulo</span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tighter uppercase text-balance">Expansão Comercial.</h2>
              <p className="text-gray-500 leading-relaxed text-lg sm:text-xl font-medium text-justify lg:text-left max-w-xl mx-auto lg:mx-0">
                A MAP Representações atua no desenvolvimento comercial de marcas no interior paulista. Conectamos a indústria a canais especializados através de um trabalho consultivo.
              </p>
            </div>
            
            <div className="grid gap-10 sm:gap-12">
              {[
                { title: "Presença em campo", desc: "Visitação ativa e relacionamento direto.", icon: <MapPin /> },
                { title: "Inteligência comercial", desc: "Mapeamento e desenvolvimento regional.", icon: <Search /> },
                { title: "Relacionamento técnico", desc: "Conexão com profissionais de saúde.", icon: <Handshake /> }
              ].map((p, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-6 sm:gap-10 group items-center sm:items-start text-center sm:text-left">
                  <div className="flex-shrink-0 w-20 h-20 bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
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

      {/* SEÇÃO: FUNDADORA - Typography Refresh */}
      <section id="fundadora" className="bg-gray-50 py-24 sm:py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative order-2 lg:order-1">
             <div className="aspect-[3/4] overflow-hidden grayscale border-[1px] border-gray-200 shadow-2xl rounded-sm relative">
                <SafeImage src={ASSETS.photoSpeaking} alt="Mariá Pettenazzi" className="w-full h-full object-cover" />
                <div className="absolute top-6 right-6 bg-black text-white px-5 py-3 shadow-2xl backdrop-blur-md opacity-90 border-l-4 border-white/20">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] leading-tight">Expertise Técnica<br/>& Comercial</p>
                </div>
             </div>
             <div className="mt-8 border-l-4 border-black pl-6">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 italic">Nutricionista & Gestora Comercial</p>
             </div>
          </div>
          <div className="space-y-10 order-1 lg:order-2">
            <div className="space-y-6 pt-10 sm:pt-20">
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-gray-400">Fundadora</span>
              <h3 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-balance leading-none mt-6">Mariá Pettenazzi</h3>
              <p className="text-xl sm:text-2xl font-semibold text-black/70 italic border-l-8 border-black pl-6 sm:pl-10 leading-tight">Autoridade técnica para expansão regional.</p>
            </div>
            <div className="space-y-6 text-gray-500 leading-relaxed text-justify text-lg font-medium max-w-xl">
              <p>Com vasta experiência em vendas consultivas e expansão territorial, Mariá utiliza a formação técnica para educar o PDV e garantir que o valor real da marca seja comunicado com precisão técnica.</p>
              <div className="pt-8 border-t border-gray-200">
                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-8 italic uppercase text-balance">Performance de Mercado</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Expansão de Território", "Treinamento de Equipes", "Foco no PDV", "Relacionamento Técnico"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-white border border-gray-100 shadow-sm transition-all hover:translate-x-1">
                       <CheckCircle2 size={20} className="text-black shrink-0" />
                       <span className="text-[11px] font-bold uppercase tracking-widest leading-none text-gray-500">{item}</span>
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
              { title: "Snacks Funcionais", icon: <Activity />, items: ["Barrinhas Proteicas", "Alimentos Proteicos", "Saudáveis"] },
              { title: "Performance", icon: <Target />, items: ["Eletrólitos", "Endurance", "Acessórios de Endurance"] },
              { title: "Hospitalar", icon: <Stethoscope />, items: ["Dietas Enterais", "Equipamentos Médicos", "Materiais Cirúrgicos"] }
            ].map((s, i) => (
              <div key={i} className="bg-black p-12 hover:bg-white hover:text-black transition-all duration-700 group text-left">
                <div className="mb-10 opacity-50 group-hover:opacity-100 transition-opacity">
                  {React.cloneElement(s.icon, { size: 44, strokeWidth: 1.5 })}
                </div>
                <h4 className="text-[18px] sm:text-[20px] font-black uppercase tracking-widest mb-8 h-auto sm:h-14 flex items-center border-b border-current pb-4 leading-tight">{s.title}</h4>
                <ul className="space-y-6">
                  {s.items.map((item, idx) => (
                    <li key={idx} className="text-[12px] sm:text-[13px] font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 flex items-center gap-3 transition-opacity">
                      <div className="w-2.5 h-2.5 bg-current rounded-full shrink-0"></div> {item}
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
          <div className="space-y-12 text-center lg:text-left">
            <h3 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tighter border-b-[8px] sm:border-b-[10px] border-black pb-6 inline-block">Área de Atuação</h3>
            <div className="space-y-16">
                <div>
                  <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-8 italic">Polos Regionais Prioritários</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["Bauru", "Botucatu", "Marília", "Ourinhos", "Araraquara", "Ribeirão Preto", "São Carlos"].map((c, i) => (
                      <div key={i} className="py-4 border-b border-gray-100 text-base sm:text-lg font-bold uppercase tracking-widest flex items-center gap-4 group cursor-default text-balance text-black">
                        <span className="w-2 h-2 bg-black scale-0 group-hover:scale-100 transition-transform"></span>
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-8 rounded-sm border-l-4 border-black shadow-sm">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-gray-400">Cidades Complementares</h4>
                  <p className="text-[11px] text-gray-500 uppercase tracking-widest leading-relaxed text-balance font-semibold">
                    Lençóis Paulista, Ibitinga, Matão, Lins, Tupã, Catanduva, Olímpia, Barretos, Araçatuba, Franca.
                  </p>
                </div>
            </div>
          </div>
          <div className="bg-black text-white p-12 sm:p-16 shadow-2xl relative overflow-hidden flex flex-col justify-between rounded-sm mt-12 lg:mt-0">
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tighter mb-12 sm:mb-16 border-b border-white/20 pb-6">Canais Estratégicos</h3>
              <ul className="space-y-8">
                  {["Lojas de Suplementos", "Academias e CrossFit", "Empórios Saudáveis", "Farmácias & Drogarias", "Profissionais da Saúde", "Varejo Regional"].map((c, i) => (
                  <li key={i} className="flex items-center gap-6 sm:gap-8 text-[12px] sm:text-[14px] font-extrabold uppercase tracking-widest group leading-tight">
                      <ArrowRight size={20} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-4 transition-all shrink-0" /> {c}
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

      {/* BOTÃO CHAT FLUTUANTE */}
      <button 
        onClick={() => { setIsAiModalOpen(true); setActiveAiTab('chat'); }}
        className="fixed bottom-10 right-10 z-[60] bg-black text-white p-6 sm:p-7 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-4 group"
      >
        <MessageSquare size={28} />
        <span className="text-[11px] sm:text-[13px] font-black uppercase tracking-widest hidden lg:inline-block w-0 group-hover:w-auto overflow-hidden transition-all duration-500 whitespace-nowrap font-black">CONSULTORIA ONLINE ✨</span>
      </button>

      {/* MODAL IA - Estabilidade Técnica Mobile */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsAiModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-5xl h-[85vh] sm:h-[80vh] flex flex-col shadow-2xl overflow-hidden rounded-sm transition-all">
            <div className="flex border-b border-gray-100 bg-gray-50/50 text-center font-bold sticky top-0 z-20">
              <button onClick={() => setActiveAiTab('simulator')} className={`flex-1 p-5 sm:p-8 text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all ${activeAiTab === 'simulator' ? 'bg-white text-black' : 'hover:bg-gray-50 opacity-40'}`}>Simulador ✨</button>
              <button onClick={() => setActiveAiTab('pitch')} className={`flex-1 p-5 sm:p-8 text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all ${activeAiTab === 'pitch' ? 'bg-white text-black' : 'hover:bg-gray-50 opacity-40'}`}>Pitch ✨</button>
              <button onClick={() => setActiveAiTab('chat')} className={`flex-1 p-5 sm:p-8 text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all ${activeAiTab === 'chat' ? 'bg-black text-white' : 'hover:bg-gray-50 opacity-40'}`}>Assistente ✨</button>
              <button onClick={() => setIsAiModalOpen(false)} className="p-5 sm:p-8 hover:text-red-500 transition-colors"><X size={28} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 md:p-20 scroll-smooth">
              {activeAiTab === 'simulator' && (
                <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in pb-10">
                  <div className="text-center space-y-6">
                    <h4 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black/90 text-balance leading-tight">Valide sua Marca no Interior</h4>
                    <p className="text-gray-600 text-lg sm:text-xl font-bold italic">Inteligência Comercial MAP & Gemini AI</p>
                  </div>
                  {!aiResponse && !isLoading ? (
                    <form onSubmit={handleAiConsultancy} className="space-y-10 sm:space-y-12">
                      <textarea 
                        required 
                        value={productInfo} 
                        onChange={e => setProductInfo(e.target.value)} 
                        placeholder="Descreva o seu produto ou portfólio para análise técnica..." 
                        className="w-full bg-gray-50 border-2 border-gray-100 p-6 sm:p-10 h-60 focus:border-black outline-none text-lg sm:text-xl transition-colors font-bold resize-none" 
                      />
                      <button type="submit" disabled={isLoading} className="w-full bg-black text-white py-8 sm:py-10 text-[11px] sm:text-[12px] font-black uppercase tracking-[0.6em] hover:bg-gray-800 transition-all shadow-2xl active:scale-95 disabled:opacity-50">
                        {isLoading ? "PROCESSANDO..." : "PROCESSAR ANÁLISE"}
                      </button>
                    </form>
                  ) : isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-10 animate-pulse text-center">
                      <Loader2 className="animate-spin text-black" size={64} sm:size={80} />
                      <p className="text-[12px] sm:text-[14px] font-black uppercase tracking-[0.4em] mt-4 text-gray-900">Consultando inteligência comercial...</p>
                    </div>
                  ) : (
                    <div className="space-y-12 sm:space-y-16 animate-in zoom-in-95 text-balance">
                       <div className="bg-gray-50 p-8 sm:p-14 border-l-[10px] sm:border-l-[12px] border-black text-lg sm:text-xl leading-relaxed whitespace-pre-wrap italic shadow-inner text-gray-900 font-bold">
                        {aiResponse}
                       </div>
                       <button onClick={() => setAiResponse(null)} className="w-full border-4 border-black text-black py-8 text-[11px] sm:text-[12px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95">Nova Simulação</button>
                    </div>
                  )}
                </div>
              )}

              {activeAiTab === 'pitch' && (
                <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in pb-10">
                  <div className="text-center space-y-6">
                    <h4 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black/90 text-balance leading-tight">Gerador de Pitch de Venda</h4>
                    <p className="text-gray-600 text-lg sm:text-xl font-bold italic">Argumentos que convertem no Interior de SP ✨</p>
                  </div>
                  {!pitchResponse && !isLoading ? (
                    <form onSubmit={handlePitchGeneration} className="space-y-10 sm:space-y-12">
                      <textarea 
                        required 
                        value={pitchInput} 
                        onChange={e => setPitchInput(e.target.value)} 
                        placeholder="Qual produto quer vender? (Ex: Proteína Vegana, Monitor Cardíaco...)" 
                        className="w-full bg-gray-50 border-2 border-gray-100 p-6 sm:p-10 h-60 focus:border-black outline-none text-lg sm:text-xl transition-colors font-bold resize-none" 
                      />
                      <button type="submit" disabled={isLoading} className="w-full bg-black text-white py-8 sm:py-10 text-[11px] sm:text-[12px] font-black uppercase tracking-[0.6em] hover:bg-gray-800 transition-all shadow-2xl active:scale-95 disabled:opacity-50">
                        {isLoading ? "CRIANDO PITCH..." : "GERAR ARGUMENTO ✨"}
                      </button>
                    </form>
                  ) : isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-10 animate-pulse text-center">
                      <Mic2 className="animate-bounce text-black" size={64} sm:size={80} />
                      <p className="text-[12px] sm:text-[14px] font-black uppercase tracking-[0.4em] mt-4 text-gray-900">A criar estratégia de venda...</p>
                    </div>
                  ) : (
                    <div className="space-y-12 sm:space-y-16 animate-in zoom-in-95 text-balance">
                       <div className="bg-gray-50 p-8 sm:p-14 border-l-[10px] sm:border-l-[12px] border-black text-lg sm:text-xl leading-relaxed whitespace-pre-wrap italic shadow-inner text-gray-900 font-bold">
                        {pitchResponse}
                       </div>
                       <button onClick={() => setPitchResponse(null)} className="w-full border-4 border-black text-black py-8 text-[11px] sm:text-[12px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95">Criar Outro Pitch</button>
                    </div>
                  )}
                </div>
              )}

              {activeAiTab === 'chat' && (
                <div className="h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-8 sm:space-y-10 mb-10 pr-2 custom-scrollbar">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[90%] sm:max-w-[85%] p-6 sm:p-10 text-lg sm:text-xl font-bold leading-relaxed shadow-sm ${msg.role === 'ai' ? 'bg-gray-50 border-l-[10px] border-black text-gray-900' : 'bg-black text-white'}`}>{msg.text}</div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  <form onSubmit={handleChat} className="flex gap-4 sm:gap-8 border-t border-gray-100 pt-10 sticky bottom-0 bg-white pb-2">
                    <input 
                      value={chatInput} 
                      onChange={e => setChatInput(e.target.value)} 
                      placeholder="Dúvida técnica ou comercial..." 
                      className="flex-1 bg-gray-50 border-2 border-gray-100 p-6 sm:p-10 outline-none focus:border-black text-lg sm:text-xl font-bold" 
                    />
                    <button type="submit" disabled={isLoading || !chatInput.trim()} className="bg-black text-white px-8 sm:px-16 p-6 sm:p-10 hover:bg-gray-800 transition-all shadow-xl flex items-center justify-center active:scale-95 disabled:opacity-50">
                      {isLoading ? <Loader2 className="animate-spin" size={32} /> : <Send size={32} />}
                    </button>
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