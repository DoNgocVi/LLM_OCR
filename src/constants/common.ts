import type { SelectOptions } from '@/types'

export const optionsLanguage: SelectOptions = [
  {
    value: 'en',
    label: 'English'
  },
  {
    value: 'ja',
    label: 'Japan'
  }
]

export const defaultOptionSelect: SelectOptions = [
  {
    label: "Everybody's Got Something to Hide Except Me and My Monkey",
    value: 'song0'
  },
  {
    label: 'Drive My Car',
    value: 'song1'
  }
]

export const menuFooterItems: {
  text: string
  link: string
}[] = [
  { text: '利用規約', link: '/policy' },
  { text: '運用会社', link: 'https://itso.co.jp/company/' },
  { text: 'お問い合わせ', link: 'https://itso.co.jp/contact/' }
]

export const accountOption: {
  label: string
  key: string
  link: string
}[] = [
  {
    label: 'パスワード再設定',
    key: 'my-account',
    link: '#'
  },
  {
    label: 'ログアウト',
    key: 'logout',
    link: '#'
  }
]

export const dataUsageOption: SelectOptions = [
  {
    label: '日',
    value: 'day'
  },
  {
    label: '週',
    value: 'week'
  },
  {
    label: '月',
    value: 'month'
  }
]

export const DEFAULT_DURATION_TOAST: number = 2000
export const DEFAULT_PAGE_SIZE: string = '50'
export const ALLOWED_FORMATS = '.pdf,.zip'
export const MAX_SIZE = 100 * 1024 * 1024 // 100MB
export const LOWER_CASE = 'abcdefghijklmnopqrstuvwxyz'
export const UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const SPECIAL_CHARS = '!@#$%^&*()_+[]{}|;:,.<>?'
export const DIGIT = '0123456789'