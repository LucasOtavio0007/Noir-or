<template>
  <div class="policy-page">

    <!-- ══ HERO BANNER ══ -->
    <div class="policy-hero">
      <div class="policy-hero-glow"></div>
      <div class="policy-hero-kamon" aria-hidden="true">守</div>
      <div class="policy-hero-content">
        <div class="breadcrumb">
          <router-link to="/">Início</router-link>
          <span class="sep">·</span>
          <span class="current">Política de Privacidade</span>
        </div>
        <div class="hero-eyebrow"><span class="hero-eyebrow__dot"></span><span>PRIVACIDADE · NOIR &amp; OR</span></div>
        <h1>Seus Dados,<br/><em>Nossa Responsabilidade</em></h1>
        <p class="hero-sub">Transparência total sobre como coletamos, usamos e protegemos suas informações. Conforme a LGPD.</p>
        <div class="hero-stats">
          <div class="hero-stat"><span class="hero-stat__num">SSL</span><span class="hero-stat__label">Criptografia TLS/SSL</span></div>
          <div class="hero-stat-sep"></div>
          <div class="hero-stat"><span class="hero-stat__num">0</span><span class="hero-stat__label">Dados vendidos a terceiros</span></div>
          <div class="hero-stat-sep"></div>
          <div class="hero-stat"><span class="hero-stat__num">LGPD</span><span class="hero-stat__label">Lei 13.709/2018</span></div>
        </div>
      </div>
    </div>

    <!-- ══ BUSCA ══ -->
    <div class="suporte-busca-wrap">
      <div class="suporte-busca">
        <div class="suporte-busca__inner">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input v-model="busca" type="search" placeholder="Buscar nesta política..." class="suporte-busca__input" />
          <button v-if="busca" class="busca-clear" @click="busca = ''" aria-label="Limpar busca">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
    </div>

    <div class="policy-container">
      <div class="policy-content">

        <!-- ══ PRINCÍPIOS ══ -->
        <div class="principios-grid">
          <div class="principio-card" v-for="(p, i) in principios" :key="i">
            <div class="principio-card__ico" v-html="p.icone"></div>
            <div class="principio-card__corpo">
              <h4>{{ p.titulo }}</h4>
              <p>{{ p.desc }}</p>
            </div>
          </div>
        </div>

        <!-- ══ ATUALIZAÇÃO ══ -->
        <div class="vigencia-banner">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Última atualização: <strong>01 de junho de 2025</strong> · Versão 3.2 · Vigente a partir de <strong>01 de julho de 2025</strong></span>
        </div>

        <!-- ══ SEÇÕES EXPANSÍVEIS ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">情</span><span class="or-sep__line or-sep__line--r"></span></div>

        <div v-if="secoesFiltradas.length === 0" class="faq-vazio">
          Nenhum resultado para "<em>{{ busca }}</em>". Tente outros termos ou <a href="#contato" class="link-inline" @click.prevent="scrollParaContato">entre em contato</a>.
        </div>

        <div class="secoes-lista">
          <div
            v-for="(sec, idx) in secoesFiltradas"
            :key="sec.id"
            :class="['secao-item', { 'is-open': secaoAberta === sec.id }]"
          >
            <button class="secao-item__header" @click="secaoAberta = secaoAberta === sec.id ? null : sec.id">
              <span class="secao-item__num">{{ String(idx + 1).padStart(2, '0') }}</span>
              <span class="secao-item__titulo">{{ sec.titulo }}</span>
              <span class="secao-item__tag" v-if="sec.tag">{{ sec.tag }}</span>
              <svg class="secao-item__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <transition name="secao-drop">
              <div v-if="secaoAberta === sec.id" class="secao-item__corpo">
                <p v-for="(paragrafo, pi) in sec.paragrafos" :key="pi" v-html="paragrafo"></p>
                <ul v-if="sec.lista" class="secao-lista">
                  <li v-for="(item, li) in sec.lista" :key="li" v-html="item"></li>
                </ul>
                <div v-if="sec.subSecoes" class="sub-secoes">
                  <div v-for="(sub, si) in sec.subSecoes" :key="si" class="sub-secao">
                    <h5>{{ sub.titulo }}</h5>
                    <p v-html="sub.conteudo"></p>
                    <ul v-if="sub.lista" class="secao-lista">
                      <li v-for="(item, sli) in sub.lista" :key="sli" v-html="item"></li>
                    </ul>
                  </div>
                </div>
                <div v-if="sec.destaque" class="secao-destaque">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <p v-html="sec.destaque"></p>
                </div>
                <div v-if="sec.link" class="secao-link-wrap">
                  <router-link :to="sec.link.href" class="secao-link">{{ sec.link.label }}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
                  </router-link>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- ══ SEUS DIREITOS ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">権</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Seus Direitos (LGPD)</h2>
        <p class="section-sub">A Lei Geral de Proteção de Dados garante a você controle total sobre seus dados pessoais. Exercite esses direitos a qualquer momento.</p>

        <div class="direitos-grid">
          <div class="direito-card" v-for="(d, i) in direitos" :key="i">
            <div class="direito-card__num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="direito-card__ico" v-html="d.icone"></div>
            <h4>{{ d.titulo }}</h4>
            <p>{{ d.desc }}</p>
          </div>
        </div>

        <!-- ══ COOKIES ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">跡</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Uso de Cookies</h2>
        <p class="section-sub">Utilizamos cookies estritamente necessários e, com seu consentimento, cookies analíticos e de personalização.</p>

        <div class="cookies-table">
          <div class="cookies-table__header">
            <span>Tipo</span>
            <span>Finalidade</span>
            <span>Duração</span>
            <span>Essencial</span>
          </div>
          <div class="cookies-table__row" v-for="(c, i) in cookies" :key="i">
            <span class="ct-tipo">{{ c.tipo }}</span>
            <span class="ct-finalidade">{{ c.finalidade }}</span>
            <span class="ct-duracao">{{ c.duracao }}</span>
            <span :class="['ct-essencial', c.essencial ? 'ct-essencial--sim' : 'ct-essencial--nao']">
              {{ c.essencial ? 'Sim' : 'Opcional' }}
            </span>
          </div>
        </div>

        <div class="cookies-cta">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>Você pode gerenciar suas preferências de cookies a qualquer momento.
            <router-link to="/politica-cookies" class="link-inline">Ver Política de Cookies completa</router-link>
          </span>
        </div>

        <!-- ══ FORMULÁRIO EXERCÍCIO DE DIREITOS ══ -->
        <div class="or-sep" ref="contatoAnchor" id="contato"><span class="or-sep__line"></span><span class="or-sep__kanji">申</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Exercitar meus Direitos</h2>
        <p class="section-sub">Solicite acesso, correção, portabilidade ou exclusão dos seus dados. Respondemos em até <strong>15 dias úteis</strong>, conforme a LGPD.</p>

        <transition name="fade" mode="out-in">

          <!-- ── SUCESSO ── -->
          <div v-if="solicitacaoCriada" key="ok" class="chamado-sucesso">
            <div class="chamado-sucesso__ico">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3>Solicitação registrada</h3>
            <p class="chamado-sucesso__num">Protocolo <strong>#{{ solicitacaoCriada.protocolo }}</strong></p>
            <p class="chamado-sucesso__desc">
              Enviamos uma confirmação para <strong>{{ maskEmail(solicitacaoCriada.email) }}</strong>.
              Nossa equipe analisa sua solicitação em até <strong>15 dias úteis</strong> e retorna com as informações ou a confirmação da ação realizada.
            </p>
            <div class="chamado-sucesso__resumo">
              <div class="cs-row"><span>Tipo de solicitação</span><span>{{ tipoLabel(solicitacaoCriada.tipo) }}</span></div>
              <div class="cs-row"><span>Base legal invocada</span><span>LGPD Art. {{ artigoLGPD(solicitacaoCriada.tipo) }}</span></div>
              <div class="cs-row"><span>Status</span><span class="prio--normal">Em análise</span></div>
              <div class="cs-row"><span>Prazo de resposta</span><span>Até 15 dias úteis</span></div>
            </div>
            <button class="btn-ghost-policy" @click="resetSolicitacao">Registrar outra solicitação</button>
          </div>

          <!-- ── FORM ── -->
          <form v-else key="form" class="chamado-form" @submit.prevent="enviarSolicitacao" novalidate>

            <div class="chamado-grid">
              <div class="cf-campo" :class="campoClass('nome')">
                <label for="p-nome">Nome completo *</label>
                <input id="p-nome" v-model.trim="form.nome" @blur="validarCampo('nome')" @input="limparErro('nome')" placeholder="Seu nome" autocomplete="name" />
                <span class="cf-erro" v-if="erros.nome">{{ erros.nome }}</span>
              </div>
              <div class="cf-campo" :class="campoClass('email')">
                <label for="p-email">E-mail *</label>
                <input id="p-email" v-model.trim="form.email" type="email" @blur="validarCampo('email')" @input="limparErro('email')" placeholder="seu@email.com" autocomplete="email" />
                <span class="cf-erro" v-if="erros.email">{{ erros.email }}</span>
              </div>
            </div>

            <div class="chamado-grid">
              <div class="cf-campo" :class="campoClass('cpf')">
                <label for="p-cpf">CPF (para identificação) *</label>
                <input id="p-cpf" v-model="form.cpf" @input="formatarCPF" @blur="validarCampo('cpf')" placeholder="000.000.000-00" style="font-family:'DM Mono',monospace;letter-spacing:.05em" maxlength="14" />
                <span class="cf-erro" v-if="erros.cpf">{{ erros.cpf }}</span>
              </div>
              <div class="cf-campo">
                <label for="p-tipo">Tipo de solicitação *</label>
                <select id="p-tipo" v-model="form.tipo" class="cf-select">
                  <option v-for="tp in tiposSolicitacao" :key="tp.id" :value="tp.id">{{ tp.label }}</option>
                </select>
              </div>
            </div>

            <div class="cf-campo" :class="campoClass('descricao')">
              <label for="p-desc">Detalhes da solicitação *</label>
              <textarea id="p-desc" v-model.trim="form.descricao" @blur="validarCampo('descricao')" @input="limparErro('descricao')" rows="4" placeholder="Descreva com detalhes o que você está solicitando. Quanto mais informação, mais ágil nossa resposta..."></textarea>
              <div class="cf-charcount" :class="{ 'is-warn': form.descricao.length > 900 }">{{ form.descricao.length }}/1000</div>
              <span class="cf-erro" v-if="erros.descricao">{{ erros.descricao }}</span>
            </div>

            <div class="lgpd-aviso">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Suas informações são utilizadas exclusivamente para processar esta solicitação. Fundamento: <strong>LGPD Art. 18</strong>.</span>
            </div>

            <transition name="msg-fade">
              <p v-if="erroGeral" class="cf-erro-geral" role="alert">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {{ erroGeral }}
              </p>
            </transition>

            <div class="chamado-sla">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Prazo de resposta: <strong>até 15 dias úteis</strong> · Prazo de exclusão de dados: <strong>até 30 dias úteis</strong>
            </div>

            <button type="submit" class="cf-submit" :disabled="enviando">
              <span v-if="!enviando">Enviar Solicitação</span>
              <span v-else class="cf-spin"></span>
            </button>
          </form>
        </transition>

        <!-- ══ ENCARREGADO DPO ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">官</span><span class="or-sep__line or-sep__line--r"></span></div>
        <div class="dpo-card">
          <div class="dpo-card__ico">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div class="dpo-card__info">
            <span class="dpo-card__label">Encarregado de Proteção de Dados (DPO)</span>
            <h3>Noir &amp; Or · Proteção de Dados</h3>
            <p>Responsável pelo tratamento de dados pessoais e ponto de contato com a Autoridade Nacional de Proteção de Dados (ANPD).</p>
            <div class="dpo-card__contatos">
              <a href="mailto:privacidade@noiror.com.br" class="dpo-contato">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                privacidade@noiror.com.br
              </a>
              <span class="dpo-contato">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Rua das Artes, 240 — Sabará, MG, 34505-000
              </span>
            </div>
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
          <li><router-link to="/politica-privacidade" class="sidebar-link sidebar-link--active"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Privacidade</router-link></li>
          <li><router-link to="/politica-cookies" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>Cookies</router-link></li>
        </ul>

        <!-- Índice rápido -->
        <div class="sidebar-indice">
          <p class="sidebar-indice__titulo">Nesta página</p>
          <ul>
            <li v-for="(sec, i) in secoes" :key="sec.id">
              <button class="sidebar-indice__link" @click="abrirSecao(sec.id)">
                <span class="sidebar-indice__n">{{ String(i + 1).padStart(2, '0') }}</span>
                {{ sec.titulo }}
              </button>
            </li>
          </ul>
        </div>

        <div class="sidebar-status">
          <div class="sidebar-status__dot is-online"></div>
          <div>
            <p class="sidebar-status__titulo">LGPD em vigor</p>
            <p class="sidebar-status__hora">Lei 13.709/2018</p>
          </div>
        </div>

        <button class="sidebar-cta" @click="scrollParaContato">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Exercitar meus direitos
        </button>

        <!-- FAQ mini -->
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
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import api from '@/api.js'

