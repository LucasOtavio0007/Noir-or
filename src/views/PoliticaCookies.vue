<template>
  <div class="policy-page">

    <!-- ══ HERO BANNER ══ -->
    <div class="policy-hero">
      <div class="policy-hero-glow"></div>
      <div class="policy-hero-kamon" aria-hidden="true">跡</div>
      <div class="policy-hero-content">
        <div class="breadcrumb">
          <router-link to="/">Início</router-link>
          <span class="sep">·</span>
          <span class="current">Política de Cookies</span>
        </div>
        <div class="hero-eyebrow"><span class="hero-eyebrow__dot"></span><span>COOKIES · NOIR &amp; OR</span></div>
        <h1>Transparência<br/><em>na Navegação</em></h1>
        <p class="hero-sub">Entenda exatamente quais dados de navegação coletamos, por quê e como você controla cada um deles.</p>
        <div class="hero-stats">
          <div class="hero-stat"><span class="hero-stat__num">5</span><span class="hero-stat__label">Tipos de cookie</span></div>
          <div class="hero-stat-sep"></div>
          <div class="hero-stat"><span class="hero-stat__num">2</span><span class="hero-stat__label">Opcionais (opt-in)</span></div>
          <div class="hero-stat-sep"></div>
          <div class="hero-stat"><span class="hero-stat__num">100%</span><span class="hero-stat__label">Controle do usuário</span></div>
        </div>
      </div>
    </div>

    <div class="policy-container">
      <div class="policy-content">

        <!-- ══ O QUE SÃO COOKIES ══ -->
        <div class="intro-grid">
          <div class="intro-card" v-for="(card, i) in introCards" :key="i">
            <div class="intro-card__ico" v-html="card.icone"></div>
            <h4>{{ card.titulo }}</h4>
            <p>{{ card.desc }}</p>
          </div>
        </div>

        <!-- ══ VIGÊNCIA ══ -->
        <div class="vigencia-banner">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Última atualização: <strong>01 de junho de 2025</strong> · Versão 2.1</span>
        </div>

        <!-- ══ PAINEL DE CONSENTIMENTO ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">選</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Suas Preferências</h2>
        <p class="section-sub">Escolha quais categorias de cookies você aceita. Os essenciais não podem ser desativados — são necessários para o funcionamento básico do site.</p>

        <div class="consent-painel">
          <div class="consent-item" v-for="cat in categorias" :key="cat.id">
            <div class="consent-item__left">
              <div class="consent-item__ico" v-html="cat.icone"></div>
              <div class="consent-item__info">
                <div class="consent-item__titulo">
                  {{ cat.label }}
                  <span v-if="cat.essencial" class="consent-badge">Essencial</span>
                </div>
                <p class="consent-item__desc">{{ cat.desc }}</p>
              </div>
            </div>
            <div class="consent-item__right">
              <button
                :class="['consent-toggle', { 'is-on': preferencias[cat.id], 'is-disabled': cat.essencial }]"
                @click="!cat.essencial && togglePreferencia(cat.id)"
                :aria-label="`${preferencias[cat.id] ? 'Desativar' : 'Ativar'} cookies ${cat.label}`"
                :disabled="cat.essencial"
              >
                <span class="consent-toggle__track"></span>
                <span class="consent-toggle__thumb"></span>
              </button>
            </div>
          </div>

          <div class="consent-acoes">
            <button class="btn-ghost-policy" @click="recusarOpcionais">Recusar opcionais</button>
            <button class="btn-ghost-policy btn-ghost-policy--mid" @click="aceitarTodos">Aceitar todos</button>
            <button class="cf-submit" @click="salvarPreferencias" :disabled="salvando">
              <span v-if="!salvando">Salvar preferências</span>
              <span v-else class="cf-spin"></span>
            </button>
          </div>

          <transition name="msg-fade">
            <div v-if="preferenciasSalvas" class="consent-sucesso">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Preferências salvas com sucesso. Suas escolhas são respeitadas imediatamente.
            </div>
          </transition>
        </div>

        <!-- ══ TABELA DETALHADA ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">表</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Detalhamento dos Cookies</h2>
        <p class="section-sub">Lista completa de cookies utilizados, com finalidade, provedor e duração.</p>

        <div class="cookies-tabs">
          <button
            v-for="cat in categorias"
            :key="cat.id"
            :class="['cookie-tab', { 'is-active': tabAtiva === cat.id }]"
            @click="tabAtiva = cat.id"
          >
            <span class="cookie-tab__ico" v-html="cat.icone"></span>
            {{ cat.label }}
            <span class="cookie-tab__count">{{ cookiesPorCategoria[cat.id]?.length || 0 }}</span>
          </button>
        </div>

        <div class="cookies-detail-table">
          <div class="cdt-header">
            <span>Nome</span>
            <span>Provedor</span>
            <span>Finalidade</span>
            <span>Duração</span>
          </div>
          <transition-group name="fade-list" tag="div">
            <div class="cdt-row" v-for="ck in cookiesPorCategoria[tabAtiva]" :key="ck.nome">
              <span class="cdt-nome">{{ ck.nome }}</span>
              <span class="cdt-provedor">{{ ck.provedor }}</span>
              <span class="cdt-finalidade">{{ ck.finalidade }}</span>
              <span class="cdt-duracao">{{ ck.duracao }}</span>
            </div>
          </transition-group>
        </div>

        <!-- ══ TERCEIROS ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">外</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Cookies de Terceiros</h2>
        <p class="section-sub">Alguns cookies são definidos por parceiros externos para fornecer funcionalidades integradas. Cada parceiro tem sua própria política de privacidade.</p>

        <div class="terceiros-grid">
          <a
            v-for="t in terceiros"
            :key="t.nome"
            :href="t.link"
            target="_blank"
            rel="noopener noreferrer"
            class="terceiro-card"
          >
            <div class="terceiro-card__info">
              <span class="terceiro-card__nome">{{ t.nome }}</span>
              <span class="terceiro-card__tipo">{{ t.tipo }}</span>
              <p class="terceiro-card__desc">{{ t.desc }}</p>
            </div>
            <div class="terceiro-card__arr">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </div>
          </a>
        </div>

        <!-- ══ COMO GERENCIAR ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">管</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Como Gerenciar pelo Navegador</h2>
        <p class="section-sub">Além do painel acima, você pode gerenciar ou bloquear cookies diretamente nas configurações do seu navegador.</p>

        <div class="browsers-grid">
          <a
            v-for="b in navegadores"
            :key="b.nome"
            :href="b.link"
            target="_blank"
            rel="noopener noreferrer"
            class="browser-card"
          >
            <div class="browser-card__ico" v-html="b.icone"></div>
            <span class="browser-card__nome">{{ b.nome }}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
          </a>
        </div>

        <div class="aviso-navegador">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>Bloquear cookies essenciais pelo navegador pode impedir o funcionamento do carrinho, login e checkout. Recomendamos usar o painel de preferências acima para um controle mais granular.</span>
        </div>

        <!-- ══ LGPD ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">法</span><span class="or-sep__line or-sep__line--r"></span></div>
        <div class="lgpd-bloco">
          <div class="lgpd-bloco__ico">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <p class="lgpd-bloco__titulo">Base legal — LGPD Art. 7º</p>
            <p class="lgpd-bloco__desc">O uso de cookies essenciais fundamenta-se no <strong>legítimo interesse</strong> para funcionamento do serviço (LGPD Art. 7º, IX). Cookies opcionais (analíticos e de marketing) são coletados mediante <strong>consentimento expresso</strong> (LGPD Art. 7º, I), que pode ser revogado a qualquer momento pelo painel acima ou pelo e-mail <strong>privacidade@noiror.com.br</strong>.</p>
          </div>
        </div>

      </div>

      <!-- ══ SIDEBAR ══ -->
      <aside class="policy-sidebar">
        <h4>Políticas</h4>
        <ul>
          <li><router-link to="/suporte" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Central de Ajuda</router-link></li>
          <li><router-link to="/politica-entrega" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>Entrega</router-link></li>
          <li><router-link to="/devolucoes" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.96"/></svg>Devoluções</router-link></li>
          <li><router-link to="/garantia" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Garantia Vitalícia</router-link></li>
          <li><router-link to="/termos-custodia" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>Termos de Custódia</router-link></li>
          <li><router-link to="/politica-privacidade" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Privacidade</router-link></li>
          <li><router-link to="/politica-cookies" class="sidebar-link sidebar-link--active"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>Cookies</router-link></li>
        </ul>

        <!-- Mini painel de status ── -->
        <div class="sidebar-cookie-status">
          <p class="sidebar-cookie-status__titulo">Status atual</p>
          <div class="scs-item" v-for="cat in categorias" :key="cat.id">
            <span class="scs-nome">{{ cat.label }}</span>
            <span :class="['scs-badge', preferencias[cat.id] ? 'scs-badge--on' : 'scs-badge--off']">
              {{ preferencias[cat.id] ? 'Ativo' : 'Inativo' }}
            </span>
          </div>
        </div>

        <div class="sidebar-status">
          <div class="sidebar-status__dot is-online"></div>
          <div>
            <p class="sidebar-status__titulo">LGPD em vigor</p>
            <p class="sidebar-status__hora">Art. 7º · Consentimento</p>
          </div>
        </div>

        <!-- FAQ mini ── -->
        <div class="sidebar-faq-mini">
          <p class="sidebar-faq-mini__titulo">Perguntas rápidas</p>
          <div v-for="(f, i) in faqMini" :key="i" class="sfm-item">
            <button class="sfm-q" @click="faqMiniAberto = faqMiniAberto === i ? null : i">
              {{ f.q }}
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <transition name="faq-drop">
              <p v-if="faqMiniAberto === i" class="sfm-a">{{ f.a }}</p>
            </transition>
          </div>
        </div>

        <div class="back-home">
          <router-link to="/" class="btn-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Voltar ao início
          </router-link>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

