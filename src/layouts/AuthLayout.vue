<template>
  <div class="h-screen flex flex-col justify-between items-center">
    <div class="flex-1 w-full"></div>
    <div class="flex justify-center items-center mt-10">
      <div class="auth-wrapper flex flex-col items-center mb-8">
        <div style="color: black">
          <MainLogo class="w-[256px] h-[100px]" />
        </div>
        <router-view />
      </div>
    </div>
    <div class="flex-1 w-full"></div>
    <footer class="py-6 w-full bg-[#F0F5F8] flex-shrink-0">
      <ul class="list-none flex items-center justify-center gap-8 p-0 m-0">
        <template v-for="(item, index) in menuFooterItems" :key="index">
          <li class="flex items-center">
            <template v-if="item.link == '#'">
              <RouterLink class="font-400 color-blue hover:color-dark_blue transition-all" :to="item.link">
                {{ item.text }}
              </RouterLink>
            </template>
            <template v-else>
              <a
                class="font-400 color-blue hover:color-dark_blue transition-all"
                :href="item.link || ''"
                target="_self"
                rel="noopener"
              >
                {{ item.text }}
              </a>
            </template>
          </li>
          <span v-if="index !== menuFooterItems.length - 1" class="mx-2 text-gray-400">|</span>
        </template>
      </ul>
      <p class="copyright text-center mt-[30px] text-xs"></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import MainLogo from '@/assets/images/main-logo.vue'
  import { menuFooterItems } from '@/constants/common'
  import { RouterLink } from 'vue-router'
</script>
<style scoped lang="scss">
  .copyright::after {
    content: 'Copyright \00A9  2024 ITSO CO.,LTD. All Rights Reserved.';
    font-size: 12px;
    display: block;
    color: #4a4c56;
  }
</style>
