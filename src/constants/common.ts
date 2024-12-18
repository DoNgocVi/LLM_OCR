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
  link: string | null
}[] = [
  { text: '利用規約', link: '#' },
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

export const defaultDurationToast: number = 2000