/* ── INTRO CARDS ── */
const introCards = [
  {
    titulo: 'O que são cookies?',
    desc: 'Pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles permitem lembrar suas preferências e analisar como o site é usado.',
    icone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>',
  },
  {
    titulo: 'Como usamos?',
    desc: 'Utilizamos cookies para manter sua sessão ativa, lembrar o carrinho, entender quais páginas são mais visitadas e, com seu consentimento, personalizar anúncios.',
    icone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  },
  {
    titulo: 'Você tem controle',
    desc: 'Cookies opcionais dependem do seu consentimento expresso. Você pode ativar ou desativar cada categoria a qualquer momento pelo painel abaixo.',
    icone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  },
]

/* ── CATEGORIAS DE COOKIES ── */
const categorias = [
  {
    id: 'essenciais',
    label: 'Essenciais',
    essencial: true,
    desc: 'Indispensáveis para o funcionamento do site. Incluem cookies de sessão, autenticação, carrinho de compras e segurança CSRF.',
    icone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  },
  {
    id: 'preferencias',
    label: 'Preferências',
    essencial: true,
    desc: 'Lembram suas escolhas de navegação como tema (claro/escuro), idioma e região, para uma experiência consistente entre visitas.',
    icone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  },
  {
    id: 'analiticos',
    label: 'Analíticos',
    essencial: false,
    desc: 'Coletam dados anônimos sobre como você interage com o site (páginas visitadas, tempo de permanência) para melhorarmos a experiência.',
    icone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    essencial: false,
    desc: 'Usados para exibir anúncios relevantes em redes externas com base nos seus interesses. Dependem de consentimento expresso.',
    icone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  },
  {
    id: 'funcionalidade',
    label: 'Funcionalidade',
    essencial: false,
    desc: 'Permitem funcionalidades aprimoradas como chat de suporte, vídeos incorporados e personalização avançada do conteúdo exibido.',
    icone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  },
]

