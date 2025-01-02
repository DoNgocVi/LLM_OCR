import CustomButton from '@/components/CustomButton.vue'
import CustomSelect from '@/components/CustomSelect.vue'
import { optionsDownload } from '@/constants/dashboard'
import { useCommonStore } from '@/stores/commonStore'
import { Close } from '@vicons/ionicons5'
import { useModal } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { ref, h } from 'vue'

import { i18n } from '@/main'
const t = i18n.global.t

const commonStore = useCommonStore()
const typeDownload = ref<string>(optionsDownload[0].value)

export type SettingModalType = {
  content?: string
  title: string
  type: 'error' | 'default' | 'secondary'
  onDelete?: () => void,
  onDownload?: (typeDownload: string) => void,
}
const { loadingDelete, loadingDownload } = storeToRefs(commonStore)
export const generateThemeOverrides = (baseProperties: Record<string, string>): Record<string, string> => {
  const states = ['Hover', 'Focus', 'Pressed']
  const overrides: Record<string, string> = { ...baseProperties }

  states.forEach((state) => {
    Object.keys(baseProperties).forEach((key) => {
      overrides[`${key}${state}`] = baseProperties[key]
    })
  })

  return overrides
}

export const showModalDeleteRow = (modal: ReturnType<typeof useModal>, setting: SettingModalType) => {
  const m = modal.create({
    title: () => {
      return h('div', { class: 'flex items-center justify-center gap-2' }, [
        h('div', { class: 'text-black font-bold text-[20px]' }, setting.title)
      ])
    },
    content: () => {
      return h('div', { class: 'mt-2 flex items-center justify-center gap-2', style: 'margin-top: -12px; padding-bottom: 4px' }, [
        h('div', { class: 'text-sm text-[#5B5B5B]' }, setting.content)
      ])
    },
    preset: 'card',
    maskClosable: false,
    closable: false,
    autoFocus: false,
    transformOrigin: 'center',
    style: {
      width: '400px',
      paddingBlockEnd: '12px',
      borderRadius: '10px',
    },
    headerExtra: () =>
      h('div', { class: 'flex items-center pos-relative' }, [
        h(
          'div',
          {
            class:
              'pos-absolute rounded-full bg-[#D1D1D1] hover:bg-gray_dark w-[32px] h-[32px] flex items-center justify-center cursor-pointer transition-all',
            style: 'right: -26px; top: -74px',
            onClick: () => m.destroy()
          },
          [h(Close, { class: 'text-green', style: 'width: 18px' })]
        )
      ]),
    footer: () =>
      h('div', { class: 'flex justify-end gap-2' }, [
        h(CustomButton, { type: 'default', content: 'キャンセル', onClick: () => m.destroy() }),
        h(CustomButton, {
          loading: loadingDelete.value,
          type: setting.type,
          content: '削除する',
          onClick: async () => {
            if (setting?.onDelete) {
              await setting?.onDelete()
            }
            m.destroy()
          }
        })
      ])
  })
}

export const showModalDownloadCSV = (modal: ReturnType<typeof useModal>, setting: SettingModalType) => {
  const m = modal.create({
    title: () => {
      return h('div', { class: 'flex items-center gap-2' }, [
        h('div', { class: 'text-black font-bold text-[20px]' }, setting.title)
      ])
    },
    content: () => {
      return h('div', { class: 'mt-2 flex flex-col', style: 'margin-top: -12px; padding-bottom: 4px;' }, [
        h('div', { class: 'text-sm text-[#5B5B5B]', style: 'padding-bottom: 24px;' }, setting.content),
        h(CustomSelect, {
          options: optionsDownload,
          style: 'width: 170px',
          value: typeDownload.value,
          'onUpdate:value': (newValue) => {
            typeDownload.value = newValue
          }
        })
      ])
    },
    preset: 'card',
    maskClosable: false,
    closable: false,
    autoFocus: false,
    transformOrigin: 'center',
    style: {
      width: '400px',
      paddingBlockEnd: '28px',
      borderRadius: '10px'
    },
    headerExtra: () =>
      h('div', { class: 'flex items-center pos-relative' }, [
        h(
          'div',
          {
            class:
              'pos-absolute rounded-full bg-[#D1D1D1] hover:bg-gray_dark w-[32px] h-[32px] flex items-center justify-center cursor-pointer transition-all',
            style: 'right: -26px; top: -74px',
            onClick: () => m.destroy()
          },
          [h(Close, { class: 'text-green', style: 'width: 18px' })]
        )
      ]),
    footer: () =>
      h('div', { class: 'flex justify-end gap-2' }, [
        h(CustomButton, { type: 'default', content: t('common.cancel'), onClick: () => m.destroy() }),
        h(CustomButton, {
          loading: loadingDownload.value,
          type: setting.type,
          content: t('dashboard.job.modal_btn_download'),
          onClick: async () => {
            if (setting?.onDownload) {
              await setting?.onDownload(typeDownload.value)
              typeDownload.value = optionsDownload[0].value
            }
            m.destroy()
          }
        })
      ])
  })
}

export const formatPhoneNumber = (value: string, isPostCode: boolean = false) => {
  const numericValue = value.replace(/[^0-9]/g, '')
  let formattedValue
  // format phone number
  if ((numericValue.length === 10 && !isPostCode) || (numericValue.length === 11 && !isPostCode)) {
    formattedValue =
      numericValue.length === 10
        ? numericValue.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3') // 10
        : numericValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') // 11
    return formattedValue
  }
  // format post code
  else if (numericValue.length === 7 && isPostCode) {
    formattedValue = numericValue.replace(/(\d{3})(\d{4})/, '$1-$2')
    return formattedValue
  } else {
    return false
  }
}
