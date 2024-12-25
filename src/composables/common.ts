import CustomButton from '@/components/CustomButton.vue'
import Header from '@/layouts/Header.vue'
import { Close } from '@vicons/ionicons5'
import { useModal } from 'naive-ui'

type settingModal = {
  content?: string
  title: string
  type: 'error' | 'default'
}
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

export const showModalDeleteRow = (modal: ReturnType<typeof useModal>, setting: settingModal) => {
  const m = modal.create({
    title: () => {
      return h('div', { class: 'flex items-center justify-center gap-2' }, [
        h('div', { class: 'text-black font-bold text-[20px]' }, setting.title)
      ])
    },
    content: () => {
      return h('div', { class: 'mt-2 flex items-center justify-center gap-2', style: 'margin-top: -12px' }, [
        h('div', { class: 'text-sm text-[#5B5B5B]' }, setting.content)
      ])
    },
    preset: 'card',
    maskClosable: false,
    closable: false,
    autoFocus: false,
    transformOrigin: 'center',
    style: {
      width: '400px'
    },
    headerExtra: () =>
      h('div', { class: 'flex items-center pos-relative' }, [
        h(
          'div',
          {
            class:
              'pos-absolute -top-[70px] -right-[38px] rounded-full bg-[#D1D1D1] hover:bg-gray_dark w-[32px] h-[32px] flex items-center justify-center cursor-pointer transition-all',
            onClick: () => m.destroy()
          },
          [h(Close, { class: 'text-#181818 h-[18px]' })]
        )
      ]),
    footer: () =>
      h('div', { class: 'flex justify-end gap-2' }, [
        h(CustomButton, { type: 'default', content: 'キャンセル', onClick: () => m.destroy() }, 'Cancel'),
        h(CustomButton, { type: setting.type, content: '削除する', onClick: () => m.destroy() }, 'Delete')
      ])
  })
}
