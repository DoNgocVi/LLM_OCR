import DownloadIcon from '@/assets/images/icons/DownloadIcon.vue'
import TrashIcon from '@/assets/images/icons/TrashIcon.vue'
import type { JobType, detailJobType } from '@/types/dashboard'
import { DataTableColumns, NButton, NIcon, NInput, NSwitch, NTooltip } from 'naive-ui'
import { jobStatus } from '@/constants/dashboard'
import CustomButton from '@/components/CustomButton.vue'
import ErrorInfoIcon from '@/assets/images/icons/ErrorInfoIcon.vue'
import LockIcon from '@/assets/images/icons/LockIcon.vue'
import UnlockIcon from '@/assets/images/icons/UnlockIcon.vue'
import CustomDatePicker from '@/components/CustomDatePicker.vue'

export const createColumnsJob = ({
  download,
  deleteRow,
  viewDetail
}: {
  download: (row: JobType) => void
  deleteRow: (row: JobType) => void
  viewDetail: (row: JobType) => void
}): DataTableColumns<JobType> => {
  return [
    {
      type: 'selection'
    },
    {
      title: 'ジョブ名 ',
      key: 'jobName',
      width: '20%'
    },
    {
      title: 'ステータス ',
      key: 'status',
      render: (row) => {
        const a = jobStatus[row.status]
        return h(
          'div',
          {
            style: {
              color: a.color,
              backgroundColor: `${a.color}1A`,
              padding: '4px 10px',
              margin: '7.8px 0px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '700',
              display: 'inline-block',
              textAlign: 'center'
            }
          },
          a.text
        )
      }
    },
    {
      title: '作成者',
      key: 'owner',
      width: '15%'
    },
    {
      title: '作成日時',
      maxWidth: '12%',
      key: 'createDate',
      render: (row) => {
        return convertTimeStampToString(row.createDate)
      },
      sorter: (a, b) => String(a.createDate).localeCompare(String(b.createDate), 'ja')
    },
    {
      title: '更新日時',
      maxWidth: '12%',
      key: 'updateDate',
      sorter: (a, b) => a.updateDate.localeCompare(b.updateDate, 'ja')
    },
    {
      title: '結果',
      key: 'result',
      align: 'center',
      maxWidth: '10%',
      render(row) {
        if (row.result) {
          return h(
            CustomButton,
            {
              size: 'xs',
              style: {
                maxWidth: '102px',
                borderRadius: '10px'
              },
              content: '結果を表示',
              themeOverrides: {
                paddingMedium: '0 12px',
                borderRadiusMedium: '10px'
              },
              type: 'primary',
              onClick: () => {
                viewDetail(row)
              }
            },
            '成功'
          )
        }
        return null
      }
    },
    {
      title: '編集',
      key: 'download',
      align: 'center',
      width: 80,
      render(row) {
        if (row.status !== 'loadingError' && row.status !== 'timeoutError') {
          return h(
            NButton,
            {
              size: 'small',
              themeOverrides: {
                color: 'transparent',
                waveOpacity: '0',
                border: 'none',
                borderFocus: 'none',
                borderHover: 'none',
                borderPressed: 'none',
                textColor: '#858D9D',
                textColorHover: '#56637F',
                textColorFocus: '#56637F',
                textColorPressed: '#56637F'
              },
              class: 'btn-dropdown',
              onClick: () => {
                download(row)
              }
            },
            {
              icon: () =>
                h(DownloadIcon, {
                  style: { fontSize: '24px', marginTop: '1px' }
                })
            }
          )
        } else {
          return h(
            NTooltip,
            {
              trigger: 'hover',
              themeOverrides: {
                color: '#5B5B5B',
                borderRadius: '8px'
              }
            },
            {
              trigger: () =>
                h(
                  NIcon,
                  {
                    size: 20,
                    color: '#0e7a0d'
                  },
                  {
                    default: () => h(ErrorInfoIcon, {})
                  }
                ),
              default: () => [
                h('div', {}, 'エラーが発生したため、ファイルを読み込めませんでした。'),
                h('div', {}, '新規作成より、もう一度行ってください')
              ]
            }
          )
        }
      }
    },
    {
      title: '削除',
      key: 'deleteRow',
      align: 'center',
      width: 80,
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            themeOverrides: {
              color: 'transparent',
              waveOpacity: '0',
              border: 'none',
              borderFocus: 'none',
              borderHover: 'none',
              borderPressed: 'none',
              textColor: '#858D9D',
              textColorHover: '#56637F',
              textColorFocus: '#56637F',
              textColorPressed: '#56637F'
            },
            class: 'btn-dropdown',
            onClick: () => deleteRow(row)
          },
          {
            icon: () =>
              h(TrashIcon, {
                style: { fontSize: '24px', marginTop: '1px' }
              })
          }
        )
      }
    }
  ]
}

