import { useJobManagementStore } from './../stores/listJobStore';
import { useCommonStore } from '@/stores/commonStore'
import { detailJobType, JobType } from '@/types/dashboard';
import { storeToRefs } from 'pinia'

const commonStore = useCommonStore()
const jobManagementStore = useJobManagementStore()
const { saveDetailJob, createJob } = jobManagementStore

const { loadingSubmit, loadingDownload } = storeToRefs(commonStore)

export const useJobApi = () => {
  const saveDetailJobApi = async ({ id, data }: { id: number, data: detailJobType[] }) => {
    loadingSubmit.value = true
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 2000)
    })
    saveDetailJob(id, data)
    loadingSubmit.value = false
  }

  const createJobApi = async (data: JobType) => {
    await new Promise<JobType>((resolve) => {
      setTimeout(() => {
        resolve(data)
      }, 600)
    }).then((data) => {
      createJob(data)
    })
  }

  const downloadCsv = async (downloadCsv: string) => {
    loadingDownload.value = true;

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });

    const csvContent = [
      ['発行日', '2025年01月13日'],
      ['書類番号', 'A123'],
      ['会社名', '株式会社'],
      ['郵便番号', '123 - 456'],
    ];
    const csvString = csvContent.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    loadingDownload.value = false;
  };
  return {
    saveDetailJobApi,
    downloadCsv,
    createJobApi
  }
}