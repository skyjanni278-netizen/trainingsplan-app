import { useEffect, useState } from 'react'

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'auto'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'auto') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggle() {
    setTheme(prev => {
      if (prev === 'auto') return 'dark'
      if (prev === 'dark') return 'light'
      return 'auto'
    })
  }

  return { theme, toggle }
}
