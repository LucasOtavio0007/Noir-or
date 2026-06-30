<template>
  <div class="navbar-root">

    <!-- SVG filters para daltonismo (invisíveis) -->
    <svg style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
      <defs>
        <filter id="filter-protanopia">
          <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0"/>
        </filter>
        <filter id="filter-deuteranopia">
          <feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0"/>
        </filter>
        <filter id="filter-tritanopia">
          <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0"/>
        </filter>
      </defs>
    </svg>

    <a href="#main-content" class="skip-link">Pular para o conteúdo</a>

    <div class="nb-progress" :style="{ transform: `scaleX(${scrollProgress / 100})` }" aria-hidden="true"></div>

    <!-- TOAST SYSTEM -->
    <teleport to="body">
      <transition-group name="toast" tag="ul" class="toast-container" aria-live="polite" aria-atomic="false" :css="false" @enter="onToastEnter" @leave="onToastLeave">
        <li v-for="t in toasts" :key="t.id" :class="['toast', `toast--${t.type}`]" role="alert">
          <div class="toast__icon" aria-hidden="true">
            <svg v-if="t.type === 'success'" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div class="toast__body">
            <span class="toast__title">{{ t.title }}</span>
            <span v-if="t.msg" class="toast__msg">{{ t.msg }}</span>
          </div>
          <button class="toast__close" @click="removeToast(t.id)" aria-label="Fechar">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div class="toast__progress" :style="{ animationDuration: t.duration + 'ms' }"></div>
        </li>
      </transition-group>
    </teleport>

    <!-- NAVBAR -->
    <header :class="['navbar', { 'navbar--scrolled': scrolled }, { 'navbar--hidden': scrollHide }]" role="banner">
      <div class="navbar__inner">
        <div class="navbar__left">
          <button class="nb-burger" :class="{ 'is-open': sidebarOpen }" @click="sidebarOpen = !sidebarOpen"
            :aria-label="sidebarOpen ? 'Fechar menu' : 'Abrir menu'" :aria-expanded="sidebarOpen" aria-controls="sidebar-menu">
            <span class="nb-burger__bar nb-burger__bar--1"></span>
            <span class="nb-burger__bar nb-burger__bar--2"></span>
            <span class="nb-burger__bar nb-burger__bar--3"></span>
          </button>
          <nav class="nb-links" aria-label="Navegação principal">
            <router-link v-for="l in allLinks" :key="l.to" :to="l.to" class="nb-link"
              :class="{ 'nb-link--gamer': l.label === 'Gamer' }" :aria-current="$route.path === l.to ? 'page' : undefined">
              <span v-if="l.label === 'Gamer'" class="nb-link--gamer__ico" aria-hidden="true">巴</span>
              {{ l.label }}
            </router-link>
          </nav>
        </div>

        <router-link to="/" class="nb-logo" aria-label="Noir & Or — Página inicial">
          <img v-if="logoImgOk" :src="logoSrc" :alt="logoAlt" class="nb-logo__img" @error="logoImgOk = false" />
          <template v-else>
            <div class="nb-logo__mark" aria-hidden="true"></div>
            <span class="nb-logo__text">Noir<em>&amp;</em>Or</span>
          </template>
        </router-link>

        <div class="nb-right">
          <div class="nb-search-wrap" :class="{ 'is-open': searchOpen }">
            <button class="nb-icon" :class="{ 'is-active': searchOpen }" @click="toggleSearch" aria-label="Buscar produtos" :aria-expanded="searchOpen">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <transition name="search-drop">
              <div v-if="searchOpen" class="nb-search-panel" role="search">
                <div class="or-panel-kamon" aria-hidden="true">家紋</div>
                <div class="or-panel-border" aria-hidden="true"></div>
                <div class="nb-search-field">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input ref="searchInput" v-model="searchQuery" type="search" placeholder="探す — Buscar na coleção..." aria-label="Campo de busca" autocomplete="off"
                    @input="onSearchInput" @keydown.escape="closeSearch" @keydown.enter="irParaBusca"
                    @keydown.up.prevent="searchNavUp" @keydown.down.prevent="searchNavDown" />
                  <button v-if="searchQuery" class="search-clear" @click="clearSearch" aria-label="Limpar busca">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                <div class="nb-search-label" aria-hidden="true">
                  <span class="search-kanji">品揃え</span>
                  <span class="search-label-text">Coleção Noir &amp; Or</span>
                </div>
                <div v-if="searchLoading" class="nb-search-skeletons" aria-hidden="true">
                  <div v-for="i in 3" :key="i" class="search-skeleton">
                    <div class="sk-img"></div>
                    <div class="sk-lines"><div class="sk-line sk-line--name"></div><div class="sk-line sk-line--price"></div></div>
                  </div>
                </div>
                <div v-else-if="searchResults.length" class="nb-search-results" role="listbox">
                  <button v-for="(prod, idx) in searchResults" :key="prod._id || prod.id" class="search-result"
                    :class="{ 'is-focused': searchFocusIdx === idx }" role="option"
                    @click="irParaProduto(prod._id || prod.id)" @mouseenter="searchFocusIdx = idx">
                    <div class="search-result__img">
                      <img v-if="prod.imagem" :src="prod.imagem" :alt="prod.nome" loading="lazy" />
                      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    </div>
                    <div class="search-result__info">
                      <span class="search-result__nome">{{ prod.nome }}</span>
                      <span class="search-result__preco">R$ {{ fmt(prod.preco) }}</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
                <p v-else-if="searchQuery.length >= 2 && !searchLoading" class="search-empty" role="status">
                  <span class="search-empty-kanji" aria-hidden="true">無</span>
                  Nenhum resultado para "{{ searchQuery }}"
                </p>
                <div class="nb-search-footer" aria-hidden="true">
                  <span>↑↓</span> navegar &nbsp;·&nbsp; <span>↵</span> buscar &nbsp;·&nbsp; <span>esc</span> fechar
                </div>
              </div>
            </transition>
          </div>

          <button class="nb-icon nb-cart" @click="abrirCarrinho" aria-label="Carrinho de compras">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span v-if="auth.isLogado && totalItens > 0" class="nb-cart__badge" :class="{ 'is-bounce': cartBounce }">{{ totalItens > 9 ? '9+' : totalItens }}</span>
          </button>

          <div class="nb-acess-wrap">
            <button class="nb-icon" :class="{ 'is-active': acessOpen }" @click="acessOpen = !acessOpen" aria-label="Opções de acessibilidade" :aria-expanded="acessOpen">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <circle cx="12" cy="4" r="1.5"/><path d="M9 9h4l1 5h3"/><path d="M9 9l-1 5"/><path d="M8 14h5l1 4"/>
                <circle cx="8" cy="20" r="2"/><circle cx="15" cy="20" r="2"/>
              </svg>
            </button>
          </div>

          <div class="nb-sep" aria-hidden="true"></div>

          <div v-if="auth.isLogado" class="nb-user-area">
            <div class="nb-user-wrap" ref="userDropRef">
              <button class="nb-user" @click="userDropOpen = !userDropOpen" :aria-expanded="userDropOpen" aria-label="Menu da conta">
                <div class="nb-avatar" aria-hidden="true">
                  <img v-if="auth.user?.avatar" :src="auth.user.avatar" alt="" referrerpolicy="no-referrer" @error="e => e.target.style.display = 'none'" />
                  <span v-else>{{ inicialNome }}</span>
                </div>
                <div class="nb-user__info">
                  <span class="nb-user__nome">{{ primeiroNome }}</span>
                  <span v-if="auth.user?.vip" class="nb-user__vip">◆ {{ auth.user.vip }}</span>
                </div>
                <svg class="nb-user__chevron" :class="{ 'is-open': userDropOpen }" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <transition name="drop-down">
                <div v-if="userDropOpen" class="nb-user-drop" role="menu" @keydown.escape="userDropOpen = false">
                  <div class="nb-drop-head">
                    <div class="nb-drop-avatar">
                      <img v-if="auth.user?.avatar" :src="auth.user.avatar" alt="" referrerpolicy="no-referrer" @error="e => e.target.style.display = 'none'" />
                      <span v-else>{{ inicialNome }}</span>
                    </div>
                    <div>
                      <p class="nb-drop-nome">{{ auth.user?.nome || 'Usuário' }}</p>
                      <p class="nb-drop-email">{{ auth.user?.email || '' }}</p>
                      <span v-if="auth.user?.vip" class="nb-drop-vip">◆ {{ auth.user.vip }}</span>
                    </div>
                  </div>
                  <div class="nb-drop-clock" aria-label="Horário de Brasília">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span class="nb-drop-clock__label">Brasília</span>
                    <span class="nb-drop-clock__time">{{ brasiliaTime }}</span>
                  </div>
                  <div class="nb-drop-sep" role="separator"></div>
                  <button class="nb-drop-item" role="menuitem" @click="irParaConta">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Minha Conta
                  </button>
                  <button class="nb-drop-item" role="menuitem" @click="userDropOpen = false; cartOpen = true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    Meu Carrinho
                    <span v-if="totalItens > 0" class="nb-drop-badge">{{ totalItens }}</span>
                  </button>
                  <button class="nb-drop-item nb-drop-item--saved" role="menuitem" @click="abrirComprasFuturas">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                    Compras Futuras
                    <span v-if="savedItems.length > 0" class="nb-drop-badge nb-drop-badge--saved">{{ savedItems.length }}</span>
                  </button>
                  <router-link v-if="auth.isAdmin" to="/admin" class="nb-drop-item nb-drop-item--admin" role="menuitem" @click="userDropOpen = false">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
                    Painel Admin
                  </router-link>
                  <div class="nb-drop-sep" role="separator"></div>
                  <button class="nb-drop-item nb-drop-item--sair" role="menuitem" @click="fazerLogout">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Sair da conta
                  </button>
                </div>
              </transition>
            </div>
          </div>

          <div v-else class="nb-auth">
            <button class="nb-entrar" @click="openModal('login')">Entrar</button>
            <button class="nb-cadastrar" @click="openModal('cadastro')">Cadastrar</button>
          </div>
        </div>
      </div>
    </header>

    <!-- ════════════ TELEPORTS ════════════ -->
    <teleport to="body">

      <!-- PAINEL ACESSIBILIDADE -->
      <transition name="pref-drop">
        <div v-if="acessOpen" id="acess-panel" class="pref-panel" role="dialog" aria-label="Opções de acessibilidade" @click.stop>
          <div class="or-panel-kamon or-panel-kamon--pref" aria-hidden="true">♿</div>
          <div class="or-panel-border" aria-hidden="true"></div>
          <header class="pref-header">
            <div class="pref-header-inner">
              <span class="pref-kanji" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="4" r="1.5"/><path d="M9 9h4l1 5h3"/><path d="M9 9l-1 5"/><path d="M8 14h5l1 4"/><circle cx="8" cy="20" r="2"/><circle cx="15" cy="20" r="2"/></svg>
              </span>
              <span class="pref-title">Acessibilidade</span>
            </div>
            <div style="display:flex;gap:6px;align-items:center;">
              <button class="pref-reset" @click="site.resetAcess()" aria-label="Redefinir">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                Redefinir
              </button>
              <button class="pref-close" @click="acessOpen = false" aria-label="Fechar">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </header>
          <div class="pref-body">

  <!-- REALM -->
  <fieldset class="pref-group">
    <legend class="pref-group__label">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
      Realm
    </legend>
    <div class="pref-row">
      <button :class="['pref-realm', { 'is-active': site.tema === 'escuro' }]" @click="site.toggleTema('escuro'); acessOpen = false" data-realm="celestial">
        <span class="pref-realm__orb pref-realm__orb--celestial" aria-hidden="true"></span>
        <div class="pref-realm__body"><span class="pref-realm__name">Celestial</span><span class="pref-realm__sub">Noite dourada</span></div>
        <span class="pref-realm__kanji" aria-hidden="true">天</span>
      </button>
      <button :class="['pref-realm', { 'is-active': site.tema === 'claro' }]" @click="site.toggleTema('claro'); acessOpen = false" data-realm="autumn">
        <span class="pref-realm__orb pref-realm__orb--autumn" aria-hidden="true"></span>
        <div class="pref-realm__body"><span class="pref-realm__name">Autumn</span><span class="pref-realm__sub">Claridade fria</span></div>
        <span class="pref-realm__kanji" aria-hidden="true">秋</span>
      </button>
      <button :class="['pref-realm', { 'is-active': site.tema === 'gamer' }]" @click="site.toggleTema('gamer'); acessOpen = false" data-realm="ghost">
        <span class="pref-realm__orb pref-realm__orb--ghost" aria-hidden="true"></span>
        <div class="pref-realm__body"><span class="pref-realm__name">Ghost</span><span class="pref-realm__sub">Brasa sombria</span></div>
        <span class="pref-realm__kanji" aria-hidden="true">幽</span>
      </button>
    </div>
  </fieldset>

  <!-- TAMANHO DO TEXTO -->
  <fieldset class="pref-group">
    <legend class="pref-group__label">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
      Tamanho do texto
    </legend>
    <div class="pref-row pref-row--3">
      <button :class="['pref-font', { 'is-active': site.fonte === 'pequena' }]" @click="site.setFonte('pequena'); acessOpen = false"><span style="font-size:11px;font-weight:700;line-height:1">A</span><span class="pref-font__lbl">Pequeno</span></button>
      <button :class="['pref-font', { 'is-active': site.fonte === 'normal' }]"  @click="site.setFonte('normal');  acessOpen = false"><span style="font-size:15px;font-weight:700;line-height:1">A</span><span class="pref-font__lbl">Normal</span></button>
      <button :class="['pref-font', { 'is-active': site.fonte === 'grande' }]"  @click="site.setFonte('grande');  acessOpen = false"><span style="font-size:19px;font-weight:700;line-height:1">A</span><span class="pref-font__lbl">Grande</span></button>
    </div>
  </fieldset>

  <!-- DALTONISMO -->
  <fieldset class="pref-group">
    <legend class="pref-group__label">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
      Daltonismo
    </legend>
    <div class="pref-row pref-row--3">
      <button :class="['pref-font', { 'is-active': site.acess.daltonismo === 'none' }]"         @click="site.setAcess('daltonismo', 'none')"><span style="font-size:10px;line-height:1">●</span><span class="pref-font__lbl">Nenhum</span></button>
      <button :class="['pref-font', { 'is-active': site.acess.daltonismo === 'protanopia' }]"    @click="site.setAcess('daltonismo', 'protanopia')"><span style="font-size:10px;line-height:1;color:#6699ff">●</span><span class="pref-font__lbl">Protanopia</span></button>
      <button :class="['pref-font', { 'is-active': site.acess.daltonismo === 'deuteranopia' }]"  @click="site.setAcess('daltonismo', 'deuteranopia')"><span style="font-size:10px;line-height:1;color:#cc9900">●</span><span class="pref-font__lbl">Deuteran.</span></button>
    </div>
    <div class="pref-row" style="margin-top:6px;">
      <button :class="['pref-font', { 'is-active': site.acess.daltonismo === 'tritanopia' }]" @click="site.setAcess('daltonismo', 'tritanopia')"><span style="font-size:10px;line-height:1;color:#ff6688">●</span><span class="pref-font__lbl">Tritanopia</span></button>
    </div>
  </fieldset>

  <!-- TOGGLES DE ACESSIBILIDADE -->
  <fieldset class="pref-group">
    <legend class="pref-group__label">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      Opções visuais
    </legend>
    <div style="display:flex;flex-direction:column;gap:6px;">
      <button :class="['pref-toggle', { 'is-active': site.acess.altoContraste }]"    @click="site.setAcess('altoContraste',    !site.acess.altoContraste)">
        <span class="pref-toggle__track"><span class="pref-toggle__thumb"></span></span>
        <span class="pref-toggle__lbl">Alto contraste</span>
      </button>
      <button :class="['pref-toggle', { 'is-active': site.acess.reduzirAnimacoes }]" @click="site.setAcess('reduzirAnimacoes', !site.acess.reduzirAnimacoes)">
        <span class="pref-toggle__track"><span class="pref-toggle__thumb"></span></span>
        <span class="pref-toggle__lbl">Reduzir animações</span>
      </button>
      <button :class="['pref-toggle', { 'is-active': site.acess.fonteDislexia }]"    @click="site.setAcess('fonteDislexia',    !site.acess.fonteDislexia)">
        <span class="pref-toggle__track"><span class="pref-toggle__thumb"></span></span>
        <span class="pref-toggle__lbl">Fonte dislexia</span>
      </button>
      <button :class="['pref-toggle', { 'is-active': site.acess.sublinharLinks }]"   @click="site.setAcess('sublinharLinks',   !site.acess.sublinharLinks)">
        <span class="pref-toggle__track"><span class="pref-toggle__thumb"></span></span>
        <span class="pref-toggle__lbl">Sublinhar links</span>
      </button>
      <button :class="['pref-toggle', { 'is-active': site.acess.cursorGrande }]"     @click="site.setAcess('cursorGrande',     !site.acess.cursorGrande)">
        <span class="pref-toggle__track"><span class="pref-toggle__thumb"></span></span>
        <span class="pref-toggle__lbl">Cursor grande</span>
      </button>
      <button :class="['pref-toggle', { 'is-active': site.acess.focoVisivel }]"      @click="site.setAcess('focoVisivel',      !site.acess.focoVisivel)">
        <span class="pref-toggle__track"><span class="pref-toggle__thumb"></span></span>
        <span class="pref-toggle__lbl">Foco visível</span>
      </button>
      <button :class="['pref-toggle', { 'is-active': site.acess.larguraReduzida }]"  @click="site.setAcess('larguraReduzida',  !site.acess.larguraReduzida)">
        <span class="pref-toggle__track"><span class="pref-toggle__thumb"></span></span>
        <span class="pref-toggle__lbl">Largura reduzida</span>
      </button>
    </div>
  </fieldset>

  <!-- ESPAÇAMENTO -->
  <fieldset class="pref-group">
    <legend class="pref-group__label">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      Espaçamento entre letras
    </legend>
    <div class="pref-row pref-row--3">
      <button :class="['pref-font', { 'is-active': site.acess.espacamento === 'normal' }]" @click="site.setAcess('espacamento', 'normal')"><span style="font-size:10px;letter-spacing:0">Aa</span><span class="pref-font__lbl">Normal</span></button>
      <button :class="['pref-font', { 'is-active': site.acess.espacamento === 'medio' }]"  @click="site.setAcess('espacamento', 'medio')"><span  style="font-size:10px;letter-spacing:2px">Aa</span><span class="pref-font__lbl">Médio</span></button>
      <button :class="['pref-font', { 'is-active': site.acess.espacamento === 'grande' }]" @click="site.setAcess('espacamento', 'grande')"><span style="font-size:10px;letter-spacing:4px">Aa</span><span class="pref-font__lbl">Grande</span></button>
    </div>
  </fieldset>

  <!-- ALTURA DE LINHA -->
  <fieldset class="pref-group">
    <legend class="pref-group__label">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
      Altura de linha
    </legend>
    <div class="pref-row pref-row--3">
      <button :class="['pref-font', { 'is-active': site.acess.alturaLinha === 'normal' }]" @click="site.setAcess('alturaLinha', 'normal')"><span style="font-size:10px;line-height:1.2;display:block">Aa</span><span class="pref-font__lbl">Normal</span></button>
      <button :class="['pref-font', { 'is-active': site.acess.alturaLinha === 'media' }]"  @click="site.setAcess('alturaLinha', 'media')"><span  style="font-size:10px;line-height:1.8;display:block">Aa</span><span class="pref-font__lbl">Média</span></button>
      <button :class="['pref-font', { 'is-active': site.acess.alturaLinha === 'grande' }]" @click="site.setAcess('alturaLinha', 'grande')"><span style="font-size:10px;line-height:2.4;display:block">Aa</span><span class="pref-font__lbl">Grande</span></button>
    </div>
  </fieldset>

  <!-- SATURAÇÃO -->
  <fieldset class="pref-group">
    <legend class="pref-group__label">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/></svg>
      Saturação de cores
    </legend>
    <div class="pref-row pref-row--3">
      <button :class="['pref-font', { 'is-active': site.acess.saturacao === 'normal' }]" @click="site.setAcess('saturacao', 'normal')"><span style="font-size:10px;color:var(--or-gold)">◆</span><span class="pref-font__lbl">Normal</span></button>
      <button :class="['pref-font', { 'is-active': site.acess.saturacao === 'baixa' }]"  @click="site.setAcess('saturacao', 'baixa')"><span  style="font-size:10px;color:#aaa">◆</span><span class="pref-font__lbl">Baixa</span></button>
      <button :class="['pref-font', { 'is-active': site.acess.saturacao === 'zero' }]"   @click="site.setAcess('saturacao', 'zero')"><span   style="font-size:10px;color:#888">◆</span><span class="pref-font__lbl">Cinza</span></button>
    </div>
  </fieldset>

  <!-- CONSULTORA IA -->
  <fieldset class="pref-group">
    <legend class="pref-group__label">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      Consultora IA
    </legend>
    <button :class="['pref-toggle', { 'is-active': site.acess.ocultarIA }]" @click="site.setAcess('ocultarIA', !site.acess.ocultarIA)">
      <span class="pref-toggle__track"><span class="pref-toggle__thumb"></span></span>
      <span class="pref-toggle__lbl">{{ site.acess.ocultarIA ? 'Ícone oculto' : 'Ícone visível' }}</span>
    </button>
  </fieldset>

  <div class="pref-watermark" aria-hidden="true">The Art of Silent Power</div>
