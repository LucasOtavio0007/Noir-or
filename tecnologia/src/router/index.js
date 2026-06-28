import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/loja', component: () => import('../views/Store.vue') },
  { path: '/produto/:id', name: 'produto', component: () => import('../views/Produto.vue') },
  { path: '/sobre', component: () => import('../views/Sobre.vue') },
  { path: '/contato', component: () => import('../views/Contato.vue') },
  { path: '/redefinir-senha', component: () => import('../views/RedefinirSenha.vue') },
  { path: '/pedido/:id', name: 'pedido-sucesso', component: () => import('../views/PedidoSucesso.vue') },
  { path: '/gamer', component: () => import('../views/Gamer.vue') },

  { path: '/configuracoes', component: () => import('../views/Configuracoes.vue'), meta: { requiresAuth: true } },
  { path: '/admin', component: () => import('../views/AdminDashboard.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/billing', component: () => import('../views/Billing.vue'), meta: { requiresAuth: true } },
  { path: '/suporte', component: () => import('../views/Suporte.vue'), meta: { requiresAuth: true } },

  { path: '/politica-entrega', component: () => import('../views/PoliticaEntrega.vue') },
  { path: '/devolucoes', component: () => import('../views/Devolucoes.vue') },
  { path: '/garantia', component: () => import('../views/Garantia.vue') },
  { path: '/termos-custodia', component: () => import('../views/TermosCustodia.vue') },
  { path: '/politica-privacidade', component: () => import('../views/PoliticaPrivacidade.vue') },
  { path: '/politica-cookies', component: () => import('../views/PoliticaCookies.vue') },

  {
    path: '/:pathMatch(.*)*',
    redirect: (to) => {
      const cleanedPath = to.path
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase()
      return (cleanedPath && cleanedPath !== to.path) ? cleanedPath : '/'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) { next('/'); return }
  if (to.meta.requiresAdmin) {
    const auth = useAuthStore()
    if (!auth.isAdmin) { next('/'); return }
  }
  next()
})

export default router