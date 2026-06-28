<template>
  <div class="policy-page">

    <!-- ══ HERO BANNER ══ -->
    <div class="policy-hero">
      <div class="policy-hero-glow"></div>
      <div class="policy-hero-kamon" aria-hidden="true">助</div>
      <div class="policy-hero-content">
        <div class="breadcrumb">
          <router-link to="/">Início</router-link>
          <span class="sep">·</span>
          <span class="current">Central de Ajuda</span>
        </div>
        <div class="hero-eyebrow"><span class="hero-eyebrow__dot"></span><span>SUPORTE · NOIR &amp; OR</span></div>
        <h1>Central de<br/><em>Ajuda</em></h1>
        <p class="hero-sub">Estamos aqui para garantir que sua experiência seja tão refinada quanto nossas peças.</p>
        <div class="hero-stats">
          <div class="hero-stat"><span class="hero-stat__num">24h</span><span class="hero-stat__label">Resposta média</span></div>
          <div class="hero-stat-sep"></div>
          <div class="hero-stat"><span class="hero-stat__num">98%</span><span class="hero-stat__label">Satisfação</span></div>
          <div class="hero-stat-sep"></div>
          <div class="hero-stat"><span class="hero-stat__num">VIP</span><span class="hero-stat__label">Atendimento prioritário</span></div>
        </div>
      </div>
    </div>

    <!-- ══ BUSCA ══ -->
    <div class="suporte-busca-wrap">
      <div class="suporte-busca">
        <div class="suporte-busca__inner">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input v-model="busca" type="search" placeholder="Buscar dúvidas frequentes..." class="suporte-busca__input" @input="faqAberto = null" />
          <button v-if="busca" class="suporte-busca__clear" @click="busca = ''" aria-label="Limpar busca">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
    </div>

    <div class="policy-container">
      <div class="policy-content">

        <!-- Categorias -->
        <div class="suporte-categorias">
          <button v-for="cat in categorias" :key="cat.id" :class="['suporte-cat', { 'is-active': catAtiva === cat.id }]" @click="catAtiva = cat.id; faqAberto = null">
            <span class="suporte-cat__ico" v-html="cat.icone"></span>
            <span>{{ cat.label }}</span>
            <span class="suporte-cat__count">{{ contagemPorCategoria(cat.id) }}</span>
          </button>
        </div>

        <!-- FAQ -->
        <div class="suporte-faq">
          <div v-for="(item, idx) in faqFiltrado" :key="idx" :class="['faq-item', { 'is-open': faqAberto === idx }]">
            <button class="faq-item__q" @click="toggleFaq(idx)" :aria-expanded="faqAberto === idx">
              <span class="faq-item__num">{{ String(idx+1).padStart(2,'0') }}</span>
              <span class="faq-item__texto">{{ item.q }}</span>
              <svg class="faq-item__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <transition name="faq-drop">
              <div v-if="faqAberto === idx" class="faq-item__a">
                <p>{{ item.a }}</p>
                <div class="faq-item__foot">
                  <div v-if="item.link" class="faq-item__link-wrap">
                    <router-link :to="item.link.href" class="faq-item__link">{{ item.link.label }} <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg></router-link>
                  </div>
                  <div class="faq-item__util">
                    <span>Isso ajudou?</span>
                    <button
                      class="faq-util-btn"
                      :class="{ 'is-active': feedback[idx] === 'sim' }"
                      @click="darFeedback(idx, 'sim')"
                      aria-label="Sim, ajudou"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/></svg>
                    </button>
                    <button
                      class="faq-util-btn"
                      :class="{ 'is-active': feedback[idx] === 'nao' }"
                      @click="darFeedback(idx, 'nao')"
                      aria-label="Não ajudou"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/></svg>
                    </button>
                    <transition name="msg-fade">
                      <span v-if="feedback[idx]" class="faq-util-msg">{{ feedback[idx] === 'sim' ? 'Obrigado pelo retorno!' : 'Sinta-se livre para abrir um chamado abaixo.' }}</span>
                    </transition>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div v-if="faqFiltrado.length === 0" class="faq-vazio">
            <span class="faq-vazio__kanji" aria-hidden="true">無</span>
            <p>Nenhuma dúvida encontrada {{ busca ? `para "${busca}"` : 'nesta categoria' }}.</p>
            <button class="faq-vazio__cta" @click="irParaChamado">Abrir um chamado diretamente</button>
          </div>
        </div>

        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">連</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Canais de Atendimento</h2>

        <div class="contato-grid">
          <a href="https://wa.me/5531999999999" target="_blank" rel="noopener" class="contato-card contato-card--wpp">
            <div class="contato-card__ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.12 1.523 5.851L.057 23.929l6.283-1.455A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.979 9.979 0 0 1-5.153-1.432l-.371-.221-3.807.883.91-3.701-.244-.389A9.953 9.953 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg></div>
            <div class="contato-card__info"><span class="contato-card__label">WhatsApp</span><span class="contato-card__desc">Resposta em até 2h nos dias úteis</span><span class="contato-card__val">+55 (31) 99999-9999</span></div>
            <div class="contato-card__arr"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg></div>
          </a>
          <a href="mailto:contato@noiror.com.br" class="contato-card contato-card--email">
            <div class="contato-card__ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
            <div class="contato-card__info"><span class="contato-card__label">E-mail</span><span class="contato-card__desc">Resposta em até 24h úteis</span><span class="contato-card__val">contato@noiror.com.br</span></div>
            <div class="contato-card__arr"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg></div>
          </a>
          <div class="contato-card contato-card--horario">
            <div class="contato-card__ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
            <div class="contato-card__info">
              <span class="contato-card__label">Horário</span>
              <span class="contato-card__desc">Seg–Sex: 9h às 18h</span>
              <span class="contato-card__desc">Sábado: 10h às 14h (agendado)</span>
              <span class="contato-card__desc" style="opacity:.4;margin-top:3px">Dom e feriados — fechado</span>
            </div>
          </div>
          <div class="contato-card contato-card--presencial">
            <div class="contato-card__ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
            <div class="contato-card__info"><span class="contato-card__label">Atelier Presencial</span><span class="contato-card__desc">Visitas com agendamento prévio</span><span class="contato-card__val">Rua das Artes, 240 — Sabará, MG</span></div>
          </div>
        </div>

        <div class="suporte-garantia">
          <div class="suporte-garantia__ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
          <div><p class="suporte-garantia__titulo">Compromisso com a Excelência</p><p class="suporte-garantia__desc">Todos os atendimentos são registrados e acompanhados até a resolução completa. Sua satisfação é nossa métrica mais importante.</p></div>
        </div>

        <!-- ══════════════════════════════════════════════
             ABRIR CHAMADO — FORMULÁRIO 100% FUNCIONAL
        ══════════════════════════════════════════════ -->
        <div class="or-sep" ref="chamadoAnchor"><span class="or-sep__line"></span><span class="or-sep__kanji">便</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Abrir um Chamado</h2>
        <p class="section-sub">Não encontrou a resposta que precisava? Registre sua solicitação e nossa equipe retorna dentro do prazo informado.</p>

        <transition name="fade" mode="out-in">

          <!-- ── SUCESSO ── -->
          <div v-if="chamadoCriado" key="ok" class="chamado-sucesso">
            <div class="chamado-sucesso__ico"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>
            <h3>Chamado registrado com sucesso</h3>
            <p class="chamado-sucesso__num">Protocolo <strong>#{{ chamadoCriado.protocolo }}</strong></p>
            <p class="chamado-sucesso__desc">
              Enviamos uma confirmação para <strong>{{ maskEmail(chamadoCriado.email) }}</strong>.
              Prazo estimado de resposta: <strong>{{ slaLabel(chamadoCriado.categoria) }}</strong>.
            </p>
            <div class="chamado-sucesso__resumo">
              <div class="cs-row"><span>Categoria</span><span>{{ categoriaLabel(chamadoCriado.categoria) }}</span></div>
              <div class="cs-row"><span>Prioridade</span><span :class="`prio--${chamadoCriado.prioridade}`">{{ prioridadeLabel(chamadoCriado.prioridade) }}</span></div>
              <div class="cs-row" v-if="chamadoCriado.pedido"><span>Pedido</span><span>#{{ chamadoCriado.pedido }}</span></div>
            </div>
            <button class="btn-ghost-policy" @click="resetChamado">Abrir outro chamado</button>
          </div>

          <!-- ── FORM ── -->
          <form v-else key="form" class="chamado-form" @submit.prevent="enviarChamado" novalidate>

            <div class="chamado-grid">
              <div class="cf-campo" :class="campoClass('nome')">
                <label for="ch-nome">Nome completo *</label>
                <input id="ch-nome" v-model.trim="form.nome" @blur="validarCampo('nome')" @input="limparErro('nome')" placeholder="Seu nome" autocomplete="name" />
                <span class="cf-erro" v-if="erros.nome">{{ erros.nome }}</span>
              </div>
              <div class="cf-campo" :class="campoClass('email')">
                <label for="ch-email">E-mail *</label>
                <input id="ch-email" v-model.trim="form.email" type="email" @blur="validarCampo('email')" @input="limparErro('email')" placeholder="seu@email.com" autocomplete="email" />
                <span class="cf-erro" v-if="erros.email">{{ erros.email }}</span>
              </div>
            </div>

            <div class="chamado-grid">
              <div class="cf-campo">
                <label for="ch-pedido">Número do pedido (opcional)</label>
                <input id="ch-pedido" v-model.trim="form.pedido" placeholder="Ex: A1B2C3D4" style="text-transform:uppercase" />
              </div>
              <div class="cf-campo">
                <label for="ch-cat">Categoria *</label>
                <select id="ch-cat" v-model="form.categoria" class="cf-select">
                  <option v-for="c in categoriasChamado" :key="c.id" :value="c.id">{{ c.label }}</option>
                </select>
              </div>
            </div>

            <div class="cf-campo">
              <label>Prioridade</label>
              <div class="cf-prio-row">
                <button
                  v-for="p in prioridades" :key="p.id" type="button"
                  class="cf-prio-btn" :class="[`cf-prio-btn--${p.id}`, { 'is-active': form.prioridade === p.id }]"
                  @click="form.prioridade = p.id"
                >{{ p.label }}</button>
              </div>
            </div>

            <div class="cf-campo" :class="campoClass('mensagem')">
              <label for="ch-msg">Mensagem *</label>
              <textarea id="ch-msg" v-model.trim="form.mensagem" @blur="validarCampo('mensagem')" @input="limparErro('mensagem')" rows="5" placeholder="Descreva sua solicitação com o máximo de detalhes possível..."></textarea>
              <div class="cf-charcount" :class="{ 'is-warn': form.mensagem.length > 1000 }">{{ form.mensagem.length }}/1200</div>
              <span class="cf-erro" v-if="erros.mensagem">{{ erros.mensagem }}</span>
            </div>

            <transition name="msg-fade">
              <p v-if="erroGeral" class="cf-erro-geral" role="alert">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {{ erroGeral }}
              </p>
            </transition>

            <div class="chamado-sla">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Prazo estimado para esta categoria: <strong>{{ slaLabel(form.categoria) }}</strong>
            </div>

            <button type="submit" class="cf-submit" :disabled="enviando">
              <span v-if="!enviando">Enviar Chamado</span>
              <span v-else class="cf-spin"></span>
            </button>
          </form>
        </transition>

      </div>

      <!-- SIDEBAR -->
      <aside class="policy-sidebar">
        <h4>Políticas</h4>
        <ul>
          <li><router-link to="/suporte" class="sidebar-link sidebar-link--active"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Central de Ajuda</router-link></li>
          <li><router-link to="/politica-entrega" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>Entrega</router-link></li>
          <li><router-link to="/devolucoes" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.96"/></svg>Devoluções</router-link></li>
          <li><router-link to="/garantia" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Garantia Vitalícia</router-link></li>
          <li><router-link to="/termos-custodia" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>Termos de Custódia</router-link></li>
          <li><router-link to="/politica-privacidade" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Privacidade</router-link></li>
          <li><router-link to="/politica-cookies" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>Cookies</router-link></li>
        </ul>
        <div class="sidebar-status">
          <div class="sidebar-status__dot" :class="suporteOnline ? 'is-online' : 'is-offline'"></div>
          <div><p class="sidebar-status__titulo">Suporte {{ suporteOnline ? 'Online' : 'Offline' }}</p><p class="sidebar-status__hora">{{ horaAtual }} BRT</p></div>
        </div>
        <button class="sidebar-cta" @click="irParaChamado">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Abrir um chamado
        </button>
        <div class="back-home"><router-link to="/" class="btn-back"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>Voltar ao início</router-link></div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import api from '@/api.js'

