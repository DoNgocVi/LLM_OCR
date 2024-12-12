<template>
  <div class="h-screen flex flex-col justify-between items-center">
    <div class="flex flex-col items-center mt-36">
      <div style="color: black">
        <MainLogo class="w-[256px] h-[100px]" />
      </div>
      <router-view />
    </div>
    <footer class="mb-12">
      <ul class="list-none flex gap-24 color-purple">
        <li>ヘルプ</li>
        <li>利用規約</li>
        <li>運用会社</li>
        <li>お問い合わせ</li>
      </ul>
      <p class="color-black text-center mt-5 copyright"></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import MainLogo from '@/assets/images/main-logo.vue'
</script>
<style scoped lang="scss">
  .copyright::after {
    content: 'Copyright \00A9  2023 ITSO CO.,LTD. All Rights Reserved.'; /* Hoặc '© 2024 Your Company' */
    font-size: 14px;
    display: block;
  }
</style>
