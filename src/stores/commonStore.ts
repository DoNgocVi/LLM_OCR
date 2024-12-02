import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useCommonStore = defineStore('common', () => {
  const stateLoading = ref<boolean>(false)
  const count = ref<number>(0)
  const doubleCount = computed(() => {
    count.value * 2
  })
  const increment = () => {
    count.value++
  }
  return {
    count,
    stateLoading,
    doubleCount,
    increment
  }
})