</div>
        </div>
      </transition>

      <!-- ══════════════════════════════════════════
           MODAL AUTH — LOGIN + CADASTRO COM VERIFICAÇÃO
      ══════════════════════════════════════════ -->
      <transition name="fade" appear>
        <div v-if="modalOpen" class="nb-overlay" @click.self="closeModal" role="dialog"
          :aria-label="modalTab === 'login' ? 'Fazer login' : 'Criar conta'" aria-modal="true">
          <div class="auth-modal">

            <!-- LATERAL ESQUERDA -->
            <aside class="auth-esq" aria-hidden="true">
              <div class="auth-orb auth-orb--1"></div>
              <div class="auth-orb auth-orb--2"></div>
              <div class="auth-orb auth-orb--3"></div>
              <p class="auth-brand"><span class="auth-brand__icon">⊕</span>Noir<em>&amp;</em>Or</p>
              <div class="auth-copy">
                <h2 class="auth-titulo">
                  <span v-if="modalTab === 'login'">Bem-vindo<br/><em>de volta</em></span>
                  <span v-else-if="cadastroStep === 1">Entre para o<br/><em>seleto círculo</em></span>
                  <span v-else-if="cadastroStep === 2">Verificação<br/><em>de identidade</em></span>
                  <span v-else>Reconhecimento<br/><em>facial</em></span>
                </h2>
                <p class="auth-desc">
                  <span v-if="modalTab === 'login'">Acesse sua coleção com total segurança e exclusividade.</span>
                  <span v-else-if="cadastroStep === 1">Acesso a lançamentos, peças limitadas e benefícios VIP.</span>
                  <span v-else-if="cadastroStep === 2">Precisamos confirmar sua identidade com RG para garantir segurança e evitar fraudes.</span>
                  <span v-else>Tire uma selfie para confirmar que você é o titular do documento enviado.</span>
                </p>
              </div>

              <!-- Checklist de progresso no cadastro -->
              <ul v-if="modalTab === 'cadastro'" class="auth-steps-list">
                <li :class="['auth-step', { 'is-done': cadastroStep > 1, 'is-active': cadastroStep === 1 }]">
                  <span class="auth-step__ico">{{ cadastroStep > 1 ? '✓' : '1' }}</span>
                  Dados pessoais
                </li>
                <li :class="['auth-step', { 'is-done': cadastroStep > 2, 'is-active': cadastroStep === 2 }]">
                  <span class="auth-step__ico">{{ cadastroStep > 2 ? '✓' : '2' }}</span>
                  Documento RG
                </li>
                <li :class="['auth-step', { 'is-done': cadastroStep > 3, 'is-active': cadastroStep === 3 }]">
                  <span class="auth-step__ico">{{ cadastroStep > 3 ? '✓' : '3' }}</span>
                  Selfie / Biometria
                </li>
              </ul>

              <ul v-else class="auth-feats">
                <li v-for="f in currentFeatures" :key="f"><span aria-hidden="true">◆</span>{{ f }}</li>
              </ul>
              <div class="auth-watermark" aria-hidden="true">The Art of<br/>Silent Power</div>
              <p class="auth-ssl">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                SSL 256-bit · Dados protegidos
              </p>
            </aside>

            <!-- DIREITA -->
            <div class="auth-dir">
              <button class="auth-close" @click="closeModal" aria-label="Fechar">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              <!-- Aviso login necessário -->
              <transition name="slide-down">
                <div v-if="loginNecessario" class="auth-aviso" role="alert">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  <span>{{ loginAvisoMsg }}</span>
                </div>
              </transition>

              <!-- Bloqueio por tentativas -->
              <transition name="slide-down">
                <div v-if="loginBloqueado" class="auth-bloqueado" role="alert">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <div>
                    <p class="bloqueado-titulo">Acesso temporariamente bloqueado</p>
                    <p class="bloqueado-desc">Aguarde <strong>{{ bloqueioRestante }}s</strong> para tentar novamente.</p>
                  </div>
                </div>
              </transition>

              <!-- Tentativas restantes -->
              <transition name="slide-down">
                <div v-if="tentativasRestantes < 5 && tentativasRestantes > 0 && !loginBloqueado && modalTab === 'login'" class="auth-tentativas" role="status">
                  <div class="tentativas-dots">
                    <span v-for="i in 5" :key="i" :class="['tentativa-dot', { 'used': i > tentativasRestantes }]"></span>
                  </div>
                  <span>{{ tentativasRestantes }} tentativa{{ tentativasRestantes !== 1 ? 's' : '' }} restante{{ tentativasRestantes !== 1 ? 's' : '' }}</span>
                </div>
              </transition>

              <!-- TABS -->
              <div class="auth-tabs" role="tablist">
                <button :class="['auth-tab', { 'is-active': modalTab === 'login' }]" @click="switchTab('login')" role="tab" :aria-selected="modalTab === 'login'">入る — Entrar</button>
                <button :class="['auth-tab', { 'is-active': modalTab === 'cadastro' }]" @click="switchTab('cadastro')" role="tab" :aria-selected="modalTab === 'cadastro'">参加 — Cadastrar</button>
              </div>

              <!-- ─── LOGIN ─── -->
              <transition name="slide" mode="out-in">
                <div v-if="modalTab === 'login'" key="login" class="auth-form" role="tabpanel">
                  <div class="af-campo">
                    <label for="l-email">E-mail</label>
                    <div class="af-linha" :class="{ 'af-linha--erro': campoErro === 'email', 'af-linha--focus': focusField === 'email' }">
                      <input id="l-email" v-model="form.email" type="email" placeholder="seu@email.com" autocomplete="email" required :disabled="loginBloqueado" @focus="focusField = 'email'" @blur="focusField = ''" />
                    </div>
                  </div>
                  <div class="af-campo">
                    <label for="l-senha">Senha</label>
                    <div class="af-linha" :class="{ 'af-linha--erro': campoErro === 'senha', 'af-linha--focus': focusField === 'senha' }">
                      <input id="l-senha" v-model="form.senha" :type="showPass ? 'text' : 'password'" placeholder="••••••••" autocomplete="current-password" required :disabled="loginBloqueado" @focus="focusField = 'senha'" @blur="focusField = ''" />
                      <button type="button" class="af-eye" @click="showPass = !showPass" :aria-label="showPass ? 'Ocultar senha' : 'Mostrar senha'">
                        <svg v-if="!showPass" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      </button>
                    </div>
                  </div>
                  <div class="af-esqueceu">
                    <router-link to="/redefinir-senha" @click="closeModal">Esqueceu a senha?</router-link>
                  </div>
                  <p v-if="formError" class="af-erro" role="alert">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {{ formError }}
                  </p>
                  <button type="button" class="af-submit" :disabled="auth.loading || loginBloqueado" @click="fazerLogin">
                    <span v-if="auth.loading" class="or-spinner-sm"></span>
                    <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                    {{ auth.loading ? 'Verificando...' : loginBloqueado ? `Bloqueado (${bloqueioRestante}s)` : 'Acessar minha conta' }}
                  </button>
                  <div class="af-ou" aria-hidden="true"><span>ou continue com</span></div>
                  <div class="af-google-wrap">
                    <button type="button" class="af-google" @click="loginGoogle" :disabled="loginBloqueado">
                      <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                      Continuar com Google
                    </button>
                  </div>
                  <p class="af-rodape">Não tem conta? <button type="button" @click="switchTab('cadastro')">Cadastre-se</button></p>
                </div>

                <!-- ─── CADASTRO MULTI-STEP ─── -->
                <div v-else key="cadastro" class="auth-form" role="tabpanel">

                  <!-- ══ STEP 1: Dados pessoais ══ -->
                  <transition name="slide" mode="out-in">
                    <div v-if="cadastroStep === 1" key="step1">
                      <div class="af-step-header">
                        <span class="af-step-badge">Passo 1 de 3</span>
                        <span class="af-step-title">Dados pessoais</span>
                      </div>

                      <div class="af-duplo">
                        <div class="af-campo">
                          <label for="c-nome">Nome *</label>
                          <div class="af-linha" :class="{ 'af-linha--erro': campoErro === 'nome', 'af-linha--focus': focusField === 'nome' }">
                            <input id="c-nome" v-model="form.nome" placeholder="Seu nome" autocomplete="given-name" @focus="focusField = 'nome'" @blur="focusField = ''" />
                          </div>
                        </div>
                        <div class="af-campo">
                          <label for="c-sobrenome">Sobrenome</label>
                          <div class="af-linha" :class="{ 'af-linha--focus': focusField === 'sobrenome' }">
                            <input id="c-sobrenome" v-model="form.sobrenome" placeholder="Sobrenome" autocomplete="family-name" @focus="focusField = 'sobrenome'" @blur="focusField = ''" />
                          </div>
                        </div>
                      </div>

                      <!-- CPF -->
                      <div class="af-campo">
                        <label for="c-cpf">CPF *</label>
                        <div class="af-linha" :class="{ 'af-linha--erro': campoErro === 'cpf', 'af-linha--focus': focusField === 'cpf', 'af-linha--ok': cpfValido === true }">
                          <input id="c-cpf" v-model="form.cpf" placeholder="000.000.000-00" maxlength="14" autocomplete="off"
                            @focus="focusField = 'cpf'" @blur="focusField = ''" @input="mascaraCPF" />
                          <span v-if="cpfValido === true" class="af-field-ok" aria-label="CPF válido">✓</span>
                          <span v-else-if="cpfValido === false && form.cpf.length >= 14" class="af-field-err" aria-label="CPF inválido">✗</span>
                        </div>
                        <p v-if="cpfValido === false && form.cpf.length >= 14" class="af-campo-erro">CPF inválido</p>
                      </div>

                      <!-- Data de nascimento -->
                      <div class="af-campo">
                        <label for="c-nasc">Data de nascimento *</label>
                        <div class="af-linha" :class="{ 'af-linha--erro': campoErro === 'nascimento', 'af-linha--focus': focusField === 'nasc', 'af-linha--ok': idadeValida === true }">
                          <input id="c-nasc" v-model="form.nascimento" type="date" :max="dataMaxNascimento"
                            @focus="focusField = 'nasc'" @blur="focusField = ''" @change="verificarIdade" />
                          <span v-if="idadeValida === true" class="af-field-ok">✓</span>
                        </div>
                        <p v-if="idadeValida === false" class="af-campo-erro">Você deve ter 18 anos ou mais para se cadastrar</p>
                      </div>

                      <div class="af-campo">
                        <label for="c-email">E-mail *</label>
                        <div class="af-linha" :class="{ 'af-linha--erro': campoErro === 'email', 'af-linha--focus': focusField === 'c-email' }">
                          <input id="c-email" v-model="form.email" type="email" placeholder="seu@email.com" autocomplete="email" required @focus="focusField = 'c-email'" @blur="focusField = ''" />
                        </div>
                      </div>

                      <div class="af-campo">
                        <label for="c-senha">Senha *</label>
                        <div class="af-linha" :class="{ 'af-linha--erro': campoErro === 'senha', 'af-linha--focus': focusField === 'c-senha' }">
                          <input id="c-senha" v-model="form.senha" :type="showPass ? 'text' : 'password'" placeholder="Mínimo 8 caracteres" autocomplete="new-password" required @focus="focusField = 'c-senha'" @blur="focusField = ''" />
                          <button type="button" class="af-eye" @click="showPass = !showPass">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          </button>
                        </div>
                        <div v-if="form.senha" class="af-forca">
                          <div class="forca-bar"><div class="forca-fill" :style="{ width: forcaSenha.pct + '%', background: forcaSenha.cor }"></div></div>
                          <span class="forca-txt" :style="{ color: forcaSenha.cor }">{{ forcaSenha.label }}</span>
                        </div>
                      </div>

                      <div class="af-campo">
                        <label for="c-senha2">Confirmar Senha *</label>
                        <div class="af-linha" :class="{ 'af-linha--erro': form.senha2 && form.senha !== form.senha2, 'af-linha--focus': focusField === 'c-senha2' }">
                          <input id="c-senha2" v-model="form.senha2" :type="showPass2 ? 'text' : 'password'" placeholder="Repita a senha" autocomplete="new-password" required @focus="focusField = 'c-senha2'" @blur="focusField = ''" />
                          <button type="button" class="af-eye" @click="showPass2 = !showPass2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          </button>
                        </div>
                        <p v-if="form.senha2 && form.senha !== form.senha2" class="af-campo-erro">As senhas não coincidem</p>
                      </div>

                      <div class="af-termos">
                        <label class="af-check-row">
                          <input type="checkbox" v-model="aceitouTermos" />
                          <span class="af-check-box" aria-hidden="true"></span>
                          <span class="af-check-texto">Li e aceito os <button type="button" class="af-link-termos" @click.stop="termosOpen = !termosOpen">Termos</button> e a <a href="/politica-privacidade" target="_blank" class="af-link-termos">Privacidade</a></span>
                        </label>
                        <transition name="termos-drop">
                          <div v-if="termosOpen" class="af-termos-body">
                            <p>Ao criar sua conta, você concorda em usar a plataforma de forma lícita e aceitar as condições de compra da Noir &amp; Or. Seus dados de identidade são usados apenas para verificação. <a href="/termos" target="_blank">Ver termos completos</a>.</p>
                          </div>
                        </transition>
                      </div>

                      <p v-if="formError" class="af-erro" role="alert">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        {{ formError }}
                      </p>

                      <button type="button" class="af-submit" :disabled="auth.loading" @click="avancarStep1">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
                        Continuar para verificação
                      </button>

                      <div class="af-ou" aria-hidden="true"><span>ou cadastre com</span></div>
                      <div class="af-google-wrap">
                        <button type="button" class="af-google" @click="loginGoogle">
                          <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                          Cadastrar com Google
                        </button>
                      </div>
                      <p class="af-rodape">Já tem conta? <button type="button" @click="switchTab('login')">Entre aqui</button></p>
                    </div>

                    <!-- ══ STEP 2: Documento RG ══ -->
                    <div v-else-if="cadastroStep === 2" key="step2">
                      <div class="af-step-header">
                        <button class="af-step-back" @click="cadastroStep = 1" aria-label="Voltar">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                          Voltar
                        </button>
                        <span class="af-step-badge">Passo 2 de 3</span>
                        <span class="af-step-title">Documento de identidade</span>
                      </div>

                      <div class="id-aviso">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        <p>Envie fotos do seu <strong>RG</strong> (frente e verso). As imagens são usadas apenas para confirmar sua identidade e não são armazenadas.</p>
                      </div>

                      <!-- Número do RG -->
                      <div class="af-campo" style="margin-top:16px;">
                        <label for="c-rg">Número do RG *</label>
                        <div class="af-linha" :class="{ 'af-linha--erro': campoErro === 'rg', 'af-linha--focus': focusField === 'rg', 'af-linha--ok': form.rg.length >= 7 }">
                          <input id="c-rg" v-model="form.rg" placeholder="00.000.000-0" maxlength="12" @focus="focusField = 'rg'" @blur="focusField = ''" @input="mascaraRG" />
                          <span v-if="form.rg.length >= 7" class="af-field-ok">✓</span>
                        </div>
                      </div>

                      <!-- Órgão emissor -->
                      <div class="af-campo">
                        <label for="c-orgao">Órgão emissor *</label>
                        <div class="af-linha" :class="{ 'af-linha--erro': campoErro === 'orgao', 'af-linha--focus': focusField === 'orgao' }">
                          <input id="c-orgao" v-model="form.orgaoEmissor" placeholder="Ex: SSP/SP" maxlength="10" @focus="focusField = 'orgao'" @blur="focusField = ''" />
                        </div>
                      </div>

                      <!-- Upload RG Frente -->
                      <div class="id-upload-area">
                        <p class="id-upload-label">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          RG — Frente *
                        </p>
                        <label class="id-upload-box" :class="{ 'has-file': rgFrente, 'is-drag': dragFrente }"
                          @dragover.prevent="dragFrente = true" @dragleave="dragFrente = false" @drop.prevent="onDropRG($event, 'frente')">
                          <input type="file" accept="image/*" class="id-upload-input" @change="onFileRG($event, 'frente')" />
                          <div v-if="rgFrente" class="id-preview">
                            <img :src="rgFrentePreview" alt="RG Frente" />
                            <button type="button" class="id-preview-del" @click.prevent="removerRG('frente')" aria-label="Remover imagem">✗</button>
                            <span class="id-preview-ok">✓ Frente adicionada</span>
                          </div>
                          <div v-else class="id-upload-placeholder">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="14" rx="2"/><line x1="7" y1="8" x2="10" y2="8"/><line x1="7" y1="11" x2="14" y2="11"/><circle cx="16" cy="8" r="2"/></svg>
                            <span>Clique ou arraste a foto da frente</span>
                            <span class="id-upload-sub">JPG, PNG ou WEBP — máx. 5MB</span>
                          </div>
                        </label>
                        <button type="button" class="id-upload-pc" @click="abrirSeletorArquivo('frente')">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                          Selecionar do computador
                        </button>
                      </div>

                      <!-- Upload RG Verso -->
                      <div class="id-upload-area">
                        <p class="id-upload-label">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          RG — Verso *
                        </p>
                        <label class="id-upload-box" :class="{ 'has-file': rgVerso, 'is-drag': dragVerso }"
                          @dragover.prevent="dragVerso = true" @dragleave="dragVerso = false" @drop.prevent="onDropRG($event, 'verso')">
                          <input type="file" accept="image/*" class="id-upload-input" @change="onFileRG($event, 'verso')" />
                          <div v-if="rgVerso" class="id-preview">
                            <img :src="rgVersoPreview" alt="RG Verso" />
                            <button type="button" class="id-preview-del" @click.prevent="removerRG('verso')" aria-label="Remover imagem">✗</button>
                            <span class="id-preview-ok">✓ Verso adicionado</span>
                          </div>
                          <div v-else class="id-upload-placeholder">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="14" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="11" x2="17" y2="11"/><line x1="7" y1="14" x2="12" y2="14"/></svg>
                            <span>Clique ou arraste a foto do verso</span>
                            <span class="id-upload-sub">JPG, PNG ou WEBP — máx. 5MB</span>
                          </div>
                        </label>
                        <button type="button" class="id-upload-pc" @click="abrirSeletorArquivo('verso')">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                          Selecionar do computador
                        </button>
                      </div>

                      <!-- Inputs ocultos usados pelo botão "Selecionar do computador" -->
                      <input ref="fileInputFrente" type="file" accept="image/*" class="id-upload-input-hidden" @change="onFileRG($event, 'frente')" />
                      <input ref="fileInputVerso" type="file" accept="image/*" class="id-upload-input-hidden" @change="onFileRG($event, 'verso')" />

                      <!-- Botão de simulação (uso em desenvolvimento / TCC) -->
                      <button type="button" class="af-btn-ghost id-btn-simular" @click="simularEnvioDocumento">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                        Simular envio de documentos (dev/TCC)
                      </button>

                      <p v-if="formError" class="af-erro" role="alert">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        {{ formError }}
                      </p>

                      <button type="button" class="af-submit" :disabled="verificandoDoc" @click="avancarStep2">
                        <span v-if="verificandoDoc" class="or-spinner-sm"></span>
                        <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
                        {{ verificandoDoc ? 'Verificando documento...' : 'Continuar para selfie' }}
                      </button>
                    </div>

                    <!-- ══ STEP 3: Reconhecimento Facial ══ -->
                    <div v-else-if="cadastroStep === 3" key="step3">
                      <div class="af-step-header">
                        <button class="af-step-back" @click="cadastroStep = 2" aria-label="Voltar">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                          Voltar
                        </button>
                        <span class="af-step-badge">Passo 3 de 3</span>
                        <span class="af-step-title">Reconhecimento facial</span>
                      </div>

                      <div class="id-aviso id-aviso--info">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        <p>Posicione seu rosto no centro da câmera com boa iluminação. A selfie será comparada com o RG enviado.</p>
                      </div>

                      <!-- Área da câmera -->
                      <div class="face-cam-wrap">
                        <div class="face-cam-frame" :class="{ 'is-scanning': faceScanning, 'is-ok': faceCapturada, 'is-erro': faceErro }">
                          <!-- Guia oval -->
                          <div class="face-oval-guide" aria-hidden="true">
                            <svg viewBox="0 0 280 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <ellipse cx="140" cy="160" rx="100" ry="130" stroke="currentColor" stroke-width="2" stroke-dasharray="8 5"/>
                            </svg>
                          </div>
                          <!-- Cantos decorativos -->
                          <span class="face-corner face-corner--tl" aria-hidden="true"></span>
                          <span class="face-corner face-corner--tr" aria-hidden="true"></span>
                          <span class="face-corner face-corner--bl" aria-hidden="true"></span>
                          <span class="face-corner face-corner--br" aria-hidden="true"></span>

                          <!-- Vídeo da câmera -->
                          <video v-if="cameraAtiva && !faceCapturada" ref="videoRef" class="face-video" autoplay playsinline muted></video>

                          <!-- Preview da selfie capturada -->
                          <div v-if="faceCapturada && selfiePreview" class="face-preview">
                            <img :src="selfiePreview" alt="Selfie capturada" />
                            <div class="face-preview-ok">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                            </div>
                          </div>

                          <!-- Estado: câmera não iniciada -->
                          <div v-if="!cameraAtiva && !faceCapturada" class="face-cam-idle">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                            <span>Câmera desativada</span>
                          </div>

                          <!-- Scan animado -->
                          <div v-if="faceScanning" class="face-scan-line" aria-hidden="true"></div>

                          <!-- Canvas oculto para captura -->
                          <canvas ref="canvasRef" class="face-canvas-hidden"></canvas>
                        </div>

                        <!-- Status da verificação -->
                        <div class="face-status">
                          <span v-if="!cameraAtiva && !faceCapturada" class="face-status-txt">Pronto para iniciar</span>
                          <span v-else-if="cameraAtiva && !faceScanning && !faceCapturada" class="face-status-txt face-status-txt--live">
                            <span class="face-dot-live" aria-hidden="true"></span>
                            Câmera ativa — centralize seu rosto
                          </span>
                          <span v-else-if="faceScanning" class="face-status-txt face-status-txt--scan">Analisando biometria...</span>
                          <span v-else-if="faceCapturada && !faceErro" class="face-status-txt face-status-txt--ok">Identidade confirmada</span>
                          <span v-else-if="faceErro" class="face-status-txt face-status-txt--err">{{ faceErro }}</span>
                        </div>

                        <!-- Dicas -->
                        <ul v-if="cameraAtiva && !faceCapturada" class="face-dicas">
                          <li>Olhe diretamente para a câmera</li>
                          <li>Ambiente bem iluminado</li>
                          <li>Remova óculos escuros ou máscara</li>
                        </ul>
                      </div>

                      <!-- Botões da câmera -->
                      <div class="face-btns">
                        <button v-if="!cameraAtiva && !faceCapturada" type="button" class="af-submit" @click="iniciarCamera">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                          Ativar câmera
                        </button>
                        <button v-if="!cameraAtiva && !faceCapturada" type="button" class="af-btn-ghost" @click="simularFaceMatch">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                          Simular selfie (dev/TCC)
                        </button>
                        <button v-else-if="cameraAtiva && !faceCapturada" type="button" class="af-submit" :disabled="faceScanning" @click="capturarSelfie">
                          <span v-if="faceScanning" class="or-spinner-sm"></span>
                          <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
                          {{ faceScanning ? 'Verificando...' : 'Tirar selfie' }}
                        </button>
                        <button v-else-if="faceCapturada" type="button" class="af-submit af-submit--success" :disabled="auth.loading" @click="finalizarCadastro">
                          <span v-if="auth.loading" class="or-spinner-sm"></span>
                          <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                          {{ auth.loading ? 'Criando conta...' : 'Criar minha conta' }}
                        </button>

                        <button v-if="faceCapturada || faceErro" type="button" class="af-btn-ghost" @click="resetarFace">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                          Tentar novamente
                        </button>
                      </div>

                      <p v-if="formError" class="af-erro" role="alert">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        {{ formError }}
                      </p>

                      <!-- Checklist de verificações -->
                      <div v-if="faceCapturada" class="verif-checklist">
                        <p class="verif-checklist__titulo">Verificações concluídas</p>
                        <ul>
                          <li class="verif-item verif-item--ok">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                            CPF válido e verificado
                          </li>
                          <li class="verif-item verif-item--ok">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                            Maior de 18 anos confirmado
                          </li>
                          <li class="verif-item verif-item--ok">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                            Documento RG enviado
                          </li>
                          <li class="verif-item verif-item--ok">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                            Selfie biométrica aprovada
                          </li>
                        </ul>
                      </div>
                    </div>
                  </transition>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </transition>

      <!-- CARRINHO DRAWER -->
      <div :class="['drawer-overlay', { 'is-open': cartOpen }]" @click.self="cartOpen = false" role="dialog" aria-label="Carrinho" aria-modal="true">
        <aside class="drawer">
          <div class="drawer-kamon" aria-hidden="true">蔵</div>
          <header class="drawer__header">
            <div class="drawer__header__l">
              <div class="drawer__header__titles">
                <span class="drawer__kanji" aria-hidden="true">蔵</span>
                <div>
                  <span class="drawer__titulo">Meu Atelier</span>
                  <span v-if="auth.isLogado && totalItens > 0" class="drawer__qtd">{{ totalItens }} {{ totalItens === 1 ? 'item' : 'itens' }}</span>
                </div>
              </div>
            </div>
            <div class="drawer__brasilia">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>{{ brasiliaTime }}</span>
              <span class="drawer__brasilia-label">BRT</span>
            </div>
            <button class="drawer__close" @click="cartOpen = false" aria-label="Fechar carrinho">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </header>
          <div class="drawer__tabs" role="tablist">
            <button :class="['drawer__tab', { 'is-active': drawerTab === 'carrinho' }]" @click="drawerTab = 'carrinho'" role="tab">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Carrinho
              <span v-if="auth.isLogado && totalItens > 0" class="drawer__tab-badge">{{ totalItens > 9 ? '9+' : totalItens }}</span>
            </button>
            <button :class="['drawer__tab', { 'is-active': drawerTab === 'futuras' }]" @click="drawerTab = 'futuras'" role="tab">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              Compras Futuras
              <span v-if="savedItems.length > 0" class="drawer__tab-badge drawer__tab-badge--saved">{{ savedItems.length }}</span>
            </button>
          </div>

          <div class="drawer__items" role="list">
            <div v-if="!auth.isLogado" class="drawer__vazio drawer__vazio--login">
              <div class="drawer__vazio__ico"><span class="vazio-kanji">客</span></div>
              <p class="drawer__vazio__titulo">Faça login para ver seu carrinho</p>
              <p class="drawer__vazio__sub">Suas peças selecionadas ficam salvas em sua conta</p>
              <button class="drawer__vazio__cta" @click="cartOpen = false; openModal('login', true)">Entrar na conta <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg></button>
            </div>
            <template v-else-if="drawerTab === 'carrinho'">
              <div v-if="!cartItems.length" class="drawer__vazio">
                <div class="drawer__vazio__ico"><span class="vazio-kanji">空</span></div>
                <p class="drawer__vazio__titulo">Seu atelier está vazio</p>
                <p class="drawer__vazio__sub">Explore a coleção e adicione peças exclusivas</p>
                <button class="drawer__vazio__cta" @click="cartOpen = false; $router.push('/loja')">Ver coleção</button>
              </div>
              <div v-else v-for="(item, idx) in cartItems" :key="item.id || item._id" class="di" role="listitem">
                <div class="di__num">{{ String(idx + 1).padStart(2, '0') }}</div>
                <div class="di__img">
                  <img v-if="item.imagem" :src="item.imagem" :alt="item.nome" loading="lazy" />
                  <div v-else class="di__img__placeholder"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></div>
                </div>
                <div class="di__info">
                  <span class="di__cat">{{ item.categoria }}</span>
                  <p class="di__nome">{{ item.nome }}</p>
                  <div class="di__foot">
                    <div class="di__qty">
                      <button @click="changeQty(item, -1)">−</button>
                      <span>{{ item.qty }}</span>
                      <button @click="changeQty(item, +1)">+</button>
                    </div>
                    <span class="di__preco">R$ {{ fmt(item.preco * item.qty) }}</span>
                  </div>
                  <div class="di__actions">
                    <button class="di__action" @click="verDetalhesItem(item)" title="Ver detalhes">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      Detalhes
                    </button>
                    <button class="di__action" @click="editarItem(item)" title="Editar item">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      Editar
                    </button>
                    <button class="di__action" @click="salvarParaDepois(item)" title="Salvar para depois">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                      Salvar
                    </button>
                  </div>
                </div>
                <button class="di__remover" @click="removeItem(item.id || item._id)" title="Remover">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </template>
            <template v-else>
              <div v-if="!savedItems.length" class="drawer__vazio">
                <div class="drawer__vazio__ico"><span class="vazio-kanji">後</span></div>
                <p class="drawer__vazio__titulo">Nenhuma compra futura</p>
                <p class="drawer__vazio__sub">Use "Salvar para depois" nos itens do carrinho</p>
              </div>
              <div v-else v-for="(item, idx) in savedItems" :key="item.id || item._id" class="di di--saved" role="listitem">
                <div class="di__num">{{ String(idx + 1).padStart(2, '0') }}</div>
                <div class="di__img">
                  <img v-if="item.imagem" :src="item.imagem" :alt="item.nome" loading="lazy" />
                </div>
                <div class="di__info">
                  <p class="di__nome">{{ item.nome }}</p>
                  <div class="di__foot"><span class="di__preco">R$ {{ fmt(item.preco) }}</span></div>
                  <div class="di__actions">
                    <button class="di__action" @click="verDetalhesItem(item)" title="Ver detalhes">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      Detalhes
                    </button>
                    <button class="di__mover" @click="moverParaCarrinho(item)">Mover para carrinho</button>
                  </div>
                </div>
                <button class="di__remover" @click="removerSalvo(item.id || item._id)" title="Remover">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </template>
          </div>

          <footer class="drawer__footer">
            <div class="drawer__cupom" v-if="auth.isLogado && cartItems.length && drawerTab === 'carrinho'">
              <div v-if="!cupomAplicado" class="cupom-row">
                <input v-model="cupomCodigo" type="text" placeholder="Código do cupom" class="cupom-input" @keydown.enter="aplicarCupom" />
                <button class="cupom-btn" :disabled="cupomLoading" @click="aplicarCupom">
                  <span v-if="cupomLoading" class="or-spinner-sm"></span>
                  <span v-else>Aplicar</span>
                </button>
              </div>
              <div v-else class="cupom-aplicado">
                <span class="cupom-aplicado__txt">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                  Cupom <strong>{{ cupomAplicado.codigo }}</strong> aplicado · −R$ {{ fmt(cupomAplicado.desconto) }}
                </span>
                <button class="cupom-aplicado__remover" @click="removerCupom" aria-label="Remover cupom">✗</button>
              </div>
              <p v-if="cupomErro" class="cupom-erro">{{ cupomErro }}</p>
            </div>

            <template v-if="auth.isLogado && cartItems.length && drawerTab === 'carrinho'">
              <div class="drawer__totais">
                <div class="dt-row"><span>Subtotal</span><span>R$ {{ totalPreco }}</span></div>
                <div class="dt-row" v-if="cupomAplicado"><span>Desconto</span><span style="color:#22c55e">− R$ {{ fmt(cupomAplicado.desconto) }}</span></div>
                <div class="dt-row dt-row--total"><span>Total</span><span>R$ {{ fmt(totalComDesconto) }}</span></div>
              </div>
            </template>
            <button class="drawer__checkout" :disabled="!auth.isLogado || !cartItems.length" @click="irParaCheckout">
              {{ !auth.isLogado ? 'Entre para finalizar' : 'Finalizar seleção' }}
            </button>
          </footer>
        </aside>
      </div>

      <!-- SIDEBAR MOBILE -->
      <transition name="sb-fade" appear>
        <div v-if="sidebarOpen" class="sb-overlay" @click.self="sidebarOpen = false" role="dialog" aria-label="Menu de navegação" aria-modal="true">
          <nav id="sidebar-menu" class="sb">
            <div class="sb-kamon" aria-hidden="true">案内</div>
            <div class="sb__head">
              <router-link to="/" class="sb__brand" @click="sidebarOpen = false">
                <div class="sb__brand__mark" aria-hidden="true"></div>
                <span class="sb__brand__txt">Noir<em>&amp;</em>Or</span>
              </router-link>
              <button class="sb__close" @click="sidebarOpen = false">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div class="sb__links">
              <router-link to="/" @click="sidebarOpen = false" class="sb__link">Início</router-link>
              <router-link to="/loja" @click="sidebarOpen = false" class="sb__link">Loja</router-link>
              <router-link to="/sobre" @click="sidebarOpen = false" class="sb__link">Atelier</router-link>
              <router-link to="/gamer" @click="sidebarOpen = false" class="sb__link sb__link--gamer">Gamer</router-link>
              <router-link to="/contato" @click="sidebarOpen = false" class="sb__link">Concierge</router-link>
              <template v-if="auth.isLogado">
                <a href="#" @click.prevent="sidebarOpen = false; irParaConta()" class="sb__link">Minha Conta</a>
                <a href="#" @click.prevent="fazerLogout" class="sb__link sb__link--sair">Sair</a>
              </template>
              <template v-else>
                <a href="#" @click.prevent="sidebarOpen = false; openModal('login')" class="sb__link">Entrar</a>
                <a href="#" @click.prevent="sidebarOpen = false; openModal('cadastro')" class="sb__link sb__link--cta">Criar conta</a>
              </template>
            </div>
          </nav>
        </div>
      </transition>

      <!-- MODAL CONFIRMAÇÃO DE IDADE -->