/* ── LISTA DETALHADA DE COOKIES ── */
const todosCookies = [
  // Essenciais
  { cat: 'essenciais', nome: 'noir_session', provedor: 'Noir & Or', finalidade: 'Mantém a sessão do usuário autenticado ativa', duracao: 'Sessão' },
  { cat: 'essenciais', nome: 'csrf_token', provedor: 'Noir & Or', finalidade: 'Proteção contra ataques de falsificação de requisição', duracao: '24 horas' },
  { cat: 'essenciais', nome: 'cart_id', provedor: 'Noir & Or', finalidade: 'Identifica o carrinho de compras do usuário', duracao: '30 dias' },
  { cat: 'essenciais', nome: 'auth_token', provedor: 'Noir & Or', finalidade: 'Token de autenticação seguro para o login persistente', duracao: '7 dias' },
  // Preferências
  { cat: 'preferencias', nome: 'noir_theme', provedor: 'Noir & Or', finalidade: 'Armazena preferência de tema (claro/escuro)', duracao: '1 ano' },
  { cat: 'preferencias', nome: 'noir_lang', provedor: 'Noir & Or', finalidade: 'Lembra o idioma e região preferida do usuário', duracao: '1 ano' },
  { cat: 'preferencias', nome: 'cookie_consent', provedor: 'Noir & Or', finalidade: 'Registra as preferências de consentimento de cookies', duracao: '13 meses' },
  // Analíticos
  { cat: 'analiticos', nome: '_ga', provedor: 'Google Analytics', finalidade: 'Distingue usuários únicos para estatísticas de tráfego', duracao: '2 anos' },
  { cat: 'analiticos', nome: '_ga_XXXXXXX', provedor: 'Google Analytics', finalidade: 'Mantém estado da sessão de análise GA4', duracao: '2 anos' },
  { cat: 'analiticos', nome: '_gid', provedor: 'Google Analytics', finalidade: 'Distingue usuários por sessão (dados anonimizados)', duracao: '24 horas' },
  // Marketing
  { cat: 'marketing', nome: '_fbp', provedor: 'Meta (Facebook)', finalidade: 'Identifica navegadores para métricas de conversão de anúncios', duracao: '90 dias' },
  { cat: 'marketing', nome: 'fr', provedor: 'Meta (Facebook)', finalidade: 'Entrega, mede e melhora a relevância dos anúncios', duracao: '90 dias' },
  // Funcionalidade
  { cat: 'funcionalidade', nome: 'intercom-id', provedor: 'Intercom', finalidade: 'Identifica o usuário no chat de suporte integrado', duracao: '9 meses' },
  { cat: 'funcionalidade', nome: 'yt-player-*', provedor: 'YouTube', finalidade: 'Armazena preferências do player de vídeo incorporado', duracao: 'Sessão' },
]