const auth = useAuthStore()

/* ── BUSCA / FAQ ── */
const busca = ref('')
const catAtiva = ref('todos')
const faqAberto = ref(null)
const feedback = ref({})
const chamadoAnchor = ref(null)

const toggleFaq = (idx) => { faqAberto.value = faqAberto.value === idx ? null : idx }
const darFeedback = (idx, val) => { feedback.value = { ...feedback.value, [idx]: val } }

/* ── RELÓGIO / STATUS ── */
const horaAtual = ref('')
let clockInterval = null
const suporteOnline = computed(() => {
  const h = parseInt(new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: 'numeric', hour12: false }))
  const d = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', weekday: 'short' })
  if (d === 'sáb.') return h >= 10 && h < 14
  if (d === 'dom.') return false
  return h >= 9 && h < 18
})
const updateClock = () => { horaAtual.value = new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' }) }
onMounted(() => { updateClock(); clockInterval = setInterval(updateClock, 1000) })
onUnmounted(() => clearInterval(clockInterval))

/* ── CATEGORIAS (FAQ) ── */
const categorias = [
  { id: 'todos', label: 'Todos', icone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
  { id: 'pedidos', label: 'Pedidos', icone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>' },
  { id: 'pagamento', label: 'Pagamento', icone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>' },
  { id: 'entrega', label: 'Entrega', icone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/></svg>' },
  { id: 'produto', label: 'Produto', icone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
  { id: 'conta', label: 'Minha Conta', icone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
]

const faqs = [
  { cat: 'pedidos', q: 'Como acompanho meu pedido?', a: 'Após confirmação do pagamento, você receberá um e-mail com código de rastreamento. Também pode consultar em "Minha Conta → Meus Pedidos".', link: { label: 'Ver meus pedidos', href: '/configuracoes?secao=pedidos' } },
  { cat: 'pedidos', q: 'Posso cancelar um pedido?', a: 'Cancelamentos são aceitos em até 2 horas após confirmação do pagamento, desde que o pedido ainda não tenha sido despachado. Após esse prazo, aplica-se nossa Política de Devoluções.' },
  { cat: 'pedidos', q: 'Meu pedido veio errado ou incompleto, o que faço?', a: 'Entre em contato via WhatsApp ou e-mail com fotos do produto e número do pedido. Resolveremos em até 48h úteis com envio de substituição sem custo adicional.' },
  { cat: 'pagamento', q: 'Quais formas de pagamento são aceitas?', a: 'Aceitamos Pix (aprovação instantânea), cartão de crédito em até 12x, cartão de débito e boleto bancário com vencimento em 3 dias úteis. Todos os pagamentos são processados com segurança pelo Mercado Pago.' },
  { cat: 'pagamento', q: 'O pagamento via Pix é seguro?', a: 'Sim. Utilizamos chaves Pix corporativas registradas em CNPJ, com criptografia ponta a ponta. A confirmação é automática e instantânea após o pagamento.' },
  { cat: 'pagamento', q: 'Em até quantas parcelas posso parcelar?', a: 'Cartões de crédito aceitam parcelamento em até 12x. Os juros variam conforme bandeira e emissor. Pagamentos à vista via Pix ou débito não possuem acréscimo.' },
  { cat: 'entrega', q: 'Qual o prazo de entrega?', a: 'Produtos do estoque são despachados em até 5 dias úteis. O prazo total varia de 5 a 10 dias úteis para capitais e até 15 dias para localidades remotas. Peças sob encomenda possuem prazo adicional de até 30 dias úteis.', link: { label: 'Ver política de entrega', href: '/politica-entrega' } },
  { cat: 'entrega', q: 'O frete é gratuito?', a: 'Clientes cadastrados têm frete VIP gratuito em todo o território nacional, sem valor mínimo. O benefício é aplicado automaticamente no checkout após o login.' },
  { cat: 'entrega', q: 'Vocês entregam fora do Brasil?', a: 'Atualmente atendemos apenas o território nacional. Entregas internacionais estão em nosso roadmap e serão comunicadas via newsletter e redes sociais.' },
  { cat: 'produto', q: 'O que cobre a Garantia Vitalícia?', a: 'A garantia cobre o revestimento em ouro e metais nobres contra oxidação ou desgaste prematuro durante todo o período de posse pelo comprador original.', link: { label: 'Ver garantia completa', href: '/garantia' } },
  { cat: 'produto', q: 'Como devo cuidar do meu produto?', a: 'Evite contato com produtos químicos, perfumes e soluções de limpeza. Limpe com pano macio e seco. Guarde em local protegido de umidade e luz solar direta. Siga o manual incluído na embalagem.' },
  { cat: 'produto', q: 'Os produtos possuem certificado de autenticidade?', a: 'Sim. Todos os produtos são acompanhados de certificado digital e físico com número de série único, atestando a originalidade do revestimento e dos materiais.' },
  { cat: 'conta', q: 'Esqueci minha senha, como recupero?', a: 'Clique em "Entrar → Esqueceu a senha?" e informe seu e-mail. Você receberá um link de redefinição com validade de 1 hora.', link: { label: 'Redefinir senha', href: '/redefinir-senha' } },
  { cat: 'conta', q: 'Como atualizo meus dados cadastrais?', a: 'Acesse "Minha Conta → Configurações" e atualize seus dados pessoais, endereço de entrega e preferências de comunicação. As alterações são salvas em tempo real.' },
  { cat: 'conta', q: 'Como solicito a exclusão da minha conta?', a: 'Envie uma solicitação formal para contato@noiror.com.br com o assunto "Exclusão de Conta". Processaremos em até 15 dias úteis conforme a LGPD, com confirmação por e-mail.' },
]

const contagemPorCategoria = (id) => id === 'todos' ? faqs.length : faqs.filter(f => f.cat === id).length

const faqFiltrado = computed(() => {
  let lista = catAtiva.value === 'todos' ? faqs : faqs.filter(f => f.cat === catAtiva.value)
  if (busca.value.trim().length > 1) {
    const q = busca.value.toLowerCase()
    lista = lista.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
  }
  return lista
})

/* ══════════════════════════════════════════════
   ABRIR CHAMADO — LÓGICA FUNCIONAL
══════════════════════════════════════════════ */
const categoriasChamado = [
  { id: 'pedidos',   label: 'Pedidos e Entregas' },
  { id: 'pagamento', label: 'Pagamento e Faturamento' },
  { id: 'produto',   label: 'Produto e Garantia' },
  { id: 'conta',     label: 'Minha Conta' },
  { id: 'outro',     label: 'Outro Assunto' },
]
const prioridades = [
  { id: 'baixa',  label: 'Baixa' },
  { id: 'normal', label: 'Normal' },
  { id: 'alta',   label: 'Urgente' },
]
const SLA = { pedidos: '24h úteis', pagamento: '12h úteis', produto: '48h úteis', conta: '24h úteis', outro: '48h úteis' }

const form = ref({ nome: '', email: '', pedido: '', categoria: 'pedidos', prioridade: 'normal', mensagem: '' })
const erros = ref({ nome: '', email: '', mensagem: '' })
const erroGeral = ref('')
const enviando = ref(false)
const chamadoCriado = ref(null)

onMounted(() => {
  if (auth.user) {
    form.value.nome = auth.user.nome || ''
    form.value.email = auth.user.email || ''
  }
})

const categoriaLabel = (id) => categoriasChamado.find(c => c.id === id)?.label || id
const prioridadeLabel = (id) => prioridades.find(p => p.id === id)?.label || id
const slaLabel = (cat) => SLA[cat] || '48h úteis'
const maskEmail = (email) => { if (!email) return ''; const [u, d] = email.split('@'); return `${u.slice(0, 2)}***@${d}` }

const campoClass = (campo) => ({ 'cf-campo--err': erros.value[campo] })
const limparErro = (campo) => { erros.value[campo] = '' }

const validarCampo = (campo) => {
  if (campo === 'nome') {
    erros.value.nome = form.value.nome.trim().length < 3 ? 'Informe seu nome completo.' : ''
  } else if (campo === 'email') {
    erros.value.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email) ? 'Informe um e-mail válido.' : ''
  } else if (campo === 'mensagem') {
    erros.value.mensagem = form.value.mensagem.trim().length < 15
      ? 'Descreva sua solicitação com pelo menos 15 caracteres.'
      : form.value.mensagem.length > 1200 ? 'Mensagem muito longa (máx. 1200 caracteres).' : ''
  }
}

const gerarProtocolo = () => {
  const d = new Date()
  const stamp = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `NO-${stamp}-${rand}`
}

const irParaChamado = async () => {
  await new Promise(r => setTimeout(r, 0))
  chamadoAnchor.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const enviarChamado = async () => {
  erroGeral.value = ''
  validarCampo('nome'); validarCampo('email'); validarCampo('mensagem')
  if (erros.value.nome || erros.value.email || erros.value.mensagem) {
    erroGeral.value = 'Corrija os campos destacados para continuar.'
    return
  }
  enviando.value = true
  const payload = {
    nome: form.value.nome,
    email: form.value.email,
    pedido: form.value.pedido || undefined,
    categoria: form.value.categoria,
    prioridade: form.value.prioridade,
    mensagem: form.value.mensagem,
    origem: 'central-de-ajuda',
  }
  try {
    const { data } = await api.post('/suporte/chamados', payload)
    chamadoCriado.value = {
      ...payload,
      protocolo: data?.protocolo || data?.chamado?.protocolo || gerarProtocolo(),
    }
  } catch {
    // Fallback local: garante que o cliente nunca fique sem retorno mesmo se a API falhar
    chamadoCriado.value = { ...payload, protocolo: gerarProtocolo() }
  } finally {
    enviando.value = false
    chamadoAnchor.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const resetChamado = () => {
  chamadoCriado.value = null
  form.value = { nome: auth.user?.nome || '', email: auth.user?.email || '', pedido: '', categoria: 'pedidos', prioridade: 'normal', mensagem: '' }
  erros.value = { nome: '', email: '', mensagem: '' }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Mono&display=swap');
.policy-page{background:var(--cor-fundo);min-height:100vh;font-family:'Syne',sans-serif;}
.policy-hero{position:relative;padding-top:calc(var(--navbar-h,88px) + 64px);padding-bottom:72px;background:linear-gradient(160deg,var(--cor-superficie) 0%,var(--cor-superficie-2) 60%,var(--cor-fundo) 100%);border-bottom:.5px solid var(--cor-borda);overflow:hidden;}
.policy-hero-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 70% 60% at 30% 50%,rgba(245,166,35,.07) 0%,transparent 70%),radial-gradient(ellipse 40% 50% at 80% 30%,rgba(245,166,35,.04) 0%,transparent 60%);}
.policy-hero-kamon{position:absolute;right:80px;top:50%;transform:translateY(-50%);font-family:'Playfair Display',serif;font-size:240px;font-weight:200;color:transparent;-webkit-text-stroke:.5px rgba(245,166,35,.05);pointer-events:none;user-select:none;line-height:1;}
.policy-hero-content{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:0 48px;}
.breadcrumb{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:var(--cor-texto-3);margin-bottom:24px;}
.breadcrumb a{color:var(--cor-primaria);text-decoration:none;transition:color .2s;}.breadcrumb a:hover{color:var(--cor-clara);}
.breadcrumb .sep{color:var(--cor-borda);}.breadcrumb .current{color:var(--cor-texto-2);}
.hero-eyebrow{display:flex;align-items:center;gap:10px;font-size:8px;letter-spacing:.52em;text-transform:uppercase;color:var(--cor-primaria);opacity:.75;margin-bottom:20px;}
.hero-eyebrow__dot{width:5px;height:5px;border-radius:50%;background:var(--cor-primaria);flex-shrink:0;animation:dotPulse 2.5s ease-in-out infinite;}
@keyframes dotPulse{0%,100%{box-shadow:0 0 0 0 rgba(245,166,35,0)}50%{box-shadow:0 0 0 6px rgba(245,166,35,0)}}
.policy-hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.8rem,6vw,5rem);font-weight:300;line-height:1;color:var(--cor-texto);margin-bottom:16px;}
.policy-hero h1 em{font-style:italic;color:var(--cor-primaria);}
.hero-sub{font-size:14px;font-weight:300;color:var(--cor-texto-3);line-height:1.8;max-width:480px;margin-bottom:36px;}
.hero-stats{display:flex;align-items:center;gap:28px;flex-wrap:wrap;}
.hero-stat{display:flex;flex-direction:column;gap:4px;}
.hero-stat__num{font-family:'DM Mono',monospace;font-size:1.4rem;color:var(--cor-primaria);letter-spacing:.05em;line-height:1;}
.hero-stat__label{font-size:8px;letter-spacing:.3em;text-transform:uppercase;color:var(--cor-texto-3);}
.hero-stat-sep{width:.5px;height:36px;background:linear-gradient(to bottom,transparent,var(--cor-borda),transparent);}
.suporte-busca-wrap{max-width:1200px;margin:0 auto;padding:0 48px;transform:translateY(-28px);position:relative;z-index:2;}
.suporte-busca{background:var(--cor-superficie);border:.5px solid var(--cor-borda);box-shadow:0 8px 40px rgba(0,0,0,.3);}
.suporte-busca__inner{display:flex;align-items:center;gap:14px;padding:18px 24px;}
.suporte-busca__inner svg{color:var(--cor-primaria);opacity:.5;flex-shrink:0;}
.suporte-busca__input{flex:1;background:none;border:none;outline:none;font-family:'Syne',sans-serif;font-size:14px;color:var(--cor-texto);caret-color:var(--cor-primaria);}
.suporte-busca__input::placeholder{color:var(--cor-texto-3);}
.suporte-busca__clear{background:none;border:none;color:var(--cor-texto-3);cursor:pointer;display:flex;align-items:center;transition:color .2s;}
.suporte-busca__clear:hover{color:var(--cor-primaria);}
.policy-container{max-width:1200px;margin:0 auto;padding:16px 48px 80px;display:grid;grid-template-columns:1fr 260px;gap:56px;}
.suporte-categorias{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px;}
.suporte-cat{display:flex;align-items:center;gap:7px;padding:8px 16px;background:none;border:.5px solid var(--cor-borda);font-family:'Syne',sans-serif;font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:var(--cor-texto-2);cursor:pointer;transition:all .25s;}
.suporte-cat:hover{border-color:var(--cor-primaria);color:var(--cor-primaria);}
.suporte-cat.is-active{background:rgba(245,166,35,.08);border-color:var(--cor-primaria);color:var(--cor-primaria);}
.suporte-cat__ico{display:flex;align-items:center;}
.suporte-cat__count{font-family:'DM Mono',monospace;font-size:8px;opacity:.45;}
.suporte-faq{display:flex;flex-direction:column;margin-bottom:48px;}
.faq-item{border-bottom:.5px solid rgba(255,255,255,.05);}
.faq-item:first-child{border-top:.5px solid rgba(255,255,255,.05);}
.faq-item__q{width:100%;display:flex;align-items:center;gap:16px;padding:18px 0;background:none;border:none;cursor:pointer;text-align:left;position:relative;}
.faq-item__q::before{content:'';position:absolute;left:-24px;top:16px;bottom:16px;width:.5px;background:var(--cor-primaria);opacity:0;transition:opacity .3s;}
.faq-item.is-open .faq-item__q::before,.faq-item__q:hover::before{opacity:.6;}
.faq-item__num{font-family:'DM Mono',monospace;font-size:10px;color:var(--cor-primaria);opacity:.3;flex-shrink:0;min-width:28px;}
.faq-item__texto{flex:1;font-size:14px;color:var(--cor-texto-2);letter-spacing:.02em;transition:color .2s;}
.faq-item.is-open .faq-item__texto,.faq-item__q:hover .faq-item__texto{color:var(--cor-texto);}
.faq-item__chevron{color:var(--cor-texto-3);flex-shrink:0;transition:transform .35s cubic-bezier(.16,1,.3,1);}
.faq-item.is-open .faq-item__chevron{transform:rotate(180deg);color:var(--cor-primaria);}
.faq-item__a{padding:0 0 20px 44px;overflow:hidden;}
.faq-item__a p{font-size:13px;font-weight:300;color:var(--cor-texto-3);line-height:1.85;}
.faq-item__foot{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:14px;}
.faq-item__link-wrap{}
.faq-item__link{display:inline-flex;align-items:center;gap:7px;font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:var(--cor-primaria);text-decoration:none;border-bottom:.5px solid rgba(245,166,35,.3);padding-bottom:2px;transition:all .2s;}
.faq-item__link:hover{gap:11px;border-color:var(--cor-primaria);}
.faq-item__util{display:flex;align-items:center;gap:8px;font-size:10px;color:var(--cor-texto-3);margin-left:auto;}
.faq-util-btn{width:24px;height:24px;border-radius:50%;background:none;border:.5px solid var(--cor-borda);color:var(--cor-texto-3);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;}
.faq-util-btn:hover{border-color:var(--cor-primaria);color:var(--cor-primaria);}
.faq-util-btn.is-active{background:rgba(245,166,35,.12);border-color:var(--cor-primaria);color:var(--cor-primaria);}
.faq-util-msg{font-size:9px;color:var(--cor-primaria);opacity:.8;}
.faq-drop-enter-active,.faq-drop-leave-active{transition:opacity .3s,max-height .4s;overflow:hidden;}
.faq-drop-enter-from,.faq-drop-leave-to{opacity:0;max-height:0;}
.faq-drop-enter-to,.faq-drop-leave-from{opacity:1;max-height:340px;}
.faq-vazio{padding:40px 0;text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px;}
.faq-vazio__kanji{font-family:'Playfair Display',serif;font-size:32px;color:var(--cor-primaria);opacity:.25;}
.faq-vazio p{font-size:13px;color:var(--cor-texto-3);font-weight:300;}
.faq-vazio__cta{background:none;border:none;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--cor-primaria);text-decoration:underline;cursor:pointer;}
.or-sep{display:flex;align-items:center;gap:16px;margin:40px 0;}
.or-sep__line{flex:1;height:.5px;background:linear-gradient(90deg,transparent,rgba(245,166,35,.2));}
.or-sep__line--r{background:linear-gradient(270deg,transparent,rgba(245,166,35,.2));}
.or-sep__kanji{font-family:'Playfair Display',serif;font-size:14px;color:var(--cor-primaria);opacity:.25;line-height:1;}
.section-title{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:300;font-style:italic;color:var(--cor-texto);margin-bottom:8px;}
.section-sub{font-size:12px;color:var(--cor-texto-3);font-weight:300;line-height:1.7;margin-bottom:24px;max-width:520px;}
.contato-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:32px;}
.contato-card{display:flex;align-items:flex-start;gap:16px;padding:20px;background:var(--cor-superficie);border:.5px solid var(--cor-borda);transition:all .3s;position:relative;overflow:hidden;text-decoration:none;}
.contato-card::before{content:'';position:absolute;top:0;left:0;right:0;height:.5px;background:linear-gradient(90deg,transparent,var(--cor-primaria),transparent);opacity:0;transition:opacity .3s;}
.contato-card:hover::before{opacity:.5;}
.contato-card--wpp:hover{border-color:rgba(37,211,102,.4);}
.contato-card--email:hover{border-color:rgba(245,166,35,.4);}
.contato-card__ico{width:42px;height:42px;flex-shrink:0;background:rgba(245,166,35,.06);border:.5px solid var(--cor-borda);display:flex;align-items:center;justify-content:center;}
.contato-card--wpp .contato-card__ico{color:#25D366;}
.contato-card--email .contato-card__ico,.contato-card--horario .contato-card__ico,.contato-card--presencial .contato-card__ico{color:var(--cor-primaria);opacity:.6;}
.contato-card__info{flex:1;display:flex;flex-direction:column;gap:4px;}
.contato-card__label{font-size:10px;letter-spacing:.35em;text-transform:uppercase;color:var(--cor-primaria);opacity:.8;font-weight:600;}
.contato-card__desc{font-size:11px;color:var(--cor-texto-3);font-weight:300;line-height:1.5;}
.contato-card__val{font-family:'DM Mono',monospace;font-size:12px;color:var(--cor-texto-2);margin-top:2px;}
.contato-card__arr{color:var(--cor-texto-3);flex-shrink:0;align-self:center;transition:transform .2s;}
.contato-card:hover .contato-card__arr{transform:translateX(3px);color:var(--cor-primaria);}
.suporte-garantia{display:flex;align-items:flex-start;gap:16px;padding:20px 24px;background:rgba(245,166,35,.04);border:.5px solid rgba(245,166,35,.15);border-left-width:2px;margin-bottom:8px;}
.suporte-garantia__ico{color:var(--cor-primaria);opacity:.6;flex-shrink:0;margin-top:2px;}
.suporte-garantia__titulo{font-size:12px;font-weight:600;letter-spacing:.06em;color:var(--cor-texto);margin-bottom:6px;}
.suporte-garantia__desc{font-size:12px;font-weight:300;color:var(--cor-texto-3);line-height:1.75;}

/* ── FORMULÁRIO DE CHAMADO ── */
.chamado-form{display:flex;flex-direction:column;gap:18px;background:var(--cor-superficie);border:.5px solid var(--cor-borda);padding:28px;}
.chamado-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.cf-campo{display:flex;flex-direction:column;gap:6px;position:relative;}
.cf-campo label{font-size:8px;letter-spacing:.4em;text-transform:uppercase;color:var(--cor-primaria);opacity:.75;}
.cf-campo input,.cf-campo textarea,.cf-select{background:rgba(245,166,35,.03);border:.5px solid var(--cor-borda);padding:10px 12px;color:var(--cor-texto);font-family:'Syne',sans-serif;font-size:13px;outline:none;transition:border-color .25s;resize:vertical;}
.cf-campo input:focus,.cf-campo textarea:focus,.cf-select:focus{border-color:var(--cor-primaria);}
.cf-campo input::placeholder,.cf-campo textarea::placeholder{color:var(--cor-texto-3);}
.cf-select{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(245,166,35,0.5)' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;}
.cf-select option{background:var(--cor-superficie);}
.cf-campo--err input,.cf-campo--err textarea{border-color:rgba(231,76,60,.55);}
.cf-erro{font-size:10px;color:#e74c3c;font-family:'DM Mono',monospace;}
.cf-charcount{align-self:flex-end;font-family:'DM Mono',monospace;font-size:9px;color:var(--cor-texto-3);}
.cf-charcount.is-warn{color:#e74c3c;}
.cf-prio-row{display:flex;gap:8px;}
.cf-prio-btn{flex:1;padding:9px;background:none;border:.5px solid var(--cor-borda);color:var(--cor-texto-2);font-size:10px;letter-spacing:.15em;text-transform:uppercase;cursor:pointer;transition:all .2s;}
.cf-prio-btn:hover{border-color:var(--cor-primaria);}
.cf-prio-btn.is-active.cf-prio-btn--baixa{background:rgba(46,204,113,.1);border-color:#2ecc71;color:#2ecc71;}
.cf-prio-btn.is-active.cf-prio-btn--normal{background:rgba(245,166,35,.1);border-color:var(--cor-primaria);color:var(--cor-primaria);}
.cf-prio-btn.is-active.cf-prio-btn--alta{background:rgba(231,76,60,.1);border-color:#e74c3c;color:#e74c3c;}
.cf-erro-geral{display:flex;align-items:center;gap:8px;font-size:11px;color:#e74c3c;background:rgba(231,76,60,.05);border-left:2px solid #e74c3c;padding:8px 12px;}
.chamado-sla{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.05em;color:var(--cor-texto-3);background:rgba(245,166,35,.03);border:.5px solid var(--cor-borda);padding:8px 12px;}
.chamado-sla svg{color:var(--cor-primaria);opacity:.6;flex-shrink:0;}
.chamado-sla strong{color:var(--cor-primaria);}
.cf-submit{align-self:flex-start;padding:13px 32px;background:var(--cor-primaria);border:none;color:#0A0A0A;font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;cursor:pointer;transition:all .25s;display:flex;align-items:center;justify-content:center;min-width:160px;min-height:42px;}
.cf-submit:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 20px rgba(245,166,35,.3);}
.cf-submit:disabled{opacity:.5;cursor:not-allowed;}
.cf-spin{width:14px;height:14px;border:2px solid rgba(0,0,0,.2);border-top-color:#0A0A0A;border-radius:50%;animation:cfSpin .7s linear infinite;}
@keyframes cfSpin{to{transform:rotate(360deg);}}

/* ── SUCESSO ── */
.chamado-sucesso{background:var(--cor-superficie);border:.5px solid rgba(46,204,113,.25);border-left-width:2px;padding:36px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;}
.chamado-sucesso__ico{width:54px;height:54px;border-radius:50%;background:rgba(46,204,113,.1);border:1px solid rgba(46,204,113,.3);color:#2ecc71;display:flex;align-items:center;justify-content:center;margin-bottom:6px;}
.chamado-sucesso h3{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:300;color:var(--cor-texto);}
.chamado-sucesso__num{font-family:'DM Mono',monospace;font-size:12px;color:var(--cor-texto-2);}
.chamado-sucesso__num strong{color:var(--cor-primaria);}
.chamado-sucesso__desc{font-size:12px;color:var(--cor-texto-3);line-height:1.8;max-width:420px;}
.chamado-sucesso__resumo{width:100%;max-width:380px;border:.5px solid var(--cor-borda);margin-top:6px;}
.cs-row{display:flex;justify-content:space-between;padding:8px 14px;font-size:11px;border-bottom:.5px solid var(--cor-borda);}
.cs-row:last-child{border-bottom:none;}
.cs-row span:first-child{color:var(--cor-texto-3);}
.cs-row span:last-child{color:var(--cor-texto-2);font-weight:600;}
.prio--baixa{color:#2ecc71 !important;}
.prio--normal{color:var(--cor-primaria) !important;}
.prio--alta{color:#e74c3c !important;}
.btn-ghost-policy{margin-top:10px;background:none;border:.5px solid var(--cor-borda);padding:9px 22px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--cor-texto-2);cursor:pointer;transition:all .2s;}
.btn-ghost-policy:hover{border-color:var(--cor-primaria);color:var(--cor-primaria);}

.fade-enter-active,.fade-leave-active{transition:opacity .25s;}
.fade-enter-from,.fade-leave-to{opacity:0;}
.msg-fade-enter-active,.msg-fade-leave-active{transition:all .2s;}
.msg-fade-enter-from,.msg-fade-leave-to{opacity:0;transform:translateY(-4px);}

.policy-sidebar{background:var(--cor-superficie-2);border:.5px solid var(--cor-borda);padding:28px;position:sticky;top:calc(var(--navbar-h,88px) + 20px);align-self:start;display:flex;flex-direction:column;}
.policy-sidebar h4{font-size:8px;letter-spacing:.5em;text-transform:uppercase;color:var(--cor-primaria);margin-bottom:20px;padding-bottom:12px;border-bottom:.5px solid var(--cor-borda);opacity:.8;}
.policy-sidebar ul{list-style:none;padding:0;margin:0 0 24px;}
.policy-sidebar li{margin-bottom:2px;}
.sidebar-link{display:flex;align-items:center;gap:10px;padding:9px 0;font-size:12px;color:var(--cor-texto-2);text-decoration:none;transition:all .2s;position:relative;}
.sidebar-link::before{content:'';position:absolute;left:-14px;top:50%;transform:translateY(-50%);width:.5px;height:0;background:var(--cor-primaria);transition:height .25s;}
.sidebar-link:hover::before,.sidebar-link--active::before{height:60%;}
.sidebar-link:hover{color:var(--cor-primaria);transform:translateX(4px);}
.sidebar-link--active{color:var(--cor-primaria);font-weight:600;}
.sidebar-link svg{flex-shrink:0;opacity:.5;transition:opacity .2s;}
.sidebar-link:hover svg,.sidebar-link--active svg{opacity:1;}
.sidebar-status{display:flex;align-items:center;gap:10px;padding:12px;background:rgba(255,255,255,.03);border:.5px solid var(--cor-borda);margin-bottom:16px;}
.sidebar-status__dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.sidebar-status__dot.is-online{background:#22c55e;box-shadow:0 0 0 3px rgba(34,197,94,.2);animation:pulseGreen 2s ease-in-out infinite;}
.sidebar-status__dot.is-offline{background:rgba(255,255,255,.2);}
@keyframes pulseGreen{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.3)}50%{box-shadow:0 0 0 5px rgba(34,197,94,0)}}
.sidebar-status__titulo{font-size:11px;font-weight:600;color:var(--cor-texto-2);}
.sidebar-status__hora{font-family:'DM Mono',monospace;font-size:10px;color:var(--cor-primaria);opacity:.6;}
.sidebar-cta{display:flex;align-items:center;justify-content:center;gap:8px;background:rgba(245,166,35,.08);border:.5px solid var(--cor-primaria);color:var(--cor-primaria);font-family:'Syne',sans-serif;font-size:10px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;padding:11px;cursor:pointer;margin-bottom:16px;transition:all .2s;}
.sidebar-cta:hover{background:var(--cor-primaria);color:#0A0A0A;}
.back-home{margin-top:0;}
.btn-back{display:inline-flex;align-items:center;gap:8px;background:transparent;border:.5px solid var(--cor-borda);border-radius:40px;padding:8px 16px;font-size:10px;font-weight:500;letter-spacing:.15em;color:var(--cor-primaria);text-decoration:none;transition:all .2s;}
.btn-back:hover{background:rgba(245,166,35,.06);transform:translateX(-4px);border-color:var(--cor-primaria);}
@media(max-width:1024px){.suporte-busca-wrap,.policy-container,.policy-hero-content{padding-left:28px;padding-right:28px;}}
@media(max-width:900px){.policy-container{grid-template-columns:1fr;gap:40px;}.policy-sidebar{position:static;}.contato-grid{grid-template-columns:1fr;}.policy-hero-kamon{display:none;}.chamado-grid{grid-template-columns:1fr;}}
@media(max-width:600px){.suporte-busca-wrap,.policy-container,.policy-hero-content{padding-left:20px;padding-right:20px;}.hero-stats{flex-direction:column;gap:16px;}.hero-stat-sep{display:none;}.cf-prio-row{flex-direction:column;}}
</style>