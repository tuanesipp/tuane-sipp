import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════
const PAIN_POINTS = [
  { icon: "📐", before: "8h", after: "45min", task: "Memorial Descritivo completo", who: "Arquitetos" },
  { icon: "🔧", before: "2 dias", after: "20min", task: "Análise de normas ABNT aplicáveis", who: "Engenheiros" },
  { icon: "💰", before: "1 dia", after: "30min", task: "Orçamento estimativo detalhado", who: "Construtores" },
  { icon: "📋", before: "5h", after: "15min", task: "Laudo técnico de vistoria", who: "AEC geral" },
  { icon: "📑", before: "3h", after: "10min", task: "Proposta comercial personalizada", who: "Escritórios" },
  { icon: "🏗", before: "4h", after: "25min", task: "Cronograma físico-financeiro", who: "Construtoras" },
];

const STATS = [
  { num: "87%", label: "dos profissionais AEC acreditam que IA vai transformar o setor" },
  { num: "27%", label: "já usam — quem dominar agora lidera o mercado" },
  { num: "4.4%", label: "engajamento de construção no IG — o mais alto de todas as indústrias" },
  { num: "US$6B", label: "mercado de IA na construção em 2026, crescendo 24.8% ao ano" },
];

const PRODUCTS = [
  {
    tag: "GRATUITO", tagBg: "#052e16", tagBorder: "#4ade80", tagColor: "#4ade80",
    title: "Kit 50 Prompts Claude", subtitle: "Para Arquitetos, Engenheiros e Construtores",
    price: "R$ 0", desc: "Os 50 prompts que uso diariamente. Memoriais, laudos, orçamentos, normas ABNT, cronogramas e atendimento.",
    features: ["50 prompts prontos para copiar", "Organizados por área: ARQ · ENG · OBRA", "Guia rápido do Claude em 15min", "Acesso ao grupo VIP WhatsApp"],
    cta: "BAIXAR GRÁTIS", ctaStyle: "outline",
  },
  {
    tag: "MAIS VENDIDO", tagBg: "#1a1008", tagBorder: "#D4A853", tagColor: "#D4A853",
    title: "Claude do Zero para AEC", subtitle: "Mini-curso · 12 aulas práticas",
    price: "R$ 147", desc: "Do cadastro ao prompt avançado. Aprenda a resolver problemas reais do seu escritório ou obra com Claude.",
    features: ["12 aulas em vídeo (acesso vitalício)", "Exercícios com projetos reais", "Templates avançados de prompts", "Certificado de conclusão", "Suporte por 60 dias", "Bônus: 30 prompts extras"],
    cta: "GARANTIR MINHA VAGA", ctaStyle: "solid",
  },
  {
    tag: "PREMIUM", tagBg: "#1a0a2e", tagBorder: "#a78bfa", tagColor: "#a78bfa",
    title: "Programa AEC com IA", subtitle: "Mentoria em grupo · 8 semanas ao vivo",
    price: "R$ 1.997", desc: "Transformação completa. Aulas ao vivo, comunidade exclusiva, templates prontos e certificação profissional.",
    features: ["8 semanas ao vivo + gravação", "Comunidade exclusiva vitalícia", "Módulos: projetos, laudos, orçamentos, normas, obras", "Certificação 'Profissional AEC + IA'", "3 mentorias individuais", "Acesso antecipado a novos conteúdos"],
    cta: "ENTRAR NA LISTA DE ESPERA", ctaStyle: "outline",
  },
];

const TESTIMONIALS = [
  { name: "Arq. Fernanda Costa", city: "Florianópolis/SC", text: "Gastava 2 dias num memorial. Com os prompts da Tuane, faço em 40 minutos. Meus clientes nem acreditam na velocidade de entrega.", avatar: "FC" },
  { name: "Eng. Ricardo Melo", city: "Curitiba/PR", text: "O mini-curso mudou meu escritório. Economizo 15 horas por semana em trabalhos repetitivos. O investimento se pagou no primeiro dia.", avatar: "RM" },
  { name: "Arq. Juliana Braga", city: "São Paulo/SP", text: "Tinha medo de IA. A Tuane explica de um jeito que qualquer profissional entende. Hoje uso Claude em todos os projetos e laudos.", avatar: "JB" },
  { name: "Eng. Marcos Oliveira", city: "Belo Horizonte/MG", text: "A mentoria premium vale cada centavo. Automatizei análise de normas e laudos — ganhei 2 clientes novos só com o tempo que liberei.", avatar: "MO" },
  { name: "Téc. Ana Paula Silva", city: "Goiânia/GO", text: "Trabalho com orçamento de obras e o Claude cortou meu tempo pela metade. Os prompts de cronograma físico-financeiro são absurdos de bons.", avatar: "AS" },
];