const cookiesPorCategoria = computed(() => {
  const resultado = {}
  categorias.forEach(c => {
    resultado[c.id] = todosCookies.filter(ck => ck.cat === c.id)
  })
  return resultado
})

/* ── PREFERÊNCIAS DE CONSENTIMENTO ── */
const preferencias = reactive({
  essenciais: true,
  preferencias: true,
  analiticos: false,
  marketing: false,
  funcionalidade: false,
})

const STORAGE_KEY = 'noiror_cookie_consent'

onMounted(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      Object.keys(parsed).forEach(k => {
        if (k in preferencias && k !== 'essenciais' && k !== 'preferencias') {
          preferencias[k] = parsed[k]
        }
      })
    }
  } catch {}
})

const togglePreferencia = (id) => {
  if (id === 'essenciais' || id === 'preferencias') return
  preferencias[id] = !preferencias[id]
  preferenciasSalvas.value = false
}

const aceitarTodos = () => {
  Object.keys(preferencias).forEach(k => { preferencias[k] = true })
  preferenciasSalvas.value = false
}

const recusarOpcionais = () => {
  Object.keys(preferencias).forEach(k => {
    if (k !== 'essenciais' && k !== 'preferencias') preferencias[k] = false
  })
  preferenciasSalvas.value = false
}

const salvando = ref(false)
const preferenciasSalvas = ref(false)

const salvarPreferencias = async () => {
  salvando.value = true
  await new Promise(r => setTimeout(r, 600))
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...preferencias }))
  } catch {}
  salvando.value = false
  preferenciasSalvas.value = true
  setTimeout(() => { preferenciasSalvas.value = false }, 4000)
}

/* ── TAB ATIVA ── */
const tabAtiva = ref('essenciais')

/* ── TERCEIROS ── */
const terceiros = [
  { nome: 'Google Analytics', tipo: 'Analítico', desc: 'Mensuração de audiência e comportamento de navegação. Dados anonimizados e sem identificação pessoal.', link: 'https://policies.google.com/privacy' },
  { nome: 'Meta (Facebook)', tipo: 'Marketing', desc: 'Pixel de conversão para mensurar o desempenho de campanhas publicitárias no Facebook e Instagram.', link: 'https://www.facebook.com/privacy/policy/' },
  { nome: 'Mercado Pago', tipo: 'Funcionalidade', desc: 'Processamento seguro de pagamentos. Cookies utilizados para prevenção a fraudes e autenticação.', link: 'https://www.mercadopago.com.br/privacidade' },
  { nome: 'Intercom', tipo: 'Funcionalidade', desc: 'Chat de suporte ao cliente integrado. Identifica o usuário para histórico de conversas.', link: 'https://www.intercom.com/legal/privacy' },
]

/* ── NAVEGADORES ── */
const navegadores = [
  { nome: 'Chrome', link: 'https://support.google.com/chrome/answer/95647', icone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>' },
  { nome: 'Firefox', link: 'https://support.mozilla.org/pt-BR/kb/protecao-aprimorada-contra-rastreamento-firefox-desktop', icone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4"/></svg>' },
  { nome: 'Safari', link: 'https://support.apple.com/pt-br/guide/safari/sfri11471/mac', icone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>' },
  { nome: 'Edge', link: 'https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09', icone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 12c0-3.31 2.69-6 6-6"/></svg>' },
]

/* ── FAQ MINI ── */
const faqMiniAberto = ref(null)
const faqMini = [
  { q: 'Os cookies guardam minha senha?', a: 'Não. Cookies nunca armazenam senhas. Apenas um token de sessão seguro e temporário é gravado, sem qualquer dado sensível.' },
  { q: 'Posso revogar o consentimento?', a: 'Sim, a qualquer momento pelo painel de preferências nesta página ou enviando solicitação para privacidade@noiror.com.br.' },
  { q: 'O que acontece se eu bloquear tudo?', a: 'Apenas cookies essenciais são necessários para o site funcionar. Bloquear analíticos e marketing não afeta sua experiência de compra.' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Mono&display=swap');

/* ── PAGE ── */
.policy-page { background: var(--cor-fundo); min-height: 100vh; font-family: 'Syne', sans-serif; }

/* ── HERO ── */
.policy-hero { position: relative; padding-top: calc(var(--navbar-h, 88px) + 64px); padding-bottom: 72px; background: linear-gradient(160deg, var(--cor-superficie) 0%, var(--cor-superficie-2) 60%, var(--cor-fundo) 100%); border-bottom: .5px solid var(--cor-borda); overflow: hidden; }
.policy-hero-glow { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 70% 60% at 30% 50%, rgba(245,166,35,.07) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 80% 30%, rgba(245,166,35,.04) 0%, transparent 60%); }
.policy-hero-kamon { position: absolute; right: 80px; top: 50%; transform: translateY(-50%); font-family: 'Playfair Display', serif; font-size: 240px; font-weight: 200; color: transparent; -webkit-text-stroke: .5px rgba(245,166,35,.05); pointer-events: none; user-select: none; line-height: 1; }
.policy-hero-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 48px; }
.breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 10px; letter-spacing: .3em; text-transform: uppercase; color: var(--cor-texto-3); margin-bottom: 24px; }
.breadcrumb a { color: var(--cor-primaria); text-decoration: none; transition: color .2s; }
.breadcrumb a:hover { color: var(--cor-clara); }
.breadcrumb .sep { color: var(--cor-borda); }
.breadcrumb .current { color: var(--cor-texto-2); }
.hero-eyebrow { display: flex; align-items: center; gap: 10px; font-size: 8px; letter-spacing: .52em; text-transform: uppercase; color: var(--cor-primaria); opacity: .75; margin-bottom: 20px; }
.hero-eyebrow__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--cor-primaria); flex-shrink: 0; animation: dotPulse 2.5s ease-in-out infinite; }
@keyframes dotPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(245,166,35,0) } 50% { box-shadow: 0 0 0 6px rgba(245,166,35,0) } }
.policy-hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 300; line-height: 1; color: var(--cor-texto); margin-bottom: 16px; }
.policy-hero h1 em { font-style: italic; color: var(--cor-primaria); }
.hero-sub { font-size: 14px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.8; max-width: 480px; margin-bottom: 36px; }
.hero-stats { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; }
.hero-stat { display: flex; flex-direction: column; gap: 4px; }
.hero-stat__num { font-family: 'DM Mono', monospace; font-size: 1.4rem; color: var(--cor-primaria); letter-spacing: .05em; line-height: 1; }
.hero-stat__label { font-size: 8px; letter-spacing: .3em; text-transform: uppercase; color: var(--cor-texto-3); }
.hero-stat-sep { width: .5px; height: 36px; background: linear-gradient(to bottom, transparent, var(--cor-borda), transparent); }

