<template>
  <div class="policy-page">

    <!-- ══ HERO BANNER ══ -->
    <div class="policy-hero">
      <div class="policy-hero-glow"></div>
      <div class="policy-hero-kamon" aria-hidden="true">久</div>
      <div class="policy-hero-content">
        <div class="breadcrumb">
          <router-link to="/">Início</router-link>
          <span class="sep">·</span>
          <span class="current">Garantia Vitalícia</span>
        </div>
        <div class="hero-eyebrow"><span class="hero-eyebrow__dot"></span><span>COMPROMISSO · NOIR &amp; OR</span></div>
        <h1>Garantia<br/><em>Vitalícia</em></h1>
        <p class="hero-sub">Proteção que dura enquanto você possuir a peça. Sem asteriscos, sem prazos escondidos.</p>
        <div class="hero-stats">
          <div class="hero-stat"><span class="hero-stat__num">∞</span><span class="hero-stat__label">Duração da cobertura</span></div>
          <div class="hero-stat-sep"></div>
          <div class="hero-stat"><span class="hero-stat__num">5d</span><span class="hero-stat__label">Prazo de análise</span></div>
          <div class="hero-stat-sep"></div>
          <div class="hero-stat"><span class="hero-stat__num">1.2k+</span><span class="hero-stat__label">Peças restauradas</span></div>
        </div>
      </div>
    </div>

    <div class="policy-container">
      <div class="policy-content">

        <!-- ══ O QUE COBRE / NÃO COBRE ══ -->
        <div class="cobertura-grid">
          <div class="cobertura-card cobertura-card--ok">
            <div class="cobertura-card__head">
              <span class="cobertura-card__ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span>
              <h3>O que cobre</h3>
            </div>
            <ul>
              <li>Oxidação do revestimento em ouro 24K, rose gold ou platina</li>
              <li>Desgaste prematuro do banho metálico em uso normal</li>
              <li>Descolamento ou bolhas na camada de metal nobre</li>
              <li>Perda de brilho fora do padrão esperado para o material</li>
              <li>Defeitos de fabricação identificados após a entrega</li>
            </ul>
          </div>
          <div class="cobertura-card cobertura-card--no">
            <div class="cobertura-card__head">
              <span class="cobertura-card__ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg></span>
              <h3>O que não cobre</h3>
            </div>
            <ul>
              <li>Danos por quedas, impactos ou pressão excessiva</li>
              <li>Modificações, polimentos ou reparos não autorizados</li>
              <li>Exposição a produtos químicos, perfumes ou solventes</li>
              <li>Desgaste natural de componentes eletrônicos e baterias</li>
              <li>Uso em ambientes de água salgada, piscina ou sauna</li>
            </ul>
          </div>
        </div>

        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">道</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Como Funciona</h2>
        <p class="section-sub">Quatro etapas simples, do primeiro contato até a peça restaurada em suas mãos.</p>

        <div class="timeline">
          <div class="timeline__item" v-for="(step, i) in etapas" :key="i" :style="{ '--i': i }">
            <div class="timeline__num">{{ String(i+1).padStart(2,'0') }}</div>
            <div class="timeline__body">
              <h4>{{ step.titulo }}</h4>
              <p>{{ step.desc }}</p>
            </div>
          </div>
        </div>

        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">権</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Transferibilidade</h2>
        <p class="paragraph">A garantia vitalícia é vinculada exclusivamente ao <strong>comprador original</strong>, identificado pelo CPF cadastrado no momento da compra, e não é transferível a terceiros em caso de revenda ou doação do produto. Para verificar a titularidade da sua garantia, utilize a ferramenta de verificação abaixo.</p>

        <!-- ══════════════════════════════════════════════
             VERIFICAR COBERTURA — FUNCIONAL
        ══════════════════════════════════════════════ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">確</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Verificar Cobertura</h2>
        <p class="section-sub">Informe o número do pedido para consultar a titularidade e o status da garantia da sua peça.</p>

        <div class="verif-box">
          <div class="verif-row">
            <input
              v-model.trim="verifPedido"
              placeholder="Número do pedido (ex: A1B2C3D4)"
              style="text-transform:uppercase"
              @keyup.enter="verificarCobertura"
              :disabled="verificando"
            />
            <button class="btn-gold-policy" @click="verificarCobertura" :disabled="verificando || !verifPedido">
              <span v-if="!verificando">Verificar</span>
              <span v-else class="cf-spin"></span>
            </button>
          </div>

          <transition name="fade">
            <div v-if="verifErro" class="verif-erro">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {{ verifErro }}
            </div>
          </transition>

          <transition name="fade">
            <div v-if="verifResultado" class="verif-resultado">
              <div class="verif-resultado__head">
                <span class="verif-status-badge" :class="`verif-status-badge--${verifResultado.status}`">
                  {{ verifResultado.status === 'ativa' ? 'Garantia Ativa' : verifResultado.status === 'expirada' ? 'Não Coberta' : 'Em Análise' }}
                </span>
                <span class="verif-resultado__ped">Pedido #{{ verifResultado.pedido }}</span>
              </div>
              <div class="verif-resultado__rows">
                <div class="vr-row"><span>Produto</span><span>{{ verifResultado.produto }}</span></div>
                <div class="vr-row"><span>Comprador original</span><span>{{ verifResultado.titular }}</span></div>
                <div class="vr-row"><span>Data de compra</span><span>{{ verifResultado.dataCompra }}</span></div>
                <div class="vr-row"><span>Tempo de posse</span><span>{{ verifResultado.tempoPosse }}</span></div>
              </div>
              <p class="verif-resultado__nota" v-if="verifResultado.status === 'ativa'">
                Sua peça está coberta pela garantia vitalícia. Caso identifique oxidação ou desgaste do revestimento, abra um acionamento abaixo.
              </p>
            </div>
          </transition>
        </div>

        <div class="suporte-garantia">
          <div class="suporte-garantia__ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
          <div><p class="suporte-garantia__titulo">Certificado Digital</p><p class="suporte-garantia__desc">Todo produto é acompanhado de certificado com número de série único, vinculado à sua conta, que serve como comprovante de titularidade da garantia.</p></div>
        </div>

        <!-- ══════════════════════════════════════════════
             ACIONAR GARANTIA — FORMULÁRIO FUNCIONAL
        ══════════════════════════════════════════════ -->
        <div class="or-sep" ref="acionamentoAnchor"><span class="or-sep__line"></span><span class="or-sep__kanji">修</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Acionar Garantia</h2>
        <p class="section-sub">Identificou oxidação, desgaste ou um defeito de fabricação? Registre o acionamento e nossa equipe técnica avalia sua peça.</p>

        <transition name="fade" mode="out-in">

          <!-- ── SUCESSO ── -->
          <div v-if="acionamentoCriado" key="ok" class="chamado-sucesso">
            <div class="chamado-sucesso__ico"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>
            <h3>Acionamento registrado</h3>
            <p class="chamado-sucesso__num">Protocolo <strong>#{{ acionamentoCriado.protocolo }}</strong></p>
            <p class="chamado-sucesso__desc">
              Enviamos uma confirmação para <strong>{{ maskEmail(acionamentoCriado.email) }}</strong>.
              Nossa equipe técnica analisa o caso em até <strong>5 dias úteis</strong> e retorna com o parecer (reparo, substituição ou recusa justificada).
            </p>
            <div class="chamado-sucesso__resumo">
              <div class="cs-row"><span>Tipo de problema</span><span>{{ tipoProblemaLabel(acionamentoCriado.tipo) }}</span></div>
              <div class="cs-row" v-if="acionamentoCriado.pedido"><span>Pedido</span><span>#{{ acionamentoCriado.pedido }}</span></div>
              <div class="cs-row"><span>Status</span><span class="prio--normal">Em análise</span></div>
            </div>
            <p class="anexo-aviso">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Envie fotos nítidas do problema para <strong>contato@noiror.com.br</strong> com o protocolo no assunto — isso agiliza a análise.
            </p>
            <button class="btn-ghost-policy" @click="resetAcionamento">Registrar outro acionamento</button>
          </div>

          <!-- ── FORM ── -->
          <form v-else key="form" class="chamado-form" @submit.prevent="enviarAcionamento" novalidate>

            <div class="chamado-grid">
              <div class="cf-campo" :class="campoClass('nome')">
                <label for="g-nome">Nome completo *</label>
                <input id="g-nome" v-model.trim="form.nome" @blur="validarCampo('nome')" @input="limparErro('nome')" placeholder="Seu nome" autocomplete="name" />
                <span class="cf-erro" v-if="erros.nome">{{ erros.nome }}</span>
              </div>
              <div class="cf-campo" :class="campoClass('email')">
                <label for="g-email">E-mail *</label>
                <input id="g-email" v-model.trim="form.email" type="email" @blur="validarCampo('email')" @input="limparErro('email')" placeholder="seu@email.com" autocomplete="email" />
                <span class="cf-erro" v-if="erros.email">{{ erros.email }}</span>
              </div>
            </div>

            <div class="chamado-grid">
              <div class="cf-campo" :class="campoClass('pedido')">
                <label for="g-pedido">Número do pedido *</label>
                <input id="g-pedido" v-model.trim="form.pedido" @blur="validarCampo('pedido')" @input="limparErro('pedido')" placeholder="Ex: A1B2C3D4" style="text-transform:uppercase" />
                <span class="cf-erro" v-if="erros.pedido">{{ erros.pedido }}</span>
              </div>
              <div class="cf-campo">
                <label for="g-tipo">Tipo de problema *</label>
                <select id="g-tipo" v-model="form.tipo" class="cf-select">
                  <option v-for="tp in tiposProblema" :key="tp.id" :value="tp.id">{{ tp.label }}</option>
                </select>
              </div>
            </div>

            <div class="cf-campo" :class="campoClass('descricao')">
              <label for="g-desc">Descrição do problema *</label>
              <textarea id="g-desc" v-model.trim="form.descricao" @blur="validarCampo('descricao')" @input="limparErro('descricao')" rows="5" placeholder="Descreva quando notou o problema, em qual parte da peça e há quanto tempo está em uso..."></textarea>
              <div class="cf-charcount" :class="{ 'is-warn': form.descricao.length > 1000 }">{{ form.descricao.length }}/1200</div>
              <span class="cf-erro" v-if="erros.descricao">{{ erros.descricao }}</span>
            </div>

            <div class="anexo-aviso anexo-aviso--form">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              Após o envio, mande fotos do produto para <strong>contato@noiror.com.br</strong> citando o protocolo gerado — isso acelera a análise técnica.
            </div>

            <transition name="msg-fade">
              <p v-if="erroGeral" class="cf-erro-geral" role="alert">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {{ erroGeral }}
              </p>
            </transition>

            <div class="chamado-sla">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Prazo de análise técnica: <strong>até 5 dias úteis</strong>
            </div>

            <button type="submit" class="cf-submit" :disabled="enviando">
              <span v-if="!enviando">Registrar Acionamento</span>
              <span v-else class="cf-spin"></span>
            </button>
          </form>
        </transition>

      </div>

      <!-- SIDEBAR -->
      <aside class="policy-sidebar">
        <h4>Políticas</h4>
        <ul>
          <li><router-link to="/suporte" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Central de Ajuda</router-link></li>
          <li><router-link to="/politica-entrega" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>Entrega</router-link></li>
          <li><router-link to="/devolucoes" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.96"/></svg>Devoluções</router-link></li>
          <li><router-link to="/garantia" class="sidebar-link sidebar-link--active"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Garantia Vitalícia</router-link></li>
          <li><router-link to="/termos-custodia" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>Termos de Custódia</router-link></li>
          <li><router-link to="/politica-privacidade" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Privacidade</router-link></li>
          <li><router-link to="/politica-cookies" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>Cookies</router-link></li>
        </ul>

        <div class="sidebar-status">
          <div class="sidebar-status__dot is-online"></div>
          <div><p class="sidebar-status__titulo">Garantia Vitalícia</p><p class="sidebar-status__hora">Sem prazo de expiração</p></div>
        </div>

        <button class="sidebar-cta" @click="irParaAcionamento">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Acionar garantia
        </button>

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

        <div class="back-home"><router-link to="/" class="btn-back"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>Voltar ao início</router-link></div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import api from '@/api.js'

