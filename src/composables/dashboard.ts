import DownloadIcon from '@/assets/images/icons/DownloadIcon.vue'
import TrashIcon from '@/assets/images/icons/TrashIcon.vue'
import { ListJobType } from '@/types/dashboard'
import { DataTableColumns, NButton, NIcon, NTooltip } from 'naive-ui'
import { jobStatus } from '@/constants/dashboard'
import CustomButton from '@/components/CustomButton.vue'
import ErrorInfoIcon from '@/assets/images/icons/ErrorInfoIcon.vue'

export const createColumnsJob = ({
  download,
  deleteRow
}: {
  download: (row: ListJobType) => void
  deleteRow: (row: ListJobType) => void
}): DataTableColumns<ListJobType> => {
  return [
    {
      type: 'selection',
    },
    {
      title: 'ジョブ名 ',
      key: 'jobName',
    },
    {
      title: 'ステータス ',
      key: 'status',
      render: (row) => {
        const a = jobStatus[row.status]
        return h('div', {
          style: {
            color: a.color,
            backgroundColor: `${a.color}1A`,
            padding: '4px 10px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '700',
            display: 'inline-block',
            textAlign: 'center'
          }
        }, a.text)
      }
    },
    {
      title: '作成者',
      key: 'owner',
    },
    {
      title: '作成日時',
      key: 'createDate',
      sorter: (a, b) => a.createDate.localeCompare(b.createDate, 'ja')
    },
    {
      title: '更新日時',
      key: 'updateDate',
      sorter: (a, b) => a.updateDate.localeCompare(b.updateDate, 'ja')
    },
    {
      title: '結果',
      key: 'result',
      render(row) {
        if (row.result) {
          return h(
            CustomButton,
            {
              size: 'xs',
              style: {
                maxWidth: '102px',
                borderRadius: '10px',
              },
              content: '結果を表示',
              themeOverrides: {
                paddingMedium: '0 12px',
                borderRadiusMedium: '10px',
              },
              type: 'primary',
              onClick: () => { }
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
              onClick: () => { download(row) }
            },
            {
              icon: () =>
                h(DownloadIcon, {
                  style: { fontSize: '24px', marginTop: '1px' }
                }),
            }
          )
        } else {
          return h(NTooltip, {
            trigger: 'hover',
            themeOverrides: {
              color: '#5B5B5B',
              borderRadius: '8px'
            }
          }, {
            trigger: () => h(
              NIcon, {
              size: 20,
              color: "#0e7a0d"
            },
              {
                default: () => h(ErrorInfoIcon, {})
              }
            ),
            default: () => [
              h('div', {}, 'エラーが発生したため、ファイルを読み込めませんでした。'),
              h('div', {}, '新規作成より、もう一度行ってください')
            ]
          })
        }
      }
    },
    {
      title: '削除',
      key: 'deleteRow',
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
