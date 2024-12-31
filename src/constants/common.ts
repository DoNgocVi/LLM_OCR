export const optionsLanguage = [
  {
    value: 'en',
    label: 'English'
  },
  {
    value: 'ja',
    label: 'Japan'
  }
]

export const defaultOptionSelect: {
  label: string
  value: string
}[] = [
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
  link: string | null
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

export const dataUsageOption: {
  label: string
  value: string
}[] = [
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