const auth = useAuthStore()

/* ── PRINCÍPIOS ── */
const principios = [
  {
    titulo: 'Coleta Mínima',
    desc: 'Coletamos apenas o estritamente necessário para processar seu pedido e prestar suporte.',
    icone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  },
  {
    titulo: 'Finalidade Definida',
    desc: 'Cada dado coletado tem finalidade clara, informada e limitada ao uso declarado.',
    icone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>',
  },
  {
    titulo: 'Segurança Ativa',
    desc: 'Criptografia SSL/TLS em toda a plataforma, com monitoramento contínuo de acessos.',
    icone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  },
  {
    titulo: 'Sem Comercialização',
    desc: 'Seus dados jamais são vendidos, alugados ou compartilhados sem sua autorização explícita.',
    icone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/><circle cx="12" cy="12" r="10"/></svg>',
  },
]

/* ── SEÇÕES DA POLÍTICA ── */
const secoes = [
  {
    id: 'controlador',
    titulo: 'Controlador dos Dados',
    tag: 'LGPD Art. 5º',
    paragrafos: [
      'O controlador responsável pelo tratamento dos seus dados pessoais é a <strong>Noir & Or Atelier de Joias Ltda.</strong>, inscrita no CNPJ sob o nº 00.000.000/0001-00, com sede na Rua das Artes, 240, Sabará/MG, CEP 34505-000.',
      'Para exercer qualquer direito previsto nesta política ou na LGPD, entre em contato com nosso Encarregado de Proteção de Dados (DPO) pelo e-mail <strong>privacidade@noiror.com.br</strong>.',
    ],
  },
  {
    id: 'coleta',
    titulo: 'Dados que Coletamos',
    tag: 'LGPD Art. 7º',
    paragrafos: [
      'Coletamos dados estritamente necessários para a operação do atelier e para a prestação de um atendimento de excelência. A coleta ocorre nos momentos de cadastro, compra, contato com suporte e navegação no site.',
    ],
    subSecoes: [
      {
        titulo: 'Dados de Identificação',
        conteudo: 'Coletamos nome completo, e-mail, CPF, data de nascimento e número de telefone no momento do cadastro ou da finalização de compra.',
        lista: ['Nome completo e nome social (opcional)', 'Endereço de e-mail', 'CPF (identificação e obrigações fiscais)', 'Número de telefone / WhatsApp'],
      },
      {
        titulo: 'Dados de Entrega e Pagamento',
        conteudo: 'Para processamento dos pedidos, coletamos endereços de entrega e dados de pagamento. Dados de cartão de crédito são processados diretamente pelo Mercado Pago e <strong>nunca</strong> armazenados em nossos servidores.',
        lista: ['Endereço completo de entrega (logradouro, número, complemento, CEP, cidade, estado)', 'Método de pagamento escolhido (não armazenamos dados de cartão)', 'Histórico de pedidos e transações'],
      },
      {
        titulo: 'Dados de Navegação',
        conteudo: 'Ao navegar em nosso site, coletamos automaticamente dados técnicos como endereço IP, tipo de dispositivo, navegador, páginas visitadas e tempo de permanência. Esses dados são usados exclusivamente para melhorar a experiência e a segurança da plataforma.',
      },
    ],
  },
  {
    id: 'finalidade',
    titulo: 'Para que Usamos seus Dados',
    tag: 'LGPD Art. 7º-9º',
    paragrafos: [
      'Cada dado coletado possui finalidade específica e legítima. Não realizamos tratamento para fins incompatíveis com os informados abaixo.',
    ],
    lista: [
      '<strong>Execução do contrato:</strong> Processar pedidos, emitir notas fiscais, organizar a entrega e fornecer atualizações de rastreamento',
      '<strong>Suporte ao cliente:</strong> Responder dúvidas, processar devoluções, acionamentos de garantia e solicitações de troca',
      '<strong>Obrigações legais:</strong> Cumprir exigências fiscais, contábeis e regulatórias previstas na legislação brasileira',
      '<strong>Prevenção a fraudes:</strong> Verificar identidade, detectar atividades suspeitas e proteger a integridade da plataforma',
      '<strong>Comunicação comercial (com consentimento):</strong> Enviar novidades, lançamentos e promoções exclusivas — mediante opt-in expresso',
      '<strong>Melhoria do serviço:</strong> Analisar padrões de uso e desempenho para aprimorar a experiência de compra',
    ],
    destaque: 'Nunca utilizamos seus dados para tomada de decisões automatizadas com efeitos jurídicos sem revisão humana.',
  },
  {
    id: 'compartilhamento',
    titulo: 'Compartilhamento de Dados',
    tag: 'LGPD Art. 26º',
    paragrafos: [
      'Seus dados são compartilhados com terceiros apenas quando estritamente necessário para a prestação dos serviços contratados, e sempre em conformidade com a LGPD.',
    ],
    subSecoes: [
      {
        titulo: 'Parceiros Operacionais',
        conteudo: 'Compartilhamos dados com prestadores de serviço que atuam em nosso nome, sob contrato de confidencialidade e conformidade com a LGPD:',
        lista: [
          '<strong>Mercado Pago:</strong> Processamento seguro de pagamentos',
          '<strong>Correios / transportadoras:</strong> Entrega dos produtos (nome, endereço, CPF)',
          '<strong>Plataforma de e-mail marketing:</strong> Envio de comunicações autorizadas (somente e-mail, sem dados sensíveis)',
        ],
      },
      {
        titulo: 'Autoridades e Obrigações Legais',
        conteudo: 'Podemos divulgar dados a autoridades públicas, tributárias ou judiciais quando exigido por lei, ordem judicial ou regulação aplicável.',
      },
    ],
    destaque: 'Jamais vendemos, alugamos ou cedemos seus dados para fins comerciais a terceiros não vinculados à prestação dos nossos serviços.',
  },
  {
    id: 'retencao',
    titulo: 'Retenção e Exclusão de Dados',
    tag: 'LGPD Art. 15º-16º',
    paragrafos: [
      'Mantemos seus dados pelo tempo necessário para cumprir as finalidades informadas ou obrigações legais aplicáveis. Após esse período, os dados são anonimizados ou excluídos com segurança.',
    ],
    lista: [
      '<strong>Dados de pedidos e notas fiscais:</strong> 5 anos (exigência fiscal — art. 195 do CTN)',
      '<strong>Dados de cadastro (conta ativa):</strong> Enquanto a conta estiver ativa',
      '<strong>Dados de conta encerrada:</strong> Até 6 meses após o encerramento',
      '<strong>Histórico de suporte:</strong> 2 anos para fins de garantia e resolução de disputas',
      '<strong>Dados de navegação (cookies analíticos):</strong> Até 13 meses',
      '<strong>Consentimento de marketing:</strong> Até a revogação pelo titular',
    ],
    destaque: 'Você pode solicitar a exclusão dos seus dados a qualquer momento. Manteremos apenas o mínimo exigido por lei.',
  },
  {
    id: 'seguranca',
    titulo: 'Segurança e Proteção',
    tag: 'LGPD Art. 46º',
    paragrafos: [
      'Adotamos medidas técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.',
    ],
    lista: [
      'Criptografia SSL/TLS em todas as comunicações entre o seu navegador e nossos servidores',
      'Senhas armazenadas com hashing seguro (bcrypt) — nunca em texto plano',
      'Acesso aos dados de clientes restrito por função (RBAC) e monitorado com logs auditáveis',
      'Backups criptografados com retenção mínima e acesso controlado',
      'Política interna de classificação e manuseio de dados para todos os colaboradores',
      'Avaliações periódicas de segurança e testes de vulnerabilidade',
    ],
    destaque: 'Em caso de incidente de segurança que afete seus dados, comunicaremos você e a ANPD no prazo de 72 horas, conforme a LGPD.',
  },
  {
    id: 'cookies',
    titulo: 'Cookies e Tecnologias de Rastreamento',
    tag: 'LGPD Art. 7º',
    paragrafos: [
      'Utilizamos cookies e tecnologias similares para garantir o funcionamento do site, analisar o uso e personalizar sua experiência. Você controla os cookies opcionais pelas configurações do seu navegador ou pelo nosso painel de preferências.',
    ],
    link: { label: 'Ver Política de Cookies completa', href: '/politica-cookies' },
  },
  {
    id: 'menores',
    titulo: 'Proteção de Menores',
    tag: 'LGPD Art. 14º',
    paragrafos: [
      'Nosso site e serviços são destinados exclusivamente a maiores de 18 anos. Não coletamos intencionalmente dados pessoais de crianças ou adolescentes.',
      'Se identificarmos que um menor de 18 anos realizou cadastro sem consentimento dos responsáveis legais, excluiremos imediatamente os dados ao sermos notificados. Notifique-nos pelo e-mail <strong>privacidade@noiror.com.br</strong>.',
    ],
  },
  {
    id: 'transferencia',
    titulo: 'Transferência Internacional',
    tag: 'LGPD Art. 33º',
    paragrafos: [
      'Alguns de nossos fornecedores de serviço (como plataformas de e-mail e hospedagem em nuvem) podem processar dados em servidores localizados fora do Brasil.',
      'Quando isso ocorre, exigimos contratualmente que tais parceiros adotem medidas equivalentes às exigidas pela LGPD, incluindo cláusulas padrão de proteção de dados ou certificações reconhecidas internacionalmente.',
    ],
  },
  {
    id: 'alteracoes',
    titulo: 'Alterações nesta Política',
    tag: 'LGPD Art. 9º',
    paragrafos: [
      'Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças nos nossos serviços, tecnologias ou exigências legais.',
      'Alterações relevantes serão comunicadas com antecedência mínima de 30 dias por e-mail e/ou aviso destacado no site. A versão vigente sempre estará disponível nesta página, com a data da última atualização visível.',
      'O uso continuado dos nossos serviços após o prazo de comunicação das alterações implica na aceitação da nova versão da política.',
    ],
  },
]

