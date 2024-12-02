<template>
  <div class="mt-4">
    <div class="pl-5">
      <MainLogo />
    </div>
    <div class="mt-4">
      <n-menu :options="menuOptions" :disabled-field="'option1'" @update:value="handleUpdateValue" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { MenuOption, NIcon } from 'naive-ui'
  import { RouterLink } from 'vue-router'
  import MainLogo from '@assets/images/main-logo.vue'
  import DocumentIcon from '@/assets/images/icons/DocumentIcon.vue'
  import ChartIcon from '@/assets/images/icons/ChartIcon.vue'
  import Group1Icon from '@/assets/images/icons/Group1Icon.vue'
  import CheckListIcon from '@/assets/images/icons/CheckListIcon.vue'
  import SettingIcon from '@/assets/images/icons/SettingIcon.vue'
  import BuildingIcon from '@/assets/images/icons/BuildingIcon.vue'
  const renderIcon = (icon: Component) => {
    return () => h(NIcon, null, { default: () => h(icon) })
  }
  const menuOptions: MenuOption[] = [
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
                to: 'dashboard',
                class: 'hover:underline'
              },
              { default: () => 'ジョブ結果' }
            ),
          key: 'option1',
          icon: renderIcon(DocumentIcon)
        },
        {
          label: () =>
            h(
              RouterLink,
              {
                to: 'dashboard',
                class: 'hover:underline'
              },
              { default: () => '使用量データ' }
            ),
          key: 'option2',
          icon: renderIcon(ChartIcon)
        },
        {
          label: () =>
            h(
              RouterLink,
              {
                to: 'dashboard',
                class: 'hover:underline'
              },
              { default: () => 'テンプレート' }
            ),
          key: 'option3',
          icon: renderIcon(Group1Icon)
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
                to: 'dashboard',
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
                to: 'dashboard',
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
                to: 'dashboard',
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

  const handleUpdateValue = (key: string, item: MenuOption) => {
    console.log(item)
  }
</script>
<style lang="scss" scoped>
  :deep(.n-menu-item-content) {
    // padding-left: 36px !important;
  }
  :deep(.n-menu-item-group-title) {
    // padding-left: 26px !important;
  }
  :deep(.n-menu) {
    .n-menu-item-content.n-menu-item-content--selected a {
      // color: black !important;
    }
  }
</style>
