<template>
  <div class="policy-page">

    <!-- ══ HERO ══ -->
    <div class="policy-hero">
      <div class="policy-hero-glow"></div>
      <div class="policy-hero-kamon" aria-hidden="true">証</div>
      <div class="policy-hero-content">
        <div class="breadcrumb">
          <router-link to="/">Início</router-link>
          <span class="sep">·</span>
          <span class="current">Termos de Custódia</span>
        </div>
        <div class="hero-eyebrow"><span class="hero-eyebrow__dot"></span><span>AUTENTICIDADE · NOIR &amp; OR</span></div>
        <h1>Termos de<br/><em>Custódia</em></h1>
        <p class="hero-sub">Cada peça é um compromisso registrado. Autenticidade certificada, design protegido, responsabilidades claras.</p>
        <div class="hero-stats">
          <div class="hero-stat"><span class="hero-stat__num">NºS</span><span class="hero-stat__label">Série único por peça</span></div>
          <div class="hero-stat-sep"></div>
          <div class="hero-stat"><span class="hero-stat__num">2×</span><span class="hero-stat__label">Certificado físico + digital</span></div>
          <div class="hero-stat-sep"></div>
          <div class="hero-stat"><span class="hero-stat__num">∞</span><span class="hero-stat__label">Vinculado ao comprador</span></div>
        </div>
      </div>
    </div>

    <div class="policy-container">
      <div class="policy-content">

        <!-- ══ CERTIFICADO ══ -->
        <div class="destaque-card">
          <div class="destaque-card__ico">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
          </div>
          <div>
            <p class="destaque-card__titulo">Certificado de Autenticidade — Digital e Físico</p>
            <p class="destaque-card__desc">Todo produto comercializado pelo Atelier Noir &amp; Or é acompanhado de certificado físico (incluso na embalagem) e certificado digital vinculado ao CPF do comprador, com número de série único que atesta a originalidade do revestimento e dos materiais empregados. Este certificado é o comprovante da Garantia Vitalícia e deve ser conservado.</p>
          </div>
        </div>

        <!-- ══ O QUE PROTEGEMOS / O QUE ANULA ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">守</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Cobertura e Limitações</h2>
        <p class="section-sub">Os termos de custódia definem o que o Atelier garante e o que pode anular a cobertura da peça.</p>

        <div class="cobertura-grid">
          <div class="cobertura-card cobertura-card--ok">
            <div class="cobertura-card__head">
              <span class="cobertura-card__ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span>
              <h3>Protegido pelo Atelier</h3>
            </div>
            <ul>
              <li>Originalidade do revestimento em ouro 24K, rose gold ou platina atestada em certificado</li>
              <li>Design exclusivo das coleções registrado em propriedade intelectual</li>
              <li>Integridade do número de série vinculado ao comprador original</li>
              <li>Sigilo sobre técnicas proprietárias de aplicação e acabamento</li>
            </ul>
          </div>
          <div class="cobertura-card cobertura-card--no">
            <div class="cobertura-card__head">
              <span class="cobertura-card__ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg></span>
              <h3>O que anula a custódia</h3>
            </div>
            <ul>
              <li>Remoção, adulteração ou dano ao certificado físico ou número de série</li>
              <li>Assistência técnica realizada por terceiros não credenciados pelo Atelier</li>
              <li>Modificação estrutural ou tentativa de reprodução do revestimento original</li>
              <li>Transferência da custódia a terceiros sem autorização formal do Atelier</li>
            </ul>
          </div>
        </div>

        <!-- ══ PROPRIEDADE INTELECTUAL ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">権</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Propriedade Intelectual</h2>
        <p class="section-sub">O design das coleções é um patrimônio exclusivo do Atelier, registrado e protegido por lei.</p>

        <div class="pi-grid">
          <div class="pi-item" v-for="item in propriedadeIntelectual" :key="item.titulo">
            <div class="pi-item__ico" v-html="item.icone"></div>
            <div>
              <p class="pi-item__titulo">{{ item.titulo }}</p>
              <p class="pi-item__desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <!-- ══ RESPONSABILIDADES ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">責</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Responsabilidades</h2>
        <p class="section-sub">Uma relação clara entre o que o Atelier garante e o que é responsabilidade do comprador.</p>

        <div class="resp-grid">
          <div class="resp-col">
            <div class="resp-col__head resp-col__head--atelier">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Atelier Noir &amp; Or</span>
            </div>
            <ul>
              <li v-for="r in respAtelier" :key="r">{{ r }}</li>
            </ul>
          </div>
          <div class="resp-col">
            <div class="resp-col__head resp-col__head--cliente">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Comprador</span>
            </div>
            <ul>
              <li v-for="r in respCliente" :key="r">{{ r }}</li>
            </ul>
          </div>
        </div>

        <!-- ══ VIOLAÇÃO ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">断</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Violação da Custódia</h2>
        <p class="section-sub">Situações que constituem violação dos termos e suas consequências.</p>

        <div class="violacao-lista">
          <div class="violacao-item" v-for="(v, i) in violacoes" :key="i">
            <div class="violacao-item__num">{{ String(i+1).padStart(2,'0') }}</div>
            <div class="violacao-item__corpo">
              <h4>{{ v.titulo }}</h4>
              <p>{{ v.desc }}</p>
              <span class="violacao-item__consequencia">{{ v.consequencia }}</span>
            </div>
          </div>
        </div>

        <!-- ══ VERIFICAR CERTIFICADO ══ -->
        <div class="or-sep"><span class="or-sep__line"></span><span class="or-sep__kanji">確</span><span class="or-sep__line or-sep__line--r"></span></div>
        <h2 class="section-title">Verificar Certificado</h2>
        <p class="section-sub">Informe o número de série da peça para consultar a autenticidade e o registro de custódia.</p>

        <div class="verif-box">
          <div class="verif-row">
            <input
              v-model.trim="verifSerie"
              placeholder="Número de série (ex: NO-2024-00000)"
              style="text-transform:uppercase; font-family:'DM Mono',monospace; letter-spacing:.06em"
              @keyup.enter="verificarCertificado"
              :disabled="verificando"
            />
            <button class="btn-gold-policy" @click="verificarCertificado" :disabled="verificando || !verifSerie">
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
                  {{ verifResultado.status === 'autêntico' ? 'Autenticidade Confirmada' : 'Registro Não Encontrado' }}
                </span>
                <span class="verif-resultado__ped">{{ verifResultado.serie }}</span>
              </div>
              <div class="verif-resultado__rows">
                <div class="vr-row"><span>Produto</span><span>{{ verifResultado.produto }}</span></div>
                <div class="vr-row"><span>Revestimento</span><span>{{ verifResultado.revestimento }}</span></div>
                <div class="vr-row"><span>Data de emissão</span><span>{{ verifResultado.dataEmissao }}</span></div>
                <div class="vr-row"><span>Custódia</span><span>{{ verifResultado.custodia }}</span></div>
              </div>
              <p class="verif-resultado__nota" v-if="verifResultado.status === 'autêntico'">
                Esta peça é um produto legítimo do Atelier Noir &amp; Or. O certificado confirma a originalidade do revestimento e vincula a custódia ao comprador registrado.
              </p>
            </div>
          </transition>
        </div>

        <div class="suporte-garantia">
          <div class="suporte-garantia__ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
          <div>
            <p class="suporte-garantia__titulo">Certificado vinculado à Garantia Vitalícia</p>
            <p class="suporte-garantia__desc">A custódia da peça e a <router-link to="/garantia" class="link-inline">Garantia Vitalícia</router-link> são inseparáveis. Manter o certificado íntegro é condição para acionar cobertura por oxidação, desgaste ou defeito de fabricação a qualquer momento.</p>
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
          <li><router-link to="/termos-custodia" class="sidebar-link sidebar-link--active"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>Termos de Custódia</router-link></li>
          <li><router-link to="/politica-privacidade" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Privacidade</router-link></li>
          <li><router-link to="/politica-cookies" class="sidebar-link"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>Cookies</router-link></li>
        </ul>

        <div class="sidebar-status">
          <div class="sidebar-status__dot is-online"></div>
          <div>
            <p class="sidebar-status__titulo">Certificação Ativa</p>
            <p class="sidebar-status__hora">Vinculada ao comprador</p>
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
const propriedadeIntelectual = [
  {
    titulo: 'Design das coleções',
    desc: 'Os padrões visuais, formas e composições de cada coleção são registrados. Reprodução total ou parcial, mesmo para uso pessoal, constitui violação de propriedade intelectual.',
    icone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
  },
  {
    titulo: 'Técnicas de aplicação',
    desc: 'Os processos proprietários de revestimento em ouro e metais nobres são segredos industriais protegidos. Qualquer tentativa de engenharia reversa é expressamente vedada.',
    icone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>',
  },
  {
    titulo: 'Marca e identidade visual',
    desc: 'O nome Noir & Or, logotipos, tipografia proprietária e elementos de identidade visual são marcas registradas. Uso não autorizado está sujeito a sanções legais.',
    icone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>',
  },
]

