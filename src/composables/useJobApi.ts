import { useJobManagementStore } from '@/stores/jobManagementStore'
import { useCommonStore } from '@/stores/commonStore'
import { detailJobType, FileDetailsList, JobType } from '@/types/dashboard'
import { storeToRefs } from 'pinia'
import { cloneDeep } from 'lodash'
import JobDetailMock from '../mocks/JobDetailMock.json'

const commonStore = useCommonStore()
const jobManagementStore = useJobManagementStore()
const { saveDetailJob, createJob, deleteJob, setListDetailJob } = jobManagementStore
const { loadingSubmit, loadingDownload } = storeToRefs(commonStore)

export const useJobApi = () => {
  const getJobDetail = async (id: string) => {
    try {
      return new Promise<{ jobName: string; documentType: string }>((resolve) => {
        setTimeout(() => {
          setListDetailJob(cloneDeep(JobDetailMock) as FileDetailsList)
          resolve({
            jobName: 'テストファイルA-1',
            documentType: 'テンプレートA'
          })
        }, 200)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const saveDetailJobApi = async ({ id, data }: { id: number; data: detailJobType[] }) => {
    try {
      loadingSubmit.value = true
      await new Promise<{ id: number; data: detailJobType[] }>((resolve) => {
        setTimeout(() => {
          resolve({ id, data })
        }, 600)
      }).then((data) => {
        saveDetailJob(data.id, data.data)
      })
    } catch (error) {
      console.log(error)
    } finally {
      loadingSubmit.value = false
    }
  }

  const createJobApi = async (data: JobType) => {
    try {
      await new Promise<JobType>((resolve) => {
        setTimeout(() => {
          resolve(data)
        }, 600)
      }).then((data) => {
        createJob(data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteJobApi = async (ids: number[]) => {
    try {
      loadingSubmit.value = true
      await new Promise<number[]>((resolve) => {
        setTimeout(() => {
          resolve(ids)
        }, 600)
      }).then((data) => {
        deleteJob(data)
      })
    } catch (error) {
      console.log(error)
    } finally {
      loadingSubmit.value = false
    }
  }

  const downloadCsvApi = async (typeDownload: string, id: string | string[]) => {
    loadingDownload.value = true
    const csvContent = [
      ['発行日', '2025年01月13日'],
      ['書類番号', 'A123'],
      ['会社名', '株式会社'],
      ['郵便番号', '123 - 456']
    ]
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 600)
      })
      const csvString = csvContent.map((row) => row.join(',')).join('\n')
      const blob = new Blob([csvString], { type: `text/${typeDownload};charset=utf-8;` })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.href = url
      link.setAttribute('download', `data.${typeDownload}`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error during CSV download:', error)
    } finally {
      loadingDownload.value = false
    }
  }
  return {
    getJobDetail,
    saveDetailJobApi,
    downloadCsvApi,
    createJobApi,
    deleteJobApi
  }
}
