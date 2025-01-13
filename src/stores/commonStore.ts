import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useCommonStore = defineStore('common', () => {
  const loadingSubmit = ref<boolean>(false)
  const loadingDownload = ref<boolean>(false)
  return {
    loadingSubmit,
    loadingDownload
  }
})
