import type { JobType, FileDetailsList, DetailJobType, FormFilterJob } from '@/types/dashboard'
import { cloneDeep, remove } from 'lodash'
import { defineStore } from 'pinia'

export const useJobManagementStore = defineStore('job-management', () => {
  const listJob = ref<JobType[]>([])
  const loadingSubmit = ref<boolean>(false)
  const listDetailJob = ref<FileDetailsList>([])
  const formFilterJob = ref<FormFilterJob>({
    keyword: '',
    status: 'all',
    startDate: {
      date: null,
      time: null
    },
    endDate: {
      date: null,
      time: null
    },
    startDate2: {
      date: null,
      time: null
    },
    endDate2: {
      date: null,
      time: null
    }
  })

  const infoDetailJob = ref<{
    jobName: string
    documentType: string
  }>({
    jobName: '',
    documentType: ''
  })

  // action
  const setListDetailJob = (data: FileDetailsList) => {
    listDetailJob.value = cloneDeep(data)
  }

  const setListJob = (data: JobType[]) => {
    listJob.value = cloneDeep(data)
  }

  const deleteJob = (id: number[]) => {
    remove(listJob.value, (job) => id.includes(job.id))
  }
  const createJob = async (data: JobType) => {
    listJob.value = [data, ...listJob.value]
  }

  const saveDetailJob = async (id: number, data: DetailJobType[]) => {
    const jobIndex = listDetailJob.value.findIndex((item) => item.id === id)
    if (jobIndex !== -1) {
      listDetailJob.value[jobIndex] = { ...listDetailJob.value[jobIndex], data: data }
    }
  }

  return {
    listJob,
    formFilterJob,
    infoDetailJob,
    listDetailJob,
    loadingSubmit,
    setListJob,
    deleteJob,
    createJob,
    setListDetailJob,
    saveDetailJob
  }
})
