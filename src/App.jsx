import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   CONFIGURAÇÕES — edite aqui para alterar links, telefone e preços
   ═══════════════════════════════════════════════════════════════ */
const WHATSAPP_NUM = "5554996969595";
const WHATSAPP_MSG = "Ola%21%20Vim%20pelo%20site%20suaobracomia%20e%20quero%20saber%20mais.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`;
const KIT_DOWNLOAD = "https://drive.google.com/uc?export=download&id=1R7vtBISZ5yRjiWGPJcp_7A85haUY2i1r";
const INSTAGRAM_LINK = "https://instagram.com/suaobracomia";
const EMAIL = "contato@suaobracomia.com.br";

/* ═══════════════════════════════════════════════════════════════
   DADOS — edite aqui para mudar conteúdo do site
   ═══════════════════════════════════════════════════════════════ */
const PAIN_POINTS = [
  { icon: "📐", before: "8 horas", after: "45 min", task: "Memorial Descritivo completo" },
  { icon: "📋", before: "2 dias", after: "20 min", task: "Análise de normas ABNT aplicáveis" },
  { icon: "💰", before: "1 dia", after: "30 min", task: "Orçamento estimativo detalhado" },
  { icon: "📄", before: "5 horas", after: "15 min", task: "Laudo técnico de vistoria" },
];

const STATS = [
  { num: 87, suffix: "%", label: "dos profissionais AEC acreditam que IA vai transformar o setor" },
  { num: 27, suffix: "%", label: "já usam IA no dia a dia — quem dominar agora lidera o mercado" },
  { num: 4.4, suffix: "%", label: "engajamento de construção no Instagram — o maior de todas as áreas" },
  { num: 40.9, suffix: "%", label: "crescimento anual da IA generativa em arquitetura" },
];

const METHOD = [
  { step: "01", title: "Aprenda os prompts certos", desc: "Acesse a biblioteca de prompts testados em projetos reais de arquitetura, engenharia e construção." },
  { step: "02", title: "Aplique no seu escritório", desc: "Substitua tarefas repetitivas por automação inteligente. Memoriais, laudos, orçamentos e atendimento." },
  { step: "03", title: "Escale seus resultados", desc: "Atenda mais projetos com a mesma equipe, entregue mais rápido e cobre o que vale o seu trabalho." },
];

const PRODUCTS = [
  {
    tag: "GRATUITO",
    tagColor: "#4ade80",
    title: "Kit de 50 Prompts",
    subtitle: "Para Arquitetos, Engenheiros e Construtores",
    price: "R$ 0",
    priceNote: "download imediato",
    desc: "Os 50 prompts mais poderosos para memoriais, laudos, orçamentos, normas ABNT e atendimento ao cliente.",
    features: [
      "50 prompts prontos para copiar e usar",
      "Organizados em 5 categorias profissionais",
      "Guia rápido de como usar o Claude",
      "Atualizações futuras sem custo",
    ],
    cta: "BAIXAR AGORA",
    ctaLink: KIT_DOWNLOAD,
    isDownload: true,
    highlight: false,
  },
  {
    tag: "MAIS VENDIDO",
    tagColor: "#C8A96E",
    title: "Claude do Zero para AEC",
    subtitle: "Mini-curso completo em vídeo",
    price: "R$ 147",
    priceNote: "à vista ou 12x R$ 14,57",
    desc: "Aprenda a usar Claude para resolver os problemas reais do seu escritório. Do cadastro ao prompt avançado, com exercícios práticos.",
    features: [
      "12 aulas práticas em vídeo HD",
      "Exercícios com projetos reais",
      "Templates de prompts avançados",
      "Certificado de conclusão",
      "Suporte por 60 dias",
    ],
    cta: "GARANTIR MINHA VAGA",
    ctaLink: WHATSAPP_LINK,
    isDownload: false,
    highlight: true,
  },
  {
    tag: "PREMIUM",
    tagColor: "#a78bfa",
    title: "Programa AEC com IA",
    subtitle: "Mentoria em grupo · 8 semanas",
    price: "R$ 1.997",
    priceNote: "ou 12x R$ 197,90",
    desc: "Transforme seu escritório com IA. Programa intensivo com aulas ao vivo, comunidade exclusiva e acompanhamento personalizado.",
    features: [
      "8 semanas de aulas ao vivo",
      "Comunidade VIP no WhatsApp",
      "Mentoria individual quinzenal",
      "Templates avançados desbloqueados",
      "Acesso vitalício às gravações",
    ],
    cta: "QUERO ME CANDIDATAR",
    ctaLink: WHATSAPP_LINK,
    isDownload: false,
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    name: "Rafael M.",
    role: "Arquiteto · São Paulo/SP",
    text: "Reduzi o tempo de memorial descritivo de 1 dia para 40 minutos. Em 3 meses, dobrei o número de projetos atendidos sem contratar ninguém.",
  },
  {
    name: "Camila S.",
    role: "Engenheira Civil · Curitiba/PR",
    text: "Os prompts de análise de normas mudaram meu fluxo de trabalho. Hoje entrego pareceres técnicos no mesmo dia que recebo a demanda.",
  },
  {
    name: "Diego A.",
    role: "Construtor · Balneário Camboriú/SC",
    text: "Implementei IA na gestão de obra e cortei 30% do tempo gasto em planilhas e relatórios para clientes. ROI no primeiro mês.",
  },
];