const respAtelier = [
  'Emitir certificado de autenticidade para cada produto comercializado',
  'Manter registro seguro dos números de série e suas titularidades',
  'Responder por defeitos de fabricação e desgaste prematuro do revestimento',
  'Proteger os dados do comprador conforme a LGPD',
  'Comunicar alterações nos termos com antecedência mínima de 30 dias',
]

const respCliente = [
  'Conservar o certificado físico e o número de série da peça',
  'Seguir as instruções de cuidado e conservação fornecidas na embalagem',
  'Não submeter a peça a assistência técnica de terceiros não credenciados',
  'Comunicar imediatamente ao Atelier qualquer dano, perda ou extravio do certificado',
  'Não tentar reproduzir, modificar ou remover o revestimento original',
]

const violacoes = [
  {
    titulo: 'Modificação ou remoção do revestimento',
    desc: 'Qualquer tentativa de alterar, remover ou substituir o revestimento original em ouro ou metais nobres por conta própria ou por terceiros não autorizados.',
    consequencia: 'Anula automaticamente a Garantia Vitalícia e o certificado de autenticidade.',
  },
  {
    titulo: 'Assistência técnica não credenciada',
    desc: 'Levar a peça a polimento, reparo ou qualquer intervenção realizada por profissional ou estabelecimento sem credenciamento formal pelo Atelier.',
    consequencia: 'Suspende a cobertura de garantia para todos os defeitos subsequentes à intervenção.',
  },
  {
    titulo: 'Adulteração do número de série',
    desc: 'Rasura, remoção, substituição ou qualquer tipo de alteração no número de série gravado ou inscrito na peça ou em seu certificado físico.',
    consequencia: 'Invalida o certificado e impossibilita qualquer verificação ou acionamento de garantia.',
  },
  {
    titulo: 'Reprodução não autorizada do design',
    desc: 'Cópia, reprodução total ou parcial do design, padrões decorativos ou técnicas de acabamento das coleções do Atelier, inclusive para fins não comerciais.',
    consequencia: 'Sujeito a ação legal por violação de propriedade intelectual.',
  },
]

