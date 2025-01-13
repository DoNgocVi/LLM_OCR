import type { JobType, FormRegisterJobType, FileDetailsList, detailJobType } from '@/types/dashboard'
import { FormCompanyType, User } from '@/types/dashboard'
import { cloneDeep, merge, remove } from 'lodash'
import { defineStore } from 'pinia'

export const useJobManagementStore = defineStore('job-management', () => {
  const listJob = ref<JobType[]>([])
  const loadingSubmit = ref<boolean>(false)
  const listDetailJob = ref<FileDetailsList>([])
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
    console.log(data, 'list')
    listJob.value = [data, ...listJob.value]
  }

  const saveDetailJob = async (id: number, data: detailJobType[]) => {
    const jobIndex = listDetailJob.value.findIndex((item) => item.id === id);
    if (jobIndex !== -1) {
      listDetailJob.value[jobIndex] = { ...listDetailJob.value[jobIndex], data: data };
    }
  };

  // const editUser = async (data: FormRegisterUserType) => {
  //   const index = listUser.value.findIndex((user) => user.id === Number(data.id))
  //   const newData = {
  //     id: Number(data.id),
  //     name: data.name || '',
  //     email: data.email || '',
  //     role: data.role === 'admin' ? '管理者' : 'ユーザー'
  //   }
  //   await new Promise((resolve) => {
  //     setTimeout(() => {
  //       listUser.value[index] = newData
  //       resolve(true)
  //     }, 2000)
  //   })
  // }

  return { listJob, listDetailJob, loadingSubmit, setListJob, deleteJob, createJob, setListDetailJob, saveDetailJob }
})