/* ── CONTAINER ── */
.policy-container { max-width: 1200px; margin: 0 auto; padding: 56px 48px 80px; display: grid; grid-template-columns: 1fr 260px; gap: 56px; }

/* ── INTRO CARDS ── */
.intro-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }
.intro-card { background: var(--cor-superficie); border: .5px solid var(--cor-borda); padding: 20px; display: flex; flex-direction: column; gap: 12px; transition: border-color .2s; }
.intro-card:hover { border-color: rgba(245,166,35,.3); }
.intro-card__ico { color: var(--cor-primaria); opacity: .6; }
.intro-card h4 { font-size: 12px; font-weight: 600; color: var(--cor-texto-2); letter-spacing: .04em; }
.intro-card p { font-size: 11.5px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.65; }

/* ── VIGÊNCIA ── */
.vigencia-banner { display: flex; align-items: center; gap: 10px; font-size: 11px; color: var(--cor-texto-3); background: rgba(245,166,35,.03); border: .5px solid var(--cor-borda); border-left: 2px solid rgba(245,166,35,.3); padding: 10px 16px; margin-bottom: 8px; }
.vigencia-banner svg { color: var(--cor-primaria); opacity: .6; flex-shrink: 0; }
.vigencia-banner strong { color: var(--cor-texto-2); }

/* ── SEPARADORES ── */
.or-sep { display: flex; align-items: center; gap: 16px; margin: 36px 0; }
.or-sep__line { flex: 1; height: .5px; background: linear-gradient(90deg, transparent, rgba(245,166,35,.2)); }
.or-sep__line--r { background: linear-gradient(270deg, transparent, rgba(245,166,35,.2)); }
.or-sep__kanji { font-family: 'Playfair Display', serif; font-size: 14px; color: var(--cor-primaria); opacity: .25; line-height: 1; }
.section-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 300; font-style: italic; color: var(--cor-texto); margin-bottom: 8px; }
.section-sub { font-size: 12px; color: var(--cor-texto-3); font-weight: 300; line-height: 1.7; margin-bottom: 24px; max-width: 540px; }

/* ── PAINEL DE CONSENTIMENTO ── */
.consent-painel { background: var(--cor-superficie); border: .5px solid var(--cor-borda); overflow: hidden; }
.consent-item { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 20px; border-bottom: .5px solid rgba(255,255,255,.04); transition: background .15s; }
.consent-item:hover { background: rgba(245,166,35,.02); }
.consent-item__left { display: flex; align-items: flex-start; gap: 14px; flex: 1; }
.consent-item__ico { color: var(--cor-primaria); opacity: .5; flex-shrink: 0; margin-top: 2px; }
.consent-item__info { flex: 1; }
.consent-item__titulo { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; color: var(--cor-texto-2); margin-bottom: 5px; }
.consent-badge { font-size: 7px; letter-spacing: .3em; text-transform: uppercase; background: rgba(245,166,35,.1); border: .5px solid rgba(245,166,35,.3); color: var(--cor-primaria); padding: 2px 8px; }
.consent-item__desc { font-size: 11.5px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.6; max-width: 500px; }
.consent-item__right { flex-shrink: 0; }

