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
    name: 'DefaultLayout'
  })
  const appTheme = '#3799DC'
  const getThemeOverrides = {
    common: {
      primaryColor: appTheme,
      primaryColorHover: appTheme,
      primaryColorPressed: appTheme,
      primaryColorSuppl: appTheme,
      boxShadowFocus: 'none'
    },
    LoadingBar: {
      colorLoading: appTheme
    },
    Menu: {
      itemTextColor: '#5B5B5B', // Text khi không active
      itemTextColorActive: '#000', // Text khi active
      itemIconColor: '# 858D9D', // Icon khi không active
      itemIconColorActive: '#3799DC', // Icon khi active
      itemColorActive: '#fff', // Background khi active
      itemColorHover: '#e6f7ff', // Background khi hover
      itemBorderRadius: '10px', // Bo góc item
      itemBorderActive: '1px solid green'
    }
  }
</script>