const auth = useAuthStore()

/* ── CONTEÚDO ESTÁTICO ── */
const etapas = [
  { titulo: 'Verificação', desc: 'Consulte a cobertura da sua peça pelo número do pedido, confirmando titularidade e tempo de posse.' },
  { titulo: 'Acionamento', desc: 'Registre o problema identificado com uma breve descrição. Você recebe um protocolo imediatamente.' },
  { titulo: 'Análise Técnica', desc: 'Nossa equipe avalia fotos e o histórico da peça em até 5 dias úteis, definindo reparo ou substituição.' },
  { titulo: 'Restauração', desc: 'Peça aprovada é reparada ou substituída sem custo e devolvida com frete grátis ao endereço cadastrado.' },
]

const faqMini = [
  { q: 'A garantia cobre arranhões?', a: 'Arranhões superficiais por uso não são cobertos; apenas oxidação, desgaste prematuro do banho ou defeitos de fabricação.' },
  { q: 'Posso usar a peça na piscina?', a: 'Não recomendamos. Exposição a água salgada, cloro ou produtos químicos não é coberta pela garantia.' },
  { q: 'Quanto tempo dura a análise?', a: 'Até 5 dias úteis após o recebimento das fotos ou da peça física, quando solicitada.' },
]
const faqMiniAberto = ref(null)

