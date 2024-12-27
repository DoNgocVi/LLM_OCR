import {
  defineConfig,
  e,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(), // Mặc định (@unocss/preset-wind).
    presetAttributify(), // CSS trên DOM như 1 Attribute(@unocss/preset-attributify)
    presetIcons({
      scale: 1.2,
      warn: true
    }), // Sử dụng bất kỳ icon nào làm class or attribute.(@unocss/preset-icons)
    presetWebFonts({
      fonts: {
        sans: 'CustomNotoSansJP:400,500,600,700',
        mono: ['Fira Code', 'Fira Mono:400,700']
      }
    }) // sử dụng bất kì Font mà thư viện có sẵn hoặc có thể tự custome font (@unocss/preset-web-fonts)
  ],
  preflights: [
    {
      getCSS: () => `
      *, *::before, *::after, h1, h2, h3, h4, h5, h6, p {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    `
    }
  ],
  transformers: [
    transformerDirectives(), // @apply, @screen and theme() directive (@unocss/transformer-directives)
    transformerVariantGroup() // nhóm CSS lại với nhau => hover:(bg-gray-400 font-medium) (@unocss/transformer-variant-group)
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#3799DC',
        light: '#3B82F6',
        dark: '#1E3A8A'
      },
      secondary: {
        DEFAULT: '#6B7280',
        light: '#9CA3AF',
        dark: '#4B5563'
      },
      danger: '#EF4444',
      success: '#10B981',
      warning: '#F59E0B',
      main: '#F0F5F8',
      grey: '#5B5B5B',
      grey_light: '#D1D1D1',
      grey_dark: '#4A4C56',
      gray_dark: '#ACACAC',
      gray_light: '#858D9D',
      black: '#181818',
      dark_medium: '#4F4F4F',
      purple: '#7B61FF',
      blue: '#3799DC',
      dark_blue: "#1175BA ",
      red: '#ED584F'
    },
    breakpoints: {
      sm: '640px',
      md: '950px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  }
})
