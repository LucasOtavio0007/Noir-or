<template>
  <main class="sobre">

    <!-- FUNDO -->
    <div class="bg" aria-hidden="true">
      <div class="bg__kamon bg__kamon--1">黒</div>
      <div class="bg__kamon bg__kamon--2">金</div>
      <div class="bg__grid"></div>
      <div class="bg__beam bg__beam--1"></div>
      <div class="bg__beam bg__beam--2"></div>
      <div class="bg__grain"></div>
    </div>

    <!-- CANTOS -->
    <div class="corner corner--tl" aria-hidden="true"></div>
    <div class="corner corner--tr" aria-hidden="true"></div>
    <div class="corner corner--bl" aria-hidden="true"></div>
    <div class="corner corner--br" aria-hidden="true"></div>

    <!-- ══ HERO ══ -->
    <section class="hero">
      <div class="wrap">
        <div class="hero__meta">
          <span class="mono">Depuis 2021 · Sabará, MG</span>
          <span class="hero__meta-line" aria-hidden="true"></span>
          <span class="mono">黄金</span>
        </div>
        <h1 class="hero__titulo">
          <span class="hero__sup">O Atelier</span>
          <em class="hero__em">Noir &amp; Or.</em>
        </h1>
        <p class="hero__sub">◆ Onde a tecnologia encontra a perenidade</p>
      </div>
    </section>

    <!-- ══ STATS — FAIXA ══ -->
    <div class="stats-bar">
      <div class="stats-bar__inner">
        <div v-for="s in stats" :key="s.num" class="stat">
          <span class="stat__num">{{ s.num }}</span>
          <span class="stat__label">{{ s.label }}</span>
        </div>
      </div>
    </div>

    <!-- ══ FILOSOFIA + FUNDADORES em grid ══ -->
    <section class="body-grid wrap reveal">

      <!-- Filosofia -->
      <div class="col-filosofia">
        <div class="sec-hd">
          <span class="gem" aria-hidden="true">◆</span>
          <span class="eyebrow">Nossa Filosofia</span>
        </div>
        <h2 class="sec-titulo">Tecnologia que <em>transcende</em></h2>
        <p class="body-text">Criamos objetos que unem o melhor da engenharia moderna com a alma da joalheria tradicional. Cada peça é projetada para durar gerações, desafiar o tempo e contar uma história de exclusividade.</p>
        <p class="body-text">A verdadeira sofisticação está nos detalhes invisíveis — acabamentos perfeitos, materiais nobres, uma experiência que começa antes do unboxing.</p>
        <div class="selos">
          <span class="mono small">◆ Certificação de autenticidade</span>
          <span class="mono small">◆ Número de série único</span>
        </div>
      </div>

      <!-- Divisor vertical -->
      <div class="col-divider" aria-hidden="true">
        <div class="vdivider"></div>
        <div class="vdivider__char">美</div>
        <div class="vdivider"></div>
      </div>

      <!-- Fundadores -->
      <div class="col-fundadores">
        <div class="sec-hd">
          <span class="gem" aria-hidden="true">◆</span>
          <span class="eyebrow">Os Visionários</span>
        </div>
        <h2 class="sec-titulo">A dupla por trás do <em>Noir &amp; Or</em></h2>
        <div class="founders">
          <div v-for="f in founders" :key="f.nome" class="founder-card">
            <div class="founder-card__top">
              <div class="founder-card__initial">{{ f.inicial }}</div>
              <div>
                <h3 class="founder-card__nome">{{ f.nome }}</h3>
                <span class="mono small founder-card__cargo">{{ f.cargo }}</span>
              </div>
            </div>
            <blockquote class="founder-card__quote">"{{ f.quote }}"</blockquote>
            <div class="founder-card__tags">
              <span v-for="t in f.tags" :key="t" class="tag">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- ══ DIVISOR ══ -->
    <div class="divider-or" aria-hidden="true">
      <div class="dor__line"></div>
      <div class="dor__char">道</div>
      <div class="dor__line dor__line--r"></div>
    </div>

    <!-- ══ PROCESSO — linha horizontal ══ -->
    <section class="processo reveal">
      <div class="wrap">
        <div class="sec-hd">
          <span class="gem" aria-hidden="true">◆</span>
          <span class="eyebrow">Como Criamos</span>
          <div class="sec-hd__line" aria-hidden="true"></div>
        </div>
        <div class="processo__grid">
          <div v-for="(p, i) in processo" :key="i" class="passo">
            <div class="passo__kanji" aria-hidden="true">{{ p.kanji }}</div>
            <span class="passo__n mono">{{ String(i+1).padStart(2,'0') }}</span>
            <h3 class="passo__titulo">{{ p.titulo }}</h3>
            <p class="passo__desc">{{ p.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ DIVISOR ══ -->
    <div class="divider-or" aria-hidden="true">
      <div class="dor__line"></div>
      <div class="dor__char">術</div>
      <div class="dor__line dor__line--r"></div>
    </div>

    <!-- ══ MATERIAIS ══ -->
    <section class="materiais reveal">
      <div class="wrap">
        <div class="sec-hd">
          <span class="gem" aria-hidden="true">◆</span>
          <span class="eyebrow">Materiais &amp; Tecnologia</span>
          <div class="sec-hd__line" aria-hidden="true"></div>
        </div>
        <div class="mat__grid">
          <div v-for="t in tech" :key="t.titulo" class="mat__card">
            <div class="mat__kanji" aria-hidden="true">{{ t.kanji }}</div>
            <div class="mat__icon" v-html="t.icon" aria-hidden="true"></div>
            <h3 class="mat__titulo">{{ t.titulo }}</h3>
            <p class="mat__desc">{{ t.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ FAQ ══ -->
    <section class="faq reveal">
      <div class="wrap">
        <div class="faq__inner">
          <div class="sec-hd">
            <span class="gem" aria-hidden="true">◆</span>
            <span class="eyebrow">Perguntas &amp; Respostas</span>
          </div>
          <div class="faq__lista">
            <div
              v-for="(f, i) in faq" :key="i"
              class="faq__item"
              :class="{ active: faqAberto === i }"
              @click="faqAberto = faqAberto === i ? null : i"
              role="button" tabindex="0"
              :aria-expanded="faqAberto === i"
              @keyup.enter="faqAberto = faqAberto === i ? null : i">
              <div class="faq__pergunta">
                <span class="gem faq__gem" :class="{ lit: faqAberto === i }" aria-hidden="true">◆</span>
                <span>{{ f.q }}</span>
                <span class="faq__chevron" :class="{ open: faqAberto === i }" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              </div>
              <transition name="faq-slide">
                <p v-if="faqAberto === i" class="faq__resp">{{ f.a }}</p>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ CTA FINAL ══ -->
    <section class="cta reveal">
      <div class="wrap cta__inner">
        <div class="cta__orb" aria-hidden="true"></div>
        <span class="mono small" style="color:var(--gold);opacity:.5;letter-spacing:5px;">◆ NOIR &amp; OR ◆</span>
        <h2 class="cta__titulo">Descubra nossa <em>coleção</em></h2>
        <div class="cta__btns">
          <router-link to="/loja" class="btn-gold">Explorar Loja</router-link>
          <router-link to="/contato" class="btn-ghost">Falar com Consultor</router-link>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const stats = [
  { num: '2.400+', label: 'Peças entregues' },
  { num: '98%',    label: 'Satisfação' },
  { num: '5',      label: 'Anos de excelência' },
  { num: '40+',    label: 'Produtos no catálogo' },
]

const founders = [
  {
    nome: 'Lucas Souza', inicial: 'L', cargo: 'Fundador & CEO',
    quote: 'Recusei a mediocridade desde o primeiro dia. Cada peça carrega uma obsessão: ser impossível de ignorar.',
    tags: ['Visão Criativa', 'Curadoria', 'Estratégia'],
  },
  {
    nome: 'Luis', inicial: 'L', cargo: 'Co-Fundador & Operações',
    quote: 'A beleza de um objeto está na sua perfeição estrutural. Cada milímetro precisa justificar esse status.',
    tags: ['Engenharia', 'Qualidade', 'Produção'],
  },
]

const processo = [
  { kanji: '想', titulo: 'Design & Concepção', desc: 'Curadoria minuciosa de materiais e tendências.' },
  { kanji: '選', titulo: 'Seleção de Materiais', desc: 'Ouro 24k, titânio aeroespacial, rastreabilidade total.' },
  { kanji: '工', titulo: 'Manufatura Joalheira', desc: 'Corte, polimento e revestimento feitos à mão.' },
  { kanji: '証', titulo: 'Certificação', desc: 'Número gravado a laser + certificado de autenticidade.' },
]

const tech = [
  {
    titulo: 'Ouro 24k', kanji: '金',
    desc: 'Galvanoplastia de alta densidade com certificação internacional.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.8)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>',
  },
  {
    titulo: 'Titânio G5', kanji: '鋼',
    desc: 'Liga aeroespacial usada em foguetes e implantes médicos.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.8)" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  },
  {
    titulo: 'Vidro Cerâmico', kanji: '陶',
    desc: 'Superfície ultra-resistente a riscos. Transparência cristalina.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.8)" stroke-width="1.5"><polygon points="12 2 22 7 22 17 12 22 2 17 2 7 12 2"/></svg>',
  },
]

const faq = [
  { q: 'Qual o prazo de produção?',           a: 'Cada peça é feita sob encomenda. Prazo médio de 15 a 30 dias úteis.' },
  { q: 'A garantia é vitalícia?',             a: 'Sim. Cobrimos defeitos de fabricação e desgaste do revestimento enquanto você for o proprietário original.' },
  { q: 'Posso personalizar meu dispositivo?', a: 'Sim — gravação de iniciais, escolha de banho (ouro, ródio, platina) e design exclusivo.' },
  { q: 'Como funciona o atendimento?',        a: 'Cada cliente tem um consultor pessoal disponível 24/7 por WhatsApp e e-mail.' },
]

const faqAberto = ref(null)

let observer = null
onMounted(() => {
  observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target) } }),
    { threshold: 0.07 }
  )
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
onUnmounted(() => { if (observer) observer.disconnect() })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Syne:wght@400;600;700&family=DM+Mono:wght@300;400&display=swap');

/* TOKENS */
.sobre {
  --gold:  #C8A84B;
  --gold2: #F5D78E;
  --deep:  #09090f;
  --surf:  #0d0d14;
  --text:  rgba(237,232,224,.92);
  --text2: rgba(237,232,224,.50);
  --text3: rgba(237,232,224,.24);
  --hair:  rgba(237,232,224,.07);
  --hairH: rgba(200,168,75,.35);
  --ease:  cubic-bezier(.16,1,.30,1);

  background: var(--deep);
  color: var(--text);
  font-family: 'Syne', sans-serif;
  padding-top: var(--navbar-h, 88px);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* KEYFRAMES */
@keyframes kanjiPulse { 0%,100%{opacity:.025} 50%{opacity:.055} }
@keyframes beamSway   { from{transform:skewX(-4deg) translateX(-15px)} to{transform:skewX(4deg) translateX(15px)} }
@keyframes goldShine  { from{background-position:0% center} to{background-position:200% center} }
@keyframes heroIn     { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes orbPulse   { 0%,100%{opacity:.06;transform:scale(1)} 50%{opacity:.12;transform:scale(1.08)} }
@keyframes lineExpand { to{width:120px} }

/* FUNDO */
.bg { position:fixed; inset:0; z-index:0; pointer-events:none; background:var(--deep); }
.bg__kamon {
  position:absolute; font-family:'Noto Serif JP','Yu Mincho',serif;
  font-weight:300; color:var(--gold); pointer-events:none; user-select:none; line-height:1;
  animation:kanjiPulse 10s ease-in-out infinite;
}
.bg__kamon--1 { font-size:clamp(180px,26vw,340px); bottom:-60px; right:-40px; opacity:.022; }
.bg__kamon--2 { font-size:clamp(100px,15vw,190px); top:40px; left:-30px; opacity:.016; animation-delay:-5s; }
.bg__grid {
  position:absolute; inset:0;
  background-image: linear-gradient(rgba(237,232,224,.014) 1px,transparent 1px),linear-gradient(90deg,rgba(237,232,224,.014) 1px,transparent 1px);
  background-size:64px 64px;
  mask-image:radial-gradient(ellipse 100% 70% at 50% 25%, black 10%, transparent 100%);
}
.bg__beam {
  position:absolute; top:-20%; width:1px; height:140%;
  background:linear-gradient(to bottom,transparent,rgba(200,168,75,.1),transparent);
  filter:blur(3px); animation:beamSway 14s ease-in-out infinite alternate;
}
.bg__beam--1 { left:18%; }
.bg__beam--2 { left:72%; opacity:.4; animation-delay:-6s; animation-direction:alternate-reverse; }
.bg__grain {
  position:absolute; inset:0; opacity:.014;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
}

/* CANTOS */
.corner {
  position:fixed; z-index:3; width:18px; height:18px;
  border-color:rgba(200,168,75,.1); border-style:solid; pointer-events:none;
  transition:border-color .4s;
}
.corner--tl { top:16px; left:16px;  border-width:1px 0 0 1px; }
.corner--tr { top:16px; right:16px; border-width:1px 1px 0 0; }
.corner--bl { bottom:16px; left:16px;  border-width:0 0 1px 1px; }
.corner--br { bottom:16px; right:16px; border-width:0 1px 1px 0; }

/* WRAP */
.wrap { max-width:1320px; margin:0 auto; padding:0 72px; position:relative; z-index:2; }

/* UTILITIES */
.eyebrow {
  font-size:8.5px; letter-spacing:7px; font-weight:700; text-transform:uppercase;
  background:linear-gradient(135deg,var(--gold),var(--gold2));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}
.mono { font-family:'DM Mono',monospace; }
.small { font-size:8.5px; letter-spacing:2px; text-transform:uppercase; }
.gem { font-size:5px; color:var(--gold); opacity:.45; flex-shrink:0; }
.sec-hd { display:flex; align-items:center; gap:12px; margin-bottom:22px; }
.sec-hd__line { flex:1; height:.5px; background:linear-gradient(to right,rgba(200,168,75,.2),transparent); }
.sec-titulo { font-family:'Cormorant Garamond',serif; font-size:clamp(1.8rem,3vw,2.8rem); font-weight:300; color:var(--text); margin:0 0 20px; line-height:1.1; }
.sec-titulo em { font-style:italic; color:var(--gold); }
.body-text { font-size:13px; color:var(--text2); line-height:1.9; margin-bottom:12px; }

/* REVEAL */
.reveal { opacity:0; transform:translateY(24px); transition:opacity .65s var(--ease),transform .65s var(--ease); }
.reveal.revealed { opacity:1; transform:translateY(0); }

/* ══ HERO ══ */
.hero {
  position:relative; z-index:2; padding:96px 0 80px;
  border-bottom:.5px solid var(--hair);
  animation:heroIn .8s cubic-bezier(.22,1,.36,1) both;
}
.hero__meta {
  display:flex; align-items:center; gap:14px; margin-bottom:28px;
  color:var(--text3); font-size:8px; letter-spacing:3px; text-transform:uppercase;
}
.hero__meta-line { flex:0 0 40px; height:.5px; background:linear-gradient(to right,transparent,rgba(200,168,75,.3)); }
.hero__titulo { font-family:'Cormorant Garamond',serif; line-height:.92; margin-bottom:20px; }
.hero__sup {
  display:block; font-family:'Syne',sans-serif; font-size:clamp(1.1rem,2vw,1.8rem);
  font-weight:600; color:var(--text2); letter-spacing:10px; text-transform:uppercase; margin-bottom:6px;
}
.hero__em {
  display:block; font-style:italic; font-size:clamp(4rem,9vw,9rem); font-weight:300;
  background:linear-gradient(135deg,#E8E0C8 0%,#D4AF37 40%,#F5E6A3 70%,#C8A84B 100%);
  background-size:200% auto; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  animation:goldShine 6s linear infinite; line-height:.95;
}
.hero__sub { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:3px; color:var(--text3); text-transform:uppercase; }

/* ══ STATS BAR ══ */
.stats-bar {
  position:relative; z-index:2;
  border-top:.5px solid var(--hair); border-bottom:.5px solid var(--hair);
  background:rgba(200,168,75,.02);
}
.stats-bar__inner {
  max-width:1320px; margin:0 auto; padding:0 72px;
  display:grid; grid-template-columns:repeat(4,1fr);
  border-left:.5px solid var(--hair);
}
.stat {
  padding:36px 24px; border-right:.5px solid var(--hair);
  display:flex; flex-direction:column; align-items:center; text-align:center;
  transition:background .3s;
}
.stat:hover { background:rgba(200,168,75,.03); }
.stat__num {
  font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,3vw,3rem);
  font-weight:300; background:linear-gradient(135deg,#B8960C,#F0D060,#D4AF37);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  line-height:1; margin-bottom:6px;
}
.stat__label { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:2.5px; text-transform:uppercase; color:var(--text3); }

/* ══ BODY GRID: filosofia | divider | fundadores ══ */
.body-grid {
  display:grid; grid-template-columns:1fr 40px 1fr; gap:0;
  padding-top:80px; padding-bottom:80px;
  border-bottom:.5px solid var(--hair);
}
.col-filosofia { padding-right:48px; }
.col-divider { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:0 8px; }
.vdivider { flex:1; width:.5px; background:linear-gradient(to bottom,transparent,rgba(200,168,75,.18),transparent); }
.vdivider__char {
  font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-style:italic;
  color:var(--gold); opacity:.35; padding:12px 0; flex-shrink:0;
}
.col-fundadores { padding-left:48px; }
.selos { display:flex; flex-direction:column; gap:8px; margin-top:20px; padding-top:16px; border-top:.5px solid var(--hair); }
.selos .small { color:var(--gold); opacity:.55; }

/* FOUNDER CARDS */
.founders { display:flex; flex-direction:column; gap:20px; }
.founder-card {
  padding:24px 28px; background:var(--surf); border:.5px solid var(--hair);
  position:relative; overflow:hidden; transition:border-color .3s;
}
.founder-card::before {
  content:''; position:absolute; top:0; left:0; width:0; height:.5px;
  background:linear-gradient(to right,var(--gold),transparent);
  transition:width .6s var(--ease);
}
.founder-card:hover { border-color:var(--hairH); }
.founder-card:hover::before { width:100%; }
.founder-card__top { display:flex; align-items:center; gap:16px; margin-bottom:14px; }
.founder-card__initial {
  width:40px; height:40px; border-radius:50%; flex-shrink:0;
  background:linear-gradient(135deg,var(--gold),var(--gold2));
  display:flex; align-items:center; justify-content:center;
  font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-style:italic; color:#09090f;
}
.founder-card__nome { font-family:'Cormorant Garamond',serif; font-size:1.35rem; font-weight:300; color:var(--text); margin:0 0 2px; }
.founder-card__cargo { color:var(--gold); opacity:.6; }
.founder-card__quote {
  font-family:'Cormorant Garamond',serif; font-style:italic; font-size:1rem;
  color:var(--text2); line-height:1.7; margin:0 0 14px;
}
.founder-card__tags { display:flex; flex-wrap:wrap; gap:6px; }
.tag {
  font-family:'DM Mono',monospace; font-size:7px; letter-spacing:2px;
  text-transform:uppercase; color:var(--text3); padding:4px 10px;
  border:.5px solid var(--hair); transition:all .2s;
}
.founder-card:hover .tag { border-color:rgba(200,168,75,.15); color:var(--gold); opacity:.8; }

/* ══ DIVISOR ══ */
.divider-or {
  position:relative; z-index:2; display:flex; align-items:center; justify-content:center;
  padding:32px 0; background:var(--deep);
  border-top:.5px solid var(--hair); border-bottom:.5px solid var(--hair);
}
.dor__line { flex:1; max-width:120px; height:.5px; background:linear-gradient(to right,transparent,rgba(200,168,75,.18)); }
.dor__line--r { background:linear-gradient(to left,transparent,rgba(200,168,75,.18)); }
.dor__char {
  width:40px; height:40px; border-radius:50%; border:.5px solid rgba(200,168,75,.18);
  display:flex; align-items:center; justify-content:center;
  font-family:'Cormorant Garamond',serif; font-size:1rem; font-style:italic;
  color:var(--gold); opacity:.45; margin:0 18px;
}

/* ══ PROCESSO ══ */
.processo { padding:72px 0; border-bottom:.5px solid var(--hair); position:relative; z-index:2; }
.processo__grid {
  display:grid; grid-template-columns:repeat(4,1fr);
  border-left:.5px solid var(--hair); border-top:.5px solid var(--hair);
}
.passo {
  padding:32px 24px; border-right:.5px solid var(--hair); border-bottom:.5px solid var(--hair);
  position:relative; overflow:hidden; transition:background .3s;
}
.passo:hover { background:rgba(200,168,75,.025); }
.passo__kanji {
  position:absolute; right:8px; top:4px;
  font-family:'Cormorant Garamond',serif; font-size:2.5rem; font-style:italic;
  color:var(--gold); opacity:.05; pointer-events:none;
  animation:kanjiPulse 8s ease-in-out infinite; transition:opacity .3s;
}
.passo:hover .passo__kanji { opacity:.14; }
.passo__n { font-family:'Cormorant Garamond',serif; font-size:1.8rem; color:rgba(200,168,75,.12); display:block; margin-bottom:10px; }
.passo__titulo { font-family:'DM Mono',monospace; font-size:8px; letter-spacing:2.5px; text-transform:uppercase; color:var(--text); margin-bottom:8px; }
.passo__desc { font-size:12px; color:var(--text3); line-height:1.75; }

/* ══ MATERIAIS ══ */
.materiais { padding:72px 0; border-bottom:.5px solid var(--hair); position:relative; z-index:2; }
.mat__grid {
  display:grid; grid-template-columns:repeat(3,1fr);
  border-left:.5px solid var(--hair); border-top:.5px solid var(--hair);
}
.mat__card {
  padding:40px 32px; border-right:.5px solid var(--hair); border-bottom:.5px solid var(--hair);
  position:relative; overflow:hidden; text-align:center; transition:background .3s;
}
.mat__card:hover { background:rgba(200,168,75,.02); }
.mat__kanji {
  position:absolute; right:8px; top:4px;
  font-family:'Cormorant Garamond',serif; font-size:2.8rem; font-style:italic;
  color:var(--gold); opacity:.05; pointer-events:none;
  animation:kanjiPulse 9s ease-in-out infinite; transition:opacity .3s;
}
.mat__card:hover .mat__kanji { opacity:.14; }
.mat__icon { margin-bottom:16px; opacity:.7; transition:opacity .3s,transform .35s var(--ease); }
.mat__card:hover .mat__icon { opacity:1; transform:scale(1.08); }
.mat__titulo { font-family:'DM Mono',monospace; font-size:8px; letter-spacing:3px; text-transform:uppercase; color:var(--text); margin-bottom:10px; }
.mat__desc { font-size:12px; color:var(--text3); line-height:1.8; }

/* ══ FAQ ══ */
.faq { padding:72px 0; border-bottom:.5px solid var(--hair); position:relative; z-index:2; }
.faq__inner { max-width:720px; }
.faq__lista { margin-top:0; }
.faq__item {
  border-bottom:.5px solid var(--hair); cursor:pointer; outline:none;
  transition:border-color .2s;
}
.faq__item:first-child { border-top:.5px solid var(--hair); }
.faq__item.active { border-color:rgba(200,168,75,.2); }
.faq__item:focus-visible { box-shadow:0 0 0 2px rgba(200,168,75,.3); }
.faq__pergunta {
  display:flex; align-items:center; gap:12px; padding:17px 0;
  font-size:13px; color:var(--text2); transition:color .2s;
}
.faq__item:hover .faq__pergunta,
.faq__item.active .faq__pergunta { color:var(--text); }
.faq__gem { opacity:.25; transition:opacity .2s; }
.faq__gem.lit { opacity:1; }
.faq__item:hover .faq__gem { opacity:.55; }
.faq__chevron {
  margin-left:auto; flex-shrink:0; width:24px; height:24px;
  border:.5px solid var(--hair); display:flex; align-items:center; justify-content:center;
  color:var(--text3); transition:all .25s;
}
.faq__chevron.open { transform:rotate(180deg); border-color:rgba(200,168,75,.25); color:var(--gold); background:rgba(200,168,75,.05); }
.faq__resp {
  font-size:12.5px; color:var(--text3); line-height:1.85;
  padding:0 0 16px 18px; border-left:.5px solid rgba(200,168,75,.2); margin-left:2px;
}
.faq-slide-enter-active,.faq-slide-leave-active { transition:opacity .22s,max-height .3s var(--ease); max-height:180px; overflow:hidden; }
.faq-slide-enter-from,.faq-slide-leave-to { opacity:0; max-height:0; }

/* ══ CTA ══ */
.cta { padding:96px 0; text-align:center; position:relative; z-index:2; }
.cta__inner { display:flex; flex-direction:column; align-items:center; gap:16px; position:relative; }
.cta__orb {
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
  width:280px; height:280px; border-radius:50%;
  background:radial-gradient(circle,rgba(200,168,75,.07) 0%,transparent 75%);
  animation:orbPulse 7s ease-in-out infinite; pointer-events:none; z-index:0;
}
.cta__titulo {
  font-family:'Cormorant Garamond',serif; font-size:clamp(2.5rem,5vw,5rem);
  font-weight:300; color:var(--text); line-height:.95; margin:8px 0 24px; position:relative; z-index:1;
}
.cta__titulo em { font-style:italic; color:var(--gold); }
.cta__btns { display:flex; gap:14px; flex-wrap:wrap; justify-content:center; position:relative; z-index:1; }
.btn-gold {
  display:inline-flex; align-items:center; gap:8px; padding:13px 32px;
  font-family:'DM Mono',monospace; font-size:8px; letter-spacing:3.5px; text-transform:uppercase;
  background:linear-gradient(135deg,#BF953F 0%,#FCF6BA 40%,#B38728 70%,#FBF5B7 100%);
  background-size:200% auto; color:#09090f; text-decoration:none;
  transition:background-position .5s,transform .3s,box-shadow .3s;
}
.btn-gold:hover { background-position:right center; transform:translateY(-2px); box-shadow:0 0 28px rgba(200,168,75,.28); }
.btn-ghost {
  display:inline-flex; align-items:center; gap:8px; padding:13px 32px;
  font-family:'DM Mono',monospace; font-size:8px; letter-spacing:3.5px; text-transform:uppercase;
  border:.5px solid var(--hairH); color:var(--gold); text-decoration:none; transition:all .3s;
}
.btn-ghost:hover { background:rgba(200,168,75,.07); transform:translateY(-2px); }

/* ══ RESPONSIVO ══ */
@media (max-width:1024px) {
  .wrap,.stats-bar__inner { padding:0 40px; }
  .body-grid { grid-template-columns:1fr; gap:48px; padding:60px 40px; }
  .col-divider { display:none; }
  .col-filosofia { padding-right:0; }
  .col-fundadores { padding-left:0; }
  .processo__grid { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:768px) {
  .wrap,.stats-bar__inner { padding:0 24px; }
  .hero { padding:72px 0 60px; }
  .stats-bar__inner { grid-template-columns:1fr 1fr; }
  .mat__grid { grid-template-columns:1fr; }
  .processo__grid { grid-template-columns:1fr 1fr; }
  .body-grid { padding:48px 24px; }
  .corner { display:none; }
}
@media (max-width:480px) {
  .stats-bar__inner { grid-template-columns:1fr; }
  .processo__grid { grid-template-columns:1fr; }
  .cta__btns { flex-direction:column; align-items:center; }
}
@media (prefers-reduced-motion:reduce) {
  .bg__beam,.bg__kamon,.passo__kanji,.mat__kanji,.cta__orb { animation:none!important; }
  .hero__em { animation:none!important; }
}
</style>