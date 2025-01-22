export const selectLocalLangue = () => {
  const currentLocal = Intl.DateTimeFormat().resolvedOptions().timeZone
  if (currentLocal === 'Asia/Tokyo') {
    return 'ja'
  }
  return 'en'
}
