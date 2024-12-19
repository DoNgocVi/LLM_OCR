<template>
  <div class="h-full flex flex-col justify-between">
    <div class="pt-4">
      <div class="pl-5">
        <MainLogo class="w-[58px] h-[28px]" />
      </div>
      <div class="mt-4">
        <n-menu
          :value="menuActive"
          :options="menuOptions"
          :disabled-field="'option1'"
          @update:value="handleUpdateValue"
        />
      </div>
    </div>
    <div class="border-t-1 border-t-solid border-t-grey mx-3">
      <ul class="list-none flex flex-col gap-2 text-grey ps-6 mb-4 mt-2">
        <li v-for="item of menuFooterItems">
          <template v-if="item.link == '#'">
            <RouterLink class="font-400 text-grey hover:text-grey_dark transition-all" to="/policy">
              {{ item.text }}
            </RouterLink>
          </template>
          <template v-else>
            <a
              class="font-400 text-grey hover:text-grey_dark transition-all"
              :href="item.link || ''"
              target="_blank"
              rel="noopener"
            >
              {{ item.text }}
            </a>
          </template>
        </li>
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
  import CheckListIcon from '@/assets/images/icons/CheckListIcon.vue'
  import SettingIcon from '@/assets/images/icons/SettingIcon.vue'
  import BuildingIcon from '@/assets/images/icons/BuildingIcon.vue'
  import { menuFooterItems } from '@/constants/common'

  const emit = defineEmits(['setTitle'])

  const menuActive = ref<string>('job-result')

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
                to: '',
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

  const handleUpdateValue = (key: string, item: MenuOption) => {
    menuActive.value = `${item.key}`
    const labelVNode = typeof item.label === 'function' ? item.label() : item.label
    const labelText = labelVNode.children ? labelVNode.children.default() : labelVNode
    emit('setTitle', labelText)
  }
</script>
<style lang="scss" scoped>
  :deep(.n-menu.n-menu--vertical) {
    margin-top: -26px;
    .n-menu-item-group {
      padding-top: 30px;
    }
  }
  :deep(.n-menu .n-menu-item-content::before) {
    background-color: transparent !important;
  }
  :deep(.n-menu .n-menu-item-content--selected::before) {
    left: 26px !important;
    border-radius: 10px;
    background-color: #fff !important;
    box-shadow: 0px 3px 8px rgba($color: #000000, $alpha: 0.1);
  }
</style>
