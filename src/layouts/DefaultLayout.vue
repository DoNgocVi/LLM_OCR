<template>
  <div>
    <n-config-provider :theme-overrides="getThemeOverrides">
      <slot />
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
defineComponent({
  name: 'DefaultLayout',
})
const appTheme = '#377dff'
const getThemeOverrides = {
  common: {
    primaryColor: appTheme,
    primaryColorHover: appTheme,
    primaryColorPressed: appTheme,
    primaryColorSuppl: appTheme,
  },
  LoadingBar: {
    colorLoading: appTheme,
  },
}
</script>
