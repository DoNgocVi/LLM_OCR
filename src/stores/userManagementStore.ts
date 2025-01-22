import { FormCompanyType, User } from '@/types/dashboard'
import { cloneDeep, merge, remove } from 'lodash'
import { defineStore } from 'pinia'
import type { FormRegisterUserType } from '@/types/dashboard'

export const useUserManagementStore = defineStore('user-management', () => {
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

  // actions
  const setFormData = (data: Record<string, string>) => {
    form.value = merge({}, form.value, data)
  }

  const setListUser = (data: User[]) => {
    listUser.value = cloneDeep(data)
  }

  const deleteUser = (id: string) => {
    remove(listUser.value, (user) => user.id === id)
  }

  const createUser = async (data: FormRegisterUserType) => {
    listUser.value = [data, ...listUser.value]
  }

  const editUser = async (data: FormRegisterUserType) => {
    const index = listUser.value.findIndex((user) => user.id === data.id)
    listUser.value[index] = data
  }

  return { form, listUser, setFormData, setListUser, deleteUser, createUser, editUser }
})