/* Toggle switch */
.consent-toggle { position: relative; width: 42px; height: 24px; background: none; border: none; cursor: pointer; padding: 0; display: flex; align-items: center; }
.consent-toggle__track { position: absolute; inset: 0; background: rgba(255,255,255,.08); border: .5px solid var(--cor-borda); border-radius: 12px; transition: background .3s, border-color .3s; }
.consent-toggle__thumb { position: absolute; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: rgba(255,255,255,.3); transition: transform .3s cubic-bezier(.16,1,.3,1), background .3s; }
.consent-toggle.is-on .consent-toggle__track { background: rgba(245,166,35,.2); border-color: var(--cor-primaria); }
.consent-toggle.is-on .consent-toggle__thumb { transform: translateX(18px); background: var(--cor-primaria); }
.consent-toggle.is-disabled { cursor: not-allowed; opacity: .5; }
.consent-toggle.is-disabled .consent-toggle__thumb { background: rgba(255,255,255,.2); }

/* Ações */
.consent-acoes { display: flex; align-items: center; gap: 10px; padding: 16px 20px; background: rgba(245,166,35,.02); border-top: .5px solid var(--cor-borda); flex-wrap: wrap; }
.btn-ghost-policy { background: none; border: .5px solid var(--cor-borda); padding: 9px 18px; font-family: 'Syne', sans-serif; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--cor-texto-2); cursor: pointer; transition: all .2s; }
.btn-ghost-policy:hover { border-color: var(--cor-primaria); color: var(--cor-primaria); }
.btn-ghost-policy--mid { border-color: rgba(245,166,35,.3); color: var(--cor-primaria); }
.btn-ghost-policy--mid:hover { background: rgba(245,166,35,.08); }
.cf-submit { padding: 10px 24px; background: var(--cor-primaria); border: none; color: #0A0A0A; font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .25em; text-transform: uppercase; cursor: pointer; transition: all .25s; display: flex; align-items: center; justify-content: center; min-width: 180px; min-height: 38px; }
.cf-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(245,166,35,.3); }
.cf-submit:disabled { opacity: .5; cursor: not-allowed; }
.cf-spin { width: 14px; height: 14px; border: 2px solid rgba(0,0,0,.2); border-top-color: #0A0A0A; border-radius: 50%; animation: cfSpin .7s linear infinite; }
@keyframes cfSpin { to { transform: rotate(360deg); } }
.consent-sucesso { display: flex; align-items: center; gap: 8px; font-size: 11px; color: #2ecc71; background: rgba(46,204,113,.05); border-top: .5px solid rgba(46,204,113,.2); padding: 10px 20px; }
.consent-sucesso svg { flex-shrink: 0; }

/* ── TABS DE CATEGORIA ── */
.cookies-tabs { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 0; }
.cookie-tab { display: flex; align-items: center; gap: 7px; padding: 9px 16px; background: none; border: .5px solid var(--cor-borda); border-bottom: none; font-family: 'Syne', sans-serif; font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: var(--cor-texto-3); cursor: pointer; transition: all .2s; }
.cookie-tab:hover { color: var(--cor-texto-2); border-color: rgba(245,166,35,.3); }
.cookie-tab.is-active { background: var(--cor-superficie); border-color: var(--cor-borda); border-bottom-color: var(--cor-superficie); color: var(--cor-primaria); }
.cookie-tab__ico { display: flex; align-items: center; color: currentColor; opacity: .7; }
.cookie-tab__count { font-family: 'DM Mono', monospace; font-size: 10px; background: rgba(245,166,35,.1); color: var(--cor-primaria); padding: 1px 6px; border-radius: 2px; }

/* ── TABELA DETALHADA ── */
.cookies-detail-table { border: .5px solid var(--cor-borda); background: var(--cor-superficie); margin-bottom: 24px; overflow: hidden; }
.cdt-header { display: grid; grid-template-columns: 1.2fr 1fr 2fr 0.8fr; padding: 10px 16px; background: rgba(245,166,35,.04); border-bottom: .5px solid var(--cor-borda); font-size: 8px; letter-spacing: .4em; text-transform: uppercase; color: var(--cor-primaria); opacity: .8; }
.cdt-row { display: grid; grid-template-columns: 1.2fr 1fr 2fr 0.8fr; padding: 12px 16px; border-bottom: .5px solid rgba(255,255,255,.03); font-size: 12px; transition: background .15s; align-items: start; }
.cdt-row:last-child { border-bottom: none; }
.cdt-row:hover { background: rgba(245,166,35,.02); }
.cdt-nome { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--cor-primaria); opacity: .85; word-break: break-all; }
.cdt-provedor { font-size: 11px; font-weight: 500; color: var(--cor-texto-2); }
.cdt-finalidade { font-weight: 300; color: var(--cor-texto-3); line-height: 1.5; }
.cdt-duracao { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--cor-texto-3); }

