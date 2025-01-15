<template>
  <div class="bg-main">
    <div class="bg-white h-[80px] border-b-1 border-b-solid border-b-grey_light pos-sticky top-0 left-0">
      <div class="header mx-a px-8 pr-9 max-w-[1346px] h-full flex items-center justify-between">
        <div>
          <MainLogo class="w-auto h-[40px]" />
        </div>
        <RouterLink to="/auth/login" class="flex items-center gap-2 cursor-pointer">
          <p class="text-dark_medium text-lg font-bold">ログイン</p>
          <ArrowCircleRight />
        </RouterLink>
      </div>
    </div>
    <div class="flex justify-center policy-wrapper">
      <div class="flex flex-col items-end mx-8 max-w-[1282px]">
        <div class="mt-10 bg-white px-8 pb-12 rounded-md border-1 border-solid border-grey_light text-black">
          <div class="policy-page">
            <div v-for="(policyData, index) in policyDataArray" :key="index" class="mt-12">
              <h2 class="text-2xl line-height-[36px] font-bold mb-4">{{ policyData.title }}</h2>
              <p class="text-sm leading-[21px]">{{ policyData.mainContent }}</p>
              <div v-for="section in policyData.sections" :key="section.id">
                <h3 class="text-lg font-semibold my-6">{{ section.title }}</h3>
                <p v-if="!!section.content" class="text-sm leading-[21px] mb-2">{{ section.content }}</p>
                <ol
                  type="1"
                  :class="{
                    'list-none': index === 1
                  }"
                >
                  <template v-for="subsection in section.subsections" :key="subsection.id">
                    <li
                      type="decimal"
                      :class="[
                        'text-sm',
                        'leading-[21px]',
                        !!section.content ? 'mb-0' : 'mb-2',
                        index === 1 ? 'mx-0' : !!section.content ? 'mx-8' : 'mx-4'
                      ]"
                    >
                      {{ subsection.content }}
                      <template v-if="subsection?.children">
                        <ol type="1">
                          <li v-for="child of subsection.children" class="text-sm leading-[21px] mx-4">
                            {{ child.content }}
                          </li>
                        </ol>
                      </template>
                    </li>
                  </template>
                </ol>
              </div>
              <p v-if="!!policyData.subContent" class="mt-6 text-sm">{{ policyData.subContent }}</p>
            </div>
          </div>
        </div>
        <div class="mt-5 pb-5 flex flex-wrap gap-8">
          <p class="copyright text-xs"></p>
          <ul class="list-none flex gap-8 text-grey">
            <li v-for="item of footerLinks">
              <a
                v-if="item"
                class="font-400 text-blue hover:text-dark_blue transition-all"
                :href="item.link || ''"
                target="_blank"
                rel="noopener"
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import ArrowCircleRight from '@/assets/images/icons/ArrowCircleRight.vue'
  import { menuFooterItems } from '@/constants/common'
  import MainLogo from '@assets/images/main-logo.vue'
  import policyDataJson from '@assets/data/policy.json'
  const policyDataArray = ref(policyDataJson)
  const footerLinks = computed(() => menuFooterItems.filter((item) => item.link !== '/policy'))
</script>
<style lang="css" scoped>
  .copyright::after {
    content: 'Copyright \00A9  2024 ITSO CO.,LTD. All Rights Reserved.';
    font-size: 12px;
    display: block;
    color: #4a4c56;
    line-height: 24px;
  }
  .policy-wrapper {
    max-height: calc(100vh - 80px);
    overflow-y: auto;
  }
</style>
