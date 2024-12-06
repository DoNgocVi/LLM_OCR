<template>
  <div>
    <n-config-provider :theme-overrides="getThemeOverrides">
      <n-message-provider>
        <slot />
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
defineComponent({
  name: 'DefaultLayout',
})
const appTheme = '#059669'
const getThemeOverrides = {
  common: {
    primaryColor: appTheme,
    primaryColorHover: appTheme,
    primaryColorPressed: appTheme,
    primaryColorSuppl: appTheme,
    boxShadowFocus: 'none',
  },
  LoadingBar: {
    colorLoading: appTheme,
  },
}
</script>