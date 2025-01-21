import BuildingIcon from '@/assets/images/icons/BuildingIcon.vue'
import ChartIcon from '@/assets/images/icons/ChartIcon.vue'
import CheckListIcon from '@/assets/images/icons/CheckListIcon.vue'
import DocumentIcon from '@/assets/images/icons/DocumentIcon.vue'
import SettingIcon from '@/assets/images/icons/SettingIcon.vue'
import { MenuOption, NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'
import type { SelectOptions } from '@/types'

export const timeOptions: SelectOptions = [
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

export const pageOptions: SelectOptions = [
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

export const roleOption: SelectOptions = [
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

export const jobStatus: Record<string, { text: string, color: string }> = {
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

export const optionsDownload: SelectOptions = [
  { label: 'CSV', value: 'csv' },
  { label: 'JSON', value: 'json' }
]

export const optionDocumentType: SelectOptions = [
  { label: '請求書（Invoice）', value: 'invoice' },
  { label: '包装明細書（Packing List）', value: 'packingList' },
  { label: '貨物到着案内（Arrival Notice）', value: 'arrivalNotice' },
  { label: '船荷証券（Bill of Lading）', value: 'billLading' }
]

export const statusOption: SelectOptions = [
  {
    label: '全て',
    value: 'all'
  },
  {
    label: 'ジョブ作成済み',
    value: 'job_created'
  },
  {
    label: '読取完了',
    value: 'read_complete'
  },
  {
    label: '編集済み',
    value: 'edited'
  },
  {
    label: '読込エラー',
    value: 'read_error'
  },
  {
    label: 'タイムアウト',
    value: 'timeout'
  }
];