/* ── TERCEIROS ── */
.terceiros-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 24px; }
.terceiro-card { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding: 18px 20px; background: var(--cor-superficie); border: .5px solid var(--cor-borda); text-decoration: none; transition: all .2s; }
.terceiro-card:hover { border-color: rgba(245,166,35,.4); transform: translateY(-1px); }
.terceiro-card__info { flex: 1; }
.terceiro-card__nome { display: block; font-size: 12px; font-weight: 600; color: var(--cor-texto-2); margin-bottom: 4px; }
.terceiro-card__tipo { display: inline-block; font-size: 8px; letter-spacing: .3em; text-transform: uppercase; color: var(--cor-primaria); opacity: .7; background: rgba(245,166,35,.06); border: .5px solid rgba(245,166,35,.2); padding: 2px 8px; margin-bottom: 8px; }
.terceiro-card__desc { font-size: 11px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.6; }
.terceiro-card__arr { color: var(--cor-texto-3); flex-shrink: 0; margin-top: 2px; transition: all .2s; }
.terceiro-card:hover .terceiro-card__arr { color: var(--cor-primaria); transform: translate(2px, -2px); }

/* ── NAVEGADORES ── */
.browsers-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px; }
.browser-card { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 20px 12px; background: var(--cor-superficie); border: .5px solid var(--cor-borda); text-decoration: none; color: var(--cor-texto-3); transition: all .2s; font-size: 10px; letter-spacing: .1em; }
.browser-card:hover { border-color: rgba(245,166,35,.4); color: var(--cor-primaria); }
.browser-card__ico { color: currentColor; }
.browser-card__nome { font-size: 11px; color: var(--cor-texto-2); }
.browser-card svg:last-child { opacity: .4; }
.browser-card:hover svg:last-child { opacity: 1; }
.aviso-navegador { display: flex; align-items: flex-start; gap: 9px; font-size: 11px; color: var(--cor-texto-3); line-height: 1.6; background: rgba(245,166,35,.025); border: .5px solid var(--cor-borda); padding: 10px 14px; margin-bottom: 8px; }
.aviso-navegador svg { color: var(--cor-primaria); opacity: .55; flex-shrink: 0; margin-top: 1px; }

/* ── BLOCO LGPD ── */
.lgpd-bloco { display: flex; align-items: flex-start; gap: 18px; padding: 22px 24px; background: rgba(245,166,35,.04); border: .5px solid rgba(245,166,35,.15); border-left-width: 2px; }
.lgpd-bloco__ico { color: var(--cor-primaria); opacity: .6; flex-shrink: 0; margin-top: 2px; }
.lgpd-bloco__titulo { font-size: 10px; letter-spacing: .35em; text-transform: uppercase; color: var(--cor-primaria); opacity: .75; margin-bottom: 10px; font-weight: 600; }
.lgpd-bloco__desc { font-size: 12px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.85; }
.lgpd-bloco__desc strong { color: var(--cor-primaria); font-weight: 600; }

/* ── SIDEBAR ── */
.policy-sidebar { background: var(--cor-superficie-2); border: .5px solid var(--cor-borda); padding: 28px; position: sticky; top: calc(var(--navbar-h, 88px) + 20px); align-self: start; display: flex; flex-direction: column; }
.policy-sidebar h4 { font-size: 8px; letter-spacing: .5em; text-transform: uppercase; color: var(--cor-primaria); margin-bottom: 20px; padding-bottom: 12px; border-bottom: .5px solid var(--cor-borda); opacity: .8; }
.policy-sidebar ul { list-style: none; padding: 0; margin: 0 0 20px; }
.policy-sidebar li { margin-bottom: 2px; }
.sidebar-link { display: flex; align-items: center; gap: 10px; padding: 9px 0; font-size: 12px; color: var(--cor-texto-2); text-decoration: none; transition: all .2s; position: relative; }
.sidebar-link::before { content: ''; position: absolute; left: -14px; top: 50%; transform: translateY(-50%); width: .5px; height: 0; background: var(--cor-primaria); transition: height .25s; }
.sidebar-link:hover::before, .sidebar-link--active::before { height: 60%; }
.sidebar-link:hover { color: var(--cor-primaria); transform: translateX(4px); }
.sidebar-link--active { color: var(--cor-primaria); font-weight: 600; }
.sidebar-link svg { flex-shrink: 0; opacity: .5; transition: opacity .2s; }
.sidebar-link:hover svg, .sidebar-link--active svg { opacity: 1; }

