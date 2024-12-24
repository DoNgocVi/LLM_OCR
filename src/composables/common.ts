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