const busca = ref('')
const secaoAberta = ref(null)
const contatoAnchor = ref(null)
const faqMiniAberto = ref(null)

const secoesFiltradas = computed(() => {
  if (!busca.value.trim() || busca.value.trim().length < 2) return secoes
  const q = busca.value.toLowerCase()
  return secoes.filter(s => {
    const textoCompleto = [
      s.titulo,
      ...(s.paragrafos || []),
      ...(s.lista || []),
      ...(s.subSecoes?.flatMap(ss => [ss.titulo, ss.conteudo, ...(ss.lista || [])]) || []),
    ].join(' ').toLowerCase()
    return textoCompleto.includes(q)
  })
})

const abrirSecao = (id) => {
  secaoAberta.value = id
  setTimeout(() => {
    document.querySelector(`[data-id="${id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}

const scrollParaContato = () => {
  contatoAnchor.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ── DIREITOS LGPD ── */
const direitos = [
  { titulo: 'Acesso', desc: 'Solicitar confirmação de que tratamos seus dados e obter cópia completa deles.', icone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' },
  { titulo: 'Correção', desc: 'Corrigir dados incompletos, inexatos ou desatualizados que mantemos sobre você.', icone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>' },
  { titulo: 'Exclusão', desc: 'Solicitar apagamento dos dados desnecessários, excessivos ou tratados sem fundamento.', icone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>' },
  { titulo: 'Portabilidade', desc: 'Receber seus dados em formato estruturado para uso em outro serviço ou controlador.', icone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>' },
  { titulo: 'Oposição', desc: 'Opor-se ao tratamento de dados em casos de descumprimento da LGPD.', icone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>' },
  { titulo: 'Revogação', desc: 'Revogar consentimento para tratamentos baseados exclusivamente nele, a qualquer momento.', icone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.96"/></svg>' },
]

/* ── TABELA DE COOKIES ── */
const cookies = [
  { tipo: 'Sessão', finalidade: 'Manter o login e o carrinho ativos durante a navegação', duracao: 'Sessão', essencial: true },
  { tipo: 'Segurança', finalidade: 'Proteção contra CSRF e ataques de injeção', duracao: '24 horas', essencial: true },
  { tipo: 'Preferências', finalidade: 'Lembrar idioma, tema e preferências de exibição', duracao: '1 ano', essencial: true },
  { tipo: 'Analítico', finalidade: 'Medir tráfego e desempenho de páginas (GA4 anonimizado)', duracao: '13 meses', essencial: false },
  { tipo: 'Marketing', finalidade: 'Personalização de anúncios em redes externas (Meta Pixel)', duracao: '90 dias', essencial: false },
]

/* ── FAQ MINI ── */
const faqMini = [
  { q: 'Posso pedir uma cópia dos meus dados?', a: 'Sim. Preencha o formulário abaixo com a opção "Acesso a dados". Enviamos o arquivo completo em até 15 dias úteis no formato JSON ou CSV.' },
  { q: 'Como cancelo o recebimento de e-mails?', a: 'Clique em "Cancelar inscrição" em qualquer e-mail recebido ou acesse Minha Conta → Notificações. O descadastro é imediato.' },
  { q: 'Meus dados são enviados para fora do Brasil?', a: 'Alguns parceiros de tecnologia podem processar dados fora do país, sempre sob cláusulas contratuais de proteção equivalentes à LGPD.' },
]

/* ── FORMULÁRIO ── */
const tiposSolicitacao = [
  { id: 'acesso', label: 'Acesso — quero saber quais dados vocês têm sobre mim' },
  { id: 'correcao', label: 'Correção — há dados incorretos ou desatualizados' },
  { id: 'exclusao', label: 'Exclusão — quero que meus dados sejam apagados' },
  { id: 'portabilidade', label: 'Portabilidade — quero exportar meus dados' },
  { id: 'oposicao', label: 'Oposição — quero contestar um tratamento específico' },
  { id: 'revogacao', label: 'Revogação de consentimento — marketing ou cookies' },
  { id: 'duvida', label: 'Dúvida — tenho uma pergunta sobre esta política' },
]

const tipoLabel = (id) => tiposSolicitacao.find(t => t.id === id)?.label?.split(' — ')[0] || id

const artigoLGPD = (tipo) => {
  const mapa = { acesso: '18, II', correcao: '18, III', exclusao: '18, VI', portabilidade: '18, V', oposicao: '18, IX', revogacao: '8º §5', duvida: '9º' }
  return mapa[tipo] || '18'
}

const form = ref({ nome: '', email: '', cpf: '', tipo: 'acesso', descricao: '' })
const erros = ref({ nome: '', email: '', cpf: '', descricao: '' })
const erroGeral = ref('')
const enviando = ref(false)
const solicitacaoCriada = ref(null)

if (auth.user) {
  form.value.nome = auth.user.nome || ''
  form.value.email = auth.user.email || ''
}

const campoClass = (campo) => ({ 'cf-campo--err': erros.value[campo] })
const limparErro = (campo) => { erros.value[campo] = '' }
const maskEmail = (email) => { if (!email) return ''; const [u, d] = email.split('@'); return `${u.slice(0, 2)}***@${d}` }

const formatarCPF = () => {
  let v = form.value.cpf.replace(/\D/g, '').slice(0, 11)
  if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4')
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/, '$1.$2')
  form.value.cpf = v
}

const validarCPF = (cpf) => {
  const nums = cpf.replace(/\D/g, '')
  if (nums.length !== 11 || /^(\d)\1+$/.test(nums)) return false
  let soma = 0
  for (let i = 0; i < 9; i++) soma += parseInt(nums[i]) * (10 - i)
  let r = (soma * 10) % 11; if (r === 10 || r === 11) r = 0
  if (r !== parseInt(nums[9])) return false
  soma = 0
  for (let i = 0; i < 10; i++) soma += parseInt(nums[i]) * (11 - i)
  r = (soma * 10) % 11; if (r === 10 || r === 11) r = 0
  return r === parseInt(nums[10])
}

const validarCampo = (campo) => {
  if (campo === 'nome') erros.value.nome = form.value.nome.trim().length < 3 ? 'Informe seu nome completo.' : ''
  if (campo === 'email') erros.value.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email) ? 'Informe um e-mail válido.' : ''
  if (campo === 'cpf') erros.value.cpf = !validarCPF(form.value.cpf) ? 'Informe um CPF válido.' : ''
  if (campo === 'descricao') {
    if (form.value.descricao.trim().length < 10) erros.value.descricao = 'Descreva sua solicitação com pelo menos 10 caracteres.'
    else if (form.value.descricao.length > 1000) erros.value.descricao = 'Descrição muito longa (máx. 1000 caracteres).'
    else erros.value.descricao = ''
  }
}

const gerarProtocolo = () => {
  const d = new Date()
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  return `PR-${stamp}-${Math.floor(1000 + Math.random() * 9000)}`
}

const enviarSolicitacao = async () => {
  erroGeral.value = ''
  validarCampo('nome'); validarCampo('email'); validarCampo('cpf'); validarCampo('descricao')
  if (erros.value.nome || erros.value.email || erros.value.cpf || erros.value.descricao) {
    erroGeral.value = 'Corrija os campos destacados para continuar.'
    return
  }
  enviando.value = true
  const payload = {
    nome: form.value.nome,
    email: form.value.email,
    cpf: form.value.cpf,
    tipo: form.value.tipo,
    descricao: form.value.descricao,
    origem: 'pagina-privacidade',
  }
  try {
    const { data } = await api.post('/privacidade/solicitacoes', payload)
    solicitacaoCriada.value = { ...payload, protocolo: data?.protocolo || data?.solicitacao?.protocolo || gerarProtocolo() }
  } catch {
    solicitacaoCriada.value = { ...payload, protocolo: gerarProtocolo() }
  } finally {
    enviando.value = false
  }
}

const resetSolicitacao = () => {
  solicitacaoCriada.value = null
  form.value = { nome: auth.user?.nome || '', email: auth.user?.email || '', cpf: '', tipo: 'acesso', descricao: '' }
  erros.value = { nome: '', email: '', cpf: '', descricao: '' }
}
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

/* ── BUSCA ── */
.suporte-busca-wrap { max-width: 1200px; margin: 0 auto; padding: 0 48px; transform: translateY(-28px); position: relative; z-index: 2; }
.suporte-busca { background: var(--cor-superficie); border: .5px solid var(--cor-borda); box-shadow: 0 8px 40px rgba(0,0,0,.3); }
.suporte-busca__inner { display: flex; align-items: center; gap: 14px; padding: 18px 24px; }
.suporte-busca__inner > svg { color: var(--cor-primaria); opacity: .5; flex-shrink: 0; }
.suporte-busca__input { flex: 1; background: none; border: none; outline: none; font-family: 'Syne', sans-serif; font-size: 14px; color: var(--cor-texto); caret-color: var(--cor-primaria); }
.suporte-busca__input::placeholder { color: var(--cor-texto-3); }
.busca-clear { background: none; border: none; cursor: pointer; color: var(--cor-texto-3); display: flex; align-items: center; padding: 4px; transition: color .2s; }
.busca-clear:hover { color: var(--cor-primaria); }

/* ── CONTAINER ── */
.policy-container { max-width: 1200px; margin: 0 auto; padding: 16px 48px 80px; display: grid; grid-template-columns: 1fr 260px; gap: 56px; }

/* ── PRINCÍPIOS ── */
.principios-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
.principio-card { background: var(--cor-superficie); border: .5px solid var(--cor-borda); padding: 20px; display: flex; flex-direction: column; gap: 12px; transition: border-color .2s; }
.principio-card:hover { border-color: rgba(245,166,35,.3); }
.principio-card__ico { color: var(--cor-primaria); opacity: .6; }
.principio-card__corpo h4 { font-size: 12px; font-weight: 600; color: var(--cor-texto-2); margin-bottom: 6px; letter-spacing: .04em; }
.principio-card__corpo p { font-size: 11.5px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.65; }

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
.section-sub strong { color: var(--cor-primaria); }

/* ── SEÇÕES EXPANSÍVEIS ── */
.secoes-lista { display: flex; flex-direction: column; margin-bottom: 8px; }
.secao-item { border-bottom: .5px solid rgba(255,255,255,.05); }
.secao-item:first-child { border-top: .5px solid rgba(255,255,255,.05); }
.secao-item__header { width: 100%; display: flex; align-items: center; gap: 14px; padding: 18px 0; background: none; border: none; cursor: pointer; text-align: left; position: relative; }
.secao-item__header::before { content: ''; position: absolute; left: -24px; top: 14px; bottom: 14px; width: .5px; background: var(--cor-primaria); opacity: 0; transition: opacity .3s; }
.secao-item.is-open .secao-item__header::before, .secao-item__header:hover::before { opacity: .6; }
.secao-item__num { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--cor-primaria); opacity: .3; flex-shrink: 0; min-width: 28px; }
.secao-item__titulo { flex: 1; font-size: 14px; color: var(--cor-texto-2); letter-spacing: .02em; transition: color .2s; }
.secao-item.is-open .secao-item__titulo, .secao-item__header:hover .secao-item__titulo { color: var(--cor-texto); }
.secao-item__tag { font-size: 8px; letter-spacing: .3em; text-transform: uppercase; color: var(--cor-primaria); opacity: .5; background: rgba(245,166,35,.06); border: .5px solid rgba(245,166,35,.2); padding: 3px 8px; flex-shrink: 0; }
.secao-item__chevron { color: var(--cor-texto-3); flex-shrink: 0; transition: transform .35s cubic-bezier(.16,1,.3,1); }
.secao-item.is-open .secao-item__chevron { transform: rotate(180deg); color: var(--cor-primaria); }
.secao-item__corpo { padding: 0 0 24px 42px; }
.secao-item__corpo p { font-size: 13px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.85; margin-bottom: 12px; }
.secao-item__corpo p:last-child { margin-bottom: 0; }
.secao-lista { list-style: none; padding: 0; margin: 0 0 12px 0; display: flex; flex-direction: column; gap: 8px; }
.secao-lista li { font-size: 12.5px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.65; padding-left: 16px; position: relative; }
.secao-lista li::before { content: '·'; position: absolute; left: 0; color: var(--cor-primaria); opacity: .6; }

/* ── SUB-SEÇÕES ── */
.sub-secoes { display: flex; flex-direction: column; gap: 20px; margin-top: 4px; }
.sub-secao { background: rgba(245,166,35,.02); border-left: 1.5px solid rgba(245,166,35,.15); padding: 14px 16px; }
.sub-secao h5 { font-size: 10px; letter-spacing: .35em; text-transform: uppercase; color: var(--cor-primaria); opacity: .75; margin-bottom: 8px; font-weight: 600; }
.sub-secao p { font-size: 12.5px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.75; margin-bottom: 10px; }
.sub-secao p:last-child { margin-bottom: 0; }
.sub-secao .secao-lista { margin-top: 8px; }

/* ── DESTAQUE ── */
.secao-destaque { display: flex; align-items: flex-start; gap: 10px; background: rgba(245,166,35,.04); border: .5px solid rgba(245,166,35,.15); border-left-width: 2px; padding: 12px 14px; margin-top: 14px; }
.secao-destaque svg { color: var(--cor-primaria); opacity: .6; flex-shrink: 0; margin-top: 1px; }
.secao-destaque p { font-size: 12px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.7; margin: 0; }
.secao-link-wrap { margin-top: 14px; }
.secao-link { display: inline-flex; align-items: center; gap: 7px; font-size: 9px; letter-spacing: .3em; text-transform: uppercase; color: var(--cor-primaria); text-decoration: none; border-bottom: .5px solid rgba(245,166,35,.3); padding-bottom: 2px; transition: all .2s; }
.secao-link:hover { gap: 11px; border-color: var(--cor-primaria); }

/* ── EMPTY STATE ── */
.faq-vazio { padding: 40px 0; text-align: center; font-size: 13px; color: var(--cor-texto-3); font-weight: 300; }
.faq-vazio em { color: var(--cor-primaria); font-style: normal; }

/* ── DIREITOS LGPD ── */
.direitos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; }
.direito-card { background: var(--cor-superficie); border: .5px solid var(--cor-borda); padding: 20px; display: flex; flex-direction: column; gap: 10px; position: relative; overflow: hidden; transition: border-color .2s; }
.direito-card:hover { border-color: rgba(245,166,35,.3); }
.direito-card__num { position: absolute; top: 16px; right: 16px; font-family: 'DM Mono', monospace; font-size: 22px; color: rgba(245,166,35,.06); line-height: 1; font-weight: 700; }
.direito-card__ico { color: var(--cor-primaria); opacity: .6; }
.direito-card h4 { font-size: 12px; font-weight: 600; color: var(--cor-texto-2); letter-spacing: .05em; }
.direito-card p { font-size: 11.5px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.65; }

/* ── TABELA COOKIES ── */
.cookies-table { border: .5px solid var(--cor-borda); margin-bottom: 14px; overflow: hidden; }
.cookies-table__header { display: grid; grid-template-columns: 1fr 2fr 1fr 100px; gap: 0; padding: 10px 16px; background: rgba(245,166,35,.05); border-bottom: .5px solid var(--cor-borda); font-size: 8px; letter-spacing: .4em; text-transform: uppercase; color: var(--cor-primaria); opacity: .8; }
.cookies-table__row { display: grid; grid-template-columns: 1fr 2fr 1fr 100px; gap: 0; padding: 12px 16px; border-bottom: .5px solid rgba(255,255,255,.03); font-size: 12px; transition: background .15s; }
.cookies-table__row:last-child { border-bottom: none; }
.cookies-table__row:hover { background: rgba(245,166,35,.02); }
.ct-tipo { font-weight: 500; color: var(--cor-texto-2); }
.ct-finalidade { color: var(--cor-texto-3); font-weight: 300; line-height: 1.4; }
.ct-duracao { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--cor-texto-3); }
.ct-essencial { font-size: 9px; letter-spacing: .15em; text-transform: uppercase; font-weight: 600; align-self: center; }
.ct-essencial--sim { color: #2ecc71; }
.ct-essencial--nao { color: var(--cor-primaria); opacity: .7; }
.cookies-cta { display: flex; align-items: flex-start; gap: 9px; font-size: 11.5px; color: var(--cor-texto-3); line-height: 1.6; background: rgba(245,166,35,.025); border: .5px solid var(--cor-borda); padding: 10px 14px; margin-bottom: 8px; }
.cookies-cta svg { color: var(--cor-primaria); opacity: .55; flex-shrink: 0; margin-top: 1px; }
.link-inline { color: var(--cor-primaria); text-decoration: none; border-bottom: .5px solid rgba(245,166,35,.35); transition: border-color .2s; }
.link-inline:hover { border-color: var(--cor-primaria); }

/* ── FORMULÁRIO ── */
.chamado-form { display: flex; flex-direction: column; gap: 18px; background: var(--cor-superficie); border: .5px solid var(--cor-borda); padding: 28px; }
.chamado-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.cf-campo { display: flex; flex-direction: column; gap: 6px; position: relative; }
.cf-campo label { font-size: 8px; letter-spacing: .4em; text-transform: uppercase; color: var(--cor-primaria); opacity: .75; }
.cf-campo input, .cf-campo textarea, .cf-select { background: rgba(245,166,35,.03); border: .5px solid var(--cor-borda); padding: 10px 12px; color: var(--cor-texto); font-family: 'Syne', sans-serif; font-size: 13px; outline: none; transition: border-color .25s; resize: vertical; }
.cf-campo input:focus, .cf-campo textarea:focus, .cf-select:focus { border-color: var(--cor-primaria); }
.cf-campo input::placeholder, .cf-campo textarea::placeholder { color: var(--cor-texto-3); }
.cf-select { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(245,166,35,0.5)' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; }
.cf-select option { background: var(--cor-superficie); }
.cf-campo--err input, .cf-campo--err textarea { border-color: rgba(231,76,60,.55); }
.cf-erro { font-size: 10px; color: #e74c3c; font-family: 'DM Mono', monospace; }
.cf-charcount { align-self: flex-end; font-family: 'DM Mono', monospace; font-size: 9px; color: var(--cor-texto-3); }
.cf-charcount.is-warn { color: #e74c3c; }
.cf-erro-geral { display: flex; align-items: center; gap: 8px; font-size: 11px; color: #e74c3c; background: rgba(231,76,60,.05); border-left: 2px solid #e74c3c; padding: 8px 12px; }
.lgpd-aviso { display: flex; align-items: flex-start; gap: 9px; font-size: 11px; color: var(--cor-texto-3); line-height: 1.6; background: rgba(245,166,35,.025); border: .5px solid var(--cor-borda); padding: 10px 14px; }
.lgpd-aviso svg { color: var(--cor-primaria); opacity: .55; flex-shrink: 0; margin-top: 1px; }
.lgpd-aviso strong { color: var(--cor-primaria); }
.chamado-sla { display: flex; align-items: center; gap: 8px; font-size: 10px; letter-spacing: .05em; color: var(--cor-texto-3); background: rgba(245,166,35,.03); border: .5px solid var(--cor-borda); padding: 8px 12px; }
.chamado-sla svg { color: var(--cor-primaria); opacity: .6; flex-shrink: 0; }
.chamado-sla strong { color: var(--cor-primaria); }
.cf-submit { align-self: flex-start; padding: 13px 32px; background: var(--cor-primaria); border: none; color: #0A0A0A; font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .3em; text-transform: uppercase; cursor: pointer; transition: all .25s; display: flex; align-items: center; justify-content: center; min-width: 220px; min-height: 42px; }
.cf-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(245,166,35,.3); }
.cf-submit:disabled { opacity: .5; cursor: not-allowed; }
.cf-spin { width: 14px; height: 14px; border: 2px solid rgba(0,0,0,.2); border-top-color: #0A0A0A; border-radius: 50%; animation: cfSpin .7s linear infinite; }
@keyframes cfSpin { to { transform: rotate(360deg); } }

/* ── SUCESSO ── */
.chamado-sucesso { background: var(--cor-superficie); border: .5px solid rgba(46,204,113,.25); border-left-width: 2px; padding: 36px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; }
.chamado-sucesso__ico { width: 54px; height: 54px; border-radius: 50%; background: rgba(46,204,113,.1); border: 1px solid rgba(46,204,113,.3); color: #2ecc71; display: flex; align-items: center; justify-content: center; margin-bottom: 6px; }
.chamado-sucesso h3 { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 300; color: var(--cor-texto); }
.chamado-sucesso__num { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--cor-texto-2); }
.chamado-sucesso__num strong { color: var(--cor-primaria); }
.chamado-sucesso__desc { font-size: 12px; color: var(--cor-texto-3); line-height: 1.8; max-width: 440px; }
.chamado-sucesso__resumo { width: 100%; max-width: 400px; border: .5px solid var(--cor-borda); margin-top: 6px; }
.cs-row { display: flex; justify-content: space-between; padding: 8px 14px; font-size: 11px; border-bottom: .5px solid var(--cor-borda); }
.cs-row:last-child { border-bottom: none; }
.cs-row span:first-child { color: var(--cor-texto-3); }
.cs-row span:last-child { color: var(--cor-texto-2); font-weight: 600; }
.prio--normal { color: var(--cor-primaria) !important; }
.btn-ghost-policy { margin-top: 10px; background: none; border: .5px solid var(--cor-borda); padding: 9px 22px; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--cor-texto-2); cursor: pointer; transition: all .2s; }
.btn-ghost-policy:hover { border-color: var(--cor-primaria); color: var(--cor-primaria); }

/* ── DPO ── */
.dpo-card { display: flex; align-items: flex-start; gap: 20px; background: var(--cor-superficie); border: .5px solid var(--cor-borda); border-left: 2px solid rgba(245,166,35,.3); padding: 28px; }
.dpo-card__ico { width: 48px; height: 48px; flex-shrink: 0; background: rgba(245,166,35,.06); border: .5px solid var(--cor-borda); display: flex; align-items: center; justify-content: center; color: var(--cor-primaria); opacity: .7; }
.dpo-card__info { flex: 1; }
.dpo-card__label { display: block; font-size: 8px; letter-spacing: .45em; text-transform: uppercase; color: var(--cor-primaria); opacity: .7; margin-bottom: 8px; }
.dpo-card__info h3 { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 300; color: var(--cor-texto); margin-bottom: 8px; }
.dpo-card__info p { font-size: 12px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.75; margin-bottom: 16px; }
.dpo-card__contatos { display: flex; flex-direction: column; gap: 8px; }
.dpo-contato { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--cor-texto-2); text-decoration: none; transition: color .2s; font-family: 'DM Mono', monospace; }
.dpo-contato svg { color: var(--cor-primaria); opacity: .6; flex-shrink: 0; }
a.dpo-contato:hover { color: var(--cor-primaria); }

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

/* ── ÍNDICE RÁPIDO ── */
.sidebar-indice { margin-bottom: 20px; border-top: .5px solid var(--cor-borda); padding-top: 16px; }
.sidebar-indice__titulo { font-size: 9px; letter-spacing: .25em; text-transform: uppercase; color: var(--cor-texto-3); margin-bottom: 10px; }
.sidebar-indice ul { list-style: none; padding: 0; margin: 0; }
.sidebar-indice li { border-bottom: .5px solid rgba(255,255,255,.03); }
.sidebar-indice li:last-child { border-bottom: none; }
.sidebar-indice__link { width: 100%; display: flex; align-items: center; gap: 8px; background: none; border: none; padding: 7px 0; font-size: 11px; color: var(--cor-texto-3); text-align: left; cursor: pointer; transition: color .2s; font-family: 'Syne', sans-serif; }
.sidebar-indice__link:hover { color: var(--cor-primaria); }
.sidebar-indice__n { font-family: 'DM Mono', monospace; font-size: 9px; color: var(--cor-primaria); opacity: .35; flex-shrink: 0; }

/* ── STATUS ── */
.sidebar-status { display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(255,255,255,.03); border: .5px solid var(--cor-borda); margin-bottom: 16px; }
.sidebar-status__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.sidebar-status__dot.is-online { background: #f5a623; box-shadow: 0 0 0 3px rgba(245,166,35,.2); animation: pulseGold 2s ease-in-out infinite; }
@keyframes pulseGold { 0%,100% { box-shadow: 0 0 0 0 rgba(245,166,35,.3) } 50% { box-shadow: 0 0 0 5px rgba(245,166,35,0) } }
.sidebar-status__titulo { font-size: 11px; font-weight: 600; color: var(--cor-texto-2); }
.sidebar-status__hora { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--cor-primaria); opacity: .6; }

/* ── CTA SIDEBAR ── */
.sidebar-cta { display: flex; align-items: center; justify-content: center; gap: 8px; background: rgba(245,166,35,.08); border: .5px solid var(--cor-primaria); color: var(--cor-primaria); font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; padding: 11px; cursor: pointer; margin-bottom: 20px; transition: all .2s; }
.sidebar-cta:hover { background: var(--cor-primaria); color: #0A0A0A; }

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
.fade-enter-active, .fade-leave-active { transition: opacity .25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.msg-fade-enter-active, .msg-fade-leave-active { transition: all .2s; }
.msg-fade-enter-from, .msg-fade-leave-to { opacity: 0; transform: translateY(-4px); }
.secao-drop-enter-active, .secao-drop-leave-active { transition: opacity .3s, max-height .4s cubic-bezier(.16,1,.3,1); overflow: hidden; }
.secao-drop-enter-from, .secao-drop-leave-to { opacity: 0; max-height: 0; }
.secao-drop-enter-to, .secao-drop-leave-from { opacity: 1; max-height: 2000px; }
.faq-drop-enter-active, .faq-drop-leave-active { transition: opacity .25s, max-height .3s; overflow: hidden; }
.faq-drop-enter-from, .faq-drop-leave-to { opacity: 0; max-height: 0; }
.faq-drop-enter-to, .faq-drop-leave-from { opacity: 1; max-height: 200px; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .suporte-busca-wrap, .policy-container, .policy-hero-content { padding-left: 28px; padding-right: 28px; }
}
@media (max-width: 900px) {
  .policy-container { grid-template-columns: 1fr; gap: 40px; }
  .policy-sidebar { position: static; }
  .principios-grid { grid-template-columns: 1fr 1fr; }
  .direitos-grid { grid-template-columns: 1fr 1fr; }
  .policy-hero-kamon { display: none; }
  .chamado-grid { grid-template-columns: 1fr; }
  .cookies-table__header, .cookies-table__row { grid-template-columns: 1fr 2fr 80px; }
  .cookies-table__header span:last-child, .ct-essencial { display: none; }
}
@media (max-width: 600px) {
  .suporte-busca-wrap, .policy-container, .policy-hero-content { padding-left: 20px; padding-right: 20px; }
  .hero-stats { flex-direction: column; gap: 16px; }
  .hero-stat-sep { display: none; }
  .principios-grid { grid-template-columns: 1fr; }
  .direitos-grid { grid-template-columns: 1fr; }
  .dpo-card { flex-direction: column; }
  .cookies-table__header, .cookies-table__row { grid-template-columns: 1fr 2fr; }
  .cookies-table__header span:nth-child(3), .ct-duracao { display: none; }
}
</style>