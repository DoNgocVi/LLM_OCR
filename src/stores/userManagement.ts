import { FormCompanyType, User } from '@/types/dashboard'
import { cloneDeep, merge, remove } from 'lodash'
import { defineStore } from 'pinia'
import type { FormRegisterUserType } from '@/types/dashboard'

export const useUserManagementStore = defineStore('user-management', () => {
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

  const listUser = ref<User[]>([])
  const loadingDelete = ref<boolean>(false)
  // actions
  const setFormData = (data: Record<string, string>) => {
    form.value = merge({}, form.value, data)
    console.log(form, 'form')
  }

  const setListUser = (data: User[]) => {
    listUser.value = cloneDeep(data)
  }

  const deleteUser = (id: number) => {
    remove(listUser.value, (user) => user.id === id)
  }

  const createUser = async (data: FormRegisterUserType) => {
    console.log(data, 'data')
    const newData = {
      id: listUser.value.length + 1,
      name: data.name || '',
      email: data.email || '',
      role: data.role === 'admin' ? '管理者' : 'ユーザー'
    }
    await new Promise((resolve) => {
      setTimeout(() => {
        listUser.value = [newData, ...listUser.value]
        resolve(true)
      }, 2000)
    })
  }

  const editUser = async (data: FormRegisterUserType) => {
    const index = listUser.value.findIndex((user) => user.id === Number(data.id))
    const newData = {
      id: Number(data.id),
      name: data.name || '',
      email: data.email || '',
      role: data.role === 'admin' ? '管理者' : 'ユーザー'
    }
    await new Promise((resolve) => {
      setTimeout(() => {
        listUser.value[index] = newData
        resolve(true)
      }, 2000)
    })
  }

  return { form, listUser, loadingDelete, setFormData, setListUser, deleteUser, createUser, editUser }
})