const FAQ = [
  { q: "Preciso saber programar para usar o Claude?", a: "Absolutamente não. O Claude funciona por conversas em texto natural — como se fosse um WhatsApp. Se você sabe digitar, sabe usar Claude. Ensino do zero, passo a passo." },
  { q: "Funciona para engenheiros e construtores, ou só arquitetos?", a: "Funciona para todo profissional de AEC! Os prompts de orçamento, laudos, normas técnicas, cronogramas e gerenciamento de obras se aplicam igualmente a arquitetos, engenheiros civis e técnicos em construção." },
  { q: "O Claude entende normas brasileiras (ABNT, NR)?", a: "Sim! É uma das maiores forças do Claude. Com os prompts certos, ele analisa seu projeto à luz da NBR 15575, NBR 9050, NRs de segurança e muitas outras. Ensino exatamente como fazer isso." },
  { q: "Quanto tempo para ver resultados?", a: "Com o Kit gratuito de 50 prompts, no primeiro dia. No mini-curso, em 2 semanas você já terá transformado pelo menos 3 processos. Na mentoria, alunos reportam economia de 10-20 horas por semana." },
  { q: "E se o Claude errar?", a: "Toda IA pode errar — por isso ensino técnicas de verificação em cada módulo. O segredo é usar Claude como copiloto, não piloto automático. Você sempre revisa e valida. Mas os erros são raros com prompts bem construídos." },
  { q: "Consigo usar no celular?", a: "Sim! Claude tem app para iPhone e Android. Vários alunos usam diretamente na obra pelo celular — fazendo consultas de normas, gerando checklists e até rascunhando laudos em tempo real." },
];

const CONTENT_GRID = [
  { type: "REEL", label: "Memorial em 45min com Claude", metric: "124K views", color: "#ef4444" },
  { type: "CARROSSEL", label: "10 prompts que todo engenheiro precisa", metric: "5.1K salvamentos", color: "#3b82f6" },
  { type: "REEL", label: "Antes vs Depois: orçamento com IA", metric: "89K views", color: "#ef4444" },
  { type: "LIVE", label: "Claude ao vivo: dúvidas de obra", metric: "1.4K ao vivo", color: "#a855f7" },
  { type: "CARROSSEL", label: "ABNT + NR na ponta da língua", metric: "3.2K salvamentos", color: "#3b82f6" },
  { type: "REEL", label: "Laudo técnico em 15min — é real", metric: "201K views", color: "#ef4444" },
];

// ═══════════════════════════════════════════
// SVG LOGO COMPONENT
// ═══════════════════════════════════════════
function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer frame — represents construction/structure */}
      <rect x="4" y="4" width="112" height="112" rx="16" stroke="#D4A853" strokeWidth="2.5" opacity="0.5" />
      {/* Grid lines — blueprint/engineering */}
      <line x1="40" y1="4" x2="40" y2="116" stroke="#D4A853" strokeWidth="0.6" opacity="0.2" />
      <line x1="80" y1="4" x2="80" y2="116" stroke="#D4A853" strokeWidth="0.6" opacity="0.2" />
      <line x1="4" y1="40" x2="116" y2="40" stroke="#D4A853" strokeWidth="0.6" opacity="0.2" />
      <line x1="4" y1="80" x2="116" y2="80" stroke="#D4A853" strokeWidth="0.6" opacity="0.2" />
      {/* Architectural triangle / roof shape */}
      <path d="M60 22 L92 58 L28 58 Z" stroke="#D4A853" strokeWidth="2" fill="none" opacity="0.7" />
      {/* Building columns below */}
      <line x1="38" y1="58" x2="38" y2="88" stroke="#D4A853" strokeWidth="2" opacity="0.5" />
      <line x1="60" y1="58" x2="60" y2="88" stroke="#D4A853" strokeWidth="2" opacity="0.5" />
      <line x1="82" y1="58" x2="82" y2="88" stroke="#D4A853" strokeWidth="2" opacity="0.5" />
      {/* Base / foundation line */}
      <line x1="28" y1="88" x2="92" y2="88" stroke="#D4A853" strokeWidth="2.5" opacity="0.8" />
      {/* AI circuit nodes */}
      <circle cx="60" cy="22" r="3.5" fill="#D4A853" />
      <circle cx="28" cy="58" r="2.5" fill="#D4A853" opacity="0.6" />
      <circle cx="92" cy="58" r="2.5" fill="#D4A853" opacity="0.6" />
      <circle cx="38" cy="88" r="2.5" fill="#D4A853" opacity="0.6" />
      <circle cx="82" cy="88" r="2.5" fill="#D4A853" opacity="0.6" />
      {/* TS monogram */}
      <text x="60" y="110" textAnchor="middle" fontFamily="serif" fontSize="16" fontWeight="700" fill="#D4A853" letterSpacing="4">TS</text>
    </svg>
  );
}