const faqMini = [
  { q: 'Perdi o certificado físico, e agora?', a: 'O certificado digital permanece vinculado ao seu CPF e pode ser consultado em "Minha Conta". Entre em contato para solicitar a segunda via do certificado físico.' },
  { q: 'Posso levar para um joalheiro externo?', a: 'Não recomendamos. Qualquer intervenção por profissional não credenciado pelo Atelier suspende a cobertura da Garantia Vitalícia para defeitos decorrentes desse serviço.' },
  { q: 'A custódia transfere se eu vender a peça?', a: 'Não. A custódia e a Garantia Vitalícia são vinculadas exclusivamente ao CPF do comprador original e não são transferíveis a terceiros.' },
]
const faqMiniAberto = ref(null)

/* ══════════════════════
   VERIFICAR CERTIFICADO
══════════════════════ */
const verifSerie = ref('')
const verificando = ref(false)
const verifErro = ref('')
const verifResultado = ref(null)

const verificarCertificado = async () => {
  if (!verifSerie.value) return
  verifErro.value = ''
  verifResultado.value = null
  verificando.value = true
  try {
    const { data } = await api.get(`/certificados/${verifSerie.value.trim().toUpperCase()}`)
    const cert = data?.certificado || data
    verifResultado.value = {
      serie: verifSerie.value.trim().toUpperCase(),
      produto: cert?.produto?.nome || cert?.nomeProduto || 'Produto Noir & Or',
      revestimento: cert?.revestimento || 'Ouro 24K',
      dataEmissao: new Date(cert?.emitidoEm || cert?.criadoEm || Date.now()).toLocaleDateString('pt-BR'),
      custodia: cert?.titular ? `Registrada — ${cert.titular.split(' ')[0]}` : 'Registrada — comprador original',
      status: 'autêntico',
    }
  } catch {
    verifErro.value = 'Número de série não encontrado no registro. Verifique se digitou corretamente ou entre em contato com o Atelier para validação manual via contato@noiror.com.br.'
  } finally {
    verificando.value = false
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

/* ── DESTAQUE ── */
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

/* ── COBERTURA GRID ── */
.cobertura-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 8px; }
.cobertura-card { background: var(--cor-superficie); border: .5px solid var(--cor-borda); padding: 24px; border-left-width: 2px; }
.cobertura-card--ok { border-left-color: #2ecc71; }
.cobertura-card--no { border-left-color: #e74c3c; }
.cobertura-card__head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.cobertura-card__ico { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.cobertura-card--ok .cobertura-card__ico { background: rgba(46,204,113,.1); color: #2ecc71; }
.cobertura-card--no .cobertura-card__ico { background: rgba(231,76,60,.1); color: #e74c3c; }
.cobertura-card h3 { font-size: 13px; font-weight: 600; letter-spacing: .04em; color: var(--cor-texto); }
.cobertura-card ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
.cobertura-card li { font-size: 12.5px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.6; padding-left: 16px; position: relative; }
.cobertura-card li::before { position: absolute; left: 0; top: 0; font-size: 11px; }
.cobertura-card--ok li::before { content: '+'; color: #2ecc71; }
.cobertura-card--no li::before { content: '–'; color: #e74c3c; }

/* ── PROPRIEDADE INTELECTUAL ── */
.pi-grid { display: flex; flex-direction: column; gap: 12px; margin-bottom: 8px; }
.pi-item { display: flex; align-items: flex-start; gap: 16px; background: var(--cor-superficie); border: .5px solid var(--cor-borda); padding: 20px; }
.pi-item__ico { color: var(--cor-primaria); opacity: .6; flex-shrink: 0; margin-top: 2px; }
.pi-item__titulo { font-size: 12px; font-weight: 600; color: var(--cor-texto-2); margin-bottom: 5px; }
.pi-item__desc { font-size: 12px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.7; }

/* ── RESPONSABILIDADES ── */
.resp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 8px; }
.resp-col { background: var(--cor-superficie); border: .5px solid var(--cor-borda); padding: 0; overflow: hidden; }
.resp-col__head { display: flex; align-items: center; gap: 10px; padding: 14px 20px; font-size: 10px; font-weight: 700; letter-spacing: .25em; text-transform: uppercase; border-bottom: .5px solid var(--cor-borda); }
.resp-col__head--atelier { color: var(--cor-primaria); background: rgba(245,166,35,.04); }
.resp-col__head--cliente { color: var(--cor-texto-2); background: rgba(255,255,255,.02); }
.resp-col ul { list-style: none; padding: 0; margin: 0; }
.resp-col li { font-size: 12px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.65; padding: 11px 20px; border-bottom: .5px solid rgba(255,255,255,.04); display: flex; gap: 10px; align-items: flex-start; }
.resp-col li:last-child { border-bottom: none; }
.resp-col li::before { content: '·'; color: var(--cor-primaria); opacity: .5; flex-shrink: 0; font-size: 16px; line-height: 1.2; }

/* ── VIOLAÇÕES ── */
.violacao-lista { display: flex; flex-direction: column; margin-bottom: 8px; }
.violacao-item { display: flex; gap: 18px; padding: 18px 0; border-bottom: .5px solid rgba(255,255,255,.05); }
.violacao-item:first-child { border-top: .5px solid rgba(255,255,255,.05); }
.violacao-item__num { font-family: 'DM Mono', monospace; font-size: 13px; color: #e74c3c; opacity: .45; flex-shrink: 0; min-width: 30px; }
.violacao-item__corpo h4 { font-size: 13px; font-weight: 600; color: var(--cor-texto-2); margin-bottom: 5px; }
.violacao-item__corpo p { font-size: 12.5px; font-weight: 300; color: var(--cor-texto-3); line-height: 1.7; margin-bottom: 8px; max-width: 520px; }
.violacao-item__consequencia { display: inline-flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 600; letter-spacing: .05em; color: #e74c3c; background: rgba(231,76,60,.07); border: .5px solid rgba(231,76,60,.2); padding: 4px 10px; }
.violacao-item__consequencia::before { content: '!'; font-family: 'DM Mono', monospace; }

/* ── VERIFICAR ── */
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
.verif-status-badge--autêntico { background: rgba(46,204,113,.12); color: #2ecc71; }
.verif-resultado__ped { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--cor-texto-3); }
.verif-resultado { margin-top: 18px; border: .5px solid var(--cor-borda); }
.verif-resultado__head { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(245,166,35,.03); border-bottom: .5px solid var(--cor-borda); }
.verif-resultado__rows { padding: 4px 16px; }
.vr-row { display: flex; justify-content: space-between; padding: 9px 0; border-bottom: .5px solid rgba(255,255,255,.04); font-size: 12px; }
.vr-row:last-child { border-bottom: none; }
.vr-row span:first-child { color: var(--cor-texto-3); }
.vr-row span:last-child { color: var(--cor-texto-2); font-weight: 600; }
.verif-resultado__nota { padding: 12px 16px; font-size: 11.5px; color: var(--cor-texto-3); line-height: 1.7; background: rgba(46,204,113,.03); border-top: .5px solid var(--cor-borda); }

/* ── BANNER ── */
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
.sidebar-status__dot.is-online { background: var(--cor-primaria); box-shadow: 0 0 0 3px rgba(245,166,35,.2); animation: pulseGold 2s ease-in-out infinite; }
@keyframes pulseGold { 0%,100% { box-shadow: 0 0 0 0 rgba(245,166,35,.3) } 50% { box-shadow: 0 0 0 5px rgba(245,166,35,0) } }
.sidebar-status__titulo { font-size: 11px; font-weight: 600; color: var(--cor-texto-2); }
.sidebar-status__hora { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--cor-primaria); opacity: .6; }
.sidebar-faq-mini { margin-bottom: 20px; border-top: .5px solid var(--cor-borda); padding-top: 16px; }
.sidebar-faq-mini__titulo { font-size: 9px; letter-spacing: .25em; text-transform: uppercase; color: var(--cor-texto-3); margin-bottom: 10px; }
.sfm-item { border-bottom: .5px solid rgba(255,255,255,.04); }
.sfm-item:last-child { border-bottom: none; }
.sfm-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px; background: none; border: none; padding: 9px 0; font-size: 11px; color: var(--cor-texto-2); text-align: left; cursor: pointer; }
.sfm-q svg { flex-shrink: 0; color: var(--cor-texto-3); }
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
.cf-spin { width: 14px; height: 14px; border: 2px solid rgba(0,0,0,.2); border-top-color: #0A0A0A; border-radius: 50%; animation: cfSpin .7s linear infinite; }
@keyframes cfSpin { to { transform: rotate(360deg); } }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) { .policy-container, .policy-hero-content { padding-left: 28px; padding-right: 28px; } }
@media (max-width: 900px) {
  .policy-container { grid-template-columns: 1fr; gap: 40px; }
  .policy-sidebar { position: static; }
  .cobertura-grid, .resp-grid { grid-template-columns: 1fr; }
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