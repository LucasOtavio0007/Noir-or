<template>
  <div class="policy-page">

    <!-- ══ HERO ══ -->
    <div class="policy-hero">
      <div class="policy-hero-glow"></div>
      <div class="policy-hero-kamon" aria-hidden="true">速</div>
      <div class="policy-hero-content">
        <div class="breadcrumb">
          <router-link to="/">Início</router-link>
          <span class="sep">·</span>
          <span class="current">Política de Entrega</span>
        </div>
        <div class="hero-eyebrow"><span class="hero-eyebrow__dot"></span><span>LOGÍSTICA · NOIR &amp; OR</span></div>
        <h1>Entrega<br/><em>& Envio</em></h1>
        <p class="hero-sub">Frete VIP gratuito em todo o Brasil. Rastreamento em tempo real do Atelier até a sua porta.</p>
        <div class="hero-stats">
          <div class="hero-stat"><span class="hero-stat__num">5d</span><span class="hero-stat__label">Despacho após pagamento</span></div>
          <div class="hero-stat-sep"></div>
          <div class="hero-stat"><span class="hero-stat__num">VIP</span><span class="hero-stat__label">Frete grátis nacional</span></div>
          <div class="hero-stat-sep"></div>
          <div class="hero-stat"><span class="hero-stat__num">100%</span><span class="hero-stat__label">Rastreável</span></div>
        </div>
      </div>
    </div>

    <div class="policy-container">
      <div class="policy-content">

        <!-- ══ FRETE VIP ══ -->
        <div class="destaque-card">
          <div class="destaque-card__ico">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <p class="destaque-card__titulo">Frete VIP Gratuito para Clientes Cadastrados</p>
            <p class="destaque-card__desc">Todo cliente com conta ativa na plataforma recebe frete gratuito em todo o território nacional, sem valor mínimo de compra. O benefício é aplicado automaticamente no checkout após o login — sem cupom, sem condição oculta.</p>
          </div>
        </div>

        <!-- ══ PRAZOS ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">期</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Prazos de Entrega</h2>
        <p class="section-sub">Os prazos abaixo contam a partir da confirmação do pagamento e são estimativas baseadas no histórico de entregas — podem variar conforme localidade e transportadora.</p>

        <div class="prazo-grid">
          <div class="prazo-card" v-for="p in prazos" :key="p.regiao">
            <div class="prazo-card__regiao">{{ p.regiao }}</div>
            <div class="prazo-card__prazo">{{ p.prazo }}</div>
            <p class="prazo-card__desc">{{ p.desc }}</p>
          </div>
        </div>

        <!-- ══ COMO FUNCIONA ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">道</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Da Produção à Sua Porta</h2>
        <p class="section-sub">Cada etapa do envio é monitorada internamente antes de chegar até você.</p>

        <div class="timeline">
          <div class="timeline__item" v-for="(step, i) in etapas" :key="i">
            <div class="timeline__num">{{ String(i+1).padStart(2,'0') }}</div>
            <div class="timeline__body">
              <h4>{{ step.titulo }}</h4>
              <p>{{ step.desc }}</p>
            </div>
          </div>
        </div>

        <!-- ══ RASTREAMENTO ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">追</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Rastrear Pedido</h2>
        <p class="section-sub">Informe o código de rastreamento recebido por e-mail para consultar o status de entrega em tempo real.</p>

        <div class="verif-box">
          <div class="verif-row">
            <input
              v-model.trim="codigoRastreio"
              placeholder="Código de rastreamento (ex: BR123456789BR)"
              style="text-transform:uppercase; font-family:'DM Mono',monospace; letter-spacing:.05em"
              @keyup.enter="rastrearPedido"
              :disabled="rastreando"
            />
            <button class="btn-gold-policy" @click="rastrearPedido" :disabled="rastreando || !codigoRastreio">
              <span v-if="!rastreando">Rastrear</span>
              <span v-else class="cf-spin"></span>
            </button>
          </div>

          <transition name="fade">
            <div v-if="rastreioErro" class="verif-erro">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {{ rastreioErro }}
            </div>
          </transition>

          <transition name="fade">
            <div v-if="rastreioResultado" class="rastreio-resultado">
              <div class="rastreio-resultado__head">
                <span class="verif-status-badge" :class="`verif-status-badge--${rastreioResultado.cor}`">
                  {{ rastreioResultado.status }}
                </span>
                <span class="verif-resultado__ped">{{ codigoRastreio.toUpperCase() }}</span>
              </div>
              <div class="rastreio-timeline">
                <div
                  v-for="(ev, i) in rastreioResultado.eventos"
                  :key="i"
                  :class="['rt-item', { 'rt-item--atual': i === 0 }]"
                >
                  <div class="rt-item__dot"></div>
                  <div class="rt-item__corpo">
                    <span class="rt-item__data">{{ ev.data }}</span>
                    <span class="rt-item__desc">{{ ev.desc }}</span>
                    <span class="rt-item__local" v-if="ev.local">{{ ev.local }}</span>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- ══ REGIÕES / ENCOMENDA ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">地</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Regiões Atendidas</h2>

        <div class="regioes-grid">
          <div class="regiao-item" v-for="r in regioes" :key="r.nome">
            <div class="regiao-item__ico" v-html="r.icone"></div>
            <div>
              <p class="regiao-item__nome">{{ r.nome }}</p>
              <p class="regiao-item__detalhe">{{ r.detalhe }}</p>
            </div>
          </div>
        </div>

        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">作</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Produtos Sob Encomenda</h2>
        <p class="section-sub">Peças personalizadas e coleções limitadas possuem prazo de produção adicional.</p>

        <div class="encomenda-card">
          <div class="encomenda-card__grid">
            <div class="encomenda-card__item">
              <span class="encomenda-card__label">Prazo de produção</span>
              <span class="encomenda-card__val">Até 30 dias úteis</span>
            </div>
            <div class="encomenda-card__item">
              <span class="encomenda-card__label">Informação no ato da compra</span>
              <span class="encomenda-card__val">Sim — prazo exibido no produto</span>
            </div>
            <div class="encomenda-card__item">
              <span class="encomenda-card__label">Cancelamento antes do despacho</span>
              <span class="encomenda-card__val">Até 2h após confirmação</span>
            </div>
            <div class="encomenda-card__item">
              <span class="encomenda-card__label">Atualizações de produção</span>
              <span class="encomenda-card__val">Via e-mail cadastrado</span>
            </div>
          </div>
        </div>

        <div class="suporte-garantia">
          <div class="suporte-garantia__ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
          <div>
            <p class="suporte-garantia__titulo">Produto chegou com problema?</p>
            <p class="suporte-garantia__desc">Se o item chegou danificado ou diferente do pedido, consulte nossa <router-link to="/devolucoes" class="link-inline">Política de Devoluções</router-link> ou acione a <router-link to="/garantia" class="link-inline">Garantia Vitalícia</router-link> para resolução sem custo.</p>
          </div>
        </div>

      </div>

      <!-- ══ SIDEBAR ══ -->
      <aside class="policy-sidebar">
        <h4>Políticas</h4>
        <ul>
          <li><router-link to="/suporte" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Central de Ajuda</router-link></li>
          <li><router-link to="/politica-entrega" class="sidebar-link sidebar-link--active"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>Entrega</router-link></li>
          <li><router-link to="/devolucoes" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.96"/></svg>Devoluções</router-link></li>
          <li><router-link to="/garantia" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Garantia Vitalícia</router-link></li>
          <li><router-link to="/termos-custodia" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>Termos de Custódia</router-link></li>
          <li><router-link to="/politica-privacidade" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Privacidade</router-link></li>
          <li><router-link to="/politica-cookies" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>Cookies</router-link></li>
        </ul>

        <div class="sidebar-status">
          <div class="sidebar-status__dot is-online"></div>
          <div>
            <p class="sidebar-status__titulo">Frete VIP Ativo</p>
            <p class="sidebar-status__hora">Todo o território nacional</p>
          </div>
        </div>

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
import { ref } from 'vue'
import api from '@/api.js'