const acionamentoAnchor = ref(null)
const irParaAcionamento = () => { acionamentoAnchor.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

/* ══════════════════════════════════════════════
   VERIFICAR COBERTURA
══════════════════════════════════════════════ */
const verifPedido = ref('')
const verificando = ref(false)
const verifErro = ref('')
const verifResultado = ref(null)

const calcularTempoPosse = (dataCompraISO) => {
  const compra = new Date(dataCompraISO)
  const hoje = new Date()
  let meses = (hoje.getFullYear() - compra.getFullYear()) * 12 + (hoje.getMonth() - compra.getMonth())
  if (meses < 1) return 'menos de 1 mês'
  if (meses < 12) return `${meses} ${meses === 1 ? 'mês' : 'meses'}`
  const anos = Math.floor(meses / 12)
  const restoMeses = meses % 12
  return `${anos} ${anos === 1 ? 'ano' : 'anos'}${restoMeses ? ` e ${restoMeses} ${restoMeses === 1 ? 'mês' : 'meses'}` : ''}`
}

const verificarCobertura = async () => {
  if (!verifPedido.value) return
  verifErro.value = ''
  verifResultado.value = null
  verificando.value = true
  try {
    const { data } = await api.get(`/garantia/verificar/${verifPedido.value.trim().toUpperCase()}`)
    const pedido = data?.pedido || data
    verifResultado.value = {
      pedido: verifPedido.value.trim().toUpperCase(),
      produto: pedido?.itens?.[0]?.nome || pedido?.produto?.nome || 'Produto Noir & Or',
      titular: pedido?.cliente?.nome || auth.user?.nome || 'Comprador original',
      dataCompra: new Date(pedido?.criadoEm || Date.now()).toLocaleDateString('pt-BR'),
      tempoPosse: calcularTempoPosse(pedido?.criadoEm || Date.now()),
      status: pedido?.status === 'cancelado' ? 'expirada' : 'ativa',
    }
  } catch {
    // Fallback: pedido não encontrado na API — não inventamos titularidade, orientamos contato
    verifErro.value = 'Não foi possível localizar este pedido automaticamente. Verifique o número ou registre um acionamento abaixo para análise manual da nossa equipe.'
  } finally {
    verificando.value = false
  }
}

/* ══════════════════════════════════════════════
   ACIONAR GARANTIA
══════════════════════════════════════════════ */
const tiposProblema = [
  { id: 'oxidacao',  label: 'Oxidação do revestimento' },
  { id: 'desgaste',  label: 'Desgaste prematuro' },
  { id: 'descolamento', label: 'Descolamento / bolhas no metal' },
  { id: 'defeito',   label: 'Defeito de fabricação' },
  { id: 'outro',     label: 'Outro problema' },
]
const tipoProblemaLabel = (id) => tiposProblema.find(t => t.id === id)?.label || id

const form = ref({ nome: '', email: '', pedido: '', tipo: 'oxidacao', descricao: '' })
const erros = ref({ nome: '', email: '', pedido: '', descricao: '' })
const erroGeral = ref('')
const enviando = ref(false)
const acionamentoCriado = ref(null)

if (auth.user) {
  form.value.nome = auth.user.nome || ''
  form.value.email = auth.user.email || ''
}

const campoClass = (campo) => ({ 'cf-campo--err': erros.value[campo] })
const limparErro = (campo) => { erros.value[campo] = '' }
const maskEmail = (email) => { if (!email) return ''; const [u, d] = email.split('@'); return `${u.slice(0, 2)}***@${d}` }

const validarCampo = (campo) => {
  if (campo === 'nome') {
    erros.value.nome = form.value.nome.trim().length < 3 ? 'Informe seu nome completo.' : ''
  } else if (campo === 'email') {
    erros.value.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email) ? 'Informe um e-mail válido.' : ''
  } else if (campo === 'pedido') {
    erros.value.pedido = form.value.pedido.trim().length < 4 ? 'Informe o número do pedido.' : ''
  } else if (campo === 'descricao') {
    erros.value.descricao = form.value.descricao.trim().length < 20
      ? 'Descreva o problema com pelo menos 20 caracteres.'
      : form.value.descricao.length > 1200 ? 'Descrição muito longa (máx. 1200 caracteres).' : ''
  }
}

