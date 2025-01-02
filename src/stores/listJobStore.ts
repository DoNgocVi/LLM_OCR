import { FormCompanyType, User } from '@/types/dashboard'
import { cloneDeep, merge, remove } from 'lodash'
import { defineStore } from 'pinia'
import type { FormRegisterUserType, ListJobType } from '@/types/dashboard'

export const useJobManagementStore = defineStore('job-management', () => {
  // Tạo state reactive cho form
  let form = ref<FormCompanyType>({
    company: '',
    id: '123456789',
    planSubscribed: 'Basic',
    postCode: '',
    address: '',
    phoneNumber: '',
    emailAddress: '',
    personName: ''
  })

  const listJob = ref<ListJobType[]>([])
  const loadingDelete = ref<boolean>(false)
  // actions
  const setFormData = (data: Record<string, string>) => {
    form.value = merge({}, form.value, data)
  }

  const setListJob = (data: ListJobType[]) => {
    listJob.value = cloneDeep(data)
  }

  const deleteJob = (id: number[]) => {
    remove(listJob.value, (job) => id.includes(job.id))
  }

  // const createUser = async (data: FormRegisterUserType) => {
  //   console.log(data, 'data')
  //   const newData = {
  //     id: listUser.value.length + 1,
  //     name: data.name || '',
  //     email: data.email || '',
  //     role: data.role === 'admin' ? '管理者' : 'ユーザー'
  //   }
  //   await new Promise((resolve) => {
  //     setTimeout(() => {
  //       listUser.value = [newData, ...listUser.value]
  //       resolve(true)
  //     }, 2000)
  //   })
  // }

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

  return { form, listJob, loadingDelete, setFormData, setListJob, deleteJob }
})
