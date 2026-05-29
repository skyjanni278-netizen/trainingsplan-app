import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../hooks/useApi'
import styles from './Stats.module.css'

export default function Stats() {
  const [stats, setStats] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/logs/stats').then(({ data }) => setStats(data)).catch(() => {})
  }, [])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button onClick={() => navigate('/')} className={styles.back}>← Dashboard</button>
        <h1 className={styles.title}>Statistiken</h1>
      </header>
      <main className={styles.main}>
        {!stats ? (
          <p className={styles.loading}>Lade…</p>
        ) : (
          <>
            <div className={styles.cards}>
              <div className={styles.card}>
                <span className={styles.cardValue}>{stats.streak}</span>
                <span className={styles.cardLabel}>Aktuelle Streak</span>
              </div>
              <div className={styles.card}>
                <span className={styles.cardValue}>{stats.maxStreak}</span>
                <span className={styles.cardLabel}>Längste Streak</span>
              </div>
              <div className={styles.card}>
                <span className={styles.cardValue}>{stats.totalWorkouts}</span>
                <span className={styles.cardLabel}>Trainings gesamt</span>
              </div>
            </div>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Completion Rate pro Monat</h2>
              {stats.completionByMonth.length === 0 ? (
                <p className={styles.empty}>Noch keine Daten vorhanden.</p>
              ) : (
                <div className={styles.bars}>
                  {stats.completionByMonth.map(({ month, rate }) => (
                    <div key={month} className={styles.barRow}>
                      <span className={styles.barLabel}>{month}</span>
                      <div className={styles.barBg}>
                        <div className={styles.barFill} style={{ width: `${rate}%` }} />
                      </div>
                      <span className={styles.barPct}>{rate}%</span>
                    </div>
                  ))}
                </div>
              )}
              <p className={styles.hint}>Recharts-Diagramme folgen in v0.7</p>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