export const createColumnsPreviewJob = (): DataTableColumns<detailJobType> => {
  return [
    {
      title: '項目名 ',
      key: 'name',
      minWidth: '100px',
      width: '40%'
    },
    {
      title: '読み取り結果/編集',
      key: 'value',
      render(row) {
        if (row.type === 'text') {
          return h(NInput, {
            value: row.value,
            size: 'large',
            style: 'width: 100%;',
            themeOverrides: {
              borderRadius: '8px',
              borderFocus: '1px solid #3799DC',
              borderHover: '1px solid #3799DC',
              boxShadowFocus: '0 0 6px rgba(55, 153, 220, 0.5)',
              colorDisabled: '#F5F5F5',
              textColorDisabled: '#5B5B5B'
            },
            disabled: row.locker,
            'onUpdate:value': (newValue) => {
              row.value = newValue
            },
            // onInput: (value) => updateField({ ...row, value })
          })
        } else if (row.type === 'date') {
          return h(CustomDatePicker, {
            customFormat: 'yyyy年MM月dd日',
            size: 'large',
            disabled: row.locker,
            timestamp: Number(row.value),
            'onUpdate:value': (newValue: string) => {
              row.value = newValue
            },
          })
        } else if (row.type === 'text-area') {
          return h(NInput, {
            value: row.value,
            type: 'textarea',
            size: 'large',
            disabled: row.locker,
            autosize: {
              minRows: 3,
              maxRows: 5
            },
            style: 'width: 100%;',
            themeOverrides: {
              borderRadius: '8px',
              borderFocus: '1px solid #3799DC',
              borderHover: '1px solid #3799DC',
              boxShadowFocus: '0 0 6px rgba(55, 153, 220, 0.5)',
              colorDisabled: '#F5F5F5',
              textColorDisabled: '#5B5B5B'
            },
            'onUpdate:value': (newValue) => {
              row.value = newValue
            },
            // onInput: (value) => updateField({ ...row, value })
          })
        }
      }
    },
    {
      title: '結果',
      key: 'locker',
      width: '120px',
      align: 'center',
      render(row) {
        if (row.locker) {
          return h(NIcon, {
            component: LockIcon,
            color: '#858D9D',
            style: 'margin-left: 3px',
            size: 22,
            onClick: (newValue: boolean) => {
              row.locker = false
            }
          })
        } else {
          return h(NIcon, {
            component: UnlockIcon,
            color: '#858D9D',
            size: 22,
            onClick: (newValue: boolean) => {
              row.locker = true
            }
          })
        }
      }
    }
  ]
}

export const convertTimeStampToString = (timestamp: number) => {
  var time = new Date(timestamp);
  const date = String(time.getDate()).padStart(2, '0');
  const month = String(time.getMonth() + 1).padStart(2, '0');
  const year = time.getFullYear()
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  var formattedTime = `${date}/${month}/${year} ${hours}:${minutes.substr(-2) }`;
  return formattedTime
}