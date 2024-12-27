<template>
  <div class="h-full flex flex-col justify-between">
    <div class="pt-4">
      <div class="pl-8 z-10 bg-main">
        <MainLogo class="w-[58px] h-[28px]" />
      </div>
      <div class="mt-4">
        <n-menu
          :value="menuActive"
          :options="menuOptions"
          :disabled-field="'option1'"
          :expand-icon="customExpandIcon"
          :defaultExpandedKeys="defaultExpandedKeys"
          @update:value="handleUpdateValue"
        />
      </div>
    </div>
    <div class="border-t-1 border-t-solid border-t-grey_light mx-6">
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
  import { RouterLink, useRoute } from 'vue-router'
  import MainLogo from '@assets/images/main-logo.vue'
  import { menuFooterItems } from '@/constants/common'
  import { menuOptions } from '@/constants/dashboard'
  import { CaretDownOutline } from '@vicons/ionicons5'

  const route = useRoute()
  const defaultExpandedKeys = ['parent-user-management']
  const valueAfterDashboard = route.path.split('/dashboard/')[1]
  const emit = defineEmits(['setTitle'])
  const menuActive = ref<string>(valueAfterDashboard ? valueAfterDashboard : 'job-result')
  const handleUpdateValue = (key: string, item: MenuOption) => {
    menuActive.value = `${item.key}`
    if (!key) return
    const labelVNode = typeof item.label === 'function' ? item.label() : item.label
    const labelText = labelVNode.children ? labelVNode.children.default() : labelVNode
    emit('setTitle', labelText)
  }

  const customExpandIcon = () =>
    h(
      NIcon,
      { style: { color: 'green' } },
      () => h(CaretDownOutline) // Sử dụng icon tùy chỉnh của bạn
    )
  defineExpose({
    handleUpdateValue
  })
</script>
<style lang="scss" scoped>
  :deep(.n-menu.n-menu--vertical) {
    margin-top: -26px;
    .n-menu-item-group {
      padding-top: 30px;
    }
  }
  :deep(.n-menu .n-menu-item-content::before) {
    left: 26px !important;
    border-radius: 10px;
  }
  :deep(.n-menu .n-menu-item-content--selected::before) {
    left: 26px !important;
    border-radius: 10px;
    background-color: #fff !important;
    box-shadow: 0px 3px 8px rgba($color: #000000, $alpha: 0.1);
  }
  :deep(.n-menu .n-submenu .n-submenu-children) {
    overflow: visible;
  }
  :deep(.n-base-icon.n-menu-item-content__arrow) {
    margin-left: 8px;
    color: #858d9d;
  }
</style>
