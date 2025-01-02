import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useCommonStore = defineStore('common', () => {
  const loadingDelete = ref<boolean>(false)
  const loadingDownload = ref<boolean>(false)
  return {
    loadingDelete,
    loadingDownload
  }
})