<transition name="fade" appear>
  <div v-if="idadeModalOpen" class="nb-overlay" @click.self="recusarIdade" role="dialog"
    aria-label="Confirmação de idade" aria-modal="true" style="z-index:10001">
    <div class="age-modal">
      <div class="age-modal__orb age-modal__orb--1"></div>
      <div class="age-modal__orb age-modal__orb--2"></div>

      <div class="age-modal__kamon" aria-hidden="true">年</div>

      <div class="age-modal__top">
        <span class="age-modal__badge">Verificação obrigatória</span>
        <h2 class="age-modal__titulo">Confirme sua<br/><em>maioridade</em></h2>
        <p class="age-modal__desc">
          Este site vende produtos destinados exclusivamente a maiores de 18 anos.
          Confirme que você tem 18 anos ou mais para continuar.
        </p>
      </div>

      <div class="age-modal__icon" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span class="age-modal__icon-num">18+</span>
      </div>

      <div class="age-modal__btns">
        <button class="age-modal__confirmar" @click="confirmarIdade">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Sim, tenho 18 anos ou mais
        </button>
        <button class="age-modal__recusar" @click="recusarIdade">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
          Não, sou menor de idade
        </button>
      </div>

      <p class="age-modal__rodape">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        Sua resposta é salva neste dispositivo
      </p>
    </div>
  </div>
</transition>

    </teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { useSiteStore } from '@/stores/site.js'
import { useCartStore } from '@/stores/cart.js'

const auth   = useAuthStore()
const site   = useSiteStore()
const cart   = useCartStore()
const router = useRouter()

/* ── Estado geral ── */
const scrolled       = ref(false)
const scrollHide     = ref(false)
const scrollProgress = ref(0)
const sidebarOpen    = ref(false)
const cartOpen       = ref(false)
const modalOpen      = ref(false)
const modalTab       = ref('login')
const showPass       = ref(false)
const showPass2      = ref(false)
const aceitouTermos  = ref(false)
const termosOpen     = ref(false)
const formError      = ref('')
const campoErro      = ref('')
const focusField     = ref('')
const cartBounce     = ref(false)
const loginNecessario = ref(false)
const loginAvisoMsg   = ref('Faça login para adicionar ao carrinho')
const acessOpen      = ref(false)
const userDropOpen   = ref(false)
const userDropRef    = ref(null)
const logoImgOk      = ref(true)
const idadeModalOpen  = ref(false)
const idadeConfirmada = ref(false)
const form = ref({ email: '', senha: '', senha2: '', nome: '', sobrenome: '', cpf: '', nascimento: '', rg: '', orgaoEmissor: '' })

/* ── Multi-step cadastro ── */
const cadastroStep  = ref(1)

/* ── Validações de identidade ── */
const cpfValido     = ref(null)   // null | true | false
const idadeValida   = ref(null)
const verificandoDoc = ref(false)
const dragFrente    = ref(false)
const dragVerso     = ref(false)
const rgFrente      = ref(null)   // File
const rgVerso       = ref(null)   // File
const rgFrentePreview = ref('')
const rgVersoPreview  = ref('')
const fileInputFrente = ref(null)
const fileInputVerso  = ref(null)

/* ── Reconhecimento facial ── */
const cameraAtiva   = ref(false)
const faceScanning  = ref(false)
const faceCapturada = ref(false)
const faceErro      = ref('')
const selfiePreview = ref('')
const videoRef      = ref(null)
const canvasRef     = ref(null)
let cameraStream    = null

/* ── Drawer ── */
const drawerTab  = ref('carrinho')
const savedItems = ref([])

/* ── Cupom ── */
const cupomCodigo   = ref('')
const cupomAplicado = ref(null) // { codigo, desconto }
const cupomErro     = ref('')
const cupomLoading  = ref(false)

const totalComDesconto = computed(() => {
  const total = cart.totalBruto ?? cartItems.value.reduce((s, i) => s + (i.preco * i.qty), 0)
  if (!cupomAplicado.value) return total
  return Math.max(0, total - cupomAplicado.value.desconto)
})

const aplicarCupom = async () => {
  cupomErro.value = ''
  const codigo = cupomCodigo.value.trim().toUpperCase()
  if (!codigo) { cupomErro.value = 'Digite um código de cupom.'; return }
  cupomLoading.value = true
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/cupons/validar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo, itens: cart.items })
    })
    const data = await res.json()
    if (!res.ok || !data.valido) { cupomErro.value = data.mensagem || 'Cupom inválido ou expirado.'; cupomAplicado.value = null; return }
    cupomAplicado.value = { codigo, desconto: data.desconto }
    addToast('Cupom aplicado', `${codigo} — R$ ${fmt(data.desconto)} de desconto`, 'success')
  } catch {
    cupomErro.value = 'Não foi possível validar o cupom agora.'
  } finally {
    cupomLoading.value = false
  }
}
const removerCupom = () => { cupomAplicado.value = null; cupomCodigo.value = ''; cupomErro.value = '' }

/* ── Busca ── */
const searchOpen     = ref(false)
const searchQuery    = ref('')
const searchResults  = ref([])
const searchLoading  = ref(false)
const searchFocusIdx = ref(-1)
const searchInput    = ref(null)
let searchTimer      = null

/* ── Relógio ── */
const brasiliaTime = ref('')
let clockInterval  = null
const updateClock  = () => {
  brasiliaTime.value = new Date().toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit'
  })
}

/* ── Toasts ── */
const toasts = ref([])
let toastId  = 0
const addToast = (title, msg = '', type = 'info', duration = 4000) => {
  const id = ++toastId
  toasts.value.push({ id, title, msg, type, duration })
  setTimeout(() => removeToast(id), duration + 300)
}
const removeToast = (id) => { toasts.value = toasts.value.filter(t => t.id !== id) }
const onToastEnter = (el) => {
  el.style.opacity = '0'; el.style.transform = 'translateX(30px)'
  requestAnimationFrame(() => {
    el.style.transition = 'opacity .3s, transform .4s'
    el.style.opacity = '1'; el.style.transform = 'translateX(0)'
  })
}
const onToastLeave = (el, done) => {
  el.style.transition = 'opacity .25s, transform .3s'
  el.style.opacity = '0'; el.style.transform = 'translateX(30px)'
  setTimeout(done, 300)
}

