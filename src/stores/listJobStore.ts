import { FormCompanyType, User } from '@/types/dashboard'
import { cloneDeep, merge, remove } from 'lodash'
import { defineStore } from 'pinia'
import type { ListJobType, FormRegisterJobType } from '@/types/dashboard'

export const useJobManagementStore = defineStore('job-management', () => {
  const listJob = ref<ListJobType[]>([])
  const loadingDelete = ref<boolean>(false)

  // action
  const setListJob = (data: ListJobType[]) => {
    listJob.value = cloneDeep(data)
  }

  const deleteJob = (id: number[]) => {
    remove(listJob.value, (job) => id.includes(job.id))
  }

  const createJob = async (data: FormRegisterJobType) => {
    const newData = {
      id: listJob.value.length + 1,
      jobName: data.name || '',
      status: 'created' as 'created',
      owner: '江戸川コナン',
      createDate: '2024/12/05 12:50',
      updateDate: '2024/12/12 16:50',
      result: true,
    }
    await new Promise((resolve) => {
      setTimeout(() => {
        listJob.value = [newData, ...listJob.value]
        resolve(true)
      }, 2000)
    })
  }

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

  return { listJob, loadingDelete, setListJob, deleteJob, createJob }
})