/* ── CONTEÚDO ESTÁTICO ── */
const prazos = [
  { regiao: 'Capitais e regiões metropolitanas', prazo: '5–10 dias úteis', desc: 'Inclui São Paulo, Rio de Janeiro, Belo Horizonte, Brasília, Fortaleza, Recife, Salvador, Curitiba, Porto Alegre e Manaus.' },
  { regiao: 'Cidades do interior', prazo: '8–12 dias úteis', desc: 'Municípios fora das regiões metropolitanas atendidos por transportadora parceira ou Correios com modalidade PAC.' },
  { regiao: 'Localidades remotas', prazo: 'Até 15 dias úteis', desc: 'Áreas de difícil acesso, ilhas e municípios sem cobertura de transportadora parceira — entrega exclusiva pelos Correios.' },
  { regiao: 'Produtos sob encomenda', prazo: '+30 dias úteis', desc: 'Prazo adicional de produção antes do despacho, informado no produto e confirmado por e-mail no ato da compra.' },
]

const etapas = [
  { titulo: 'Confirmação do pagamento', desc: 'Assim que o pagamento é aprovado, o pedido entra na fila de produção ou separação — você recebe e-mail de confirmação imediatamente.' },
  { titulo: 'Preparação e embalagem', desc: 'A peça passa por inspeção de qualidade, é embalada com material de proteção premium e acompanhada do certificado digital.' },
  { titulo: 'Despacho e código de rastreio', desc: 'O pedido é postado em até 5 dias úteis. Você recebe o código de rastreamento por e-mail assim que a transportadora coleta o pacote.' },
  { titulo: 'Entrega no endereço cadastrado', desc: 'A transportadora realiza até 2 tentativas de entrega. Caso não haja ninguém, o pacote fica disponível na agência mais próxima por 7 dias.' },
]

