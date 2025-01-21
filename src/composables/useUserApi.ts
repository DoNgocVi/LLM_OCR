import { useJobManagementStore } from '@/stores/jobManagementStore'
import { useCommonStore } from '@/stores/commonStore'
import { FormRegisterUserType, User } from '@/types/dashboard'
import { storeToRefs } from 'pinia'
import { useUserManagementStore } from '@/stores/userManagementStore'

const commonStore = useCommonStore()
const userManagementStore = useUserManagementStore()
const { loadingSubmit } = storeToRefs(commonStore)
const { listUser } = storeToRefs(userManagementStore)
const { setListUser, deleteUser, createUser, editUser } = userManagementStore

export const useUserApi = () => {
  const getListUser = async () => {
    try {
      return new Promise<User[]>((resolve) => {
        setTimeout(() => {
          setListUser([])
          resolve([])
        }, 400)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const createUserApi = async (data: FormRegisterUserType) => {
    const newData: FormRegisterUserType = {
      id: `${listUser.value.length + 1}`,
      name: data.name || '',
      email: data.email || '',
      role: data.role === 'admin' ? '管理者' : 'ユーザー',
      password: 'n2S+)INc(6Ue'
    }
    try {
      await new Promise<FormRegisterUserType>((resolve) => {
        setTimeout(() => {
          resolve(newData)
        }, 600)
      }).then((data) => {
        createUser(data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const editUserApi = async (data: FormRegisterUserType) => {
    const newData: FormRegisterUserType = {
      id: data.id,
      name: data.name || '',
      email: data.email || '',
      role: data.role === 'admin' ? '管理者' : 'ユーザー',
      password: data.password
    }
    try {
      await new Promise<FormRegisterUserType>((resolve) => {
        setTimeout(() => {
          resolve(newData)
        }, 600)
      }).then((data) => {
        editUser(data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUserApi = async (id: string) => {
    try {
      loadingSubmit.value = true
      await new Promise<User | null>((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 600)
      }).then((data) => {
        deleteUser(id)
      })
    } catch (error) {
      console.log(error)
    }
    loadingSubmit.value = false
  }

  return {
    getListUser,
    createUserApi,
    deleteUserApi,
    editUserApi
  }
}
