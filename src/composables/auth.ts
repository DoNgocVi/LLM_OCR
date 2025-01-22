import { MessageRenderMessage, MessageType, NAlert } from 'naive-ui'
import InfoIcon from '@/assets/images/icons/InfoIcon.vue'
import SuccessIcon from '@/assets/images/icons/SuccessIcon.vue'
import { Component } from 'vue'

const typeStyles: Record<MessageType, { backgroundColor: string; icon: Component | null }> = {
  success: {
    backgroundColor: '#11A572',
    icon: SuccessIcon
  },
  error: {
    backgroundColor: '#D8392F',
    icon: InfoIcon
  },
  default: {
    backgroundColor: '#FFFFFF',
    icon: null
  },
  loading: {
    backgroundColor: '#FFFFFF',
    icon: null
  },
  info: {
    backgroundColor: '#FFFFFF',
    icon: null
  },
  warning: {
    backgroundColor: '#FFFFFF',
    icon: null
  }
}
export const renderMessage: MessageRenderMessage = (props) => {
  const { type = 'default' } = props
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

  if (length < 4) {
    console.error('Password length must be at least 4 to include all required character types.')
  }

  // Make sure each required character type appears at least once
  const passwordArray = [
    lowerCase[Math.floor(Math.random() * lowerCase.length)],
    upperCase[Math.floor(Math.random() * upperCase.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    specialChars[Math.floor(Math.random() * specialChars.length)]
  ]

  // Fill in the remaining characters in the password
  for (let i = 4; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length)
    passwordArray.push(allChars[randomIndex])
  }

  // Scramble the password so that required characters are not at the beginning
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]]
  }

  return passwordArray.join('')
}