/* ── MINI STATUS COOKIES ── */
.sidebar-cookie-status { margin-bottom: 20px; border-top: .5px solid var(--cor-borda); padding-top: 16px; }
.sidebar-cookie-status__titulo { font-size: 9px; letter-spacing: .25em; text-transform: uppercase; color: var(--cor-texto-3); margin-bottom: 10px; }
.scs-item { display: flex; align-items: center; justify-content: space-between; padding: 5px 0; border-bottom: .5px solid rgba(255,255,255,.03); }
.scs-item:last-child { border-bottom: none; }
.scs-nome { font-size: 11px; color: var(--cor-texto-3); }
.scs-badge { font-size: 8px; letter-spacing: .2em; text-transform: uppercase; padding: 2px 7px; font-weight: 600; }
.scs-badge--on { color: #2ecc71; background: rgba(46,204,113,.08); }
.scs-badge--off { color: var(--cor-texto-3); background: rgba(255,255,255,.04); }

/* ── STATUS ── */
.sidebar-status { display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(255,255,255,.03); border: .5px solid var(--cor-borda); margin-bottom: 20px; }
.sidebar-status__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.sidebar-status__dot.is-online { background: #f5a623; box-shadow: 0 0 0 3px rgba(245,166,35,.2); animation: pulseGold 2s ease-in-out infinite; }
@keyframes pulseGold { 0%,100% { box-shadow: 0 0 0 0 rgba(245,166,35,.3) } 50% { box-shadow: 0 0 0 5px rgba(245,166,35,0) } }
.sidebar-status__titulo { font-size: 11px; font-weight: 600; color: var(--cor-texto-2); }
.sidebar-status__hora { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--cor-primaria); opacity: .6; }

/* ── FAQ MINI ── */
.sidebar-faq-mini { margin-bottom: 20px; border-top: .5px solid var(--cor-borda); padding-top: 16px; }
.sidebar-faq-mini__titulo { font-size: 9px; letter-spacing: .25em; text-transform: uppercase; color: var(--cor-texto-3); margin-bottom: 10px; }
.sfm-item { border-bottom: .5px solid rgba(255,255,255,.04); }
.sfm-item:last-child { border-bottom: none; }
.sfm-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px; background: none; border: none; padding: 9px 0; font-size: 11px; color: var(--cor-texto-2); text-align: left; cursor: pointer; font-family: 'Syne', sans-serif; }
.sfm-q svg { flex-shrink: 0; color: var(--cor-texto-3); transition: transform .25s; }
.sfm-q:hover { color: var(--cor-primaria); }
.sfm-a { font-size: 10.5px; color: var(--cor-texto-3); line-height: 1.7; padding: 0 0 10px; }

/* ── BACK ── */
.back-home { margin-top: 0; }
.btn-back { display: inline-flex; align-items: center; gap: 8px; background: transparent; border: .5px solid var(--cor-borda); border-radius: 40px; padding: 8px 16px; font-size: 10px; font-weight: 500; letter-spacing: .15em; color: var(--cor-primaria); text-decoration: none; transition: all .2s; }
.btn-back:hover { background: rgba(245,166,35,.06); transform: translateX(-4px); border-color: var(--cor-primaria); }

/* ── TRANSITIONS ── */
.msg-fade-enter-active, .msg-fade-leave-active { transition: all .3s; }
.msg-fade-enter-from, .msg-fade-leave-to { opacity: 0; transform: translateY(-4px); }
.faq-drop-enter-active, .faq-drop-leave-active { transition: opacity .25s, max-height .3s; overflow: hidden; }
.faq-drop-enter-from, .faq-drop-leave-to { opacity: 0; max-height: 0; }
.faq-drop-enter-to, .faq-drop-leave-from { opacity: 1; max-height: 200px; }
.fade-list-enter-active, .fade-list-leave-active { transition: opacity .2s; }
.fade-list-enter-from, .fade-list-leave-to { opacity: 0; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .policy-container, .policy-hero-content { padding-left: 28px; padding-right: 28px; }
}
@media (max-width: 900px) {
  .policy-container { grid-template-columns: 1fr; gap: 40px; }
  .policy-sidebar { position: static; }
  .intro-grid { grid-template-columns: 1fr; }
  .terceiros-grid { grid-template-columns: 1fr; }
  .browsers-grid { grid-template-columns: repeat(2, 1fr); }
  .policy-hero-kamon { display: none; }
  .cdt-header, .cdt-row { grid-template-columns: 1.2fr 1fr 2fr; }
  .cdt-header span:last-child, .cdt-duracao { display: none; }
}
@media (max-width: 600px) {
  .policy-container, .policy-hero-content { padding-left: 20px; padding-right: 20px; }
  .hero-stats { flex-direction: column; gap: 16px; }
  .hero-stat-sep { display: none; }
  .cookies-tabs { gap: 2px; }
  .cookie-tab { padding: 7px 10px; font-size: 9px; }
  .cdt-header, .cdt-row { grid-template-columns: 1fr 2fr; }
  .cdt-header span:nth-child(2), .cdt-provedor { display: none; }
  .browsers-grid { grid-template-columns: repeat(2, 1fr); }
  .consent-acoes { flex-direction: column; }
  .cf-submit, .btn-ghost-policy { width: 100%; justify-content: center; }
}
</style>