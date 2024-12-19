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
        key: 'option4',
        icon: renderIcon(CheckListIcon),
        children: [
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: 'dashboard',
                  class: 'hover:underline'
                },
                { default: () => 'ユーザー管理' }
              ),
            key: 'option4-1'
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
        key: 'option5',
        icon: renderIcon(SettingIcon)
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '',
              class: 'hover:underline'
            },
            { default: () => '企業アカウント管理' }
          ),
        key: 'option6',
        icon: renderIcon(BuildingIcon)
      }
    ]
  }
]