const FAQ = [
  {
    q: "Preciso saber programar para usar Claude?",
    a: "Não. Claude funciona em linguagem natural — você escreve em português comum, como se estivesse pedindo ajuda a um colega. O método ensina exatamente como conversar com a IA para obter o resultado profissional que você precisa.",
  },
  {
    q: "Claude entende ABNT, NBR e regulamentações brasileiras?",
    a: "Sim. Claude tem amplo conhecimento das normas brasileiras de construção (NBR 15575, NBR 6118, NBR 9050, entre outras) e é capaz de aplicá-las em laudos, memoriais e análises técnicas. Os prompts do kit já vêm calibrados para o contexto brasileiro.",
  },
  {
    q: "E se a IA errar em algum cálculo ou interpretação técnica?",
    a: "A IA é uma ferramenta de aceleração, não substituição. Toda saída precisa ser revisada pelo profissional habilitado — o que ainda assim economiza 80% do tempo. O método ensina os pontos críticos onde a verificação humana é obrigatória.",
  },
  {
    q: "Quanto custa usar Claude no dia a dia?",
    a: "Claude tem versão gratuita que já resolve a maior parte das tarefas. A versão Pro custa cerca de US$ 20/mês (R$ 100 aprox.) e libera uso ilimitado. Para escritórios, o ROI aparece na primeira semana.",
  },
  {
    q: "O Kit de 50 Prompts é mesmo gratuito?",
    a: "Sim, 100% gratuito. Você baixa o PDF imediatamente e tem acesso vitalício. É a forma da suaobracomia mostrar valor real antes de qualquer venda.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   HOOKS DE ANIMAÇÃO
   ═══════════════════════════════════════════════════════════════ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useCounter(target, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const startTime = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENTES
   ═══════════════════════════════════════════════════════════════ */
function Logo({ size = 36 }) {
  return (
    <svg viewBox="0 0 380 80" height={size} style={{ display: "block" }}>
      <defs>
        <linearGradient id="lg-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D89A" />
          <stop offset="50%" stopColor="#C8A96E" />
          <stop offset="100%" stopColor="#8a7549" />
        </linearGradient>
        <linearGradient id="lg-gold-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D89A" />
          <stop offset="100%" stopColor="#C8A96E" />
        </linearGradient>
      </defs>
      <g transform="translate(8, 10)">
        <path d="M30 4 L52 16 L52 44 L30 56 L8 44 L8 16 Z" fill="none" stroke="url(#lg-gold)" strokeWidth="2.4" strokeLinejoin="round" />
        <line x1="8" y1="30" x2="52" y2="30" stroke="#C8A96E" strokeWidth="0.6" opacity="0.35" />
        <line x1="30" y1="4" x2="30" y2="56" stroke="#C8A96E" strokeWidth="0.6" opacity="0.35" />
        <path d="M22 20 L37 20 Q41 20 41 24 Q41 28 37 28 L25 30 Q20 30 20 35 Q20 40 25 40 L40 40" fill="none" stroke="url(#lg-gold-light)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="52" cy="16" r="3" fill="#00E5FF">
          <animate attributeName="opacity" values="1;0.4;1" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="52" cy="16" r="5.5" fill="none" stroke="#00E5FF" strokeWidth="0.7" opacity="0.5">
          <animate attributeName="r" values="5;9;5" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>
      <g transform="translate(78, 0)">
        <text x="0" y="40" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="26" fill="#E5C896" letterSpacing="-0.5">
          sua<tspan fill="#F5D89A">obra</tspan><tspan fill="#00E5FF">com</tspan><tspan fill="#F5D89A">ia</tspan>
        </text>
        <text x="2" y="58" fontFamily="Inter, system-ui, sans-serif" fontWeight="500" fontSize="8" fill="#8a8580" letterSpacing="2.2">
          ARQUITETURA · ENGENHARIA · CONSTRUÇÃO · IA
        </text>
      </g>
    </svg>
  );
}

function ParticleHero() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, raf;
    const particles = [];
    const N = 55;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    const init = () => {
      particles.length = 0;
      for (let i = 0; i < N; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.5 + 0.5,
        });
      }
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            const op = (1 - d / 130) * 0.18;
            ctx.strokeStyle = `rgba(200, 169, 110, ${op})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.fillStyle = p.r > 1.4 ? "rgba(0, 229, 255, 0.6)" : "rgba(229, 200, 150, 0.45)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    resize();
    init();
    draw();
    window.addEventListener("resize", () => { resize(); init(); });
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

function StatCard({ stat }) {
  const [ref, visible] = useReveal();
  const val = useCounter(stat.num, 1800, visible);
  const display = stat.num % 1 === 0 ? Math.round(val) : val.toFixed(1);
  return (
    <div ref={ref} className={`reveal ${visible ? "in" : ""}`} style={{ background: "linear-gradient(180deg, #14141c 0%, #0e0e16 100%)", border: "1px solid rgba(200,169,110,0.18)", borderRadius: 14, padding: "32px 26px", textAlign: "center" }}>
      <div style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 800, background: "linear-gradient(135deg, #F5D89A 0%, #C8A96E 50%, #8a7549 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-1.5px", lineHeight: 1 }}>
        {display}{stat.suffix}
      </div>
      <p style={{ marginTop: 14, color: "#a8a39a", fontSize: 14, lineHeight: 1.5 }}>{stat.label}</p>
    </div>
  );
}

function PainCard({ p, i }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`card card-glow reveal ${visible ? "in" : ""}`} style={{ padding: 28, transitionDelay: `${i * 80}ms` }}>
      <div style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</div>
      <div style={{ color: "#F5F1E8", fontSize: 15, fontWeight: 600, marginBottom: 20, lineHeight: 1.4 }}>{p.task}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13 }}>
        <div>
          <div style={{ color: "#5a5650", fontSize: 11, letterSpacing: 1 }}>SEM IA</div>
          <div style={{ color: "#8a8580", fontWeight: 600, textDecoration: "line-through" }}>{p.before}</div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        <div>
          <div style={{ color: "#00E5FF", fontSize: 11, letterSpacing: 1 }}>COM IA</div>
          <div style={{ color: "#F5D89A", fontWeight: 700 }}>{p.after}</div>
        </div>
      </div>
    </div>
  );
}

function MethodCard({ m, i }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`card reveal ${visible ? "in" : ""}`} style={{ padding: "36px 30px", transitionDelay: `${i * 100}ms` }}>
      <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 56, fontWeight: 700, background: "linear-gradient(135deg, #C8A96E 0%, #8a7549 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, marginBottom: 16 }}>{m.step}</div>
      <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: "#F5F1E8" }}>{m.title}</h3>
      <p style={{ color: "#a8a39a", lineHeight: 1.6, fontSize: 15 }}>{m.desc}</p>
    </div>
  );
}

function ProductCard({ p, i }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`card card-glow reveal ${visible ? "in" : ""}`} style={{ padding: "36px 30px 30px", transitionDelay: `${i * 100}ms`, transform: p.highlight ? "scale(1.03)" : "none", borderColor: p.highlight ? "rgba(200,169,110,0.5)" : undefined, boxShadow: p.highlight ? "0 0 40px rgba(200,169,110,0.15)" : undefined }}>
      <div style={{ display: "inline-block", padding: "5px 12px", background: `${p.tagColor}20`, border: `1px solid ${p.tagColor}50`, borderRadius: 4, color: p.tagColor, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, marginBottom: 18 }}>
        {p.tag}
      </div>
      <h3 style={{ fontSize: 24, fontWeight: 700, color: "#F5F1E8", marginBottom: 6 }}>{p.title}</h3>
      <p style={{ color: "#8a8580", fontSize: 14, marginBottom: 22 }}>{p.subtitle}</p>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 38, fontWeight: 800, color: "#F5D89A", letterSpacing: -1 }}>{p.price}</span>
      </div>
      <p style={{ color: "#5a5650", fontSize: 12, marginBottom: 22 }}>{p.priceNote}</p>
      <p style={{ color: "#a8a39a", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>{p.desc}</p>
      <ul style={{ listStyle: "none", marginBottom: 28 }}>
        {p.features.map((f, j) => (
          <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", color: "#a8a39a", fontSize: 14, borderBottom: "1px solid rgba(200,169,110,0.08)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="3" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
            {f}
          </li>
        ))}
      </ul>
      <a
        href={p.ctaLink}
        target="_blank"
        rel="noopener noreferrer"
        {...(p.isDownload ? { download: "kit-50-prompts-suaobracomia.pdf" } : {})}
        className={p.highlight ? "btn-primary" : "btn-secondary"}
        style={{ width: "100%", justifyContent: "center" }}
      >
        <span>{p.cta}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  );
}

function TestimonialCard({ t, i }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`card reveal ${visible ? "in" : ""}`} style={{ padding: 32, transitionDelay: `${i * 100}ms` }}>
      <div style={{ color: "#C8A96E", fontSize: 28, marginBottom: 14, lineHeight: 1 }}>"</div>
      <p style={{ color: "#F5F1E8", fontSize: 15, lineHeight: 1.65, marginBottom: 22, fontStyle: "italic" }}>{t.text}</p>
      <div style={{ borderTop: "1px solid rgba(200,169,110,0.15)", paddingTop: 16 }}>
        <div style={{ color: "#F5D89A", fontWeight: 700, fontSize: 14 }}>{t.name}</div>
        <div style={{ color: "#8a8580", fontSize: 12, marginTop: 2 }}>{t.role}</div>
      </div>
    </div>
  );
}

function DisciplineWord({ word, delay, accent, isLast }) {
  const [ref, visible] = useReveal();
  return (
    <>
      <div
        ref={ref}
        className={`reveal ${visible ? "in" : ""}`}
        style={{
          transitionDelay: `${delay}ms`,
          fontFamily: "'Space Grotesk', Inter, sans-serif",
          fontSize: "clamp(2.4rem, 7vw, 5.2rem)",
          fontWeight: 800,
          letterSpacing: accent ? "0" : "-2px",
          lineHeight: 1,
          background: accent
            ? "linear-gradient(135deg, #00E5FF 0%, #00B8D4 100%)"
            : "linear-gradient(135deg, #F5D89A 0%, #C8A96E 50%, #8a7549 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: accent ? "0 0 40px rgba(0,229,255,0.3)" : "0 0 40px rgba(200,169,110,0.15)",
        }}
      >
        {word}
      </div>
      {!isLast && (
        <div
          className={`reveal ${visible ? "in" : ""}`}
          style={{
            transitionDelay: `${delay + 50}ms`,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "rgba(200,169,110,0.5)",
            flexShrink: 0,
            display: "block",
          }}
        />
      )}
    </>
  );
}

function FaqItem({ item, idx }) {
  const [open, setOpen] = useState(false);
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "in" : ""}`} style={{ borderBottom: "1px solid rgba(200,169,110,0.15)", transitionDelay: `${idx * 60}ms` }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "22px 0", background: "transparent", border: 0, color: "#F5F1E8", fontSize: 17, fontWeight: 600, textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "inherit" }}>
        <span style={{ paddingRight: 16 }}>{item.q}</span>
        <span style={{ color: "#C8A96E", fontSize: 24, fontWeight: 300, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0)" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 400 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <p style={{ color: "#a8a39a", padding: "0 0 22px", lineHeight: 1.65, fontSize: 15 }}>{item.a}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP PRINCIPAL
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#0a0a0f", color: "#F5F1E8", minHeight: "100vh", fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0f; -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(200,169,110,0.4); color: #fff; }
        h1, h2, h3 { font-family: 'Space Grotesk', Inter, sans-serif; letter-spacing: -1px; }
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.in { opacity: 1; transform: translateY(0); }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .btn-primary { display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; background: linear-gradient(135deg, #C8A96E 0%, #8a7549 100%); color: #0a0a0f; border: 0; border-radius: 8px; font-weight: 700; font-size: 15px; letter-spacing: 0.3px; cursor: pointer; text-decoration: none; transition: all 0.3s; box-shadow: 0 0 0 1px rgba(245,216,154,0.3), 0 8px 24px rgba(200,169,110,0.25); position: relative; overflow: hidden; }
        .btn-primary::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, #F5D89A 0%, #C8A96E 100%); opacity: 0; transition: opacity 0.3s; }
        .btn-primary:hover::before { opacity: 1; }
        .btn-primary span, .btn-primary svg { position: relative; z-index: 1; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 0 1px rgba(245,216,154,0.5), 0 12px 32px rgba(200,169,110,0.4), 0 0 24px rgba(0,229,255,0.15); }
        .btn-secondary { display: inline-flex; align-items: center; gap: 10px; padding: 15px 30px; background: transparent; color: #F5F1E8; border: 1px solid rgba(200,169,110,0.4); border-radius: 8px; font-weight: 600; font-size: 14px; letter-spacing: 0.3px; cursor: pointer; text-decoration: none; transition: all 0.3s; }
        .btn-secondary:hover { border-color: #C8A96E; background: rgba(200,169,110,0.08); }
        .card { background: linear-gradient(180deg, #14141c 0%, #0e0e16 100%); border: 1px solid rgba(200,169,110,0.18); border-radius: 16px; transition: all 0.4s; position: relative; overflow: hidden; }
        .card:hover { border-color: rgba(200,169,110,0.4); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .card-glow::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 50%); opacity: 0; transition: opacity 0.5s; pointer-events: none; }
        .card-glow:hover::before { opacity: 1; }
        @keyframes pulse-ring { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74,222,128,0.6); } 70% { transform: scale(1); box-shadow: 0 0 0 18px rgba(74,222,128,0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74,222,128,0); } }
        .wa-float { animation: pulse-ring 2.4s infinite; }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .gold-shimmer { background: linear-gradient(90deg, #C8A96E 0%, #F5D89A 50%, #C8A96E 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 4s linear infinite; }
        .grid-bg { background-image: linear-gradient(rgba(200,169,110,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.05) 1px, transparent 1px); background-size: 60px 60px; }
        @media (max-width: 768px) {
          .hero-title { font-size: 2.4rem !important; }
          .section-title { font-size: 2rem !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

      {/* ─────────── HEADER ─────────── */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(10,10,15,0.85)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(200,169,110,0.15)" : "1px solid transparent", transition: "all 0.3s" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 80 }}>
          <a href="#top" style={{ textDecoration: "none" }}><Logo size={56} /></a>
          <nav className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <a href="#metodo" style={{ color: "#a8a39a", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#F5D89A"} onMouseLeave={e => e.currentTarget.style.color = "#a8a39a"}>Método</a>
            <a href="#produtos" style={{ color: "#a8a39a", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#F5D89A"} onMouseLeave={e => e.currentTarget.style.color = "#a8a39a"}>Produtos</a>
            <a href="#sobre" style={{ color: "#a8a39a", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#F5D89A"} onMouseLeave={e => e.currentTarget.style.color = "#a8a39a"}>Sobre</a>
            <a href="#faq" style={{ color: "#a8a39a", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#F5D89A"} onMouseLeave={e => e.currentTarget.style.color = "#a8a39a"}>FAQ</a>
            <a href={KIT_DOWNLOAD} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }}>
              <span>BAIXAR KIT GRÁTIS</span>
            </a>
          </nav>
        </div>
      </header>

      {/* ─────────── HERO ─────────── */}
      <section id="top" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 80 }}>
        <ParticleHero />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(200,169,110,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(0,229,255,0.04) 0%, transparent 50%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 2, padding: "80px 24px" }}>
          <p style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)", color: "#c8c2b6", maxWidth: 560, lineHeight: 1.5, fontWeight: 400, marginBottom: 28 }}>
            A primeira plataforma brasileira de IA aplicada a <strong style={{ color: "#F5D89A", fontWeight: 600 }}>Arquitetura</strong>, <strong style={{ color: "#F5D89A", fontWeight: 600 }}>Engenharia</strong> e <strong style={{ color: "#F5D89A", fontWeight: 600 }}>Construção</strong>.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "rgba(200,169,110,0.1)", border: "1px solid rgba(200,169,110,0.3)", borderRadius: 999, fontSize: 12, fontWeight: 600, letterSpacing: 1, color: "#F5D89A", marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, background: "#00E5FF", borderRadius: "50%", boxShadow: "0 0 8px #00E5FF" }} />
            REFERÊNCIA EM IA PARA AEC NO BRASIL
          </div>
          <h1 className="hero-title" style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)", fontWeight: 800, lineHeight: 1.05, marginBottom: 28, maxWidth: 900 }}>
            Faça em <span className="gold-shimmer">1 hora</span> o que antes<br />
            levava <span style={{ textDecoration: "line-through", color: "#5a5650", textDecorationColor: "#C8A96E" }}>1 semana</span>.
          </h1>
          <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: "#a8a39a", maxWidth: 720, lineHeight: 1.55, marginBottom: 40 }}>
            A primeira plataforma brasileira que ensina <strong style={{ color: "#F5D89A" }}>arquitetos, engenheiros e construtores</strong> a usar as IA's mais poderosas do mundo para projetar, calcular e gerenciar obras com a velocidade do futuro.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <a href={KIT_DOWNLOAD} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <span>BAIXAR 50 PROMPTS GRÁTIS</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#produtos" className="btn-secondary">
              <span>VER PRODUTOS</span>
            </a>
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 56, flexWrap: "wrap" }}>
            {[
              { num: "2.400+", label: "profissionais na comunidade" },
              { num: "150h+", label: "economizadas/mês por escritório" },
              { num: "5★", label: "avaliação dos alunos" },
            ].map((s, i) => (
              <div key={i} style={{ borderLeft: "2px solid rgba(200,169,110,0.4)", paddingLeft: 18 }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#F5D89A" }}>{s.num}</div>
                <div style={{ fontSize: 12, color: "#8a8580", marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── DISCIPLINES BANNER ─────────── */}
      <section style={{ position: "relative", padding: "80px 0", borderTop: "1px solid rgba(200,169,110,0.12)", borderBottom: "1px solid rgba(200,169,110,0.12)", background: "linear-gradient(180deg, #08080c 0%, #0a0a0f 50%, #08080c 100%)", overflow: "hidden" }}>
        {/* Subtle blueprint grid bg */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />
        {/* Glow accent */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%", height: 200, background: "radial-gradient(ellipse, rgba(200,169,110,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative" }}>
          <div className="disciplines-row" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "clamp(20px, 4vw, 60px)" }}>
            {[
              { word: "ARQUITETURA", delay: 0 },
              { word: "ENGENHARIA", delay: 100 },
              { word: "CONSTRUÇÃO", delay: 200 },
              { word: "IA", delay: 300, accent: true },
            ].map((d, i, arr) => (
              <DisciplineWord key={i} word={d.word} delay={d.delay} accent={d.accent} isLast={i === arr.length - 1} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32, fontSize: 13, fontWeight: 500, letterSpacing: 4, color: "#5a5650", textTransform: "uppercase" }}>
            o quarteto que define o futuro do seu escritório
          </div>
        </div>
      </section>

      {/* ─────────── PAIN POINTS ─────────── */}
      <section style={{ padding: "120px 0", position: "relative", borderTop: "1px solid rgba(200,169,110,0.1)" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 64, maxWidth: 700, margin: "0 auto 64px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#C8A96E", marginBottom: 16 }}>O PROBLEMA</div>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, marginBottom: 20 }}>
              Você ainda gasta <span style={{ color: "#F5D89A" }}>dias</span> no que IA resolve em <span style={{ color: "#00E5FF" }}>minutos</span>.
            </h2>
            <p style={{ color: "#a8a39a", fontSize: 17, lineHeight: 1.6 }}>O ciclo se repete: orçar, redigir memorial, conferir norma, redigir laudo, redigir mais um memorial. A IA muda esse jogo.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            {PAIN_POINTS.map((p, i) => <PainCard key={i} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ─────────── STATS ─────────── */}
      <section style={{ padding: "100px 0", background: "linear-gradient(180deg, transparent 0%, rgba(200,169,110,0.03) 50%, transparent 100%)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#C8A96E", marginBottom: 16 }}>O MERCADO</div>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, maxWidth: 700, margin: "0 auto" }}>
              A revolução já começou. <span className="gold-shimmer">Quem chegar primeiro, lidera.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
            {STATS.map((s, i) => <StatCard key={i} stat={s} />)}
          </div>
        </div>
      </section>

      {/* ─────────── METHOD ─────────── */}
      <section id="metodo" style={{ padding: "120px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#C8A96E", marginBottom: 16 }}>O MÉTODO</div>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800 }}>
              Em <span style={{ color: "#F5D89A" }}>3 passos</span>, você está produzindo com IA.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {METHOD.map((m, i) => <MethodCard key={i} m={m} i={i} />)}
          </div>
        </div>
      </section>

      {/* ─────────── PRODUCTS ─────────── */}
      <section id="produtos" style={{ padding: "120px 0", background: "linear-gradient(180deg, transparent 0%, rgba(200,169,110,0.03) 100%)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#C8A96E", marginBottom: 16 }}>NOSSOS PRODUTOS</div>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, maxWidth: 720, margin: "0 auto" }}>
              Comece <span style={{ color: "#4ade80" }}>grátis</span>. Avance no <span className="gold-shimmer">seu ritmo</span>.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 22 }}>
            {PRODUCTS.map((p, i) => <ProductCard key={i} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ─────────── TESTIMONIALS ─────────── */}
      <section style={{ padding: "120px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#C8A96E", marginBottom: 16 }}>RESULTADOS REAIS</div>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800 }}>
              Quem aplicou, <span className="gold-shimmer">colheu</span>.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
            {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} t={t} i={i} />)}
          </div>
        </div>
      </section>

      {/* ─────────── ABOUT (Tuane como mentora) ─────────── */}
      <section id="sobre" style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#C8A96E", marginBottom: 16 }}>POR TRÁS DA MARCA</div>
              <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, marginBottom: 28 }}>
                A <span style={{ color: "#F5D89A" }}>suaobracomia</span> nasceu para dar à AEC brasileira a vantagem que ela merece.
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28 }}>
                <div>
                  <p style={{ color: "#a8a39a", fontSize: 16, lineHeight: 1.7, marginBottom: 16 }}>
                    Enquanto outros mercados aceleram com inteligência artificial, arquitetura, engenharia e construção ainda dependem do mesmo trabalho manual de 30 anos atrás. <strong style={{ color: "#F5F1E8" }}>Memoriais redigidos do zero. Laudos demorados. Orçamentos repetitivos.</strong>
                  </p>
                  <p style={{ color: "#a8a39a", fontSize: 16, lineHeight: 1.7 }}>
                    A suaobracomia existe para mudar isso. Traduzimos o que há de mais avançado em IA — Claude, da Anthropic — para a linguagem e os problemas reais do escritório brasileiro de AEC.
                  </p>
                </div>
                <div style={{ background: "linear-gradient(180deg, #14141c 0%, #0e0e16 100%)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: 14, padding: 28 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#00E5FF", marginBottom: 14 }}>REFERÊNCIA TÉCNICA</div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: "#F5F1E8" }}>Tuane Sipp</h3>
                  <p style={{ color: "#C8A96E", fontSize: 13, fontWeight: 500, marginBottom: 16, letterSpacing: 0.3 }}>Arquiteta · Mentora-chefe da suaobracomia</p>
                  <p style={{ color: "#a8a39a", fontSize: 14, lineHeight: 1.65 }}>
                    Pioneira no uso de Claude para o setor AEC no Brasil. Atua diretamente com escritórios de arquitetura e engenharia transformando processos manuais em fluxos de trabalho assistidos por IA — sem perder o rigor técnico exigido pela ABNT.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── FAQ ─────────── */}
      <section id="faq" style={{ padding: "120px 0", background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#C8A96E", marginBottom: 16 }}>DÚVIDAS FREQUENTES</div>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800 }}>
              Antes de você perguntar.
            </h2>
          </div>
          <div>
            {FAQ.map((item, i) => <FaqItem key={i} item={item} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ─────────── FINAL CTA ─────────── */}
      <section style={{ padding: "140px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(200,169,110,0.12) 0%, transparent 60%)" }} />
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div className="container" style={{ position: "relative", textAlign: "center", maxWidth: 820 }}>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.05, marginBottom: 24, letterSpacing: -1 }}>
            O mercado <span className="gold-shimmer">não vai esperar</span>.<br />A sua concorrência também não.
          </h2>
          <p style={{ color: "#a8a39a", fontSize: 18, lineHeight: 1.6, marginBottom: 40, maxWidth: 620, margin: "0 auto 40px" }}>
            Comece hoje, de graça. Baixe os 50 prompts e dê o primeiro passo para um escritório que produz com a velocidade do futuro.
          </p>
          <a href={KIT_DOWNLOAD} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "20px 40px", fontSize: 16 }}>
            <span>BAIXAR 50 PROMPTS GRÁTIS</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <p style={{ color: "#5a5650", fontSize: 13, marginTop: 24 }}>Sem cadastro · Sem cartão · Download direto em PDF</p>
        </div>
      </section>

      {/* ─────────── FOOTER ─────────── */}
      <footer style={{ padding: "60px 0 40px", borderTop: "1px solid rgba(200,169,110,0.15)", background: "#08080c" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, marginBottom: 40 }}>
            <div>
              <Logo size={44} />
              <p style={{ color: "#8a8580", fontSize: 13, lineHeight: 1.6, marginTop: 16, maxWidth: 280 }}>
                A primeira plataforma brasileira de IA aplicada a Arquitetura, Engenharia e Construção.
              </p>
            </div>
            <div>
              <div style={{ color: "#F5D89A", fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>NAVEGUE</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                <li><a href="#metodo" style={{ color: "#a8a39a", fontSize: 14, textDecoration: "none" }}>Método</a></li>
                <li><a href="#produtos" style={{ color: "#a8a39a", fontSize: 14, textDecoration: "none" }}>Produtos</a></li>
                <li><a href="#sobre" style={{ color: "#a8a39a", fontSize: 14, textDecoration: "none" }}>Sobre</a></li>
                <li><a href="#faq" style={{ color: "#a8a39a", fontSize: 14, textDecoration: "none" }}>FAQ</a></li>
              </ul>
            </div>
            <div>
              <div style={{ color: "#F5D89A", fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>CONTATO</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                <li><a href={`mailto:${EMAIL}`} style={{ color: "#a8a39a", fontSize: 14, textDecoration: "none" }}>{EMAIL}</a></li>
                <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ color: "#a8a39a", fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#4ade80"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/></svg>
                  WhatsApp
                </a></li>
                <li><a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" style={{ color: "#a8a39a", fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  @suaobracomia
                </a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(200,169,110,0.1)", paddingTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16, fontSize: 12, color: "#5a5650" }}>
            <div>© {new Date().getFullYear()} suaobracomia · Todos os direitos reservados</div>
            <div>Feito com IA, para quem constrói o Brasil.</div>
          </div>
        </div>
      </footer>

      {/* ─────────── FLOATING WHATSAPP ─────────── */}
      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Falar no WhatsApp" style={{ position: "fixed", bottom: 24, right: 24, width: 60, height: 60, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(37,211,102,0.4)", zIndex: 99, textDecoration: "none" }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/></svg>
      </a>
    </div>
  );
}