const regioes = [
  { nome: 'Brasil inteiro', detalhe: 'Cobertura nacional via Correios e transportadoras parceiras.', icone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
  { nome: 'Zonas francas e ilhas', detalhe: 'Manaus (ZFM) e ilhas fluviais atendidas com prazo estendido.', icone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
  { nome: 'Internacional', detalhe: 'Não disponível no momento. Em breve para países selecionados.', icone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>' },
]

const faqMini = [
  { q: 'O frete é realmente gratuito?', a: 'Sim, para clientes cadastrados. O benefício é aplicado automaticamente no checkout após o login, sem nenhuma condição de valor mínimo.' },
  { q: 'Como recebo o código de rastreio?', a: 'Por e-mail assim que a transportadora coleta o pacote. Você também pode consultar em "Minha Conta → Meus Pedidos".' },
  { q: 'E se ninguém estiver em casa?', a: 'A transportadora faz até 2 tentativas. Após isso, o pacote fica disponível na agência mais próxima por 7 dias corridos.' },
]
const faqMiniAberto = ref(null)

/* ══════════════════════
   RASTREAMENTO
══════════════════════ */
const codigoRastreio = ref('')
const rastreando = ref(false)
const rastreioErro = ref('')
const rastreioResultado = ref(null)

const rastrearPedido = async () => {
  if (!codigoRastreio.value) return
  rastreioErro.value = ''
  rastreioResultado.value = null
  rastreando.value = true
  try {
    const { data } = await api.get(`/pedidos/rastreio/${codigoRastreio.value.trim().toUpperCase()}`)
    const eventos = data?.eventos || data?.tracking || []
    rastreioResultado.value = {
      status: data?.statusAtual || eventos[0]?.descricao || 'Em trânsito',
      cor: data?.entregue ? 'elegivel' : 'analise',
      eventos: eventos.map(ev => ({
        data: new Date(ev.data || ev.dataHora || Date.now()).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
        desc: ev.descricao || ev.status,
        local: ev.local || ev.cidade || null,
      })),
    }
  } catch {
    rastreioErro.value = 'Código não encontrado no sistema. Verifique se o código está correto ou acesse diretamente o site dos Correios ou da transportadora informada no e-mail de envio.'
  } finally {
    rastreando.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Mono&display=swap');

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

/* ── DESTAQUE FRETE VIP ── */
.destaque-card { display: flex; align-items: flex-start; gap: 18px; padding: 24px; background: rgba(245,166,35,.05); border: .5px solid rgba(245,166,35,.25); border-left-width: 2px; margin-bottom: 8px; }
.destaque-card__ico { color: var(--cor-primaria); flex-shrink: 0; margin-top: 2px; }
.destaque-card__titulo { font-size: 13px; font-weight: 600; letter-spacing: .04em; color: var(--cor-texto); margin-bottom: 8px; }
.destaque-card__desc { font-size: 12.5px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.75; }

/* ── SEPARADORES ── */
.or-sep { display: flex; align-items: center; gap: 16px; margin: 40px 0; }
.or-sep__line { flex: 1; height: .5px; background: linear-gradient(90deg, transparent, rgba(245,166,35,.2)); }
.or-sep__line--r { background: linear-gradient(270deg, transparent, rgba(245,166,35,.2)); }
.or-sep__kanji { font-family: 'Playfair Display', serif; font-size: 14px; color: var(--cor-primaria); opacity: .25; line-height: 1; }
.section-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 300; font-style: italic; color: var(--cor-texto); margin-bottom: 8px; }
.section-sub { font-size: 12px; color: var(--cor-texto-3); font-weight: 300; line-height: 1.7; margin-bottom: 24px; max-width: 540px; }

/* ── PRAZO GRID ── */
.prazo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 8px; }
.prazo-card { background: var(--cor-superficie); border: .5px solid var(--cor-borda); padding: 20px; display: flex; flex-direction: column; gap: 8px; }
.prazo-card__regiao { font-size: 9px; letter-spacing: .3em; text-transform: uppercase; color: var(--cor-primaria); opacity: .75; font-weight: 600; }
.prazo-card__prazo { font-family: 'DM Mono', monospace; font-size: 15px; color: var(--cor-texto); font-weight: 600; }
.prazo-card__desc { font-size: 11.5px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.65; }

/* ── TIMELINE ── */
.timeline { display: flex; flex-direction: column; margin-bottom: 8px; }
.timeline__item { display: flex; gap: 18px; padding: 16px 0; border-bottom: .5px solid rgba(255,255,255,.05); }
.timeline__item:first-child { border-top: .5px solid rgba(255,255,255,.05); }
.timeline__num { font-family: 'DM Mono', monospace; font-size: 13px; color: var(--cor-primaria); opacity: .4; flex-shrink: 0; min-width: 30px; }
.timeline__body h4 { font-size: 13px; font-weight: 600; color: var(--cor-texto-2); margin-bottom: 5px; }
.timeline__body p { font-size: 12.5px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.7; max-width: 520px; }

/* ── RASTREAMENTO ── */
.verif-box { background: var(--cor-superficie); border: .5px solid var(--cor-borda); padding: 24px; margin-bottom: 24px; }
.verif-row { display: flex; gap: 10px; }
.verif-row input { flex: 1; background: rgba(245,166,35,.03); border: .5px solid var(--cor-borda); padding: 10px 14px; color: var(--cor-texto); font-size: 13px; outline: none; transition: border-color .2s; }
.verif-row input:focus { border-color: var(--cor-primaria); }
.verif-row input::placeholder { color: var(--cor-texto-3); font-family: 'Syne', sans-serif; letter-spacing: 0; }
.verif-row input:disabled { opacity: .5; }

.btn-gold-policy { background: var(--cor-primaria); border: none; color: #0A0A0A; font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; padding: 0 24px; cursor: pointer; transition: all .2s; display: flex; align-items: center; justify-content: center; min-width: 110px; }
.btn-gold-policy:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(245,166,35,.3); }
.btn-gold-policy:disabled { opacity: .4; cursor: not-allowed; }

.verif-erro { display: flex; align-items: flex-start; gap: 8px; font-size: 11.5px; color: #e08a3a; background: rgba(245,166,35,.05); border-left: 2px solid #e08a3a; padding: 10px 14px; margin-top: 14px; line-height: 1.6; }

.verif-status-badge { font-size: 9px; letter-spacing: .2em; text-transform: uppercase; padding: 4px 10px; border-radius: 2px; font-weight: 700; }
.verif-status-badge--elegivel { background: rgba(46,204,113,.12); color: #2ecc71; }
.verif-status-badge--analise { background: rgba(245,166,35,.12); color: var(--cor-primaria); }
.verif-resultado__ped { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--cor-texto-3); }

.rastreio-resultado { margin-top: 18px; border: .5px solid var(--cor-borda); }
.rastreio-resultado__head { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(245,166,35,.03); border-bottom: .5px solid var(--cor-borda); }

.rastreio-timeline { padding: 16px; display: flex; flex-direction: column; gap: 0; }
.rt-item { display: flex; gap: 14px; padding: 10px 0; position: relative; }
.rt-item + .rt-item::before { content: ''; position: absolute; left: 5px; top: -8px; width: .5px; height: 16px; background: var(--cor-borda); }
.rt-item__dot { width: 11px; height: 11px; border-radius: 50%; border: .5px solid var(--cor-borda); background: var(--cor-superficie); flex-shrink: 0; margin-top: 3px; }
.rt-item--atual .rt-item__dot { background: var(--cor-primaria); border-color: var(--cor-primaria); box-shadow: 0 0 0 3px rgba(245,166,35,.2); }
.rt-item__corpo { display: flex; flex-direction: column; gap: 2px; }
.rt-item__data { font-family: 'DM Mono', monospace; font-size: 9px; color: var(--cor-texto-3); letter-spacing: .05em; }
.rt-item__desc { font-size: 12px; color: var(--cor-texto-2); font-weight: 500; }
.rt-item--atual .rt-item__desc { color: var(--cor-primaria); }
.rt-item__local { font-size: 10.5px; color: var(--cor-texto-3); font-weight: 300; }

/* ── REGIÕES ── */
.regioes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 8px; }
.regiao-item { background: var(--cor-superficie); border: .5px solid var(--cor-borda); padding: 18px; display: flex; gap: 12px; align-items: flex-start; }
.regiao-item__ico { color: var(--cor-primaria); opacity: .6; flex-shrink: 0; margin-top: 2px; }
.regiao-item__nome { font-size: 12px; font-weight: 600; color: var(--cor-texto-2); margin-bottom: 4px; }
.regiao-item__detalhe { font-size: 11px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.6; }

/* ── ENCOMENDA ── */
.encomenda-card { background: var(--cor-superficie); border: .5px solid var(--cor-borda); padding: 24px; margin-bottom: 24px; }
.encomenda-card__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
.encomenda-card__item { padding: 12px 16px; border-bottom: .5px solid rgba(255,255,255,.05); display: flex; flex-direction: column; gap: 4px; }
.encomenda-card__item:nth-child(odd) { border-right: .5px solid rgba(255,255,255,.05); }
.encomenda-card__item:nth-last-child(-n+2) { border-bottom: none; }
.encomenda-card__label { font-size: 9px; letter-spacing: .25em; text-transform: uppercase; color: var(--cor-texto-3); }
.encomenda-card__val { font-size: 12.5px; font-weight: 600; color: var(--cor-texto-2); }

/* ── BANNER CROSS-SELL ── */
.suporte-garantia { display: flex; align-items: flex-start; gap: 16px; padding: 20px 24px; background: rgba(245,166,35,.04); border: .5px solid rgba(245,166,35,.15); border-left-width: 2px; }
.suporte-garantia__ico { color: var(--cor-primaria); opacity: .6; flex-shrink: 0; margin-top: 2px; }
.suporte-garantia__titulo { font-size: 12px; font-weight: 600; letter-spacing: .06em; color: var(--cor-texto); margin-bottom: 6px; }
.suporte-garantia__desc { font-size: 12px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.75; }
.link-inline { color: var(--cor-primaria); text-decoration: none; border-bottom: .5px solid rgba(245,166,35,.35); transition: border-color .2s; }
.link-inline:hover { border-color: var(--cor-primaria); }

/* ── SIDEBAR ── */
.policy-sidebar { background: var(--cor-superficie-2); border: .5px solid var(--cor-borda); padding: 28px; position: sticky; top: calc(var(--navbar-h, 88px) + 20px); align-self: start; display: flex; flex-direction: column; }
.policy-sidebar h4 { font-size: 8px; letter-spacing: .5em; text-transform: uppercase; color: var(--cor-primaria); margin-bottom: 20px; padding-bottom: 12px; border-bottom: .5px solid var(--cor-borda); opacity: .8; }
.policy-sidebar ul { list-style: none; padding: 0; margin: 0 0 24px; }
.policy-sidebar li { margin-bottom: 2px; }
.sidebar-link { display: flex; align-items: center; gap: 10px; padding: 9px 0; font-size: 12px; color: var(--cor-texto-2); text-decoration: none; transition: all .2s; position: relative; }
.sidebar-link::before { content: ''; position: absolute; left: -14px; top: 50%; transform: translateY(-50%); width: .5px; height: 0; background: var(--cor-primaria); transition: height .25s; }
.sidebar-link:hover::before, .sidebar-link--active::before { height: 60%; }
.sidebar-link:hover { color: var(--cor-primaria); transform: translateX(4px); }
.sidebar-link--active { color: var(--cor-primaria); font-weight: 600; }
.sidebar-link svg { flex-shrink: 0; opacity: .5; transition: opacity .2s; }
.sidebar-link:hover svg, .sidebar-link--active svg { opacity: 1; }

.sidebar-status { display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(255,255,255,.03); border: .5px solid var(--cor-borda); margin-bottom: 20px; }
.sidebar-status__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.sidebar-status__dot.is-online { background: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,.2); animation: pulseGreen 2s ease-in-out infinite; }
@keyframes pulseGreen { 0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,.3) } 50% { box-shadow: 0 0 0 5px rgba(34,197,94,0) } }
.sidebar-status__titulo { font-size: 11px; font-weight: 600; color: var(--cor-texto-2); }
.sidebar-status__hora { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--cor-primaria); opacity: .6; }

