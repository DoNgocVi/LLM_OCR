import { MessageRenderMessage, NAlert } from 'naive-ui'
import InfoIcon from '@/assets/images/icons/InfoIcon.vue'
import SuccessIcon from '@/assets/images/icons/SuccessIcon.vue'
const typeStyles = {
  success: {
    backgroundColor: '#11A572',
    icon: SuccessIcon
  },
  error: {
    backgroundColor: '#D8392F',
    icon: InfoIcon
  },
  default: {
    backgroundColor: '#FFFFFF', // Default màu khác nếu cần
    icon: null
  },
  loading: {
    backgroundColor: '#FFFFFF', // Default màu khác nếu cần
    icon: null
  }
}
export const renderMessage: MessageRenderMessage = (props) => {
  const { type = 'default' } = props as { type: keyof typeof typeStyles }
  const style = {
    marginTop: '20px',
    boxShadow: 'var(--n-box-shadow)',
    maxWidth: 'calc(100vw - 32px)',
    minWidth: '650px',
    width: '480px',
    textAlign: 'center',
    backgroundColor: typeStyles[type]?.backgroundColor || '#FFFFFF',
    borderRadius: '8px'
  }

  return h(
    NAlert,
    {
      closable: true,
      onClose: props.onClose,
      type: type === 'loading' ? 'default' : type,
      showIcon: true,
      bordered: false,
      style
    },
    {
      default: () =>
        h(
          'div',
          {
            style: 'color: #fff; text-align: start; margin-left: 2px'
          },
          {
            default: () => props.content
          }
        ),
      icon: () =>
        h(type === 'error' ? InfoIcon : SuccessIcon, { style: { color: '#fff', fontSize: '24px', marginTop: '1px' } })
    }
  )
}

export const generatePassword = (length = 12) => {
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?'
  const allChars = lowerCase + upperCase + numbers + specialChars

  let password = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length)
    password += allChars[randomIndex]
  }
  return password
}
