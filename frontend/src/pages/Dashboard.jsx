import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../hooks/useApi'
import styles from './Dashboard.module.css'

const DAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
const PHASE_MONTHS = [5, 6, 7, 8, 9, 10, 11]
const PHASE_NAMES = ['Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']

function toISO(date) {
  return date.toISOString().slice(0, 10)
}

function getMonday(date) {
  const d = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1))
  return d
}

export default function Dashboard() {
  const today = toISO(new Date())
  const username = localStorage.getItem('username')
  const navigate = useNavigate()

  const [log, setLog] = useState({ workout_done: 0, workout_type: null, notes: null })
  const [supplements, setSupplements] = useState({ kreatin: 0, protein: 0, vitd: 0, magnesium: 0 })
  const [weekLogs, setWeekLogs] = useState([])
  const [activeTab, setActiveTab] = useState(new Date().getMonth())
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadDay()
    loadWeek()
  }, [])

  async function loadDay() {
    try {
      const { data } = await api.get(`/logs/${today}`)
      setLog(data.training)
      setSupplements(data.supplements)
    } catch {}
  }

  async function loadWeek() {
    try {
      const { data } = await api.get(`/logs/week/${today}`)
      setWeekLogs(data)
    } catch {}
  }

  async function toggleWorkout() {
    const next = log.workout_done ? 0 : 1
    setLog(prev => ({ ...prev, workout_done: next }))
    setSaving(true)
    try {
      await api.post(`/logs/${today}`, { workout_done: next, workout_type: log.workout_type })
      await loadWeek()
    } finally {
      setSaving(false)
    }
  }

  async function toggleSupplement(key) {
    const next = { ...supplements, [key]: supplements[key] ? 0 : 1 }
    setSupplements(next)
    setSaving(true)
    try {
      await api.post(`/logs/${today}`, next)
    } finally {
      setSaving(false)
    }
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  const suppKeys = ['kreatin', 'protein', 'vitd', 'magnesium']
  const suppLabels = { kreatin: 'Kreatin', protein: 'Protein', vitd: 'Vit D3', magnesium: 'Magnesium' }
  const totalTasks = 1 + suppKeys.length
  const doneTasks = (log.workout_done ? 1 : 0) + suppKeys.filter(k => supplements[k]).length
  const progress = Math.round((doneTasks / totalTasks) * 100)

  const currentMonth = new Date().getMonth()
  const phaseIdx = PHASE_MONTHS.indexOf(currentMonth)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.logo}>Trainingsplan</span>
        <nav className={styles.nav}>
          <button onClick={() => navigate('/stats')} className={styles.navBtn}>Statistiken</button>
          <span className={styles.username}>{username}</span>
          <button onClick={logout} className={styles.logoutBtn}>Abmelden</button>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.todaySection}>
          <div className={styles.todayHeader}>
            <h2 className={styles.todayTitle}>Heute</h2>
            <span className={styles.todayDate}>
              {new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>

          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <p className={styles.progressLabel}>{doneTasks} / {totalTasks} erledigt</p>

          <div className={styles.checkRow}>
            <button
              className={`${styles.checkBtn} ${log.workout_done ? styles.checked : ''}`}
              onClick={toggleWorkout}
              disabled={saving}
            >
              {log.workout_done ? '✓' : '○'}
            </button>
            <span className={styles.checkLabel}>
              {phaseIdx >= 0 ? `Training (Phase ${phaseIdx + 1})` : 'Training'}
            </span>
          </div>

          <div className={styles.supplements}>
            {suppKeys.map(key => (
              <div key={key} className={styles.checkRow}>
                <button
                  className={`${styles.checkBtn} ${styles.small} ${supplements[key] ? styles.checked : ''}`}
                  onClick={() => toggleSupplement(key)}
                  disabled={saving}
                >
                  {supplements[key] ? '✓' : '○'}
                </button>
                <span className={styles.checkLabel}>{suppLabels[key]}</span>
              </div>
            ))}
          </div>

          <div className={styles.weekRow}>
            {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((d, i) => {
              const entry = weekLogs[i]
              const done = entry?.workout_done
              const isToday = entry?.log_date === today
              return (
                <div key={d} className={`${styles.weekDay} ${isToday ? styles.weekToday : ''}`}>
                  <span className={styles.weekLabel}>{d}</span>
                  <span className={`${styles.weekDot} ${done ? styles.dotDone : ''}`} />
                </div>
              )
            })}
          </div>
        </section>

        <section className={styles.phases}>
          <div className={styles.tabs}>
            {PHASE_NAMES.map((name, i) => (
              <button
                key={i}
                className={`${styles.tab} ${activeTab === PHASE_MONTHS[i] ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(PHASE_MONTHS[i])}
              >
                {name}
              </button>
            ))}
          </div>
          <div className={styles.phaseInfo}>
            <p className={styles.phaseHint}>Phase {PHASE_MONTHS.indexOf(activeTab) + 1} — {PHASE_NAMES[PHASE_MONTHS.indexOf(activeTab)]}</p>
            <p className={styles.phaseDetail}>Detaillierte Phasenansicht folgt in v0.5</p>
          </div>
        </section>
      </main>
    </div>
  )
}