/* ── Segurança login ── */
const MAX_TENTATIVAS    = 5
const BLOQUEIO_BASE_SEG = 30
const BLOQUEIO_MAX_SEG  = 300
const tentativasFalhadas  = ref(0)
const loginBloqueado      = ref(false)
const bloqueioRestante    = ref(0)
const tentativasRestantes = computed(() => MAX_TENTATIVAS - tentativasFalhadas.value)
let bloqueioInterval = null

const carregarEstadoSeguranca = () => {
  try {
    const salvo = sessionStorage.getItem('_nor_sec')
    if (!salvo) return
    const estado = JSON.parse(salvo)
    const agora  = Date.now()
    tentativasFalhadas.value = estado.falhas || 0
    if (estado.bloqueioAte && estado.bloqueioAte > agora) {
      iniciarContadorBloqueio(Math.ceil((estado.bloqueioAte - agora) / 1000))
    }
  } catch {}
}
const salvarEstadoSeguranca = (bloqueioAte = null) => {
  try { sessionStorage.setItem('_nor_sec', JSON.stringify({ falhas: tentativasFalhadas.value, bloqueioAte })) } catch {}
}
const calcularTempoBloqueio = () => {
  const fator = Math.floor(tentativasFalhadas.value / MAX_TENTATIVAS)
  return Math.min(BLOQUEIO_BASE_SEG * Math.pow(2, fator - 1), BLOQUEIO_MAX_SEG)
}
const iniciarContadorBloqueio = (segundos) => {
  loginBloqueado.value = true; bloqueioRestante.value = segundos
  clearInterval(bloqueioInterval)
  bloqueioInterval = setInterval(() => {
    bloqueioRestante.value--
    if (bloqueioRestante.value <= 0) { clearInterval(bloqueioInterval); loginBloqueado.value = false }
  }, 1000)
}
const registrarFalha = () => {
  tentativasFalhadas.value++
  if (tentativasFalhadas.value % MAX_TENTATIVAS === 0) {
    const tempo = calcularTempoBloqueio()
    const bloqueioAte = Date.now() + tempo * 1000
    salvarEstadoSeguranca(bloqueioAte)
    iniciarContadorBloqueio(tempo)
  } else { salvarEstadoSeguranca() }
}
const registrarSucesso = () => {
  tentativasFalhadas.value = 0; loginBloqueado.value = false
  clearInterval(bloqueioInterval)
  try { sessionStorage.removeItem('_nor_sec') } catch {}
}

/* ── Logo ── */
const logoSrc = computed(() => site.tema === 'claro' ? '/logo-light.png' : '/logo-dark.png')
const logoAlt = computed(() => site.tema === 'claro' ? 'Noir & Or — logotipo (tema claro)' : 'Noir & Or — logotipo (tema escuro)')
watch(() => site.tema, () => { logoImgOk.value = true })

/* ── Links ── */
const allLinks = [
  { label: 'Início', to: '/' }, { label: 'Loja', to: '/loja' },
  { label: 'Sobre', to: '/sobre' }, { label: 'Gamer', to: '/gamer' },
  { label: 'Contato', to: '/contato' },
]

/* ── Carrinho ── */
const cartItems  = computed(() => cart.items)
const totalItens = computed(() => cart.totalItens)
const totalPreco = computed(() => cart.totalBrutoFmt)
const fmt = (v) => (v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })

/* ── Ações de item do carrinho ── */
const verDetalhesItem = (item) => {
  cartOpen.value = false
  router.push(`/produto/${item.id || item._id}`)
}
const editarItem = (item) => {
  cartOpen.value = false
  router.push({ path: `/produto/${item.id || item._id}`, query: { editar: '1' } })
}
const salvarParaDepois = (item) => {
  if (!savedItems.value.some(i => (i.id || i._id) === (item.id || item._id))) {
    savedItems.value.push({ ...item })
    persistirSalvos()
  }
  cart.remover(item.id || item._id)
  addToast('Salvo para depois', item.nome, 'info')
}

/* ── Compras futuras ── */
const carregarSalvos = () => {
  try { const s = localStorage.getItem('noir_saved'); if (s) savedItems.value = JSON.parse(s) } catch {}
}
const persistirSalvos = () => {
  try { localStorage.setItem('noir_saved', JSON.stringify(savedItems.value)) } catch {}
}
const removerSalvo = (id) => { savedItems.value = savedItems.value.filter(i => (i.id || i._id) !== id); persistirSalvos() }
const moverParaCarrinho = (item) => {
  cart.adicionar ? cart.adicionar(item) : cart.items.push({ ...item, qty: 1 })
  removerSalvo(item.id || item._id)
  drawerTab.value = 'carrinho'
  addToast('Adicionado ao carrinho', item.nome, 'success')
}

/* ── Usuário ── */
const primeiroNome = computed(() => (auth.user?.nome || '').split(' ')[0])
const inicialNome  = computed(() => (auth.user?.nome || 'U').charAt(0).toUpperCase())

/* ── Features do modal ── */
const currentFeatures = computed(() =>
  ['Acesso a edições limitadas', 'Histórico de pedidos completo', 'Atendimento VIP 24h']
)

/* ── Força da senha ── */
const forcaSenha = computed(() => {
  const s = form.value.senha
  if (!s) return { pct: 0, cor: '', label: '' }
  let score = 0
  if (s.length >= 8) score++
  if (s.length >= 12) score++
  if (/[A-Z]/.test(s)) score++
  if (/[0-9]/.test(s)) score++
  if (/[^A-Za-z0-9]/.test(s)) score++
  return [
    { pct: 20, cor: '#ef4444', label: 'Muito fraca' },
    { pct: 40, cor: '#f97316', label: 'Fraca' },
    { pct: 60, cor: '#eab308', label: 'Média' },
    { pct: 80, cor: '#22c55e', label: 'Forte' },
    { pct: 100, cor: '#16a34a', label: 'Muito forte' },
  ][Math.min(score - 1, 4)] || { pct: 10, cor: '#ef4444', label: 'Muito fraca' }
})

/* ════════════════════════════════
   VALIDAÇÕES DE IDENTIDADE
════════════════════════════════ */

/* CPF — algoritmo de validação real */
const validarCPF = (cpf) => {
  const c = cpf.replace(/\D/g, '')
  if (c.length !== 11) return false
  if (/^(\d)\1{10}$/.test(c)) return false
  let soma = 0
  for (let i = 0; i < 9; i++) soma += parseInt(c[i]) * (10 - i)
  let r = (soma * 10) % 11
  if (r === 10 || r === 11) r = 0
  if (r !== parseInt(c[9])) return false
  soma = 0
  for (let i = 0; i < 10; i++) soma += parseInt(c[i]) * (11 - i)
  r = (soma * 10) % 11
  if (r === 10 || r === 11) r = 0
  return r === parseInt(c[10])
}

const mascaraCPF = () => {
  let v = form.value.cpf.replace(/\D/g, '').substring(0, 11)
  if (v.length > 9)      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4')
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3')
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2')
  form.value.cpf = v
  if (v.replace(/\D/g, '').length === 11) cpfValido.value = validarCPF(v)
  else cpfValido.value = null
}

const mascaraRG = () => {
  let v = form.value.rg.replace(/\D/g, '').substring(0, 9)
  if (v.length > 8)      v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4')
  else if (v.length > 5) v = v.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3')
  else if (v.length > 2) v = v.replace(/(\d{2})(\d{1,3})/, '$1.$2')
  form.value.rg = v
}

/* Calcula data máxima para ser maior de 18 */
const dataMaxNascimento = computed(() => {
  const d = new Date()
  d.setFullYear(d.getFullYear() - 18)
  return d.toISOString().split('T')[0]
})

const verificarIdade = () => {
  if (!form.value.nascimento) { idadeValida.value = null; return }
  const nasc  = new Date(form.value.nascimento)
  const hoje  = new Date()
  const idade = hoje.getFullYear() - nasc.getFullYear()
  const mes   = hoje.getMonth() - nasc.getMonth()
  const dia   = hoje.getDate() - nasc.getDate()
  const anos  = mes < 0 || (mes === 0 && dia < 0) ? idade - 1 : idade
  idadeValida.value = anos >= 18
}

/* Upload RG */
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const validarArquivo = (file) => {
  if (!file) return 'Nenhum arquivo selecionado.'
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return 'Formato inválido. Use JPG, PNG ou WEBP.'
  if (file.size > MAX_FILE_SIZE) return 'Arquivo muito grande. Máximo 5MB.'
  return null
}

/* Botão "Selecionar do computador" — dispara o input file oculto correspondente */
const abrirSeletorArquivo = (lado) => {
  if (lado === 'frente') fileInputFrente.value?.click()
  else fileInputVerso.value?.click()
}

const onFileRG = (event, lado) => {
  const file = event.target.files[0]
  processarArquivoRG(file, lado)
}
const onDropRG = (event, lado) => {
  if (lado === 'frente') dragFrente.value = false
  else dragVerso.value = false
  const file = event.dataTransfer.files[0]
  processarArquivoRG(file, lado)
}
const processarArquivoRG = (file, lado) => {
  const erro = validarArquivo(file)
  if (erro) { addToast('Arquivo inválido', erro, 'error'); return }
  const reader = new FileReader()
  reader.onload = (e) => {
    if (lado === 'frente') { rgFrente.value = file; rgFrentePreview.value = e.target.result }
    else { rgVerso.value = file; rgVersoPreview.value = e.target.result }
  }
  reader.readAsDataURL(file)
}
const removerRG = (lado) => {
  if (lado === 'frente') { rgFrente.value = null; rgFrentePreview.value = '' }
  else { rgVerso.value = null; rgVersoPreview.value = '' }
}

/* ── Câmera / Selfie ── */
const iniciarCamera = async () => {
  faceErro.value = ''
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, facingMode: 'user' } })
    cameraAtiva.value = true
    await nextTick()
    if (videoRef.value) videoRef.value.srcObject = cameraStream
  } catch (err) {
    if (err.name === 'NotAllowedError') faceErro.value = 'Permissão de câmera negada. Verifique as configurações do navegador.'
    else faceErro.value = 'Não foi possível acessar a câmera.'
    addToast('Câmera bloqueada', faceErro.value, 'error')
  }
}

const pararCamera = () => {
  if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null }
  cameraAtiva.value = false
}

const capturarSelfie = async () => {
  if (!videoRef.value || !canvasRef.value) return
  faceScanning.value = true
  faceErro.value = ''

  // Captura frame do vídeo no canvas
  const video  = videoRef.value
  const canvas = canvasRef.value
  canvas.width  = video.videoWidth  || 640
  canvas.height = video.videoHeight || 480
  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

  // Converte para base64
  selfiePreview.value = canvas.toDataURL('image/jpeg', 0.85)

  // Simula processamento biométrico (TCC — em produção usar API de reconhecimento facial)
  await new Promise(r => setTimeout(r, 2200))

  /* ── Verificação simulada ──
     Em produção: enviar selfiePreview + rgFrentePreview para uma API de face-matching
     Ex: AWS Rekognition, Azure Face API, ou Face++ */
  const aprovado = await simularVerificacaoBiometrica()

  faceScanning.value = false

  if (aprovado) {
    pararCamera()
    faceCapturada.value = true
    addToast('Biometria aprovada', 'Identidade confirmada com sucesso', 'success')
  } else {
    faceErro.value = 'Rosto não reconhecido. Certifique-se de estar bem iluminado e centralizado.'
    selfiePreview.value = ''
    addToast('Verificação falhou', faceErro.value, 'error')
  }
}

/* Simulação de verificação biométrica para o TCC
   Retorna true após verificar que a selfie não está vazia e o RG foi enviado */
const simularVerificacaoBiometrica = async () => {
  // Valida que a selfie foi capturada com conteúdo real (canvas não vazio)
  if (!selfiePreview.value || selfiePreview.value.length < 1000) return false
  // Valida que o RG frente foi enviado
  if (!rgFrente.value) return false
  // Simula 95% de aprovação (reproduz comportamento real de API)
  return Math.random() > 0.05
}

const resetarFace = () => {
  faceCapturada.value = false
  faceErro.value      = ''
  selfiePreview.value = ''
  pararCamera()
}

/* Simula a selfie + biometria sem precisar de câmera (uso em dev/TCC) */
const simularFaceMatch = async () => {
  faceErro.value = ''
  selfiePreview.value = await new Promise(resolve => {
    const canvas = document.createElement('canvas')
    canvas.width = 280; canvas.height = 320
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, 280, 320)
    ctx.fillStyle = 'rgba(245,166,35,0.15)'; ctx.fillRect(15, 15, 250, 290)
    ctx.strokeStyle = 'rgba(245,166,35,0.5)'; ctx.lineWidth = 2; ctx.strokeRect(20, 20, 240, 280)
    ctx.fillStyle = '#F5A623'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center'
    ctx.fillText('Selfie Simulada', 140, 155)
    ctx.font = '10px sans-serif'; ctx.fillStyle = 'rgba(245,166,35,0.5)'
    ctx.fillText('Modo dev / TCC', 140, 175)
    canvas.toBlob(blob => {
      const r = new FileReader()
      r.onload = e => resolve(e.target.result)
      r.readAsDataURL(blob)
    }, 'image/jpeg', 0.85)
  })
  faceCapturada.value = true
  addToast('Biometria simulada', 'Identidade confirmada (modo dev)', 'success')
}

/* ════════════════════════════════
   FLUXO DO CADASTRO MULTI-STEP
════════════════════════════════ */
const avancarStep1 = () => {
  formError.value = ''; campoErro.value = ''

  if (!form.value.nome.trim())       { formError.value = 'Informe seu nome.'; campoErro.value = 'nome'; return }
  if (!form.value.email.includes('@')) { formError.value = 'E-mail inválido.'; campoErro.value = 'email'; return }
  if (!form.value.cpf || !validarCPF(form.value.cpf)) { formError.value = 'Informe um CPF válido.'; campoErro.value = 'cpf'; return }
  if (!form.value.nascimento)        { formError.value = 'Informe sua data de nascimento.'; campoErro.value = 'nascimento'; return }
  if (idadeValida.value === false)   { formError.value = 'Você deve ter 18 anos ou mais.'; campoErro.value = 'nascimento'; return }
  if (!idadeValida.value)            { verificarIdade(); if (idadeValida.value === false) { formError.value = 'Você deve ter 18 anos ou mais.'; return } }
  if (form.value.senha.length < 8)   { formError.value = 'Senha com mínimo 8 caracteres.'; campoErro.value = 'senha'; return }
  if (form.value.senha !== form.value.senha2) { formError.value = 'As senhas não coincidem.'; return }
  if (!aceitouTermos.value)          { formError.value = 'Aceite os Termos de Uso para continuar.'; return }

  cadastroStep.value = 2
}

const avancarStep2 = async () => {
  formError.value = ''; campoErro.value = ''

  if (!form.value.rg || form.value.rg.replace(/\D/g, '').length < 7) { formError.value = 'Informe o número do RG.'; campoErro.value = 'rg'; return }
  if (!form.value.orgaoEmissor.trim()) { formError.value = 'Informe o órgão emissor.'; campoErro.value = 'orgao'; return }
  if (!rgFrente.value)  { formError.value = 'Envie a foto da frente do RG.'; return }
  if (!rgVerso.value)   { formError.value = 'Envie a foto do verso do RG.'; return }

  verificandoDoc.value = true
  // Simula validação do documento (TCC — em produção usar OCR/API de validação de documentos)
  await new Promise(r => setTimeout(r, 1500))
  verificandoDoc.value = false

  addToast('Documento verificado', 'RG analisado com sucesso', 'success')
  cadastroStep.value = 3
}

const finalizarCadastro = async () => {
  formError.value = ''
  if (!faceCapturada.value) { formError.value = 'Complete o reconhecimento facial.'; return }

  try {
    await auth.register(
      form.value.nome,
      form.value.sobrenome,
      form.value.email,
      form.value.senha,
      {
        cpf:         form.value.cpf,
        nascimento:  form.value.nascimento,
        rg:          form.value.rg,
        orgaoEmissor: form.value.orgaoEmissor,
        identidadeVerificada: true
      }
    )
    registrarSucesso()
    closeModal()
    addToast('Conta criada com sucesso!', `Bem-vindo, ${form.value.nome}`, 'success')
  } catch {
    formError.value = auth.error || 'Erro ao cadastrar. Tente novamente.'
    addToast('Erro ao cadastrar', formError.value, 'error')
  }
}

/* ── Scroll ── */
let lastScrollY = 0
const handleScroll = () => {
  const y    = window.scrollY
  const docH = document.documentElement.scrollHeight - window.innerHeight
  scrolled.value       = y > 40
  scrollProgress.value = docH > 0 ? (y / docH) * 100 : 0
  if (y > 200) scrollHide.value = y > lastScrollY
  else         scrollHide.value = false
  lastScrollY = y
}

