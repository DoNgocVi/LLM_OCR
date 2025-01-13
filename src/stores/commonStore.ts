import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useCommonStore = defineStore('common', () => {
  const loadingSubmit = ref<boolean>(false)
  const loadingDownload = ref<boolean>(false)
  const dashboardTitle = ref<string>('ジョブ結果')
  return {
    loadingSubmit,
    loadingDownload,
    dashboardTitle
  }
})
