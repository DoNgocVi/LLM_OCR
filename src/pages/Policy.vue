<template>
  <div class="bg-main">
    <div class="bg-white h-[80px] border-b-1 border-b-solid border-b-grey_light pos-sticky top-0 left-0">
      <div class="header mx-a max-w-[1180px] h-full flex items-center justify-between">
        <div>
          <MainLogo class="w-[81px] h-[28px]" />
        </div>
        <RouterLink to="/auth/login" class="flex items-center gap-2 cursor-pointer">
          <p class="text-dark_medium text-lg font-bold">ログイン</p>
          <ArrowCircleRight />
        </RouterLink>
      </div>
    </div>
    <div v class="max-w-[1180px] mx-a">
      <div class="mt-10 bg-white px-5 py-8 rounded-md border-1 border-solid border-grey_light">
        <div class="policy-page">
          <h1 class="text-2xl line-height-[36px] font-bold mb-4">{{ policyData.title }}</h1>
          <p class="text-sm">{{ policyData.mainContent }}</p>
          <div v-for="section in policyData.sections" :key="section.id">
            <h2 class="text-lg font-semibold my-6">{{ section.title }}</h2>
            <p v-if="!!section.content" class="text-sm leading-[21px]">{{ section.content }}</p>
            <ol type="1">
              <template v-for="subsection in section.subsections" :key="subsection.id">
                <li type="decimal" class="text-sm leading-[21px] mx-4">
                  {{ subsection.content }}
                  <template v-if="subsection?.children">
                    <ol type="a">
                      <li v-for="child of subsection.children" class="text-sm leading-[21px] mx-4">
                        {{ child.content }}
                      </li>
                    </ol>
                  </template>
                </li>
              </template>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-a max-w-[1180px] mt-5 pb-5 flex items-center justify-end">
      <p class="copyright text-xs"></p>
      <ul class="list-none flex gap-6 text-grey ps-6">
        <li v-for="item of menuFooterItems">
          <template v-if="item.link !== '#'">
            <a
              class="font-400 text-blue hover:text-dark_blue transition-all"
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
<script lang="ts" setup>
  import ArrowCircleRight from '@/assets/images/icons/ArrowCircleRight.vue'
  import { menuFooterItems } from '@/constants/common'
  import MainLogo from '@assets/images/main-logo.vue'
  import policyDataJson from '@assets/data/policy.json'
  const policyData = ref(policyDataJson)
</script>
<style lang="css" scoped>
  .copyright::after {
    content: 'Copyright \00A9  2024 ITSO CO.,LTD. All Rights Reserved.';
    font-size: 12px;
    display: block;
    color: #4a4c56;
    line-height: 24px;
  }
</style>