.sidebar-faq-mini { margin-bottom: 20px; border-top: .5px solid var(--cor-borda); padding-top: 16px; }
.sidebar-faq-mini__titulo { font-size: 9px; letter-spacing: .25em; text-transform: uppercase; color: var(--cor-texto-3); margin-bottom: 10px; }
.sfm-item { border-bottom: .5px solid rgba(255,255,255,.04); }
.sfm-item:last-child { border-bottom: none; }
.sfm-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px; background: none; border: none; padding: 9px 0; font-size: 11px; color: var(--cor-texto-2); text-align: left; cursor: pointer; }
.sfm-q svg { flex-shrink: 0; color: var(--cor-texto-3); transition: transform .25s; }
.sfm-q:hover { color: var(--cor-primaria); }
.sfm-a { font-size: 10.5px; color: var(--cor-texto-3); line-height: 1.7; padding: 0 0 10px; }

.back-home { margin-top: 0; }
.btn-back { display: inline-flex; align-items: center; gap: 8px; background: transparent; border: .5px solid var(--cor-borda); border-radius: 40px; padding: 8px 16px; font-size: 10px; font-weight: 500; letter-spacing: .15em; color: var(--cor-primaria); text-decoration: none; transition: all .2s; }
.btn-back:hover { background: rgba(245,166,35,.06); transform: translateX(-4px); border-color: var(--cor-primaria); }

