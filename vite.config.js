import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./tecnologia/src', import.meta.url)) }
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'views-politicas': [
            './tecnologia/src/views/PoliticaEntrega.vue',
            './tecnologia/src/views/PoliticaPrivacidade.vue',
            './tecnologia/src/views/PoliticaCookies.vue',
            './tecnologia/src/views/Devolucoes.vue',
            './tecnologia/src/views/Garantia.vue',
            './tecnologia/src/views/TermosCustodia.vue',
          ],
          'views-heavy': [
            './tecnologia/src/views/AdminDashboard.vue',
            './tecnologia/src/views/Configuracoes.vue',
            './tecnologia/src/views/Sobre.vue',
            './tecnologia/src/views/Gamer.vue',
            './tecnologia/src/views/Store.vue',
          ],
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: { port: 5173 },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})