function LogoFull({ height = 36 }) {
  const scale = height / 36;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: `${10 * scale}px`, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <Logo size={height} />
      <div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: `${16 * scale}px`, fontWeight: 800, color: "#f0e6d6", letterSpacing: "2px", lineHeight: 1.1 }}>TUANE SIPP</div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: `${7.5 * scale}px`, letterSpacing: `${4 * scale}px`, color: "#D4A853", fontWeight: 500, marginTop: "1px" }}>ARQUITETURA · ENGENHARIA · IA</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// UTILITY HOOKS
// ═══════════════════════════════════════════
function useInView(t = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(32px)",
      transition: `all 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    }}>{children}</div>
  );
}

function useCountUp(target, isVis, dur = 1600) {
  const [val, setVal] = useState(0);
  const numericPart = parseFloat(target.replace(/[^0-9.]/g, ""));
  useEffect(() => {
    if (!isVis || !numericPart) return;
    let cur = 0;
    const steps = 35, inc = numericPart / steps;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= numericPart) { setVal(numericPart); clearInterval(t); }
      else setVal(cur);
    }, dur / steps);
    return () => clearInterval(t);
  }, [isVis]);
  if (!numericPart) return target;
  const suffix = target.replace(/[0-9.]/g, "");
  return val >= numericPart ? target : `${Math.round(val)}${suffix}`;
}

// ═══════════════════════════════════════════
// SECTION COMPONENTS
// ═══════════════════════════════════════════

function Navbar() {
  const [s, setS] = useState(false);
  useEffect(() => { const fn = () => setS(window.scrollY > 50); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: s ? "10px 32px" : "18px 32px",
      background: s ? "rgba(10,10,8,0.96)" : "transparent",
      backdropFilter: s ? "blur(16px)" : "none",
      borderBottom: s ? "1px solid rgba(212,168,83,0.1)" : "none",
      transition: "all 0.4s", display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <LogoFull height={s ? 32 : 36} />
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {[["resultados","Resultados"],["metodo","Método"],["produtos","Produtos"],["depoimentos","Alunos"]].map(([id,l]) => (
          <span key={id} onClick={() => go(id)} style={{
            cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: "11px",
            letterSpacing: "1.5px", textTransform: "uppercase", color: "#6b6259",
            transition: "color 0.3s", fontWeight: 500,
          }}
          onMouseEnter={e => e.target.style.color = "#D4A853"}
          onMouseLeave={e => e.target.style.color = "#6b6259"}
          >{l}</span>
        ))}
        <span onClick={() => go("captura")} style={{
          cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: "11px",
          letterSpacing: "1.5px", textTransform: "uppercase", color: "#0a0a08",
          background: "#D4A853", padding: "9px 18px", fontWeight: 700,
          borderRadius: "4px", transition: "all 0.3s",
        }}
        onMouseEnter={e => { e.target.style.background = "#f0e6d6"; e.target.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.target.style.background = "#D4A853"; e.target.style.transform = "translateY(0)"; }}
        >Kit Gratuito</span>
      </div>
    </nav>
  );
}

function Hero() {
  const [ok, setOk] = useState(false);
  useEffect(() => { setTimeout(() => setOk(true), 250); }, []);
  const anim = (d) => ({ opacity: ok ? 1 : 0, transform: ok ? "translateY(0)" : "translateY(28px)", transition: `all 1s cubic-bezier(0.16,1,0.3,1) ${d}s` });

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "100px 40px 80px", position: "relative", overflow: "hidden", background: "#0a0a08",
    }}>
      {/* Blueprint grid */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.025,
        backgroundImage: "linear-gradient(rgba(212,168,83,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.4) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />
      <div style={{ position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 65% 50% at 60% 45%, rgba(212,168,83,0.06) 0%, transparent 60%)",
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "820px" }}>
        <div style={anim(0.3)}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.2)",
            borderRadius: "20px", padding: "6px 16px",
            fontFamily: "'Outfit', sans-serif", fontSize: "11px", letterSpacing: "2px",
            color: "#D4A853", textTransform: "uppercase", fontWeight: 600,
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
            Para Arquitetos · Engenheiros · Construtores
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontSize: "clamp(38px, 6.5vw, 76px)",
          fontWeight: 800, lineHeight: 1.05, color: "#f0e6d6", margin: "24px 0 0", ...anim(0.5),
        }}>
          Faça em <span style={{ color: "#D4A853" }}>1 hora</span>
          <br />o que antes levava
          <br /><span style={{ background: "linear-gradient(90deg, #D4A853, #f0d78c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>1 semana</span>
        </h1>

        <p style={{
          fontFamily: "'Outfit', sans-serif", fontSize: "clamp(15px, 1.8vw, 18px)",
          color: "#7a7268", maxWidth: "580px", lineHeight: 1.7, margin: "24px 0 0",
          fontWeight: 400, ...anim(0.7),
        }}>
          Aprenda a usar <strong style={{ color: "#d4ccc2" }}>Claude AI</strong> para automatizar memoriais,
          laudos, orçamentos, normas técnicas e cronogramas de obra.
          O método prático que profissionais AEC usam para <strong style={{ color: "#D4A853" }}>liberar 15+ horas por semana</strong>.
        </p>

        <div style={{ ...anim(0.9), marginTop: "36px", display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap" }}>
          <span onClick={() => document.getElementById("captura")?.scrollIntoView({ behavior: "smooth" })} style={{
            cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: "13px",
            letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700,
            color: "#0a0a08", background: "linear-gradient(135deg, #D4A853, #e8c36e)",
            padding: "17px 36px", borderRadius: "5px", display: "inline-block",
            transition: "all 0.3s", boxShadow: "0 4px 24px rgba(212,168,83,0.2)",
          }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(212,168,83,0.3)"; }}
          onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 24px rgba(212,168,83,0.2)"; }}
          >Baixar 50 Prompts Grátis</span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "#4a4540", fontWeight: 400 }}>
            ✓ 2.400+ profissionais já baixaram
          </span>
        </div>

        <div style={{ ...anim(1.2), marginTop: "52px", display: "flex", gap: "36px", flexWrap: "wrap" }}>
          {[
            { n: "2.400+", l: "profissionais AEC na comunidade" },
            { n: "15h/sem", l: "economizadas em média" },
            { n: "4.9★", l: "avaliação dos alunos" },
          ].map((s, i) => (
            <div key={i}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "26px", color: "#D4A853", fontWeight: 800 }}>{s.n}</span>
              <span style={{ display: "block", fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "1.5px", color: "#4a4540", textTransform: "uppercase", marginTop: "2px", fontWeight: 500 }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", opacity: ok ? 0.3 : 0, transition: "opacity 1.5s 1.8s" }}>
        <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom, transparent, #D4A853)", margin: "0 auto", animation: "fadeInOut 2.5s infinite" }} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
        @keyframes fadeInOut { 0%,100%{opacity:0.15}50%{opacity:0.5} }
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#0a0a08;overflow-x:hidden}
        ::selection{background:#D4A853;color:#0a0a08}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#0a0a08}
        ::-webkit-scrollbar-thumb{background:#2a2520;border-radius:3px}
      `}</style>
    </section>
  );
}

