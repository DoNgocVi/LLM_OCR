import DownloadIcon from '@/assets/images/icons/DownloadIcon.vue'
import TrashIcon from '@/assets/images/icons/TrashIcon.vue'
import type { JobType, detailJobType } from '@/types/dashboard'
import { DataTableColumns, NButton, NIcon, NInput, NSwitch, NTooltip } from 'naive-ui'
import { jobStatus } from '@/constants/dashboard'
import CustomButton from '@/components/CustomButton.vue'
import ErrorInfoIcon from '@/assets/images/icons/ErrorInfoIcon.vue'
import CustomDatePicker from '@/components/CustomDatePicker.vue'
import { User } from '@/types/dashboard'
import PencilIcon from '@/assets/images/icons/PencilIcon.vue'
import { i18n } from '@/main'
import { DefineComponent } from 'vue'

const createButton = (action: () => void, icon: DefineComponent<{}, {}, any>) => {
  console.trace()
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
      onClick: action
    },
    {
      icon: () =>
        h(icon, {
          style: { fontSize: '24px', marginTop: '1px' }
        })
    }
  )
}

export const createColumnsJob = ({
  download,
  deleteRow,
  viewDetail
}: {
  download: (row: JobType) => void
  deleteRow: (row: JobType) => void
  viewDetail: (row: JobType) => void
}): DataTableColumns<JobType> => {
  const t = i18n.global.t
  return [
    {
      type: 'selection'
    },
    {
      title: 'ジョブ名 ',
      key: 'jobName',
      width: '20%',
      minWidth: '160px'
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
              textAlign: 'center',
              whiteSpace: 'nowrap'
            }
          },
          a.text
        )
      }
    },
    {
      title: '作成者',
      key: 'owner',
      width: '15%',
      render: (row) => {
        return h(
          'div',
          {
            style: {
              whiteSpace: 'nowrap'
            }
          },
          row.owner
        )
      }
    },
    {
      title: '作成日時',
      maxWidth: '12%',
      key: 'createDate',
      render: (row) => {
        return h(
          'div',
          {
            style: {
              whiteSpace: 'nowrap'
            }
          },
          convertTimeStampToString(row.createDate)
        )
      },
      sorter: (a, b) => a.createDate - b.createDate
    },
    {
      title: '更新日時',
      maxWidth: '12%',
      minWidth: '110px',
      key: 'updateDate',
      render: (row) => {
        return h(
          'div',
          {
            style: {
              whiteSpace: 'nowrap'
            }
          },
          convertTimeStampToString(row.updateDate)
        )
      },
      sorter: (a, b) => {
        const dateA = a.updateDate || 0
        const dateB = b.updateDate || 0
        return dateA - dateB
      }
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
      title: 'ダウンロード',
      key: 'download',
      align: 'center',
      width: 140,
      render(row) {
        if (row.status !== 'loadingError' && row.status !== 'timeoutError') {
          return createButton(() => {
            download(row)
          }, DownloadIcon)
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
                    color: '#0e7a0d',
                    style: 'margin-top: 9px'
                  },
                  {
                    default: () => h(ErrorInfoIcon, {})
                  }
                ),
              default: () => [
                h('div', {}, t('dashboard.job.msg_job_result_error01')),
                h('div', {}, t('dashboard.job.msg_job_result_error02'))
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
        return createButton(() => {
          deleteRow(row)
        }, TrashIcon)
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
      align: 'left',
      key: 'value',
      render(row) {
        if (row.type === 'text') {
          return h(NInput, {
            value: row.value,
            size: 'medium',
            style: 'width: 100%;',
            themeOverrides: {
              borderRadius: '8px',
              borderFocus: '1px solid #3799DC',
              borderHover: '1px solid #3799DC',
              boxShadowFocus: '0 0 6px rgba(55, 153, 220, 0.5)',
              colorDisabled: '#F5F5F5',
              textColorDisabled: '#5B5B5B',
              heightMedium: '36px',
              color: row.isChange ? '#EAF8FF' : '#FFF'
            },
            'onUpdate:value': (newValue) => {
              ;(row.value = newValue), (row.isChange = true)
            }
          })
        } else if (row.type === 'date') {
          return h(CustomDatePicker, {
            style: 'width: 164px',
            customFormat: 'yyyy年MM月dd日',
            timestamp: Number(row.value),
            themeOverrides: {
              peers: {
                Input: { color: row.isChange ? '#EAF8FF' : '#FFF' }
              }
            },
            'onUpdate:value': (newValue: string) => {
              ;(row.value = newValue), (row.isChange = true)
            }
          })
        } else if (row.type === 'text-area') {
          return h(NInput, {
            value: row.value,
            type: 'textarea',
            class: 'centered-textarea',
            size: 'large',
            autosize: {
              minRows: 1,
              maxRows: 3
            },
            style: 'width: 100%;',
            themeOverrides: {
              borderRadius: '8px',
              borderFocus: '1px solid #3799DC',
              borderHover: '1px solid #3799DC',
              boxShadowFocus: '0 0 6px rgba(55, 153, 220, 0.5)',
              colorDisabled: '#F5F5F5',
              textColorDisabled: '#5B5B5B',
              color: row.isChange ? '#EAF8FF' : '#FFF'
            },
            'onUpdate:value': (newValue) => {
              ;(row.value = newValue), (row.isChange = true)
            }
          })
        }
      }
    }
  ]
}

export const createColumnsUser = ({
  edit,
  deleteRow
}: {
  edit: (row: User) => void
  deleteRow: (row: User) => void
}): DataTableColumns<User> => {
  return [
    {
      title: '名前 ',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name, 'ja')
    },
    {
      title: 'メールアドレス ',
      titleAlign: 'center',
      key: 'email'
    },
    {
      title: '権限',
      key: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role, 'ja')
    },
    {
      title: '編集',
      key: 'edit',
      width: 90,
      render(row) {
        return createButton(() => {
          edit(row)
        }, PencilIcon)
      }
    },
    {
      title: '削除',
      key: 'deleteRow',
      width: 90,
      render(row) {
        return createButton(() => {
          deleteRow(row)
        }, TrashIcon)
      }
    }
  ]
}

export const convertTimeStampToString = (timestamp: number | null) => {
  if (!timestamp) return ''
  var time = new Date(timestamp)
  const date = String(time.getDate()).padStart(2, '0')
  const month = String(time.getMonth() + 1).padStart(2, '0')
  const year = time.getFullYear()
  const hours = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getMinutes()).padStart(2, '0')
  var formattedTime = `${year}/${month}/${date} ${hours}:${minutes.substr(-2)}`
  return formattedTime
}
