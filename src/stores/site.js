import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api.js'

export const useSiteStore = defineStore('site', () => {
  const config = ref(null)

  // ── TEMA ──
  const temaStorage = localStorage.getItem('noir_tema') || 'escuro'
  const tema = ref(['escuro', 'claro', 'gamer'].includes(temaStorage) ? temaStorage : 'escuro')

  // ── FONTE ──
  const fonte = ref(localStorage.getItem('noir_fonte') || 'normal')

  // ── ACESSIBILIDADE ──
  const acessDefault = {
    altoContraste:    false,
    daltonismo:       'none',
    reduzirAnimacoes: false,
    fonteDislexia:    false,
    espacamento:      'normal',
    alturaLinha:      'normal',
    sublinharLinks:   false,
    cursorGrande:     false,
    focoVisivel:      false,
    larguraReduzida:  false,
    saturacao:        'normal',
  }
  const acess = ref({
    ...acessDefault,
    ...JSON.parse(localStorage.getItem('noir_acess') || '{}')
  })

  // ── APLICAR TEMA ──
  function aplicarTema(t) {
    document.body.classList.remove('light-mode', 'tema-claro', 'tema-escuro', 'gamer-mode', 'grain', 'gold-bezel')
    if (t === 'claro') {
      document.body.classList.add('light-mode')
    } else if (t === 'gamer') {
      document.body.classList.add('gamer-mode', 'gold-bezel')
    } else {
      document.body.classList.add('gold-bezel')
    }
  }

  // ── APLICAR FONTE ──
  function aplicarFonte(f) {
    const map = { pequena: '14px', normal: '16px', grande: '18px' }
    document.documentElement.style.fontSize = map[f] || '16px'
  }

  // ── APLICAR ACESSIBILIDADE ──
  function aplicarAcess(a) {
    const body = document.body

    body.classList.toggle('acess--alto-contraste',    a.altoContraste)
    body.classList.toggle('acess--reduzir-animacoes', a.reduzirAnimacoes)
    body.classList.toggle('acess--dislexia',          a.fonteDislexia)
    body.classList.toggle('acess--sublinhar-links',   a.sublinharLinks)
    body.classList.toggle('acess--cursor-grande',     a.cursorGrande)
    body.classList.toggle('acess--foco-visivel',      a.focoVisivel)
    body.classList.toggle('acess--largura-reduzida',  a.larguraReduzida)

    body.classList.remove('acess--protanopia', 'acess--deuteranopia', 'acess--tritanopia')
    if (a.daltonismo !== 'none') body.classList.add(`acess--${a.daltonismo}`)

    body.classList.remove('acess--espacamento-medio', 'acess--espacamento-grande')
    if (a.espacamento === 'medio')  body.classList.add('acess--espacamento-medio')
    if (a.espacamento === 'grande') body.classList.add('acess--espacamento-grande')

    body.classList.remove('acess--linha-media', 'acess--linha-grande')
    if (a.alturaLinha === 'media')  body.classList.add('acess--linha-media')
    if (a.alturaLinha === 'grande') body.classList.add('acess--linha-grande')

    body.classList.remove('acess--saturacao-baixa', 'acess--saturacao-zero')
    if (a.saturacao === 'baixa') body.classList.add('acess--saturacao-baixa')
    if (a.saturacao === 'zero')  body.classList.add('acess--saturacao-zero')
  }

  function applyCSSVars(cfg) {
    if (!cfg?.aparencia) return
    const a = cfg.aparencia
    const r = document.documentElement.style
    if (a.navbarAltura) r.setProperty('--navbar-h', a.navbarAltura + 'px')
    if (a.navbarBlur)   r.setProperty('--navbar-blur', a.navbarBlur + 'px')
    if (a.borderRadius) r.setProperty('--border-radius', a.borderRadius + 'px')
  }

  function toggleTema(t) {
    tema.value = t || (tema.value === 'escuro' ? 'claro' : 'escuro')
    localStorage.setItem('noir_tema', tema.value)
    aplicarTema(tema.value)
  }

  function setFonte(f) {
    fonte.value = f
    localStorage.setItem('noir_fonte', f)
    aplicarFonte(f)
  }

  function setAcess(chave, valor) {
    acess.value[chave] = valor
    localStorage.setItem('noir_acess', JSON.stringify(acess.value))
    aplicarAcess(acess.value)
  }

  function resetAcess() {
    acess.value = { ...acessDefault }
    localStorage.setItem('noir_acess', JSON.stringify(acess.value))
    aplicarAcess(acess.value)
  }

  async function fetchConfig() {
    try {
      const { data } = await api.get('/config')
      config.value = data.config
      applyCSSVars(data.config)
    } catch {
      console.log('Config backend indisponível.')
    }
    aplicarTema(tema.value)
    aplicarFonte(fonte.value)
    aplicarAcess(acess.value)
  }

  async function saveConfig(payload) {
    const { data } = await api.put('/config', payload)
    config.value = data.config
  }

  async function saveAparencia(ap) {
    const { data } = await api.put('/config/aparencia', { aparencia: ap })
    config.value = data.config
    applyCSSVars(data.config)
  }

  return {
    config, tema, fonte, acess,
    fetchConfig, saveConfig, saveAparencia,
    applyCSSVars, toggleTema, setFonte, setAcess, resetAcess,
  }
})