function WhoIsThisFor() {
  return (
    <section style={{ padding: "72px 40px 0", background: "#0d0d0b" }}>
      <Reveal>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { emoji: "📐", title: "Arquitetos", desc: "Memoriais, laudos, projetos, normas NBR e atendimento ao cliente" },
            { emoji: "🔧", title: "Engenheiros Civis", desc: "Orçamentos, cronogramas, análise estrutural, NRs e relatórios" },
            { emoji: "🏗", title: "Construtores & Técnicos", desc: "Planejamento de obra, diários, checklists e controle de qualidade" },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                background: "#111110", border: "1px solid #1c1b19", borderRadius: "12px",
                padding: "28px 24px", textAlign: "center", transition: "border-color 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#D4A853"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1c1b19"}
              >
                <span style={{ fontSize: "32px" }}>{item.emoji}</span>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "17px", fontWeight: 700, color: "#f0e6d6", margin: "12px 0 8px" }}>{item.title}</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "#6b6560", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function PainSection() {
  return (
    <section id="resultados" style={{ padding: "80px 40px 100px", background: "#0d0d0b" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: "#4a4540", fontWeight: 600 }}>O problema que resolve</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, color: "#f0e6d6", marginTop: "10px" }}>
            Seu tempo vale <span style={{ color: "#D4A853" }}>demais</span> para tarefas repetitivas
          </h2>
        </div>
      </Reveal>

      <div style={{ maxWidth: "780px", margin: "0 auto", display: "grid", gap: "10px" }}>
        {PAIN_POINTS.map((p, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div style={{
              display: "grid", gridTemplateColumns: "40px 1fr auto auto auto auto", alignItems: "center", gap: "14px",
              background: "#111110", border: "1px solid #1c1b19", borderRadius: "8px", padding: "16px 20px",
              transition: "border-color 0.3s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(212,168,83,0.25)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#1c1b19"}
            >
              <span style={{ fontSize: "22px", textAlign: "center" }}>{p.icon}</span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", color: "#b8b0a6", fontWeight: 500 }}>{p.task}</span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "9px", letterSpacing: "1px", color: "#4a4540", background: "#1a1918", padding: "3px 8px", borderRadius: "3px", textTransform: "uppercase", fontWeight: 600 }}>{p.who}</span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", color: "#ef4444", textDecoration: "line-through", opacity: 0.6 }}>{p.before}</span>
              <span style={{ color: "#2a2520" }}>→</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", color: "#4ade80", fontWeight: 700 }}>{p.after}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function StatsBar() {
  const [ref, vis] = useInView();
  return (
    <section ref={ref} style={{ padding: "64px 40px", background: "#0a0a08" }}>
      <div style={{ maxWidth: "880px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
        {STATS.map((s, i) => {
          const d = useCountUp(s.num, vis);
          return (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ textAlign: "center", padding: "24px 12px", background: "#0f0f0d", border: "1px solid #17160f", borderRadius: "10px" }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 3vw, 32px)", color: "#D4A853", fontWeight: 800, display: "block" }}>{d}</span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "#5a564e", lineHeight: 1.5, marginTop: "6px", display: "block" }}>{s.label}</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section id="metodo" style={{ padding: "100px 40px", background: "#0d0d0b" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: "#4a4540", fontWeight: 600 }}>Como funciona</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, color: "#f0e6d6", marginTop: "10px" }}>
            O método em <span style={{ color: "#D4A853" }}>3 passos</span>
          </h2>
        </div>
      </Reveal>
      <div style={{ maxWidth: "880px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {[
          { num: "01", title: "Aprenda os Prompts", desc: "Domine os prompts específicos para AEC brasileiro. Não é IA genérica — é Claude calibrado para quem projeta, orça e constrói.", icon: "🎯" },
          { num: "02", title: "Aplique no seu Dia a Dia", desc: "Integre Claude na rotina real: memoriais, laudos, orçamentos, cronogramas, análise de normas, propostas e atendimento.", icon: "⚡" },
          { num: "03", title: "Escale Resultados", desc: "Com 15+ horas livres por semana, atenda mais clientes, aumente honorários, ganhe licitações ou finalmente tenha qualidade de vida.", icon: "📈" },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <div style={{
              background: "#111110", border: "1px solid #1c1b19", borderRadius: "12px",
              padding: "32px 24px", height: "100%", transition: "all 0.4s", position: "relative", overflow: "hidden",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#D4A853"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1c1b19"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <span style={{ fontSize: "28px", display: "block", marginBottom: "14px" }}>{s.icon}</span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", letterSpacing: "3px", color: "#D4A853", fontWeight: 700 }}>{s.num}</span>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 700, color: "#f0e6d6", margin: "8px 0 10px" }}>{s.title}</h3>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", color: "#6b6560", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ContentSection() {
  return (
    <section style={{ padding: "80px 40px", background: "#0a0a08" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: "#4a4540", fontWeight: 600 }}>Conteúdo gratuito</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 700, color: "#f0e6d6", marginTop: "10px" }}>
            Já ensinando no <span style={{ color: "#D4A853" }}>Instagram</span>
          </h2>
        </div>
      </Reveal>
      <div style={{ maxWidth: "880px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {CONTENT_GRID.map((c, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div style={{
              background: "#111110", border: "1px solid #17160f", borderRadius: "8px",
              padding: "18px", cursor: "pointer", transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = c.color; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#17160f"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "9px", letterSpacing: "1.5px", color: c.color, fontWeight: 700, background: `${c.color}12`, padding: "2px 7px", borderRadius: "3px" }}>{c.type}</span>
              <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 600, color: "#c4bdb2", marginTop: "10px", lineHeight: 1.4 }}>{c.label}</h4>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "#3a3530", marginTop: "8px", display: "block" }}>{c.metric}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <a href="https://instagram.com/tuane.arq.ia" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "12px", letterSpacing: "1.5px",
            color: "#D4A853", textDecoration: "none", borderBottom: "1px solid rgba(212,168,83,0.25)", paddingBottom: "3px", fontWeight: 600,
          }}>SEGUIR @TUANE.ARQ.IA →</a>
        </div>
      </Reveal>
    </section>
  );
}

function LeadCapture() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [done, setDone] = useState(false);

  const inputStyle = {
    width: "100%", padding: "14px 16px", background: "#111110",
    border: "1px solid #2a2520", borderRadius: "5px", color: "#f0e6d6",
    fontFamily: "'Outfit', sans-serif", fontSize: "14px", outline: "none", transition: "border-color 0.3s",
  };

  if (done) return (
    <section id="captura" style={{ padding: "100px 40px", background: "linear-gradient(180deg, #110f08 0%, #0a0a08 100%)", textAlign: "center" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <span style={{ fontSize: "44px" }}>🎉</span>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", color: "#f0e6d6", margin: "14px 0", fontWeight: 700 }}>Kit enviado!</h2>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", color: "#6b6560", lineHeight: 1.7 }}>
          Confira seu e-mail (e o spam). Enquanto isso, me siga no Instagram para conteúdo diário gratuito.
        </p>
      </div>
    </section>
  );

  return (
    <section id="captura" style={{ padding: "100px 40px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #110f08 0%, #0a0a08 100%)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(212,168,83,0.05) 0%, transparent 70%)" }} />
      <Reveal>
        <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <span style={{
            display: "inline-block", fontFamily: "'Outfit', sans-serif", fontSize: "10px",
            letterSpacing: "2.5px", color: "#4ade80", textTransform: "uppercase", fontWeight: 600,
            background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.18)",
            padding: "5px 14px", borderRadius: "16px", marginBottom: "18px",
          }}>100% Gratuito · Sem cartão</span>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#f0e6d6", lineHeight: 1.15 }}>
            Kit de <span style={{ color: "#D4A853" }}>50 Prompts</span>
            <br />Claude para AEC
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", color: "#5a564e", margin: "14px 0 28px", lineHeight: 1.7 }}>
            Os mesmos prompts que uso diariamente. Memoriais, laudos, orçamentos, normas ABNT, cronogramas — organizados por área: ARQ · ENG · OBRA.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "380px", margin: "0 auto" }}>
            <input type="text" placeholder="Seu nome" value={nome} onChange={e => setNome(e.target.value)} style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#D4A853"} onBlur={e => e.target.style.borderColor = "#2a2520"} />
            <input type="email" placeholder="Seu melhor e-mail" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#D4A853"} onBlur={e => e.target.style.borderColor = "#2a2520"} />
            <div onClick={() => { if (nome && email) setDone(true); }} style={{
              cursor: "pointer", textAlign: "center", fontFamily: "'Outfit', sans-serif", fontSize: "13px",
              letterSpacing: "2px", fontWeight: 700, textTransform: "uppercase",
              color: "#0a0a08", background: "linear-gradient(135deg, #D4A853, #e8c36e)",
              padding: "15px", borderRadius: "5px", transition: "all 0.3s",
              boxShadow: "0 4px 20px rgba(212,168,83,0.18)",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 28px rgba(212,168,83,0.28)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 20px rgba(212,168,83,0.18)"; }}
            >Quero meus 50 prompts grátis</div>
          </div>

          <div style={{ marginTop: "16px", display: "flex", justifyContent: "center", gap: "18px" }}>
            {["Sem spam", "Cancele quando quiser", "Acesso imediato"].map((t, i) => (
              <span key={i} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "#3a3530", letterSpacing: "1px", fontWeight: 500 }}>✓ {t}</span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ProductsSection() {
  return (
    <section id="produtos" style={{ padding: "100px 40px", background: "#0d0d0b" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: "#4a4540", fontWeight: 600 }}>Produtos</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, color: "#f0e6d6", marginTop: "10px" }}>
            Escolha seu <span style={{ color: "#D4A853" }}>próximo passo</span>
          </h2>
        </div>
      </Reveal>

      <div style={{ maxWidth: "960px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", alignItems: "stretch" }}>
        {PRODUCTS.map((p, i) => {
          const isSolid = p.ctaStyle === "solid";
          return (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                background: isSolid ? "linear-gradient(180deg, #15120a 0%, #111110 100%)" : "#111110",
                border: `1px solid ${isSolid ? "#D4A853" : "#1c1b19"}`,
                borderRadius: "12px", padding: "28px 22px", display: "flex", flexDirection: "column", height: "100%",
                boxShadow: isSolid ? "0 0 36px rgba(212,168,83,0.06)" : "none",
              }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: "9px", letterSpacing: "2px", fontWeight: 700,
                  color: p.tagColor, background: p.tagBg, border: `1px solid ${p.tagBorder}`,
                  padding: "3px 10px", borderRadius: "3px", alignSelf: "flex-start", textTransform: "uppercase",
                }}>{p.tag}</span>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 700, color: "#f0e6d6", margin: "14px 0 3px" }}>{p.title}</h3>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "#4a4540", fontWeight: 500 }}>{p.subtitle}</span>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "32px", fontWeight: 800, color: "#D4A853", margin: "18px 0" }}>{p.price}</div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "#6b6560", lineHeight: 1.6, marginBottom: "16px" }}>{p.desc}</p>
                <div style={{ flex: 1 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "#7a7268", padding: "5px 0", display: "flex", gap: "7px" }}>
                      <span style={{ color: "#4ade80", fontSize: "10px", marginTop: "2px" }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <div onClick={() => document.getElementById("captura")?.scrollIntoView({ behavior: "smooth" })} style={{
                  marginTop: "20px", textAlign: "center", cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif", fontSize: "11px", letterSpacing: "1.5px", fontWeight: 700, textTransform: "uppercase",
                  color: isSolid ? "#0a0a08" : "#D4A853",
                  background: isSolid ? "linear-gradient(135deg, #D4A853, #e8c36e)" : "transparent",
                  border: isSolid ? "none" : "1px solid rgba(212,168,83,0.25)",
                  padding: "13px", borderRadius: "5px", transition: "all 0.3s",
                }}
                onMouseEnter={e => e.target.style.transform = "translateY(-1px)"}
                onMouseLeave={e => e.target.style.transform = "translateY(0)"}
                >{p.cta}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [a, setA] = useState(0);
  useEffect(() => { const t = setInterval(() => setA(x => (x + 1) % TESTIMONIALS.length), 5500); return () => clearInterval(t); }, []);

  return (
    <section id="depoimentos" style={{ padding: "100px 40px", background: "#0a0a08" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: "#4a4540", fontWeight: 600 }}>Depoimentos</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 700, color: "#f0e6d6", marginTop: "10px" }}>
            Quem <span style={{ color: "#D4A853" }}>aplica</span> comprova
          </h2>
        </div>
      </Reveal>
      <div style={{ maxWidth: "640px", margin: "0 auto", minHeight: "200px", position: "relative" }}>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} style={{
            position: i === a ? "relative" : "absolute", top: 0, left: 0, right: 0,
            opacity: i === a ? 1 : 0, transform: i === a ? "scale(1)" : "scale(0.96)",
            transition: "all 0.5s ease", pointerEvents: i === a ? "auto" : "none",
            background: "#111110", border: "1px solid #1c1b19", borderRadius: "12px", padding: "28px",
          }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "14px" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: "linear-gradient(135deg, #D4A853, #8B6914)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 700, color: "#fff",
              }}>{t.avatar}</div>
              <div>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 600, color: "#f0e6d6", display: "block" }}>{t.name}</span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "#4a4540" }}>{t.city}</span>
              </div>
              <div style={{ marginLeft: "auto", color: "#D4A853", fontSize: "11px", letterSpacing: "2px" }}>★★★★★</div>
            </div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontStyle: "italic", color: "#b8b0a6", lineHeight: 1.7 }}>"{t.text}"</p>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "18px" }}>
          {TESTIMONIALS.map((_, i) => (
            <div key={i} onClick={() => setA(i)} style={{
              width: i === a ? "24px" : "7px", height: "3px", borderRadius: "2px",
              background: i === a ? "#D4A853" : "#2a2520", cursor: "pointer", transition: "all 0.3s",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ padding: "80px 40px", background: "#0d0d0b" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 700, color: "#f0e6d6" }}>
            Perguntas <span style={{ color: "#D4A853" }}>frequentes</span>
          </h2>
        </div>
      </Reveal>
      <div style={{ maxWidth: "660px", margin: "0 auto" }}>
        {FAQ.map((f, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div style={{ borderBottom: "1px solid #17160f" }}>
              <div onClick={() => setOpen(open === i ? null : i)} style={{
                padding: "18px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px",
              }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: 500, color: open === i ? "#D4A853" : "#b8b0a6", transition: "color 0.3s" }}>{f.q}</span>
                <span style={{ color: "#D4A853", fontSize: "16px", transition: "transform 0.3s", transform: open === i ? "rotate(45deg)" : "rotate(0)", flexShrink: 0 }}>+</span>
              </div>
              <div style={{ maxHeight: open === i ? "280px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", color: "#6b6560", lineHeight: 1.7, paddingBottom: "18px" }}>{f.a}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{ padding: "72px 40px", background: "#0a0a08", textAlign: "center", borderTop: "1px solid #14130f" }}>
      <Reveal>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 700, color: "#f0e6d6" }}>
          O mercado não vai esperar.
          <br /><span style={{ color: "#D4A853" }}>E a sua concorrência também não.</span>
        </h2>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", color: "#4a4540", margin: "16px auto 24px", maxWidth: "460px", lineHeight: 1.7 }}>
          Apenas 27% dos profissionais AEC usam IA. Quem dominar agora, lidera. Comece hoje com o kit gratuito.
        </p>
        <span onClick={() => document.getElementById("captura")?.scrollIntoView({ behavior: "smooth" })} style={{
          cursor: "pointer", display: "inline-block",
          fontFamily: "'Outfit', sans-serif", fontSize: "13px", letterSpacing: "2px", fontWeight: 700, textTransform: "uppercase",
          color: "#0a0a08", background: "linear-gradient(135deg, #D4A853, #e8c36e)",
          padding: "17px 44px", borderRadius: "5px", transition: "all 0.3s",
          boxShadow: "0 4px 24px rgba(212,168,83,0.18)",
        }}
        onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(212,168,83,0.28)"; }}
        onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 24px rgba(212,168,83,0.18)"; }}
        >Baixar 50 Prompts Grátis</span>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "36px 40px", background: "#070706", borderTop: "1px solid #0f0e0c" }}>
      <div style={{ maxWidth: "880px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Logo size={24} />
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "12px", fontWeight: 700, color: "#1e1d1b", letterSpacing: "1px" }}>TUANE SIPP</span>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          {["Instagram", "YouTube", "LinkedIn"].map((s, i) => (
            <span key={i} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "1px", color: "#1e1d1b", cursor: "pointer", transition: "color 0.3s", textTransform: "uppercase", fontWeight: 600 }}
            onMouseEnter={e => e.target.style.color = "#D4A853"} onMouseLeave={e => e.target.style.color = "#1e1d1b"}
            >{s}</span>
          ))}
        </div>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "#14130f" }}>© 2026</span>
      </div>
    </footer>
  );
}

function WhatsAppFAB() {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 2500); }, []);
  return (
    <div onClick={() => window.open("https://wa.me/5547999990000?text=Oi Tuane! Vi o site e quero saber mais sobre Claude para AEC.", "_blank")} style={{
      position: "fixed", bottom: "22px", right: "22px", width: "50px", height: "50px",
      background: "#25d366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", zIndex: 999, boxShadow: "0 4px 16px rgba(37,211,102,0.25)",
      opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.5)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
    }}
    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function TuaneSippAEC() {
  return (
    <div style={{ background: "#0a0a08", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <WhoIsThisFor />
      <PainSection />
      <StatsBar />
      <MethodSection />
      <ContentSection />
      <LeadCapture />
      <ProductsSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
