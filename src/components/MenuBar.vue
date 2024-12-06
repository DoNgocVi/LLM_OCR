<template>
  <div class='h-full bg-coolgray-100'>
    <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
  </div>
</template>

<script setup lang="ts">
import { BookOpenMicrophone20Filled } from '@vicons/fluent';
import { AttachOutline, BasketballOutline, BookOutline } from '@vicons/ionicons5';

import { MenuOption, NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';
const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://en.wikipedia.org/wiki/Hear_the_Wind_Sing',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        'Option 1'
      ),
    key: 'option1',
    icon: renderIcon(BookOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/auth/login',
          class: 'text-blue-500 hover:underline'
        },
        { default: () => 'Option 2' }
      ),
    key: 'option2',
    icon: renderIcon(AttachOutline)
  },
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://en.wikipedia.org/wiki/Hear_the_Wind_Sing',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        'Option 3'
      ),
    key: 'option3',
    icon: renderIcon(BasketballOutline)
  },
]

const handleUpdateValue = (key: string, item: MenuOption) => {
  console.log(item)
}
</script>
