export type User = {
  id: number
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

export type ListJobType = {
  id: number,
  jobName: string,
  status: "pending" | "created" | "updated" | "readingCompleted" | "loadingError" | "timeoutError";
  owner: string,
  createDate: string,
  updateDate: string,
  result: boolean
}

export type FormRegisterJobType = {
  name: string,
  documentType: string
}