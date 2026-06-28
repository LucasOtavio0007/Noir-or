import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'views-politicas': [
            './src/views/PoliticaEntrega.vue',
            './src/views/PoliticaPrivacidade.vue',
            './src/views/PoliticaCookies.vue',
            './src/views/Devolucoes.vue',
            './src/views/Garantia.vue',
            './src/views/TermosCustodia.vue',
          ],
          'views-heavy': [
            './src/views/AdminDashboard.vue',
            './src/views/Configuracoes.vue',
            './src/views/Sobre.vue',
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