import type { UploadFileInfo } from 'naive-ui'
export type User = {
  id: string
  name: string
  email: string
  role: string
}

export type FormCompanyType = {
  company: string
  id: string
  planSubscribed: string
  postCode: string
  address: string
  phoneNumber: string
  emailAddress: string
  personName: string
}

export type FormRegisterUserType = {
  id: string
  name: string
  email: string
  role: string
  password: string
}

type FileDetail = {
  id: number
  name: string
  type: 'pdf'
  url: string
  data: detailJobType[]
}

export type FileDetailsList = FileDetail[]

export type FormRegisterJobType = {
  name: string
  documentType: string
  files: Array<UploadFileInfo>
}

export type detailJobType = {
  name: string
  key: string
  type: 'date' | 'text' | 'text-area'
  value: string
  isChange: boolean
  required: boolean
}

export type FormFilterJob = {
  keyword: string
  status: string
  startDate: {
    date: number | null
    time: number | null | undefined
  }
  endDate: {
    date: number | null
    time: number | null | undefined
  }
  startDate2: {
    date: number | null
    time: number | null | undefined
  }
  endDate2: {
    date: number | null
    time: number | null | undefined
  }
}

export type Status = 'created' | 'updated' | 'readingCompleted' | 'loadingError' | 'timeoutError'

export type JobType = {
  id: number
  jobName: string
  status: Status
  owner: string
  createDate: number
  updateDate: number | null
  result: boolean
  documentType?: string
}
