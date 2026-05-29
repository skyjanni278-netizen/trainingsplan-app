import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../hooks/useApi'
import PhaseView from '../components/PhaseView'
import { PHASES, PHASE_BY_MONTH, SPORT_COLORS } from '../data/phases'
import styles from './Dashboard.module.css'

function toISO(date) {
  return date.toISOString().slice(0, 10)
}

export default function Dashboard() {
  const today = toISO(new Date())
  const username = localStorage.getItem('username')
  const navigate = useNavigate()

  const currentMonth = new Date().getMonth()
  const currentPhaseIdx = PHASE_BY_MONTH[currentMonth] ?? null
  const currentPhase = currentPhaseIdx !== null ? PHASES[currentPhaseIdx] : null
  const todayWeekday = new Date().getDay()
  const dayIdx = todayWeekday === 0 ? 6 : todayWeekday - 1
  const todayPlan = currentPhase?.days[dayIdx] ?? null

  const [log, setLog] = useState({ workout_done: 0, workout_type: null })
  const [supplements, setSupplements] = useState({ kreatin: 0, protein: 0, vitd: 0, magnesium: 0 })
  const [weekLogs, setWeekLogs] = useState([])
  const [activePhaseId, setActivePhaseId] = useState(currentPhaseIdx ?? 0)
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
    const type = todayPlan?.t ?? log.workout_type
    setLog(prev => ({ ...prev, workout_done: next }))
    setSaving(true)
    try {
      await api.post(`/logs/${today}`, { workout_done: next, workout_type: type })
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

  const activePhase = PHASES[activePhaseId]

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

          {todayPlan && (
            <div className={styles.todayPlan}>
              <span
                className={styles.sportBadge}
                style={{ background: SPORT_COLORS[todayPlan.t] || '#888' }}
              >
                {todayPlan.l}
              </span>
              <span className={styles.planDur}>{todayPlan.d}</span>
              {todayPlan.nt && <span className={styles.planNote}>{todayPlan.nt}</span>}
            </div>
          )}

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
            <span className={styles.checkLabel}>Training abgehakt</span>
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
            {PHASES.map(phase => (
              <button
                key={phase.id}
                className={`${styles.tab} ${activePhaseId === phase.id ? styles.activeTab : ''}`}
                style={activePhaseId === phase.id ? { borderBottomColor: phase.col, color: phase.col } : {}}
                onClick={() => setActivePhaseId(phase.id)}
              >
                {phase.name}
              </button>
            ))}
          </div>
          <PhaseView phase={activePhase} />
        </section>
      </main>
    </div>
  )
}
