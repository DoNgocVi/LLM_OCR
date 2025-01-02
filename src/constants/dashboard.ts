import BuildingIcon from '@/assets/images/icons/BuildingIcon.vue'
import ChartIcon from '@/assets/images/icons/ChartIcon.vue'
import CheckListIcon from '@/assets/images/icons/CheckListIcon.vue'
import DocumentIcon from '@/assets/images/icons/DocumentIcon.vue'
import PencilIcon from '@/assets/images/icons/PencilIcon.vue'
import SettingIcon from '@/assets/images/icons/SettingIcon.vue'
import TrashIcon from '@/assets/images/icons/TrashIcon.vue'
import { User } from '@/types/dashboard'
import { time } from 'echarts'
import { DataTableColumns, MenuOption, NButton, NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'

export const timeOptions = [
  {
    label: '7日',
    value: '7day'
  },
  {
    label: '14日',
    value: '14day'
  },
  {
    label: '1ヶ月',
    value: '1month'
  },
  {
    label: '2ヶ月',
    value: '2month'
  },
  {
    label: '3ヶ月',
    value: '3month'
  },

  {
    label: '6ヶ月',
    value: '6month'
  },

  {
    label: '12ヶ月',
    value: '12month'
  }
]

export const pageOptions = [
  {
    label: '50件',
    value: '50'
  },
  {
    label: '100件',
    value: '100'
  },
  {
    label: '150件',
    value: '150'
  },
  {
    label: '200件',
    value: '200'
  }
]

export const roleOption = [
  {
    label: '管理者',
    value: 'admin'
  },
  {
    label: 'ユーザー',
    value: 'normal'
  }
]

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        'div',
        {
          class: 'text-black font-bold text-sm'
        },
        { default: () => '機能' }
      ),
    type: 'group',
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '/dashboard/job-result'
            },
            { default: () => 'ジョブ結果' }
          ),
        key: 'job-result',
        icon: renderIcon(DocumentIcon)
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '/dashboard/usage-data'
            },
            { default: () => '使用量データ' }
          ),
        key: 'usage-data',
        icon: renderIcon(ChartIcon)
      }
    ]
  },
  {
    label: () =>
      h(
        'div',
        {
          class: 'text-black font-bold text-sm'
        },
        { default: () => '設定' }
      ),
    type: 'group',
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '',
              class: 'hover:underline'
            },
            { default: () => 'プロジェクト管理' }
          ),
        key: 'parent-user-management',
        icon: renderIcon(CheckListIcon),
        children: [
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: '/dashboard/user-management',
                  class: 'hover:underline'
                },
                { default: () => 'ユーザー管理' }
              ),
            key: 'user-management'
          }
        ]
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '/dashboard/setting',
              class: 'hover:underline'
            },
            { default: () => '共通設定' }
          ),
        key: 'setting',
        icon: renderIcon(SettingIcon)
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '/dashboard/company-information',
              class: 'hover:underline'
            },
            { default: () => '企業情報' }
          ),
        key: 'company-information',
        icon: renderIcon(BuildingIcon)
      }
    ]
  }
]

export const createColumns = ({
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
      width: 120,
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
            onClick: () => edit(row)
          },
          {
            icon: () =>
              h(PencilIcon, {
                style: { fontSize: '24px', marginTop: '1px' }
              })
          }
        )
      }
    },
    {
      title: '削除',
      key: 'deleteRow',
      width: 120,
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

export const jobStatus = {
  pending: {
    text: '読込中...',
    color: '#858D9D'
  },
  created: {
    text: 'ジョブ作成済み',
    color: '#5B5B5B'
  },
  updated: {
    text: '編集済み',
    color: '#2296A0'
  },
  readingCompleted: {
    text: '読取完了',
    color: '#1175BA'
  },
  loadingError: {
    text: '読込エラー',
    color: '#D8392F'
  },
  timeoutError: {
    text: 'タイムアウト',
    color: '#D8392F'
  }
}

export const optionsDownload = [
  { label: 'CSV', value: 'csv' },
  { label: 'JSON', value: 'json' }
]

export const optionDocumentType = [
  { label: '請求書', value: 'invoice' },
  { label: '包装明細書', value: 'packingList' },
  { label: '貨物到着案内', value: 'arrivalNotice' },
  { label: '船荷証券', value: 'billLading' }
]
