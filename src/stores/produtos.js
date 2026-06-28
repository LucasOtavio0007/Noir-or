import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api.js'

export const useProdutosStore = defineStore('produtos', () => {
  const todos    = ref([])
  const loading  = ref(false)
  const erro     = ref(null)

  async function fetchProdutos(params = {}) {
    loading.value = true
    erro.value = null
    try {
      const { data } = await api.get('/produtos', { params })
      todos.value = data.produtos
    } catch (e) {
      erro.value = 'Erro ao carregar produtos.'
    } finally { loading.value = false }
  }

  async function recarregar() {
    await fetchProdutos()
  }

  const destaques  = computed(() => todos.value.filter(p => p.destaque))
  const getCat     = (cat) => todos.value.filter(p => p.categoria === cat)
  const categorias = computed(() => [...new Set(todos.value.map(p => p.categoria))].sort())

  return { todos, loading, erro, destaques, categorias, fetchProdutos, getCat, recarregar }
})