/* ── Busca ── */
const toggleSearch = async () => {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) { await nextTick(); searchInput.value?.focus() }
  else clearSearch()
}
const closeSearch = () => { searchOpen.value = false; clearSearch() }
const clearSearch = () => { searchQuery.value = ''; searchResults.value = []; searchLoading.value = false; searchFocusIdx.value = -1; clearTimeout(searchTimer) }
const searchNavUp   = () => { searchFocusIdx.value = searchFocusIdx.value > 0 ? searchFocusIdx.value - 1 : searchResults.value.length - 1 }
const searchNavDown = () => { searchFocusIdx.value = searchFocusIdx.value < searchResults.value.length - 1 ? searchFocusIdx.value + 1 : 0 }
const onSearchInput = () => {
  clearTimeout(searchTimer); searchFocusIdx.value = -1
  const q = searchQuery.value.trim()
  if (q.length < 2) { searchResults.value = []; searchLoading.value = false; return }
  searchLoading.value = true; searchResults.value = []
  searchTimer = setTimeout(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/produtos?busca=${encodeURIComponent(q)}&limite=5`)
      if (res.ok) { const data = await res.json(); searchResults.value = data.produtos || data || [] }
    } catch { searchResults.value = [] }
    finally  { searchLoading.value = false }
  }, 280)
}
const irParaBusca  = () => {
  if (searchFocusIdx.value >= 0 && searchResults.value[searchFocusIdx.value]) { irParaProduto((searchResults.value[searchFocusIdx.value])._id || (searchResults.value[searchFocusIdx.value]).id); return }
  if (!searchQuery.value.trim()) return
  router.push({ path: '/loja', query: { busca: searchQuery.value.trim() } }); closeSearch()
}
const irParaProduto = (id) => { router.push(`/produto/${id}`); closeSearch() }

/* ── Clique fora ── */
const handleOutsideClick = (e) => {
  if (acessOpen.value    && !e.target.closest('.nb-acess-wrap') && !e.target.closest('.pref-panel')) acessOpen.value    = false
  if (searchOpen.value   && !e.target.closest('.nb-search-wrap'))                                    closeSearch()
  if (userDropOpen.value && userDropRef.value && !userDropRef.value.contains(e.target))             userDropOpen.value = false
}

/* ── Modal ── */
const openModal = (tab, comAviso = false, mensagemAviso = '') => {
  modalTab.value = tab; formError.value = ''; campoErro.value = ''; focusField.value = ''
  loginNecessario.value = comAviso
  loginAvisoMsg.value = mensagemAviso || 'Faça login para adicionar ao carrinho'
  cadastroStep.value = 1
  form.value = { email: '', senha: '', senha2: '', nome: '', sobrenome: '', cpf: '', nascimento: '', rg: '', orgaoEmissor: '' }
  cpfValido.value = null; idadeValida.value = null
  showPass.value = false; showPass2.value = false; aceitouTermos.value = false; termosOpen.value = false
  rgFrente.value = null; rgVerso.value = null; rgFrentePreview.value = ''; rgVersoPreview.value = ''
  faceCapturada.value = false; faceErro.value = ''; selfiePreview.value = ''
  pararCamera()
  modalOpen.value = true
}
const closeModal = () => {
  modalOpen.value = false; formError.value = ''; campoErro.value = ''; loginNecessario.value = false
  pararCamera()
}
const switchTab = (tab) => {
  modalTab.value = tab; formError.value = ''; campoErro.value = ''; cadastroStep.value = 1
  form.value = { email: '', senha: '', senha2: '', nome: '', sobrenome: '', cpf: '', nascimento: '', rg: '', orgaoEmissor: '' }
  cpfValido.value = null; idadeValida.value = null; termosOpen.value = false
}

/* ── AUTH ── */
const fazerLogin = async () => {
  formError.value = ''; campoErro.value = ''
  if (loginBloqueado.value) { formError.value = `Aguarde ${bloqueioRestante.value}s.`; return }
  if (!form.value.email || !form.value.email.includes('@')) { formError.value = 'Informe um e-mail válido.'; campoErro.value = 'email'; return }
  if (!form.value.senha) { formError.value = 'Informe a senha.'; campoErro.value = 'senha'; return }
  try {
    await auth.login(form.value.email, form.value.senha)
    registrarSucesso(); closeModal()
    addToast('Bem-vindo de volta!', primeiroNome.value || '', 'success')
    /* Se o usuário veio de uma tentativa de checkout/pedido sem login, retoma o fluxo */
    if (window.__noirRetomarCheckoutAposLogin) {
      window.__noirRetomarCheckoutAposLogin = false
      prosseguirCheckout()
    }
  } catch {
    registrarFalha()
    const restantes = tentativasRestantes.value
    if (loginBloqueado.value) formError.value = `Muitas tentativas. Acesso bloqueado por ${bloqueioRestante.value}s.`
    else if (restantes <= 2) formError.value = `Credenciais inválidas. ${restantes} tentativa${restantes !== 1 ? 's' : ''} restante${restantes !== 1 ? 's' : ''}.`
    else formError.value = auth.error || 'E-mail ou senha incorretos.'
    campoErro.value = 'senha'
    addToast('Falha no login', formError.value, 'error')
  }
}

/* ── Google OAuth ── */
const loginGoogle = () => {
  if (!window.google) { alert('Google OAuth não carregado.'); return }
  window.google.accounts.oauth2.initTokenClient({
    client_id: '1072334614026-5g7u8oj8i1esvdkd5omlgbuirun0f2g6.apps.googleusercontent.com',
    scope: 'email profile',
    callback: async (response) => {
      if (response.error) return
      try {
        const res    = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { Authorization: `Bearer ${response.access_token}` } })
        const perfil = await res.json()
        const resultado = await auth.loginGoogle(perfil)
        if (resultado?.novoUsuario || resultado?.isNew) {
          switchTab('cadastro')
          form.value.nome = perfil.given_name || ''; form.value.sobrenome = perfil.family_name || ''; form.value.email = perfil.email || ''
          return
        }
        registrarSucesso(); closeModal()
        addToast('Login com Google realizado!', '', 'success')
        if (window.__noirRetomarCheckoutAposLogin) {
          window.__noirRetomarCheckoutAposLogin = false
          prosseguirCheckout()
        }
      } catch {
        formError.value = 'Erro ao autenticar com Google.'
        addToast('Erro Google OAuth', formError.value, 'error')
      }
    }
  }).requestAccessToken()
}

const fazerLogout = async () => {
  userDropOpen.value = false; sidebarOpen.value = false
  await auth.logout(); cart.limpar(); router.push('/')
  addToast('Até logo!', 'Sessão encerrada com segurança', 'info')
}

/* ── Navegação ── */
const abrirCarrinho      = () => { cartOpen.value = true; drawerTab.value = 'carrinho' }
const abrirComprasFuturas = () => { userDropOpen.value = false; cartOpen.value = true; drawerTab.value = 'futuras' }
const irParaConta        = () => { userDropOpen.value = false; sidebarOpen.value = false; router.push('/configuracoes?secao=pedidos') }
const changeQty          = (item, d) => cart.alterarQty(item.id || item._id, d)
const removeItem         = (id) => { cart.remover(id); addToast('Item removido', '', 'info') }
const irParaCheckout     = () => {
  if (!auth.isLogado) {
    window.__noirRetomarCheckoutAposLogin = true
    cartOpen.value = false
    openModal('login', true, 'Você precisa estar logado para enviar seu pedido. Faça login para continuar.')
    return
  }
  const items = JSON.parse(JSON.stringify(cart.items))
  if (!items.length) return
  cartOpen.value = false
  window.__noirCarrinho = items
  window.dispatchEvent(new CustomEvent('abrir-checkout', { detail: items }))
}

/* ── Verificação de idade ── */
const CHAVE_IDADE = '_nor_age_ok'

const jaConfirmouIdade = () => {
  try { return !!localStorage.getItem(CHAVE_IDADE) } catch { return false }
}
const salvarConfirmacaoIdade = () => {
  try { localStorage.setItem(CHAVE_IDADE, '1') } catch {}
}
const confirmarIdade = () => {
  salvarConfirmacaoIdade()
  idadeConfirmada.value  = true
  idadeModalOpen.value   = false
  prosseguirCheckout()
}
const recusarIdade = () => {
  idadeModalOpen.value = false
  addToast('Acesso restrito', 'Este site é destinado a maiores de 18 anos.', 'error')
}
const prosseguirCheckout = () => {
  if (!auth.isLogado) {
    window.__noirRetomarCheckoutAposLogin = true
    cartOpen.value = false
    openModal('login', true, 'Você precisa estar logado para enviar seu pedido. Faça login para continuar.')
    return
  }
  const items = JSON.parse(JSON.stringify(cart.items))
  if (!items.length) return
  cartOpen.value = false
  window.__noirCarrinho = items
  window.dispatchEvent(new CustomEvent('abrir-checkout', { detail: items }))
}

/* ── Ouve pedidos de login vindos de outras páginas (ex: tela de checkout) ── */
const handlePrecisaLogin = (e) => {
  window.__noirRetomarCheckoutAposLogin = true
  cartOpen.value = false
  const msg = e?.detail?.mensagem || 'Você precisa estar logado para enviar seu pedido. Faça login para continuar.'
  openModal('login', true, msg)
}

/* ── Simular envio de documentos (TCC/DEV) ── */
const simularEnvioDocumento = () => {
  // Preenche campos obrigatórios com dados fictícios
  if (!form.value.rg || form.value.rg.replace(/\D/g, '').length < 7) {
    form.value.rg = '12.345.678-9'
  }
  if (!form.value.orgaoEmissor.trim()) {
    form.value.orgaoEmissor = 'SSP/SP'
  }

  // Cria uma imagem canvas simulada para frente e verso
  const criarImagemSimulada = (label) => {
    const canvas = document.createElement('canvas')
    canvas.width = 640; canvas.height = 400
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, 640, 400)
    ctx.fillStyle = 'rgba(245,166,35,0.15)'
    ctx.fillRect(20, 20, 600, 360)
    ctx.strokeStyle = 'rgba(245,166,35,0.5)'
    ctx.lineWidth = 2
    ctx.strokeRect(30, 30, 580, 340)
    ctx.fillStyle = '#F5A623'
    ctx.font = 'bold 28px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('RG — ' + label, 320, 180)
    ctx.fillStyle = 'rgba(245,166,35,0.4)'
    ctx.font = '14px sans-serif'
    ctx.fillText('Documento Simulado — Noir & Or TCC', 320, 220)
    return new Promise(resolve => canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.85))
  }

  Promise.all([criarImagemSimulada('FRENTE'), criarImagemSimulada('VERSO')]).then(([blobFrente, blobVerso]) => {
    const fileFrente = new File([blobFrente], 'rg-frente-sim.jpg', { type: 'image/jpeg' })
    const fileVerso  = new File([blobVerso],  'rg-verso-sim.jpg',  { type: 'image/jpeg' })

    rgFrente.value = fileFrente
    rgVerso.value  = fileVerso

    const readerF = new FileReader()
    readerF.onload = e => { rgFrentePreview.value = e.target.result }
    readerF.readAsDataURL(fileFrente)

    const readerV = new FileReader()
    readerV.onload = e => { rgVersoPreview.value = e.target.result }
    readerV.readAsDataURL(fileVerso)

    addToast('Documentos simulados', 'Campos preenchidos automaticamente', 'success')
    formError.value = ''
  })
}

/* ── Lock scroll ── */
const lockScroll = (v) => { if (document) document.body.style.overflow = v ? 'hidden' : '' }
watch([modalOpen, cartOpen, sidebarOpen], ([m, c, s]) => lockScroll(m || c || s))

/* ── Keyboard ── */
const handleKeydown = (e) => {
  if (e.key !== 'Escape') return
  if (modalOpen.value)    closeModal()
  if (cartOpen.value)     cartOpen.value     = false
  if (sidebarOpen.value)  sidebarOpen.value  = false
  if (acessOpen.value)    acessOpen.value    = false
  if (searchOpen.value)   closeSearch()
  if (userDropOpen.value) userDropOpen.value = false
}

const handleAuthExpirado = () => {
  auth.user = null; auth.token = null; cart.limpar()
  modalOpen.value = false; cartOpen.value = false
  addToast('Sessão expirada', 'Por favor, faça login novamente', 'error')
}

onMounted(() => {
  window.addEventListener('scroll',         handleScroll,       { passive: true })
  window.addEventListener('click',          handleOutsideClick)
  window.addEventListener('keydown',        handleKeydown)
  window.addEventListener('auth:expirado',  handleAuthExpirado)
  window.addEventListener('precisa-login',  handlePrecisaLogin)
  carregarEstadoSeguranca()
  carregarSalvos()
  updateClock()
  clockInterval = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  window.removeEventListener('scroll',        handleScroll)
  window.removeEventListener('click',         handleOutsideClick)
  window.removeEventListener('keydown',       handleKeydown)
  window.removeEventListener('auth:expirado', handleAuthExpirado)
  window.removeEventListener('precisa-login', handlePrecisaLogin)
  clearTimeout(searchTimer)
  clearInterval(bloqueioInterval)
  clearInterval(clockInterval)
  pararCamera()
})

watch(
  () => auth.isLogado,
  (logado) => { if (logado) cart.init(); else cart.limpar() },
  { immediate: true }
)
</script>

<style scoped>
/* ── PROGRESS ── */
.nb-progress { position:fixed;top:0;left:0;width:100%;height:2px;background:var(--grad-btn);transform-origin:left;transform:scaleX(0);z-index:99999;pointer-events:none;transition:transform .1s linear; }

/* ── NAVBAR ── */
.navbar { position:fixed;top:0;left:0;right:0;z-index:var(--z-high,1000);height:var(--navbar-h,56px);display:flex;align-items:center;background:var(--navbar-bg);font-family:var(--font-sans,'Syne',sans-serif);transition:height .4s cubic-bezier(.16,1,.3,1),background .4s ease,box-shadow .4s ease,transform .4s cubic-bezier(.16,1,.3,1);will-change:transform; }
.navbar-root { display:contents; }
.navbar--scrolled { height:max(48px,calc(var(--navbar-h,68px) - 12px));background:var(--navbar-bg-scroll)!important;-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);box-shadow:0 1px 0 var(--cor-borda),0 2px 20px rgba(0,0,0,.12); }
.navbar--hidden { transform:translateY(-110%); }
.navbar__inner { width:100%;max-width:1760px;margin:0 auto;padding:0 44px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px; }
.navbar__left { display:flex;align-items:center;gap:14px;justify-self:start; }

/* ── BURGER ── */
.nb-burger { background:none;border:none;cursor:pointer;padding:6px 4px;display:none;flex-direction:column;gap:5px;width:28px;flex-shrink:0; }
.nb-burger__bar { display:block;height:1.5px;background:var(--cor-texto-2);border-radius:2px;transform-origin:center;transition:transform .35s cubic-bezier(.16,1,.3,1),width .35s cubic-bezier(.16,1,.3,1),opacity .25s ease,background .25s ease; }
.nb-burger__bar--1{width:22px;}.nb-burger__bar--2{width:14px;}.nb-burger__bar--3{width:8px;}
.nb-burger:hover .nb-burger__bar,.nb-burger:hover .nb-burger__bar--2,.nb-burger:hover .nb-burger__bar--3 { background:var(--cor-primaria);width:22px; }
.nb-burger.is-open .nb-burger__bar--1 { transform:translateY(6.5px) rotate(45deg);width:22px;background:var(--cor-primaria); }
.nb-burger.is-open .nb-burger__bar--2 { transform:scaleX(0);opacity:0; }
.nb-burger.is-open .nb-burger__bar--3 { transform:translateY(-6.5px) rotate(-45deg);width:22px;background:var(--cor-primaria); }

/* ── LOGO ── */
.nb-logo { justify-self:center;display:flex;align-items:center;gap:9px;text-decoration:none;flex-shrink:0; }
.nb-logo__img { height:48px;width:auto;transition:opacity .25s;object-fit:contain; }
.nb-logo:hover .nb-logo__img { opacity:0.82; }
.navbar--scrolled .nb-logo__img { height:36px; }
.nb-logo__mark { width:34px;height:34px;flex-shrink:0;border-radius:50%;border:1.5px solid rgba(245,166,35,0.45);display:flex;align-items:center;justify-content:center;position:relative; }
.nb-logo__mark::before { content:'⊕';color:var(--cor-primaria);font-size:13px;line-height:1; }
.nb-logo__text { font-family:var(--font-serif,'Playfair Display',serif);font-size:18px;font-style:italic;letter-spacing:0.16em;color:var(--cor-texto); }
.nb-logo__text em { color:var(--cor-primaria);font-style:normal; }

/* ── LINKS DESKTOP ── */
.nb-links { display:flex;gap:16px;align-items:center; }
.nb-link { font-size:9px;letter-spacing:0.38em;text-transform:uppercase;font-weight:600;color:var(--cor-texto-2);text-decoration:none;display:flex;align-items:center;gap:5px;position:relative;padding-bottom:3px;transition:color .25s ease; }
.nb-link::after { content:'';position:absolute;bottom:0;left:0;width:0;height:1.5px;background:linear-gradient(90deg,var(--cor-secundaria) 0%,var(--cor-primaria) 100%);border-radius:0 2px 2px 0;transition:width .35s cubic-bezier(.16,1,.3,1); }
.nb-link:hover,.nb-link.router-link-exact-active { color:var(--cor-primaria); }
.nb-link:hover::after,.nb-link.router-link-exact-active::after { width:100%; }
.nb-link--gamer { color:var(--cor-primaria);font-weight:700; }
.nb-link--gamer__ico { font-family:'Noto Serif JP','Yu Mincho',serif;font-size:14px;color:var(--cor-primaria);opacity:0.80;line-height:1;transition:opacity .25s,transform .35s cubic-bezier(.16,1,.3,1);display:inline-block; }
.nb-link--gamer:hover .nb-link--gamer__ico { opacity:1;transform:rotate(-15deg) scale(1.15); }

/* ── DIREITA ── */
.nb-right { justify-self:end;display:flex;align-items:center;gap:6px; }
.nb-icon { width:34px;height:34px;border-radius:var(--r-sm,4px);display:flex;align-items:center;justify-content:center;background:none;border:none;color:var(--cor-texto-2);cursor:pointer;transition:color .25s,background .25s;flex-shrink:0; }
.nb-icon:hover,.nb-icon.is-active { color:var(--cor-primaria);background:var(--gold-08); }
.nb-cart { position:relative; }
.nb-cart__badge { position:absolute;top:2px;right:2px;background:var(--cor-primaria);color:#0A0A0A!important;font-size:11px!important;font-weight:900!important;font-family:'DM Mono','Courier New',monospace!important;min-width:14px;height:14px;border-radius:3px;display:flex;align-items:center;justify-content:center;padding:0 3px;line-height:1;box-shadow:0 2px 6px rgba(0,0,0,0.4);pointer-events:none; }
.nb-cart__badge.is-bounce { animation:badge-bounce .5s cubic-bezier(.19,1,.22,1); }
@keyframes badge-bounce { 0%{transform:scale(1)}40%{transform:scale(1.5)}100%{transform:scale(1)} }
.nb-search-wrap { position:relative; }
.nb-sep { width:1px;height:18px;background:var(--cor-borda);margin:0 4px; }
.nb-acess-wrap { position:relative; }

/* ── USUÁRIO ── */
.nb-user-area { position:relative; }
.nb-user-wrap { position:relative; }
.nb-user { display:flex;align-items:center;gap:7px;background:none;border:none;cursor:pointer;padding:4px 6px;border-radius:6px;transition:background .25s; }
.nb-user:hover { background:var(--gold-08); }
.nb-avatar { width:30px;height:30px;border-radius:6px;background:var(--grad-btn);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;color:#0A0A0A;overflow:hidden;flex-shrink:0;border:1.5px solid rgba(245,166,35,.35); }
.nb-avatar img { width:100%;height:100%;object-fit:cover;display:block; }
.nb-user__info { display:flex;flex-direction:column;line-height:1.2; }
.nb-user__nome { font-size:11px;font-weight:500;color:var(--cor-texto-2);max-width:70px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
.nb-user__vip { font-size:8px;letter-spacing:.1em;font-weight:700;background:var(--grad-texto);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent; }
.nb-user__chevron { color:var(--cor-texto-3);transition:transform .3s cubic-bezier(.16,1,.3,1);flex-shrink:0; }
.nb-user__chevron.is-open { transform:rotate(180deg); }
.nb-user-drop { position:absolute;top:calc(100% + 10px);right:0;width:252px;background:var(--or-deep,#09090f);border:0.5px solid var(--or-hair,rgba(245,166,35,0.12));box-shadow:0 20px 60px rgba(0,0,0,0.65);z-index:9999;overflow:hidden; }
.nb-user-drop::before { content:'';position:absolute;top:0;left:0;right:0;height:0.5px;background:linear-gradient(90deg,transparent,var(--cor-secundaria) 20%,var(--cor-primaria) 50%,var(--cor-secundaria) 80%,transparent);opacity:0.65; }
.nb-drop-head { display:flex;align-items:center;gap:12px;padding:16px 18px;background:rgba(245,166,35,0.03); }
.nb-drop-avatar { width:38px;height:38px;border-radius:6px;background:var(--grad-btn);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:#0A0A0A;overflow:hidden;flex-shrink:0;border:1.5px solid rgba(245,166,35,.3); }
.nb-drop-avatar img { width:100%;height:100%;object-fit:cover;display:block; }
.nb-drop-nome { font-size:12px;font-weight:600;color:var(--cor-texto);line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px; }
.nb-drop-email { font-size:10px;color:var(--cor-texto-3);letter-spacing:.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px; }
.nb-drop-vip { font-size:8px;letter-spacing:.15em;font-weight:700;background:var(--grad-texto);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent; }
.nb-drop-clock { display:flex;align-items:center;gap:7px;padding:7px 18px;background:rgba(245,166,35,0.03);border-top:0.5px solid var(--or-hair-2); }
.nb-drop-clock svg { color:var(--or-gold);opacity:.5;flex-shrink:0; }
.nb-drop-clock__label { font-family:var(--font-sans);font-size:8px;letter-spacing:.35em;text-transform:uppercase;color:var(--or-silk-3); }
.nb-drop-clock__time { font-family:'DM Mono','Courier New',monospace;font-size:11px;color:var(--or-gold);margin-left:auto;letter-spacing:.08em; }
.nb-drop-sep { position:relative;height:13px;margin:2px 0;display:flex;align-items:center; }
.nb-drop-sep::before { content:'';position:absolute;left:0;right:0;top:50%;height:0.5px;background:linear-gradient(90deg,transparent,var(--or-hair,rgba(245,166,35,0.12)),transparent); }
.nb-drop-sep::after { content:'◆';position:absolute;left:50%;transform:translateX(-50%);font-size:4px;color:var(--cor-primaria);background:var(--or-deep,#09090f);padding:0 6px;opacity:0.45;line-height:1;z-index:1; }
.nb-drop-item { width:100%;display:flex;align-items:center;gap:10px;padding:11px 18px;background:none;border:none;text-decoration:none;font-family:var(--font-sans);font-size:11px;letter-spacing:.04em;color:var(--cor-texto-2);cursor:pointer;transition:all .2s; }
.nb-drop-item svg { color:var(--cor-texto-3);flex-shrink:0;transition:color .2s; }
.nb-drop-item:hover { background:var(--gold-08);color:var(--cor-primaria);padding-left:22px; }
.nb-drop-item:hover svg { color:var(--cor-primaria); }
.nb-drop-item--admin { color:var(--cor-secundaria); }
.nb-drop-item--saved { color:var(--or-gold,#F5A623);opacity:.8; }
.nb-drop-item--sair { color:rgba(239,68,68,.65); }
.nb-drop-item--sair:hover { background:rgba(239,68,68,.06);color:#ef4444; }
.nb-drop-badge { margin-left:auto;background:var(--grad-btn);color:#0A0A0A;font-size:8px;font-weight:900;min-width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;padding:0 4px; }
.nb-drop-badge--saved { background:rgba(245,166,35,0.2);color:var(--or-gold,#F5A623); }
.drop-down-enter-active,.drop-down-leave-active { transition:opacity .2s,transform .25s cubic-bezier(.16,1,.3,1); }
.drop-down-enter-from,.drop-down-leave-to { opacity:0;transform:translateY(-8px) scale(.97); }
.nb-auth { display:flex;align-items:center;gap:8px; }
.nb-entrar { background:none;border:none;font-family:var(--font-sans);font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:var(--cor-texto-2);cursor:pointer;transition:color .25s;white-space:nowrap; }
.nb-entrar:hover { color:var(--cor-primaria); }
.nb-cadastrar { background:var(--grad-btn);border:none;border-radius:2px;padding:7px 14px;font-family:var(--font-sans);font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#FFFFFF;cursor:pointer;white-space:nowrap;box-shadow:var(--shadow-btn);transition:transform .25s,box-shadow .25s; }
.nb-cadastrar:hover { transform:translateY(-1px); }

/* ── PAINEL ACESSIBILIDADE ── */
.pref-reset { display:flex;align-items:center;gap:5px;background:none;border:0.5px solid var(--or-hair-2);padding:4px 10px;font-family:var(--font-sans);font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:var(--or-silk-3);cursor:pointer;transition:all .25s; }
.pref-reset:hover { border-color:var(--or-gold);color:var(--or-gold); }

/* ── TRANSIÇÕES ── */
.fade-enter-active,.fade-leave-active { transition:opacity .3s ease; }
.fade-enter-from,.fade-leave-to { opacity:0; }
.slide-enter-active,.slide-leave-active { transition:opacity .2s,transform .2s; }
.slide-enter-from { opacity:0;transform:translateX(12px); }
.slide-leave-to { opacity:0;transform:translateX(-12px); }
.slide-down-enter-active,.slide-down-leave-active { transition:all .3s; }
.slide-down-enter-from,.slide-down-leave-to { opacity:0;transform:translateY(-8px); }
.search-drop-enter-active,.search-drop-leave-active { transition:opacity .2s,transform .2s; }
.search-drop-enter-from,.search-drop-leave-to { opacity:0;transform:translateY(-10px) scale(.97); }
.pref-drop-enter-active,.pref-drop-leave-active { transition:opacity .2s,transform .25s cubic-bezier(.16,1,.3,1); }
.pref-drop-enter-from,.pref-drop-leave-to { opacity:0;transform:translateY(-8px) scale(.97); }

.nb-overlay { position:fixed;inset:0;z-index:var(--z-modal,10000);background:var(--overlay-bg);-webkit-backdrop-filter:blur(24px) saturate(150%);backdrop-filter:blur(24px) saturate(150%);display:flex;align-items:center;justify-content:center;padding:20px; }

/* ── RESPONSIVO ── */
@media (max-width:1100px) { .nb-links{display:none;} .nb-burger{display:flex;} .navbar__inner{grid-template-columns:auto 1fr auto;} }
@media (max-width:768px)  { .navbar__inner{padding:0 20px;} .nb-user__info,.nb-user__chevron{display:none;} }
@media (max-width:480px)  { .navbar__inner{padding:0 16px;} .nb-sep,.nb-entrar{display:none;} }

/* ── MODAL CONFIRMAÇÃO DE IDADE ── */
.age-modal {
  position: relative;
  width: 100%;
  max-width: 400px;
  background: var(--or-deep, #09090f);
  border: 0.5px solid var(--or-hair, rgba(245,166,35,0.12));
  box-shadow: 0 0 0 0.5px var(--or-hair), 0 60px 120px rgba(0,0,0,.9);
  padding: 44px 36px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  overflow: hidden;
  animation: or-modal-in 0.55s var(--or-easing, cubic-bezier(.16,1,.3,1)) both;
}
.age-modal::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 0.5px;
  background: linear-gradient(90deg, transparent, var(--or-gold, #F5A623) 30%, var(--or-gold, #F5A623) 70%, transparent);
  opacity: 0.8;
}
.age-modal__orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(50px);
}
.age-modal__orb--1 {
  width: 180px; height: 180px;
  top: -60px; left: -40px;
  background: radial-gradient(circle, rgba(245,166,35,0.14) 0%, transparent 70%);
}
.age-modal__orb--2 {
  width: 120px; height: 120px;
  bottom: -30px; right: -20px;
  background: radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%);
}
.age-modal__kamon {
  position: absolute;
  top: 14px; right: 18px;
  font-family: 'Noto Serif JP', 'Yu Mincho', serif;
  font-size: 11px;
  letter-spacing: .15em;
  color: var(--or-gold, #F5A623);
  opacity: 0.15;
  pointer-events: none;
  line-height: 1;
}
.age-modal__top { text-align: center; position: relative; z-index: 1; }
.age-modal__badge {
  display: inline-block;
  font-family: var(--font-sans, 'Syne', sans-serif);
  font-size: 7px;
  letter-spacing: .55em;
  text-transform: uppercase;
  color: var(--or-gold, #F5A623);
  opacity: .7;
  margin-bottom: 12px;
}
.age-modal__titulo {
  font-family: var(--font-serif, 'Playfair Display', serif);
  font-size: 26px;
  font-weight: 300;
  font-style: italic;
  color: var(--or-silk, #ede8e0);
  line-height: 1.25;
  margin: 0 0 14px;
}
.age-modal__titulo em { color: var(--or-gold, #F5A623); font-style: italic; }
.age-modal__desc {
  font-family: var(--font-sans, 'Syne', sans-serif);
  font-size: 11px;
  font-weight: 300;
  color: var(--or-silk-2, rgba(237,232,224,0.50));
  line-height: 1.75;
  letter-spacing: .03em;
  max-width: 280px;
  margin: 0 auto;
}
.age-modal__icon {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: var(--or-gold, #F5A623);
  opacity: .55;
}
.age-modal__icon-num {
  font-family: var(--font-sans, 'Syne', sans-serif);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .35em;
  color: var(--or-gold, #F5A623);
}
.age-modal__btns {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  position: relative;
  z-index: 1;
}
.age-modal__confirmar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px;
  background: transparent;
  border: 0.5px solid var(--or-gold, #F5A623);
  font-family: var(--font-sans, 'Syne', sans-serif);
  font-size: 8px;
  font-weight: 600;
  letter-spacing: .5em;
  text-transform: uppercase;
  color: var(--or-gold, #F5A623);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: color .45s;
  z-index: 0;
}
.age-modal__confirmar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--or-gold, #F5A623);
  transform: translateX(-101%) skewX(-8deg);
  transition: transform .55s cubic-bezier(.16,1,.3,1);
  z-index: -1;
}
.age-modal__confirmar:hover::before { transform: translateX(0) skewX(0deg); }
.age-modal__confirmar:hover { color: #06060d; }
.age-modal__recusar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 11px;
  background: transparent;
  border: 0.5px solid var(--or-hair-2, rgba(237,232,224,0.07));
  font-family: var(--font-sans, 'Syne', sans-serif);
  font-size: 8px;
  letter-spacing: .3em;
  text-transform: uppercase;
  color: var(--or-silk-3, rgba(237,232,224,0.22));
  cursor: pointer;
  transition: all .25s;
}
.age-modal__recusar:hover {
  border-color: rgba(239,68,68,.5);
  color: rgba(239,68,68,.7);
  background: rgba(239,68,68,.04);
}
.age-modal__rodape {
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-sans, 'Syne', sans-serif);
  font-size: 8px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--or-silk-4, rgba(237,232,224,0.10));
  position: relative;
  z-index: 1;
}
.age-modal__rodape svg { color: var(--or-gold, #F5A623); opacity: .4; flex-shrink: 0; }
</style>

<style>
/* ════════════════════════════════════════════════════════
   NOIR & OR — ESTILOS GLOBAIS
════════════════════════════════════════════════════════ */
:root {
  --or-void:#06060d;--or-deep:#09090f;--or-surface:#0c0c18;
  --or-silk:#ede8e0;--or-silk-2:rgba(237,232,224,0.50);
  --or-silk-3:rgba(237,232,224,0.22);--or-silk-4:rgba(237,232,224,0.10);
  --or-gold:#F5A623;--or-gold-2:rgba(245,166,35,0.14);
  --or-gold-3:rgba(245,166,35,0.06);--or-hair:rgba(245,166,35,0.12);
  --or-hair-2:rgba(237,232,224,0.07);--or-easing:cubic-bezier(0.16,1,0.30,1);
  --or-font-num:'DM Mono','Courier New',monospace;
}
body.light-mode {
  --or-gold:#3D6CBF;--or-gold-2:rgba(61,108,191,0.14);--or-gold-3:rgba(61,108,191,0.06);
  --or-hair:rgba(61,108,191,0.12);--or-deep:#ffffff;--or-void:#f0f4fa;
  --or-silk:#0a0a1e;--or-silk-2:rgba(10,10,30,0.60);--or-silk-3:rgba(10,10,30,0.35);
  --or-silk-4:rgba(10,10,30,0.18);--or-hair-2:rgba(10,10,30,0.08);
}
body.gamer-mode { --or-gold:#C85014;--or-gold-2:rgba(200,80,20,0.14);--or-gold-3:rgba(200,80,20,0.06);--or-hair:rgba(200,80,20,0.12); }

/* ── PANEL ORNAMENTOS ── */
.or-panel-border { position:absolute;top:0;left:0;right:0;height:0.5px;background:linear-gradient(90deg,transparent,var(--or-gold) 20%,rgba(245,166,35,0.8) 50%,var(--or-gold) 80%,transparent);opacity:0.7;z-index:2;pointer-events:none; }
.or-panel-kamon { position:absolute;top:14px;right:16px;font-family:'Noto Serif JP','Yu Mincho','Hiragino Mincho Pro',serif;font-size:9px;letter-spacing:.15em;color:var(--or-gold);opacity:0.18;pointer-events:none;z-index:1;line-height:1; }
.or-panel-kamon--pref { top:12px;right:14px;font-size:8px; }
.or-spinner-sm { width:10px;height:10px;border:1px solid rgba(245,166,35,.25);border-top-color:var(--or-gold);border-radius:50%;animation:or-spin .8s linear infinite;flex-shrink:0; }
@keyframes or-spin { to{transform:rotate(360deg)} }

/* ── PREF PANEL ── */
.pref-panel { position:fixed;top:calc(var(--navbar-h,68px) + 32px);right:60px;width:320px;background:var(--or-deep);border:0.5px solid var(--or-hair);box-shadow:0 20px 60px rgba(0,0,0,0.6);z-index:9999;overflow:hidden;max-height:calc(100vh - 120px);display:flex;flex-direction:column; }
.pref-header { display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:0.5px solid var(--or-hair-2);position:relative;z-index:1;flex-shrink:0; }
.pref-header-inner { display:flex;align-items:center;gap:10px; }
.pref-kanji { display:flex;align-items:center;color:var(--or-gold);opacity:.5; }
.pref-title { font-family:var(--font-sans);font-size:8px;letter-spacing:.45em;text-transform:uppercase;color:var(--or-gold); }
.pref-close { background:none;border:none;color:var(--or-silk-3);cursor:pointer;display:flex;align-items:center;justify-content:center;width:22px;height:22px;transition:color .2s,transform .3s; }
.pref-close:hover { color:var(--or-gold);transform:rotate(90deg); }
.pref-body { padding:16px;display:flex;flex-direction:column;gap:16px;position:relative;z-index:1;overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--or-hair) transparent; }
.pref-group { border:none;padding:0;margin:0; }
.pref-group__label { font-family:var(--font-sans);font-size:7px;letter-spacing:.5em;text-transform:uppercase;color:var(--or-silk-3);display:flex;align-items:center;gap:8px;margin-bottom:10px; }
.pref-group__label svg { color:var(--or-gold);opacity:.4;flex-shrink:0; }
.pref-row { display:flex;gap:6px;flex-wrap:wrap; }
.pref-row--3 { display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px; }
.pref-realm { display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;background:none;border:0.5px solid var(--or-hair-2);cursor:pointer;transition:all .3s;position:relative;overflow:hidden;margin-bottom:6px; }
.pref-realm:last-child { margin-bottom:0; }
.pref-realm::before { content:'';position:absolute;left:0;top:0;bottom:0;width:0;background:var(--realm-color,var(--or-gold));opacity:.07;transition:width .4s cubic-bezier(.16,1,.3,1); }
.pref-realm:hover::before,.pref-realm.is-active::before { width:100%; }
.pref-realm:hover { border-color:var(--realm-color,var(--or-gold)); }
.pref-realm.is-active { border-color:var(--realm-color,var(--or-gold)); }
.pref-realm[data-realm="celestial"]{--realm-color:#F5A623;}
.pref-realm[data-realm="autumn"]{--realm-color:#3D6CBF;}
.pref-realm[data-realm="ghost"]{--realm-color:#C85014;}
.pref-realm__orb { width:10px;height:10px;border-radius:50%;flex-shrink:0;position:relative;z-index:1; }
.pref-realm__orb--celestial{background:radial-gradient(circle at 35% 35%,#FFD97D,#F5A623);box-shadow:0 0 8px 2px rgba(245,166,35,0.5);}
.pref-realm__orb--autumn{background:radial-gradient(circle at 35% 35%,#90BAFF,#3D6CBF);box-shadow:0 0 8px 2px rgba(61,108,191,0.5);}
.pref-realm__orb--ghost{background:radial-gradient(circle at 35% 35%,#FF9966,#C85014);box-shadow:0 0 8px 2px rgba(200,80,20,0.5);}
.pref-realm__body { flex:1;text-align:left;position:relative;z-index:1; }
.pref-realm__name { display:block;font-family:var(--font-sans);font-size:10px;font-weight:600;letter-spacing:.1em;color:var(--or-silk); }
.pref-realm__sub { display:block;font-family:var(--font-sans);font-size:8px;letter-spacing:.15em;color:var(--or-silk-3);margin-top:1px; }
.pref-realm.is-active .pref-realm__name { color:var(--realm-color,var(--or-gold)); }
.pref-realm__kanji { font-family:'Noto Serif JP',serif;font-size:16px;color:var(--realm-color,var(--or-gold));opacity:.2;line-height:1;position:relative;z-index:1;transition:opacity .3s; }
.pref-realm.is-active .pref-realm__kanji,.pref-realm:hover .pref-realm__kanji { opacity:.5; }
.pref-font { display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:10px 6px;background:none;border:0.5px solid var(--or-hair-2);cursor:pointer;transition:all .25s; }
.pref-font:hover,.pref-font.is-active { border-color:var(--or-gold);background:var(--or-gold-3); }
.pref-font__lbl { font-family:var(--font-sans);font-size:7px;letter-spacing:.2em;text-transform:uppercase;color:var(--or-silk-3); }
.pref-watermark { text-align:center;padding:6px 0 2px;font-family:var(--font-serif,'Playfair Display',serif);font-size:8px;font-style:italic;letter-spacing:.55em;text-transform:uppercase;color:var(--or-gold);opacity:.12;line-height:1.6;user-select:none; }

.pref-toggle {
  display:flex; align-items:center; gap:10px;
  width:100%; padding:8px 10px;
  background:none; border:0.5px solid var(--or-hair-2);
  cursor:pointer; transition:border-color .25s;
}
.pref-toggle:hover { border-color:var(--or-gold); }
.pref-toggle.is-active { border-color:var(--or-gold); background:var(--or-gold-3); }
.pref-toggle__track {
  width:28px; height:14px; border-radius:7px;
  background:var(--or-hair-2); border:0.5px solid var(--or-hair);
  display:flex; align-items:center; padding:0 2px;
  transition:background .25s; flex-shrink:0;
}
.pref-toggle.is-active .pref-toggle__track { background:var(--or-gold-2); border-color:var(--or-gold); }
.pref-toggle__thumb {
  width:10px; height:10px; border-radius:50%;
  background:var(--or-silk-3);
  transition:transform .25s cubic-bezier(.16,1,.3,1), background .25s;
}
.pref-toggle.is-active .pref-toggle__thumb { transform:translateX(14px); background:var(--or-gold); }
.pref-toggle__lbl { font-family:var(--font-sans); font-size:10px; letter-spacing:.1em; color:var(--or-silk-2); }
.pref-toggle.is-active .pref-toggle__lbl { color:var(--or-gold); }

/* ── TOAST ── */
.toast-container { position:fixed;bottom:24px;right:24px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none; }
.toast { display:flex;align-items:flex-start;gap:12px;min-width:280px;max-width:340px;background:var(--or-deep);border:0.5px solid var(--or-hair);box-shadow:0 12px 40px rgba(0,0,0,0.55);padding:14px;position:relative;overflow:hidden;pointer-events:auto; }
.toast::before { content:'';position:absolute;top:0;left:0;right:0;height:0.5px;background:linear-gradient(90deg,transparent,var(--toast-accent,var(--or-gold)),transparent);opacity:.7; }
.toast--success{--toast-accent:#22c55e;}.toast--error{--toast-accent:#ef4444;}.toast--info{--toast-accent:var(--or-gold);}
.toast__icon { width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--toast-accent,var(--or-gold)) 15%,transparent);color:var(--toast-accent,var(--or-gold));flex-shrink:0; }
.toast__body { flex:1;min-width:0; }
.toast__title { display:block;font-family:var(--font-sans);font-size:11px;font-weight:600;letter-spacing:.06em;color:var(--or-silk);margin-bottom:2px; }
.toast__msg { display:block;font-family:var(--font-sans);font-size:10px;font-weight:300;letter-spacing:.04em;color:var(--or-silk-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.toast__close { background:none;border:none;color:var(--or-silk-4);cursor:pointer;display:flex;align-items:center;justify-content:center;width:18px;height:18px;flex-shrink:0;transition:color .2s; }
.toast__close:hover { color:var(--or-gold); }
.toast__progress { position:absolute;bottom:0;left:0;height:1px;background:var(--toast-accent,var(--or-gold));opacity:.5;width:100%;transform-origin:left;animation:toast-progress linear 1 forwards; }
@keyframes toast-progress { from{transform:scaleX(1)}to{transform:scaleX(0)} }

/* ═══════════════════════════════════════════════════
   AUTH MODAL
═══════════════════════════════════════════════════ */
.auth-modal { position:relative;display:grid;grid-template-columns:280px 1fr;width:100%;max-width:860px;height:min(92vh,680px);overflow:hidden;border:0.5px solid var(--or-hair);box-shadow:0 0 0 0.5px var(--or-hair),0 60px 120px rgba(0,0,0,.85);animation:or-modal-in 0.65s var(--or-easing) both; }
@keyframes or-modal-in { from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)} }

/* ── LATERAL ESQUERDA ── */
.auth-orb { position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(60px); }
.auth-orb--1 { width:220px;height:220px;top:-60px;left:-60px;background:radial-gradient(circle,rgba(245,166,35,0.18) 0%,transparent 70%);animation:orb-drift-1 8s ease-in-out infinite; }
.auth-orb--2 { width:160px;height:160px;bottom:40px;right:-40px;background:radial-gradient(circle,rgba(245,166,35,0.10) 0%,transparent 70%);animation:orb-drift-2 11s ease-in-out infinite; }
.auth-orb--3 { width:100px;height:100px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(212,175,55,0.08) 0%,transparent 70%);animation:orb-drift-3 14s ease-in-out infinite; }
@keyframes orb-drift-1 { 0%,100%{transform:translate(0,0)}50%{transform:translate(20px,30px)} }
@keyframes orb-drift-2 { 0%,100%{transform:translate(0,0)}50%{transform:translate(-15px,-20px)} }
@keyframes orb-drift-3 { 0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.4)} }

.auth-esq { background:var(--or-void);padding:40px 28px;display:flex;flex-direction:column;border-right:0.5px solid var(--or-hair);position:relative;overflow:hidden; }
.auth-esq::after { content:'';position:absolute;top:0;bottom:0;right:-0.5px;width:0.5px;background:linear-gradient(180deg,transparent 0%,var(--cor-secundaria) 20%,var(--cor-primaria) 50%,var(--cor-secundaria) 80%,transparent 100%);opacity:0.6; }
.auth-brand { font-family:var(--font-serif);font-size:10px;letter-spacing:.55em;text-transform:uppercase;color:var(--or-gold);display:flex;align-items:center;gap:10px;margin-bottom:36px;position:relative;z-index:1; }
.auth-brand__icon { font-size:16px;opacity:.8;color:var(--or-gold); }
.auth-brand em { font-style:italic;opacity:.65;color:var(--or-gold); }
.auth-copy { position:relative;z-index:1; }
.auth-titulo { font-family:var(--font-serif);font-size:24px;font-weight:300;font-style:italic;color:var(--or-silk);line-height:1.25;margin:0 0 12px; }
.auth-titulo em { font-style:italic;color:var(--or-gold); }
.auth-desc { font-family:var(--font-sans);font-size:10px;font-weight:300;color:var(--or-silk-2);line-height:1.8;letter-spacing:.04em; }
.auth-feats { list-style:none;padding:0;margin:24px 0 0;display:flex;flex-direction:column;gap:10px;position:relative;z-index:1; }
.auth-feats li { display:flex;align-items:center;gap:12px;font-family:var(--font-sans);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--or-silk-3); }
.auth-feats li span { font-size:5px;color:var(--or-gold);opacity:.7;flex-shrink:0; }

/* Steps list na lateral */
.auth-steps-list { list-style:none;padding:0;margin:24px 0 0;display:flex;flex-direction:column;gap:8px;position:relative;z-index:1; }
.auth-step { display:flex;align-items:center;gap:12px;font-family:var(--font-sans);font-size:10px;letter-spacing:.1em;color:var(--or-silk-3);transition:color .3s; }
.auth-step__ico { width:20px;height:20px;border-radius:50%;border:0.5px solid var(--or-silk-3);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;flex-shrink:0;transition:all .3s; }
.auth-step.is-active { color:var(--or-gold); }
.auth-step.is-active .auth-step__ico { border-color:var(--or-gold);color:var(--or-gold);background:var(--or-gold-3); }
.auth-step.is-done { color:var(--or-silk-2); }
.auth-step.is-done .auth-step__ico { background:var(--or-gold);border-color:var(--or-gold);color:#0A0A0A; }

.auth-watermark { position:absolute;bottom:52px;left:32px;right:32px;font-family:var(--font-serif);font-size:9px;font-weight:300;font-style:italic;letter-spacing:.45em;text-transform:uppercase;line-height:1.8;color:var(--or-gold);opacity:.10;pointer-events:none;z-index:0;text-align:center; }
.auth-ssl { display:flex;align-items:center;gap:8px;margin-top:auto;padding-top:20px;font-family:var(--font-sans);font-size:8px;letter-spacing:.25em;text-transform:uppercase;color:var(--or-silk-4);position:relative;z-index:1; }
.auth-ssl svg { color:var(--or-gold);opacity:.5; }

/* ── LADO DIREITO ── */
.auth-dir { background:var(--or-deep);padding:32px 40px 28px;display:flex;flex-direction:column;position:relative;overflow-y:auto;scrollbar-width:none; }
.auth-dir::-webkit-scrollbar { display:none; }
.auth-dir::before { content:'';position:absolute;top:0;left:0;right:0;height:0.5px;background:linear-gradient(90deg,transparent,var(--cor-secundaria) 10%,var(--cor-primaria) 50%,var(--cor-secundaria) 90%,transparent);opacity:0.55; }
.auth-close { position:absolute;top:16px;right:16px;width:28px;height:28px;background:none;border:0.5px solid var(--or-hair-2);display:flex;align-items:center;justify-content:center;color:var(--or-silk-3);cursor:pointer;transition:all .35s var(--or-easing);z-index:2; }
.auth-close:hover { border-color:var(--or-gold);color:var(--or-gold);transform:rotate(90deg); }
.auth-aviso { display:flex;align-items:center;gap:10px;background:rgba(245,166,35,0.05);border-left:0.5px solid var(--or-gold);padding:10px 14px;margin-bottom:12px;font-family:var(--font-sans);font-size:10px;letter-spacing:.12em;color:var(--or-silk-2); }
.auth-aviso svg { color:var(--or-gold);flex-shrink:0; }
.auth-bloqueado { display:flex;align-items:flex-start;gap:12px;background:rgba(239,68,68,.06);border-left:0.5px solid rgba(239,68,68,.5);padding:12px 14px;margin-bottom:12px; }
.auth-bloqueado svg { color:rgba(239,68,68,.8);flex-shrink:0;margin-top:2px; }
.bloqueado-titulo { font-family:var(--font-sans);font-size:11px;font-weight:600;color:rgba(239,68,68,.9);letter-spacing:.06em;margin-bottom:3px; }
.bloqueado-desc { font-family:var(--font-sans);font-size:10px;color:var(--or-silk-3);line-height:1.5; }
.bloqueado-desc strong { color:rgba(239,68,68,.8);font-weight:700; }
.auth-tentativas { display:flex;align-items:center;gap:10px;padding:8px 14px;margin-bottom:12px;background:rgba(245,166,35,.04);border-left:0.5px solid rgba(245,166,35,.3);font-family:var(--font-sans);font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--or-silk-3); }
.tentativas-dots { display:flex;gap:4px; }
.tentativa-dot { width:8px;height:8px;border:0.5px solid var(--or-gold);background:var(--or-gold);opacity:.7;transition:all .3s; }
.tentativa-dot.used { background:transparent;border-color:rgba(239,68,68,.5);opacity:.4; }
.auth-tabs { display:flex;gap:0;border-bottom:0.5px solid var(--or-hair-2);margin-bottom:24px; }
.auth-tab { flex:1;background:none;border:none;border-bottom:0.5px solid transparent;margin-bottom:-0.5px;padding:12px 0;font-family:var(--font-sans);font-size:8px;letter-spacing:.4em;text-transform:uppercase;color:var(--or-silk-3);cursor:pointer;transition:all .35s;position:relative; }
.auth-tab:hover { color:var(--or-silk-2); }
.auth-tab.is-active { color:var(--or-gold);border-bottom-color:var(--or-gold); }

/* ── FORMULÁRIO ── */
.auth-form { display:flex;flex-direction:column;flex:1; }
.af-step-header { display:flex;flex-direction:column;gap:4px;margin-bottom:18px; }
.af-step-back { display:inline-flex;align-items:center;gap:6px;background:none;border:none;font-family:var(--font-sans);font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--or-silk-3);cursor:pointer;padding:0;margin-bottom:6px;transition:color .25s; }
.af-step-back:hover { color:var(--or-gold); }
.af-step-badge { font-family:var(--font-sans);font-size:7px;letter-spacing:.55em;text-transform:uppercase;color:var(--or-gold);opacity:.7; }
.af-step-title { font-family:var(--font-serif,'Playfair Display',serif);font-size:15px;font-style:italic;color:var(--or-silk);letter-spacing:.04em; }
.af-duplo { display:grid;grid-template-columns:1fr 1fr;gap:24px; }
.af-campo { display:flex;flex-direction:column;margin-bottom:14px;position:relative; }
.af-campo label { font-family:var(--font-sans);font-size:7px;font-weight:400;letter-spacing:.55em;text-transform:uppercase;color:var(--or-gold);opacity:.7;margin-bottom:8px; }
.af-linha { display:flex;align-items:center;gap:8px;border-bottom:0.5px solid var(--or-hair-2);transition:border-color .4s;padding-bottom:2px;position:relative; }
.af-linha::after { content:'';position:absolute;bottom:-1px;left:50%;transform:translateX(-50%);width:0;height:1.5px;background:var(--or-gold);transition:width .4s cubic-bezier(.16,1,.3,1); }
.af-linha--focus::after { width:100%; }
.af-linha--focus { border-bottom-color:transparent; }
.af-linha--erro { border-bottom-color:rgba(239,68,68,.6)!important; }
.af-linha--ok { border-bottom-color:rgba(34,197,94,.4); }
.af-linha--ok::after { background:#22c55e!important;width:100%; }
.af-linha input { flex:1;background:transparent!important;border:none;outline:none;font-family:var(--font-sans);font-size:13px;font-weight:300;letter-spacing:.04em;color:var(--or-silk)!important;padding:8px 0;caret-color:var(--or-gold);-webkit-text-fill-color:var(--or-silk)!important;transition:background-color 9999s ease-in-out 0s,color 9999s ease-in-out 0s; }
.af-linha input:-webkit-autofill,.af-linha input:-webkit-autofill:hover,.af-linha input:-webkit-autofill:focus { -webkit-box-shadow:0 0 0 1000px var(--or-deep) inset!important;-webkit-text-fill-color:var(--or-gold)!important;caret-color:var(--or-gold); }
.af-linha input::placeholder { color:var(--or-silk-4);font-size:12px;letter-spacing:.08em; }
.af-linha input:disabled { opacity:.4;cursor:not-allowed; }
.af-field-ok { color:#22c55e;font-size:12px;font-weight:700;flex-shrink:0; }
.af-field-err { color:#ef4444;font-size:12px;font-weight:700;flex-shrink:0; }
.af-eye { background:none;border:none;padding:4px;color:var(--or-silk-3);cursor:pointer;display:flex;transition:color .25s; }
.af-eye:hover { color:var(--or-gold); }
.af-campo-erro { font-family:var(--font-sans);font-size:9px;letter-spacing:.1em;color:rgba(239,68,68,.8);margin-top:5px; }
.af-esqueceu { text-align:right;margin:-6px 0 16px; }
.af-esqueceu a { font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--or-silk-3);text-decoration:none;transition:color .25s; }
.af-esqueceu a:hover { color:var(--or-gold); }
.af-forca { display:flex;align-items:center;gap:12px;margin-top:8px; }
.forca-bar { flex:1;height:1px;background:var(--or-hair-2);position:relative; }
.forca-fill { height:100%;position:absolute;left:0;top:0;transition:width .5s,background .5s; }
.forca-txt { font-size:8px;letter-spacing:.3em;text-transform:uppercase;white-space:nowrap;font-family:var(--font-sans);min-width:68px;text-align:right; }
.af-termos { margin-bottom:14px; }
.af-check-row { display:flex;align-items:center;gap:10px;cursor:pointer; }
.af-check-row input[type="checkbox"] { display:none; }
.af-check-box { width:12px;height:12px;flex-shrink:0;border:0.5px solid var(--or-silk-3);display:flex;align-items:center;justify-content:center;background:transparent; }
.af-check-row input:checked ~ .af-check-box { background:var(--or-gold);border-color:var(--or-gold); }
.af-check-row input:checked ~ .af-check-box::after { content:'✓';font-size:8px;color:var(--or-void);font-weight:900;line-height:1; }
.af-check-texto { font-size:10px;letter-spacing:.06em;color:var(--or-silk-3);line-height:1.5; }
.af-link-termos { background:none;border:none;padding:0;color:var(--or-gold);cursor:pointer;font-size:10px;opacity:.8;text-decoration:none;transition:opacity .2s; }
.af-link-termos:hover { opacity:1; }
.termos-drop-enter-active,.termos-drop-leave-active { transition:opacity .3s,max-height .4s;overflow:hidden; }
.termos-drop-enter-from,.termos-drop-leave-to { opacity:0;max-height:0; }
.termos-drop-enter-to,.termos-drop-leave-from { opacity:1;max-height:120px; }
.af-termos-body { margin-top:10px;padding:12px 14px;background:var(--or-gold-3);border-left:0.5px solid var(--or-gold);font-size:10px;font-weight:300;color:var(--or-silk-2);line-height:1.7; }
.af-termos-body a { color:var(--or-gold);text-decoration:none; }
.af-erro { display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.08em;color:rgba(220,100,100,.9);background:rgba(220,80,80,.05);border-left:0.5px solid rgba(220,100,100,.5);padding:8px 12px;margin-bottom:12px;line-height:1.5;font-family:var(--font-sans); }
.af-erro svg { flex-shrink:0; }
.af-submit { position:relative;overflow:hidden;background:transparent;border:0.5px solid var(--or-gold);font-family:var(--font-sans);font-size:8px;font-weight:400;letter-spacing:.55em;text-transform:uppercase;color:var(--or-gold);padding:14px;cursor:pointer;min-height:46px;display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:14px;transition:color .45s;z-index:0;width:100%; }
.af-submit::before { content:'';position:absolute;inset:0;background:var(--or-gold);transform:translateX(-101%) skewX(-8deg);transition:transform .55s cubic-bezier(.16,1,.3,1);z-index:-1; }
.af-submit:hover:not(:disabled)::before { transform:translateX(0) skewX(0deg); }
.af-submit:hover:not(:disabled) { color:var(--or-void); }
.af-submit:disabled { opacity:.28;cursor:not-allowed; }
.af-submit--success { border-color:#22c55e;color:#22c55e; }
.af-submit--success::before { background:#22c55e; }
.af-btn-ghost { background:none;border:0.5px solid var(--or-hair-2);padding:8px 20px;font-family:var(--font-sans);font-size:8px;letter-spacing:.3em;text-transform:uppercase;color:var(--or-silk-3);cursor:pointer;transition:all .25s;display:flex;align-items:center;gap:8px;margin:0 auto; }
.af-btn-ghost:hover { border-color:var(--or-gold);color:var(--or-gold); }
.af-ou { display:flex;align-items:center;gap:16px;margin-bottom:10px; }
.af-ou::before,.af-ou::after { content:'';flex:1;height:0.5px;background:var(--or-hair-2); }
.af-ou span { font-size:8px;letter-spacing:.4em;text-transform:uppercase;color:var(--or-silk-4);white-space:nowrap; }
.af-google-wrap { margin-bottom:12px; }
.af-google { display:flex;align-items:center;justify-content:center;gap:12px;width:100%;border:0.5px solid var(--or-hair-2);padding:11px;cursor:pointer;font-family:var(--font-sans);font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:var(--or-silk-2);background:transparent;transition:all .35s; }
.af-google:hover:not(:disabled) { border-color:var(--or-silk-3);background:var(--or-hair-2);color:var(--or-silk); }
.af-google:disabled { opacity:.3;cursor:not-allowed; }
.af-rodape { font-size:10px;letter-spacing:.1em;color:var(--or-silk-3);text-align:center;margin-top:auto;padding-top:8px; }
.af-rodape button { background:none;border:none;font-size:10px;letter-spacing:.1em;color:var(--or-gold);cursor:pointer;opacity:.8;transition:opacity .25s; }
.af-rodape button:hover { opacity:1; }

/* ════════════════════════════════
   VERIFICAÇÃO DE IDENTIDADE — STEP 2
════════════════════════════════ */
.id-aviso { display:flex;align-items:flex-start;gap:10px;background:rgba(245,166,35,0.04);border-left:0.5px solid rgba(245,166,35,0.4);padding:12px 14px;margin-bottom:8px; }
.id-aviso--info { background:rgba(59,130,246,0.04);border-left-color:rgba(59,130,246,0.4); }
.id-aviso svg { color:var(--or-gold);flex-shrink:0;margin-top:2px; }
.id-aviso--info svg { color:#3b82f6; }
.id-aviso p { font-family:var(--font-sans);font-size:10px;color:var(--or-silk-2);line-height:1.6;letter-spacing:.03em; }
.id-aviso p strong { color:var(--or-gold);font-weight:600; }
.id-upload-area { margin-bottom:12px; }
.id-upload-label { display:flex;align-items:center;gap:6px;font-family:var(--font-sans);font-size:7px;letter-spacing:.5em;text-transform:uppercase;color:var(--or-gold);opacity:.7;margin-bottom:8px; }
.id-upload-box { display:block;border:0.5px dashed var(--or-hair-2);cursor:pointer;position:relative;transition:all .25s;min-height:100px; }
.id-upload-box:hover,.id-upload-box.is-drag { border-color:var(--or-gold);background:var(--or-gold-3); }
.id-upload-box.has-file { border-style:solid;border-color:rgba(34,197,94,.4);background:rgba(34,197,94,.03); }
.id-upload-input { position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;z-index:2; }
.id-upload-input-hidden { position:absolute;width:1px;height:1px;opacity:0;pointer-events:none; }
.id-upload-pc { display:flex;align-items:center;justify-content:center;gap:6px;width:100%;margin-top:6px;background:none;border:0.5px solid var(--or-hair-2);padding:7px;font-family:var(--font-sans);font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:var(--or-silk-3);cursor:pointer;transition:all .25s; }
.id-upload-pc:hover { border-color:var(--or-gold);color:var(--or-gold); }
.id-btn-simular { width:100%; margin:4px 0 8px; }
.id-upload-placeholder { display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:24px;color:var(--or-silk-3); }
.id-upload-placeholder svg { color:var(--or-gold);opacity:.3; }
.id-upload-placeholder span { font-family:var(--font-sans);font-size:11px;letter-spacing:.08em;color:var(--or-silk-3);text-align:center; }
.id-upload-sub { font-size:9px!important;opacity:.6; }
.id-preview { position:relative;width:100%;padding-bottom:56.25%;overflow:hidden; }
.id-preview img { position:absolute;inset:0;width:100%;height:100%;object-fit:cover; }
.id-preview-del { position:absolute;top:8px;right:8px;z-index:3;background:rgba(0,0,0,.6);border:none;color:#fff;width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center;transition:background .2s; }
.id-preview-del:hover { background:rgba(239,68,68,.8); }
.id-preview-ok { position:absolute;bottom:8px;left:8px;z-index:3;background:rgba(34,197,94,.85);color:#fff;font-family:var(--font-sans);font-size:9px;letter-spacing:.15em;text-transform:uppercase;padding:4px 10px; }

/* ════════════════════════════════
   RECONHECIMENTO FACIAL — STEP 3
════════════════════════════════ */
.face-cam-wrap { display:flex;flex-direction:column;align-items:center;gap:12px;margin-bottom:16px; }
.face-cam-frame { position:relative;width:260px;height:300px;background:rgba(0,0,0,.4);overflow:hidden;border:0.5px solid var(--or-hair-2);transition:border-color .3s; }
.face-cam-frame.is-scanning { border-color:var(--or-gold); }
.face-cam-frame.is-ok { border-color:#22c55e; }
.face-cam-frame.is-erro { border-color:#ef4444; }
.face-oval-guide { position:absolute;inset:0;z-index:2;pointer-events:none;color:rgba(245,166,35,0.35); }
.face-oval-guide svg { width:100%;height:100%; }
.face-corner { position:absolute;width:16px;height:16px;z-index:3;pointer-events:none; }
.face-corner--tl { top:8px;left:8px;border-top:1.5px solid var(--or-gold);border-left:1.5px solid var(--or-gold); }
.face-corner--tr { top:8px;right:8px;border-top:1.5px solid var(--or-gold);border-right:1.5px solid var(--or-gold); }
.face-corner--bl { bottom:8px;left:8px;border-bottom:1.5px solid var(--or-gold);border-left:1.5px solid var(--or-gold); }
.face-corner--br { bottom:8px;right:8px;border-bottom:1.5px solid var(--or-gold);border-right:1.5px solid var(--or-gold); }
.face-video { width:100%;height:100%;object-fit:cover;transform:scaleX(-1);position:relative;z-index:1; }
.face-canvas-hidden { position:absolute;top:-9999px;left:-9999px;visibility:hidden; }
.face-preview { position:absolute;inset:0;z-index:4; }
.face-preview img { width:100%;height:100%;object-fit:cover;transform:scaleX(-1); }
.face-preview-ok { position:absolute;bottom:12px;right:12px;width:32px;height:32px;background:#22c55e;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 4px 16px rgba(34,197,94,.5); }
.face-cam-idle { position:absolute;inset:0;z-index:4;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--or-silk-3); }
.face-cam-idle svg { opacity:.3; }
.face-cam-idle span { font-family:var(--font-sans);font-size:10px;letter-spacing:.2em;text-transform:uppercase; }
.face-scan-line { position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--or-gold),transparent);z-index:5;animation:face-scan 1.5s ease-in-out infinite; }
@keyframes face-scan { 0%{top:0;opacity:1}50%{top:calc(100% - 2px);opacity:1}100%{top:0;opacity:0} }
.face-status { text-align:center; }
.face-status-txt { font-family:var(--font-sans);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--or-silk-3);display:flex;align-items:center;gap:8px;justify-content:center; }
.face-status-txt--live { color:var(--or-silk-2); }
.face-status-txt--scan { color:var(--or-gold); }
.face-status-txt--ok { color:#22c55e;font-weight:600; }
.face-status-txt--err { color:#ef4444; }
.face-dot-live { width:6px;height:6px;border-radius:50%;background:#22c55e;animation:dot-pulse 1.2s ease-in-out infinite;flex-shrink:0; }
@keyframes dot-pulse { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.6)} }
.face-dicas { list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:4px; }
.face-dicas li { font-family:var(--font-sans);font-size:9px;letter-spacing:.1em;color:var(--or-silk-3);text-align:center; }
.face-dicas li::before { content:'· ';color:var(--or-gold);opacity:.5; }
.face-btns { display:flex;flex-direction:column;align-items:center;gap:10px;margin-bottom:12px; }
.face-btns .af-submit { width:100%; }

/* Checklist final */
.verif-checklist { background:rgba(34,197,94,.04);border:0.5px solid rgba(34,197,94,.2);padding:14px 16px;margin-top:4px; }
.verif-checklist__titulo { font-family:var(--font-sans);font-size:8px;letter-spacing:.4em;text-transform:uppercase;color:rgba(34,197,94,.7);margin-bottom:10px; }
.verif-checklist ul { list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:7px; }
.verif-item { display:flex;align-items:center;gap:8px;font-family:var(--font-sans);font-size:10px;letter-spacing:.06em;color:var(--or-silk-2); }
.verif-item svg { flex-shrink:0; }
.verif-item--ok { color:rgba(34,197,94,.85); }
.verif-item--ok svg { color:#22c55e; }

/* ════════════════════════════════
   SEARCH PANEL
════════════════════════════════ */
.nb-search-panel { position:absolute;top:calc(100% + 12px);right:-80px;width:340px;background:var(--or-deep);border:0.5px solid var(--or-hair);box-shadow:0 20px 60px rgba(0,0,0,0.6);z-index:9999;overflow:hidden; }
.nb-search-panel .or-panel-kamon { font-size:11px;opacity:.12;top:10px;right:12px; }
.nb-search-label { display:flex;align-items:center;gap:10px;padding:8px 16px;background:rgba(245,166,35,.025);border-bottom:0.5px solid var(--or-hair-2); }
.search-kanji { font-family:'Noto Serif JP',serif;font-size:14px;color:var(--or-gold);opacity:.35;line-height:1; }
.search-label-text { font-family:var(--font-sans);font-size:7px;letter-spacing:.6em;text-transform:uppercase;color:var(--or-silk-3); }
.nb-search-field { display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:0.5px solid var(--or-hair-2);position:relative;z-index:1; }
.nb-search-field svg { color:var(--or-gold);opacity:.6;flex-shrink:0; }
.nb-search-field input { flex:1;background:none;border:none;outline:none;font-family:var(--font-sans);font-size:13px;font-weight:300;color:var(--or-silk);caret-color:var(--or-gold);padding:0;-webkit-text-fill-color:var(--or-silk); }
.nb-search-field input::placeholder { color:var(--or-silk-4);font-size:12px; }
.search-clear { background:none;border:none;color:var(--or-silk-3);cursor:pointer;display:flex;align-items:center;transition:color .2s;padding:2px; }
.search-clear:hover { color:var(--or-gold); }
.nb-search-skeletons { padding:8px 0; }
.search-skeleton { display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:0.5px solid var(--or-hair-2); }
.sk-img { width:40px;height:40px;background:var(--or-hair-2);flex-shrink:0;animation:sk-shimmer 1.4s ease-in-out infinite; }
.sk-lines { flex:1;display:flex;flex-direction:column;gap:6px; }
.sk-line { height:8px;background:var(--or-hair-2);border-radius:2px;animation:sk-shimmer 1.4s ease-in-out infinite; }
.sk-line--name{width:65%;}.sk-line--price{width:30%;animation-delay:.1s;}
@keyframes sk-shimmer { 0%{opacity:.4}50%{opacity:.9}100%{opacity:.4} }
.nb-search-results { max-height:260px;overflow-y:auto; }
.search-result { display:flex;align-items:center;gap:12px;width:100%;padding:11px 16px;background:none;border:none;border-bottom:0.5px solid var(--or-hair-2);cursor:pointer;transition:background .2s;text-align:left;position:relative; }
.search-result::before { content:'';position:absolute;left:0;top:8px;bottom:8px;width:.5px;background:var(--or-gold);opacity:0;transition:opacity .2s; }
.search-result.is-focused,.search-result:hover { background:var(--or-gold-3); }
.search-result.is-focused::before,.search-result:hover::before { opacity:.7; }
.search-result__img { width:40px;height:40px;background:rgba(245,166,35,0.04);border:0.5px solid var(--or-hair-2);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0; }
.search-result__img img { width:100%;height:100%;object-fit:cover; }
.search-result__nome { display:block;font-family:var(--font-sans);font-size:12px;color:var(--or-silk);white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.search-result__preco { display:block;font-family:var(--or-font-num);font-size:10px;color:var(--or-gold);opacity:.8; }
.search-empty { padding:20px 16px;font-family:var(--font-sans);font-size:11px;letter-spacing:.08em;color:var(--or-silk-3);text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px; }
.search-empty-kanji { font-family:'Noto Serif JP',serif;font-size:24px;color:var(--or-gold);opacity:.2;line-height:1; }
.nb-search-footer { padding:8px 16px;border-top:0.5px solid var(--or-hair-2);font-family:var(--font-sans);font-size:8px;letter-spacing:.15em;color:var(--or-silk-4);display:flex;justify-content:center;gap:4px;flex-wrap:wrap; }
.nb-search-footer span { font-family:var(--or-font-num);color:var(--or-gold);opacity:.5;padding:0 3px;background:var(--or-hair-2);border-radius:2px; }

/* ════════════════════════════════
   DRAWER CARRINHO
════════════════════════════════ */
.drawer-overlay { position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,.75);-webkit-backdrop-filter:blur(8px) saturate(.8);backdrop-filter:blur(8px) saturate(.8);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .5s var(--or-easing),visibility .5s; }
.drawer-overlay.is-open { opacity:1;visibility:visible;pointer-events:auto; }
.drawer { position:absolute;top:0;right:0;bottom:0;width:400px;background:var(--or-deep);border-left:0.5px solid var(--or-hair);display:flex;flex-direction:column;transform:translateX(100%);transition:transform .65s var(--or-easing);overflow:hidden; }
.drawer-overlay.is-open .drawer { transform:translateX(0); }
.drawer-kamon { position:absolute;bottom:100px;right:28px;font-family:'Noto Serif JP',serif;font-size:56px;color:var(--or-gold);opacity:.04;pointer-events:none;z-index:0;line-height:1; }
.drawer__header { display:flex;justify-content:space-between;align-items:center;padding:24px 32px 16px;border-bottom:0.5px solid var(--or-hair-2);flex-shrink:0;position:relative;z-index:1; }
.drawer__header::before { content:'';position:absolute;top:0;left:0;right:0;height:0.5px;background:linear-gradient(90deg,transparent,var(--cor-secundaria) 20%,var(--cor-primaria) 50%,var(--cor-secundaria) 80%,transparent);opacity:.65; }
.drawer__header__titles { display:flex;align-items:center;gap:12px; }
.drawer__brasilia { display:flex;align-items:center;gap:5px;margin-right:12px;font-family:'DM Mono','Courier New',monospace;font-size:10px;color:var(--or-silk-3); }
.drawer__brasilia svg { color:var(--or-gold);opacity:.45;flex-shrink:0; }
.drawer__brasilia-label { font-family:var(--font-sans);font-size:7px;letter-spacing:.3em;text-transform:uppercase;color:var(--or-silk-4);margin-left:2px; }
.drawer__kanji { font-family:'Noto Serif JP',serif;font-size:22px;color:var(--or-gold);opacity:.25;line-height:1;flex-shrink:0; }
.drawer__titulo { display:block;font-family:var(--font-serif,'Playfair Display',serif);font-size:11px;font-weight:400;font-style:italic;letter-spacing:.45em;text-transform:uppercase;color:var(--or-silk); }
.drawer__qtd { display:block;font-family:var(--or-font-num);font-size:9px;letter-spacing:.2em;color:var(--or-gold);opacity:.7;margin-top:2px; }
.drawer__close { width:28px;height:28px;background:none;border:0.5px solid var(--or-hair-2);display:flex;align-items:center;justify-content:center;color:var(--or-silk-3);cursor:pointer;transition:all .35s;flex-shrink:0; }
.drawer__close:hover { border-color:var(--or-gold);color:var(--or-gold);transform:rotate(90deg); }
.drawer__tabs { display:flex;border-bottom:0.5px solid var(--or-hair-2);flex-shrink:0;position:relative;z-index:1; }
.drawer__tab { flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:11px 8px;background:none;border:none;border-bottom:0.5px solid transparent;margin-bottom:-0.5px;font-family:var(--font-sans);font-size:8px;letter-spacing:.28em;text-transform:uppercase;color:var(--or-silk-3);cursor:pointer;transition:all .3s; }
.drawer__tab.is-active { color:var(--or-gold);border-bottom-color:var(--or-gold); }
.drawer__tab-badge { background:var(--or-gold);color:var(--or-void);font-family:var(--or-font-num);font-size:8px;font-weight:900;min-width:15px;height:15px;border-radius:2px;display:flex;align-items:center;justify-content:center;padding:0 3px; }
.drawer__tab-badge--saved { background:rgba(245,166,35,0.2);color:var(--or-gold); }
.drawer__items { flex:1;overflow-y:auto;padding:4px 0;display:flex;flex-direction:column;scrollbar-width:thin;scrollbar-color:var(--or-hair) transparent;position:relative;z-index:1; }
.drawer__vazio { flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:52px 40px;text-align:center; }
.drawer__vazio__ico { width:64px;height:64px;border:0.5px solid var(--or-hair);display:flex;align-items:center;justify-content:center;position:relative; }
.drawer__vazio__ico::before { content:'';position:absolute;top:-1px;left:-1px;width:10px;height:10px;border-top:.5px solid var(--or-gold);border-left:.5px solid var(--or-gold); }
.drawer__vazio__ico::after  { content:'';position:absolute;bottom:-1px;right:-1px;width:10px;height:10px;border-bottom:.5px solid var(--or-gold);border-right:.5px solid var(--or-gold); }
.vazio-kanji { font-family:'Noto Serif JP',serif;font-size:28px;color:var(--or-gold);opacity:.35;line-height:1; }
.drawer__vazio__titulo { font-family:var(--font-sans);font-size:9px;letter-spacing:.4em;text-transform:uppercase;color:var(--or-silk-2); }
.drawer__vazio__sub { font-family:var(--font-sans);font-size:11px;font-weight:300;color:var(--or-silk-3);line-height:1.7;max-width:200px; }
.drawer__vazio__cta { display:inline-flex;align-items:center;gap:10px;background:transparent;border:0.5px solid var(--or-gold);padding:10px 24px;font-family:var(--font-sans);font-size:8px;letter-spacing:.45em;text-transform:uppercase;color:var(--or-gold);cursor:pointer;transition:all .45s var(--or-easing);position:relative;overflow:hidden; }
.drawer__vazio__cta::before { content:'';position:absolute;inset:0;background:var(--or-gold);transform:scaleX(0);transform-origin:left;transition:transform .5s var(--or-easing);z-index:-1; }
.drawer__vazio__cta:hover::before { transform:scaleX(1); }
.drawer__vazio__cta:hover { color:var(--or-void); }
.di { display:grid;grid-template-columns:28px 60px 1fr auto;gap:12px;padding:16px 32px;border-bottom:0.5px solid var(--or-hair-2);background:transparent;align-items:start;transition:background .3s;position:relative; }
.di:first-child { border-top:0.5px solid var(--or-hair-2); }
.di:hover { background:var(--or-gold-3); }
.di--saved { opacity:.85; }
.di__num { font-family:'Noto Serif JP',serif;font-size:12px;color:var(--or-gold);opacity:.25;line-height:1;align-self:center;text-align:center; }
.di__img { width:60px;height:60px;background:rgba(245,166,35,.03);overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:0.5px solid var(--or-hair-2); }
.di__img img { width:100%;height:100%;object-fit:cover; }
.di__img__placeholder { color:var(--or-silk-3); }
.di__info { display:flex;flex-direction:column;gap:4px;min-width:0; }
.di__cat { font-size:7px;letter-spacing:.5em;text-transform:uppercase;color:var(--or-gold);opacity:.65;font-family:var(--font-sans); }
.di__nome { font-size:12px;font-weight:300;letter-spacing:.06em;color:var(--or-silk);font-family:var(--font-sans);line-height:1.4; }
.di__foot { display:flex;align-items:center;justify-content:space-between;margin-top:10px; }
.di__qty { display:flex;align-items:center;border:0.5px solid var(--or-hair-2); }
.di__qty button { background:none;border:none;color:var(--or-silk-2);width:22px;height:22px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .25s;line-height:1; }
.di__qty button:hover { background:var(--or-gold);color:var(--or-void); }
.di__qty span { font-family:var(--or-font-num);font-size:10px;color:var(--or-silk);min-width:28px;text-align:center;height:22px;display:flex;align-items:center;justify-content:center;border-left:0.5px solid var(--or-hair-2);border-right:0.5px solid var(--or-hair-2); }
.di__preco { font-family:var(--or-font-num);font-size:11px;color:var(--or-gold); }
.di__remover { background:none;border:none;color:var(--or-silk-4);cursor:pointer;padding:2px;display:flex;transition:color .25s;align-self:flex-start;margin-top:2px; }
.di__remover:hover { color:rgba(220,80,80,.7); }
.di__mover { display:inline-flex;align-items:center;gap:5px;background:none;border:none;padding:0;margin-top:0;font-family:var(--font-sans);font-size:8px;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:color .25s;color:var(--or-gold);opacity:.7; }
.di__mover:hover { opacity:1; }
.di__actions { display:flex; gap:10px; margin-top:8px; flex-wrap:wrap; }
.di__action { display:flex; align-items:center; gap:4px; background:none; border:none; padding:0; cursor:pointer; font-family:var(--font-sans); font-size:8px; letter-spacing:.15em; text-transform:uppercase; color:var(--or-silk-3); transition:color .2s; }
.di__action:hover { color:var(--or-gold); }
.drawer__footer { padding:18px 32px 26px;border-top:0.5px solid var(--or-hair-2);flex-shrink:0;background:var(--or-void);position:relative;z-index:1; }
.drawer__cupom { margin-bottom:14px; }
.cupom-row { display:flex; gap:8px; }
.cupom-input { flex:1; background:transparent; border:0.5px solid var(--or-hair-2); padding:9px 12px; font-family:var(--font-sans); font-size:11px; color:var(--or-silk); outline:none; transition:border-color .25s; }
.cupom-input:focus { border-color:var(--or-gold); }
.cupom-input::placeholder { color:var(--or-silk-4); }
.cupom-btn { background:none; border:0.5px solid var(--or-gold); color:var(--or-gold); padding:0 16px; font-family:var(--font-sans); font-size:8px; letter-spacing:.2em; text-transform:uppercase; cursor:pointer; transition:all .25s; display:flex; align-items:center; justify-content:center; }
.cupom-btn:hover:not(:disabled) { background:var(--or-gold); color:var(--or-void); }
.cupom-btn:disabled { opacity:.4; cursor:not-allowed; }
.cupom-aplicado { display:flex; align-items:center; justify-content:space-between; gap:8px; background:rgba(34,197,94,.06); border:0.5px solid rgba(34,197,94,.3); padding:8px 12px; }
.cupom-aplicado__txt { display:flex; align-items:center; gap:7px; font-family:var(--font-sans); font-size:10px; color:rgba(34,197,94,.9); }
.cupom-aplicado__txt svg { flex-shrink:0; }
.cupom-aplicado__remover { background:none; border:none; color:rgba(34,197,94,.6); cursor:pointer; font-size:10px; }
.cupom-erro { font-family:var(--font-sans); font-size:9px; color:rgba(239,68,68,.8); margin-top:6px; }
.drawer__totais { margin-bottom:14px; }
.dt-row { display:flex;justify-content:space-between;align-items:center;font-family:var(--font-sans);font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:var(--or-silk-3);margin-bottom:8px;padding-bottom:8px; }
.dt-row span:last-child { font-family:var(--or-font-num);letter-spacing:.08em;text-transform:none;font-size:14px;color:var(--or-gold); }
.dt-row--total span:last-child { font-size:16px!important;font-weight:600; }
.drawer__checkout { width:100%;display:flex;align-items:center;justify-content:center;gap:12px;background:transparent;color:var(--or-gold);font-family:var(--font-sans);font-size:8px;letter-spacing:.55em;text-transform:uppercase;padding:14px;border:0.5px solid var(--or-gold);cursor:pointer;margin-bottom:10px;transition:color .45s;position:relative;overflow:hidden;z-index:0; }
.drawer__checkout::before { content:'';position:absolute;inset:0;background:var(--or-gold);transform:scaleX(0);transform-origin:left;transition:transform .55s var(--or-easing);z-index:-1; }
.drawer__checkout:hover:not(:disabled)::before { transform:scaleX(1); }
.drawer__checkout:hover:not(:disabled) { color:var(--or-void); }
.drawer__checkout:disabled { opacity:.20;cursor:not-allowed;border-color:var(--or-hair); }

/* ════════════════════════════════
   SIDEBAR MOBILE
════════════════════════════════ */
.sb-overlay { position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.82);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);display:flex; }
.sb { width:310px;height:100%;background:var(--or-deep);border-right:0.5px solid var(--or-hair);display:flex;flex-direction:column;overflow-y:auto;scrollbar-width:none;position:relative; }
.sb::-webkit-scrollbar { display:none; }
.sb-kamon { position:absolute;bottom:80px;right:16px;font-family:'Noto Serif JP',serif;font-size:52px;color:var(--or-gold);opacity:.04;pointer-events:none;z-index:0;line-height:1; }
.sb__head { display:flex;justify-content:space-between;align-items:center;padding:20px 20px 16px;border-bottom:0.5px solid var(--or-hair-2);flex-shrink:0;position:relative;z-index:1; }
.sb__close { width:28px;height:28px;background:none;border:0.5px solid var(--or-hair-2);display:flex;align-items:center;justify-content:center;color:var(--or-silk-3);cursor:pointer;transition:all .3s; }
.sb__close:hover { border-color:var(--or-gold);color:var(--or-gold);transform:rotate(90deg); }
.sb__brand { display:flex;align-items:center;gap:8px;text-decoration:none; }
.sb__brand__mark { width:22px;height:22px;flex-shrink:0;border-radius:50%;border:1.5px solid rgba(245,166,35,0.4);display:flex;align-items:center;justify-content:center; }
.sb__brand__mark::before { content:'⊕';color:var(--cor-primaria);font-size:10px;line-height:1; }
.sb__brand__txt { font-family:var(--font-serif);font-size:13px;font-style:italic;letter-spacing:0.14em;color:var(--cor-texto); }
.sb__brand__txt em { color:var(--cor-primaria);font-style:normal; }
.sb__links { flex:1;padding:12px 0;display:flex;flex-direction:column;gap:1px;position:relative;z-index:1; }
.sb__link { display:flex;align-items:center;gap:12px;padding:12px 20px;font-family:var(--font-sans);font-size:13px;color:var(--or-silk-2);text-decoration:none;cursor:pointer;background:none;border:none;width:100%;text-align:left;transition:all .2s; }
.sb__link:hover { color:var(--or-silk);background:var(--or-gold-3);padding-left:26px; }
.sb__link--gamer { color:var(--cor-primaria)!important; }
.sb__link--admin { color:var(--cor-secundaria)!important; }
.sb__link--cta { color:var(--or-gold)!important;font-weight:600; }
.sb__link--sair { color:rgba(239,68,68,.65)!important; }
.sb-fade-enter-active,.sb-fade-leave-active { transition:opacity .35s; }
.sb-fade-enter-from,.sb-fade-leave-to { opacity:0; }

/* ── RESPONSIVO GLOBAL ── */
@media (max-width:768px) {
  .auth-modal { grid-template-columns:1fr;max-width:100%;height:95dvh;margin:0; }
  .auth-esq { display:none; }
  .auth-dir { padding:24px 20px; }
  .af-duplo { grid-template-columns:1fr;gap:0; }
  .drawer { width:100%; }
  .di { padding:14px 20px;grid-template-columns:22px 52px 1fr auto;gap:10px; }
  .drawer__header { padding:20px 20px 14px; }
  .drawer__footer { padding:14px 20px 22px; }
  .pref-panel { right:16px;left:16px;width:auto;top:calc(var(--navbar-h,48px) + 12px); }
  .nb-search-panel { right:-40px;width:calc(100vw - 32px);max-width:340px; }
  .toast-container { bottom:16px;right:16px;left:16px; }
  .toast { min-width:unset;max-width:100%; }
  .face-cam-frame { width:220px;height:260px; }
}
body.light-mode .af-linha input:-webkit-autofill { -webkit-box-shadow:0 0 0 1000px #ffffff inset!important;-webkit-text-fill-color:#0a0a1e!important; }
body.light-mode .nb-search-field input:-webkit-autofill { -webkit-box-shadow:0 0 0 1000px #ffffff inset!important;-webkit-text-fill-color:#0a0a1e!important; }
</style>