/* ── TRANSIÇÕES ── */
.fade-enter-active, .fade-leave-active { transition: opacity .25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.faq-drop-enter-active, .faq-drop-leave-active { transition: opacity .25s, max-height .3s; overflow: hidden; }
.faq-drop-enter-from, .faq-drop-leave-to { opacity: 0; max-height: 0; }
.faq-drop-enter-to, .faq-drop-leave-from { opacity: 1; max-height: 200px; }

/* ── UTILITÁRIOS ── */
.cf-spin { width: 14px; height: 14px; border: 2px solid rgba(0,0,0,.2); border-top-color: #0A0A0A; border-radius: 50%; animation: cfSpin .7s linear infinite; }
@keyframes cfSpin { to { transform: rotate(360deg); } }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .policy-container, .policy-hero-content { padding-left: 28px; padding-right: 28px; }
}
@media (max-width: 900px) {
  .policy-container { grid-template-columns: 1fr; gap: 40px; }
  .policy-sidebar { position: static; }
  .prazo-grid, .regioes-grid { grid-template-columns: 1fr; }
  .encomenda-card__grid { grid-template-columns: 1fr; }
  .encomenda-card__item:nth-child(odd) { border-right: none; }
  .encomenda-card__item:nth-last-child(-n+2) { border-bottom: .5px solid rgba(255,255,255,.05); }
  .encomenda-card__item:last-child { border-bottom: none; }
  .policy-hero-kamon { display: none; }
}
@media (max-width: 600px) {
  .policy-container, .policy-hero-content { padding-left: 20px; padding-right: 20px; }
  .hero-stats { flex-direction: column; gap: 16px; }
  .hero-stat-sep { display: none; }
  .verif-row { flex-direction: column; }
  .btn-gold-policy { min-width: 100%; padding: 12px; }
}
</style>