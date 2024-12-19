import BuildingIcon from '@/assets/images/icons/BuildingIcon.vue'
import ChartIcon from '@/assets/images/icons/ChartIcon.vue'
import CheckListIcon from '@/assets/images/icons/CheckListIcon.vue'
import DocumentIcon from '@/assets/images/icons/DocumentIcon.vue'
import SettingIcon from '@/assets/images/icons/SettingIcon.vue'
import { MenuOption, NIcon } from 'naive-ui'
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
  },
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
            key: 'user-management',
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
            { default: () => '共有設定' }
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
