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
      itemIconColor: '#858D9D', // Icon khi không active
      itemIconColorActive: '#3799DC', // Icon khi active
      itemColorActive: '#fff', // Background khi active
      itemColorActiveHover: '#fff', // Background active khi hover
      itemTextColorActiveHover: '#000', // Text active khi hover
      itemColorHover: '#fff' // Background khi hover
    },
    Input: {
      border: '1px solid #D1D1D1', // Màu viền khi focus
      borderFocus: '1px solid #4F4F4F',
      boxShadowFocus: '0 0 0 2px rgba(79, 70, 1, 0)' // Hiệu ứng đổ bóng khi focus
    },
    Alert: {
      closeIconColor: '#5B5B5B' // Màu nút đóng
    }
  }
</script>
