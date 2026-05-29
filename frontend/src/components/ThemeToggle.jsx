import useTheme from '../hooks/useTheme'
import styles from './ThemeToggle.module.css'

const ICONS = { auto: '◑', dark: '☾', light: '☀' }
const LABELS = { auto: 'Auto', dark: 'Dunkel', light: 'Hell' }

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button className={styles.btn} onClick={toggle} title={`Modus: ${LABELS[theme]}`}>
      {ICONS[theme]}
    </button>
  )
}
