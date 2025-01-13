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
  id: number
  jobName: string
  status: 'pending' | 'created' | 'updated' | 'readingCompleted' | 'loadingError' | 'timeoutError'
  owner: string
  createDate: string
  updateDate: string
  result: boolean
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
}

export type detailJobType = {
  name: string
  key: string
  type: 'date' | 'text' | 'text-area'
  value: string
  locker: boolean
  required: boolean
}

export type FormFilterJob = {
  keyword: string;
  status: string;
  startDate: {
    date: number | null;
    time: string | null;
  };
  endDate: {
    date: number | null;
    time: string | null;
  };
  startDate2: {
    date: number | null;
    time: string | null;
  };
  endDate2: {
    date: number | null;
    time: string | null;
  };
};

export type Status = 'created' | 'updated' | 'readingCompleted' | 'loadingError' | 'timeoutError';

export type JobType = {
  id: number;
  jobName: string;
  status: Status;
  owner: string;
  createDate: number;
  updateDate: string;
  result: boolean;
}