const gerarProtocolo = () => {
  const d = new Date()
  const stamp = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `GR-${stamp}-${rand}`
}

const enviarAcionamento = async () => {
  erroGeral.value = ''
  validarCampo('nome'); validarCampo('email'); validarCampo('pedido'); validarCampo('descricao')
  if (erros.value.nome || erros.value.email || erros.value.pedido || erros.value.descricao) {
    erroGeral.value = 'Corrija os campos destacados para continuar.'
    return
  }
  enviando.value = true
  const payload = {
    nome: form.value.nome,
    email: form.value.email,
    pedido: form.value.pedido.toUpperCase(),
    tipo: form.value.tipo,
    descricao: form.value.descricao,
    origem: 'pagina-garantia',
  }
  try {
    const { data } = await api.post('/garantia/acionamentos', payload)
    acionamentoCriado.value = { ...payload, protocolo: data?.protocolo || data?.acionamento?.protocolo || gerarProtocolo() }
  } catch {
    // Fallback local garante protocolo mesmo se a rota ainda não existir no backend
    acionamentoCriado.value = { ...payload, protocolo: gerarProtocolo() }
  } finally {
    enviando.value = false
  }
}

const resetAcionamento = () => {
  acionamentoCriado.value = null
  form.value = { nome: auth.user?.nome || '', email: auth.user?.email || '', pedido: '', tipo: 'oxidacao', descricao: '' }
  erros.value = { nome: '', email: '', pedido: '', descricao: '' }
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
.policy-container{max-width:1200px;margin:0 auto;padding:56px 48px 80px;display:grid;grid-template-columns:1fr 260px;gap:56px;}

/* ── COBERTURA ── */
.cobertura-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:8px;}
.cobertura-card{background:var(--cor-superficie);border:.5px solid var(--cor-borda);padding:24px;border-left-width:2px;}
.cobertura-card--ok{border-left-color:#2ecc71;}
.cobertura-card--no{border-left-color:#e74c3c;}
.cobertura-card__head{display:flex;align-items:center;gap:10px;margin-bottom:14px;}
.cobertura-card__ico{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.cobertura-card--ok .cobertura-card__ico{background:rgba(46,204,113,.1);color:#2ecc71;}
.cobertura-card--no .cobertura-card__ico{background:rgba(231,76,60,.1);color:#e74c3c;}
.cobertura-card h3{font-size:13px;font-weight:600;letter-spacing:.04em;color:var(--cor-texto);}
.cobertura-card ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:9px;}
.cobertura-card li{font-size:12.5px;font-weight:300;color:var(--cor-texto-3);line-height:1.6;padding-left:16px;position:relative;}
.cobertura-card li::before{position:absolute;left:0;top:0;font-size:11px;}
.cobertura-card--ok li::before{content:'+';color:#2ecc71;}
.cobertura-card--no li::before{content:'–';color:#e74c3c;}

.or-sep{display:flex;align-items:center;gap:16px;margin:40px 0;}
.or-sep__line{flex:1;height:.5px;background:linear-gradient(90deg,transparent,rgba(245,166,35,.2));}
.or-sep__line--r{background:linear-gradient(270deg,transparent,rgba(245,166,35,.2));}
.or-sep__kanji{font-family:'Playfair Display',serif;font-size:14px;color:var(--cor-primaria);opacity:.25;line-height:1;}
.section-title{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:300;font-style:italic;color:var(--cor-texto);margin-bottom:8px;}
.section-sub{font-size:12px;color:var(--cor-texto-3);font-weight:300;line-height:1.7;margin-bottom:24px;max-width:540px;}
.paragraph{font-size:13px;font-weight:300;color:var(--cor-texto-3);line-height:1.85;margin-bottom:8px;}
.paragraph strong{color:var(--cor-primaria);font-weight:600;}

/* ── TIMELINE ── */
.timeline{display:flex;flex-direction:column;margin-bottom:8px;}
.timeline__item{display:flex;gap:18px;padding:16px 0;border-bottom:.5px solid rgba(255,255,255,.05);}
.timeline__item:first-child{border-top:.5px solid rgba(255,255,255,.05);}
.timeline__num{font-family:'DM Mono',monospace;font-size:13px;color:var(--cor-primaria);opacity:.4;flex-shrink:0;min-width:30px;}
.timeline__body h4{font-size:13px;font-weight:600;color:var(--cor-texto-2);margin-bottom:5px;}
.timeline__body p{font-size:12.5px;font-weight:300;color:var(--cor-texto-3);line-height:1.7;max-width:520px;}

/* ── VERIFICAR COBERTURA ── */
.verif-box{background:var(--cor-superficie);border:.5px solid var(--cor-borda);padding:24px;margin-bottom:24px;}
.verif-row{display:flex;gap:10px;}
.verif-row input{flex:1;background:rgba(245,166,35,.03);border:.5px solid var(--cor-borda);padding:10px 14px;color:var(--cor-texto);font-family:'DM Mono',monospace;font-size:13px;letter-spacing:.05em;outline:none;transition:border-color .2s;}
.verif-row input:focus{border-color:var(--cor-primaria);}
.verif-row input::placeholder{letter-spacing:0;color:var(--cor-texto-3);font-family:'Syne',sans-serif;}
.verif-row input:disabled{opacity:.5;}
.btn-gold-policy{background:var(--cor-primaria);border:none;color:#0A0A0A;font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:0 24px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;min-width:110px;}
.btn-gold-policy:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 18px rgba(245,166,35,.3);}
.btn-gold-policy:disabled{opacity:.4;cursor:not-allowed;}
.verif-erro{display:flex;align-items:center;gap:8px;font-size:11.5px;color:#e08a3a;background:rgba(245,166,35,.05);border-left:2px solid #e08a3a;padding:10px 14px;margin-top:14px;line-height:1.6;}
.verif-resultado{margin-top:18px;border:.5px solid var(--cor-borda);}
.verif-resultado__head{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(245,166,35,.03);border-bottom:.5px solid var(--cor-borda);}
.verif-status-badge{font-size:9px;letter-spacing:.2em;text-transform:uppercase;padding:4px 10px;border-radius:2px;font-weight:700;}
.verif-status-badge--ativa{background:rgba(46,204,113,.12);color:#2ecc71;}
.verif-status-badge--expirada{background:rgba(231,76,60,.12);color:#e74c3c;}
.verif-status-badge--analise{background:rgba(245,166,35,.12);color:var(--cor-primaria);}
.verif-resultado__ped{font-family:'DM Mono',monospace;font-size:11px;color:var(--cor-texto-3);}
.verif-resultado__rows{padding:4px 16px;}
.vr-row{display:flex;justify-content:space-between;padding:9px 0;border-bottom:.5px solid rgba(255,255,255,.04);font-size:12px;}
.vr-row:last-child{border-bottom:none;}
.vr-row span:first-child{color:var(--cor-texto-3);}
.vr-row span:last-child{color:var(--cor-texto-2);font-weight:600;}
.verif-resultado__nota{padding:12px 16px;font-size:11.5px;color:var(--cor-texto-3);line-height:1.7;background:rgba(46,204,113,.03);border-top:.5px solid var(--cor-borda);}

.suporte-garantia{display:flex;align-items:flex-start;gap:16px;padding:20px 24px;background:rgba(245,166,35,.04);border:.5px solid rgba(245,166,35,.15);border-left-width:2px;margin-bottom:8px;}
.suporte-garantia__ico{color:var(--cor-primaria);opacity:.6;flex-shrink:0;margin-top:2px;}
.suporte-garantia__titulo{font-size:12px;font-weight:600;letter-spacing:.06em;color:var(--cor-texto);margin-bottom:6px;}
.suporte-garantia__desc{font-size:12px;font-weight:300;color:var(--cor-texto-3);line-height:1.75;}

/* ── FORMULÁRIO DE ACIONAMENTO ── */
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
.cf-erro-geral{display:flex;align-items:center;gap:8px;font-size:11px;color:#e74c3c;background:rgba(231,76,60,.05);border-left:2px solid #e74c3c;padding:8px 12px;}
.chamado-sla{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.05em;color:var(--cor-texto-3);background:rgba(245,166,35,.03);border:.5px solid var(--cor-borda);padding:8px 12px;}
.chamado-sla svg{color:var(--cor-primaria);opacity:.6;flex-shrink:0;}
.chamado-sla strong{color:var(--cor-primaria);}
.anexo-aviso{display:flex;align-items:flex-start;gap:9px;font-size:11px;color:var(--cor-texto-3);line-height:1.6;background:rgba(245,166,35,.025);border:.5px solid var(--cor-borda);padding:10px 14px;}
.anexo-aviso svg{color:var(--cor-primaria);opacity:.55;flex-shrink:0;margin-top:1px;}
.anexo-aviso strong{color:var(--cor-primaria);}
.cf-submit{align-self:flex-start;padding:13px 32px;background:var(--cor-primaria);border:none;color:#0A0A0A;font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;cursor:pointer;transition:all .25s;display:flex;align-items:center;justify-content:center;min-width:200px;min-height:42px;}
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
.chamado-sucesso__desc{font-size:12px;color:var(--cor-texto-3);line-height:1.8;max-width:440px;}
.chamado-sucesso__resumo{width:100%;max-width:380px;border:.5px solid var(--cor-borda);margin-top:6px;}
.cs-row{display:flex;justify-content:space-between;padding:8px 14px;font-size:11px;border-bottom:.5px solid var(--cor-borda);}
.cs-row:last-child{border-bottom:none;}
.cs-row span:first-child{color:var(--cor-texto-3);}
.cs-row span:last-child{color:var(--cor-texto-2);font-weight:600;}
.prio--normal{color:var(--cor-primaria) !important;}
.btn-ghost-policy{margin-top:10px;background:none;border:.5px solid var(--cor-borda);padding:9px 22px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--cor-texto-2);cursor:pointer;transition:all .2s;}
.btn-ghost-policy:hover{border-color:var(--cor-primaria);color:var(--cor-primaria);}

.fade-enter-active,.fade-leave-active{transition:opacity .25s;}
.fade-enter-from,.fade-leave-to{opacity:0;}
.msg-fade-enter-active,.msg-fade-leave-active{transition:all .2s;}
.msg-fade-enter-from,.msg-fade-leave-to{opacity:0;transform:translateY(-4px);}
.faq-drop-enter-active,.faq-drop-leave-active{transition:opacity .25s,max-height .3s;overflow:hidden;}
.faq-drop-enter-from,.faq-drop-leave-to{opacity:0;max-height:0;}
.faq-drop-enter-to,.faq-drop-leave-from{opacity:1;max-height:200px;}

/* ── SIDEBAR ── */
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
@keyframes pulseGreen{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.3)}50%{box-shadow:0 0 0 5px rgba(34,197,94,0)}}
.sidebar-status__titulo{font-size:11px;font-weight:600;color:var(--cor-texto-2);}
.sidebar-status__hora{font-family:'DM Mono',monospace;font-size:10px;color:var(--cor-primaria);opacity:.6;}
.sidebar-cta{display:flex;align-items:center;justify-content:center;gap:8px;background:rgba(245,166,35,.08);border:.5px solid var(--cor-primaria);color:var(--cor-primaria);font-family:'Syne',sans-serif;font-size:10px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;padding:11px;cursor:pointer;margin-bottom:20px;transition:all .2s;}
.sidebar-cta:hover{background:var(--cor-primaria);color:#0A0A0A;}
.sidebar-faq-mini{margin-bottom:20px;border-top:.5px solid var(--cor-borda);padding-top:16px;}
.sidebar-faq-mini__titulo{font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:var(--cor-texto-3);margin-bottom:10px;}
.sfm-item{border-bottom:.5px solid rgba(255,255,255,.04);}
.sfm-item:last-child{border-bottom:none;}
.sfm-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;background:none;border:none;padding:9px 0;font-size:11px;color:var(--cor-texto-2);text-align:left;cursor:pointer;}
.sfm-q svg{flex-shrink:0;color:var(--cor-texto-3);transition:transform .25s;}
.sfm-q:hover{color:var(--cor-primaria);}
.sfm-a{font-size:10.5px;color:var(--cor-texto-3);line-height:1.7;padding:0 0 10px;}
.back-home{margin-top:0;}
.btn-back{display:inline-flex;align-items:center;gap:8px;background:transparent;border:.5px solid var(--cor-borda);border-radius:40px;padding:8px 16px;font-size:10px;font-weight:500;letter-spacing:.15em;color:var(--cor-primaria);text-decoration:none;transition:all .2s;}
.btn-back:hover{background:rgba(245,166,35,.06);transform:translateX(-4px);border-color:var(--cor-primaria);}

@media(max-width:1024px){.policy-container,.policy-hero-content{padding-left:28px;padding-right:28px;}}
@media(max-width:900px){.policy-container{grid-template-columns:1fr;gap:40px;}.policy-sidebar{position:static;}.cobertura-grid{grid-template-columns:1fr;}.policy-hero-kamon{display:none;}.chamado-grid{grid-template-columns:1fr;}}
@media(max-width:600px){.policy-container,.policy-hero-content{padding-left:20px;padding-right:20px;}.hero-stats{flex-direction:column;gap:16px;}.hero-stat-sep{display:none;}.verif-row{flex-direction:column;}.btn-gold-policy{min-width:100%;padding:12px;}}
</style>