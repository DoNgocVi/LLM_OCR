<template>
  <div class="h-full flex flex-col justify-between">
    <div class="pt-4">
      <div class="pl-5">
        <MainLogo class="w-[76px]" />
      </div>
      <div class="mt-4">
        <n-menu :options="menuOptions" :disabled-field="'option1'" @update:value="handleUpdateValue" />
      </div>
    </div>
    <div class="border-t-1 border-t-solid border-t-grey mx-3">
      <ul class="list-none flex flex-col gap-2 text-grey ps-6">
        <li>ヘルプ</li>
        <li>利用規約</li>
        <li>運営会社</li>
        <li>お問い合わせ</li>
      </ul>
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

  const emit = defineEmits(['setTitle'])
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
    const labelVNode = typeof item.label === 'function' ? item.label() : item.label
    const labelText = labelVNode.children ? labelVNode.children.default() : labelVNode
    console.log(labelText, 'labelText meu')
    emit('setTitle', labelText)
  }
</script>
<style lang="scss" scoped></style>
