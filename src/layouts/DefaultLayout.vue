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
      itemTextColorActive: '#181818', // Text khi active
      itemIconColor: '#858D9D', // Icon khi không active
      itemIconColorActive: '#3799DC', // Icon khi active,
      itemIconColorHover: '#3799DC', // Icon khi active,
      itemColorActive: '#fff', // Background khi active
      itemColorActiveHover: '#fff', // Background active khi hover
      itemTextColorActiveHover: '#181818', // Text active khi hover
      itemColorHover: '#fff', // Background khi hover
      itemTextColorChildActive: '#5B5B5B',
      itemIconColorChildActive: '#5B5B5B',
      itemTextColorChildActiveHover: '#181818',
      arrowColorChildActiveHover: '#858d9d',
      arrowColorChildActive: '#858d9d'
    },
    Input: {
      border: '1px solid #D1D1D1', // Màu viền khi focus
      borderFocus: '1px solid #4F4F4F',
      borderHover: '1px solid #4F4F4F',
      boxShadowFocus: '0 0 0 2px rgba(79, 70, 1, 0)', // Hiệu ứng đổ bóng khi focus
      borderError: '#ED584F'
    },
    Select: {
      peers: {
        InternalSelection: {
          borderRadius: '8px',
          border: '1px solid #D1D1D1',
          borderHover: '1px solid #D1D1D1',
          borderFocus: '1px solid #D1D1D1',
          borderActive: '1px solid #D1D1D1',
          boxShadowActive: '0 0 4px rgba(0, 0, 0, 0.25)',
          boxShadowFocus: '0 0 4px rgba(0, 0, 0, 0.25'
        },
        InternalSelectMenu: {
          optionTextColorActive: '#4F4F4F',
          optionCheckColor: '#858D9D',
          borderRadius: '0px'
        }
      }
    }
  }
</script>
