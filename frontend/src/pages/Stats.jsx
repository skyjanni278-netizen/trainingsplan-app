import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import api from '../hooks/useApi'
import styles from './Stats.module.css'

const MONTH_NAMES = {
  '01': 'Jan', '02': 'Feb', '03': 'Mär', '04': 'Apr',
  '05': 'Mai', '06': 'Jun', '07': 'Jul', '08': 'Aug',
  '09': 'Sep', '10': 'Okt', '11': 'Nov', '12': 'Dez'
}

function toISO(date) {
  return date.toISOString().slice(0, 10)
}

function buildCalendar(weekLogs) {
  const today = new Date()
  const weeks = []
  const start = new Date(today)
  start.setDate(today.getDate() - 7 * 8 + 1)
  const monday = new Date(start)
  const day = monday.getDay()
  monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1))

  const doneSet = new Set(weekLogs.filter(l => l.workout_done).map(l => l.log_date))

  let current = new Date(monday)
  for (let w = 0; w < 8; w++) {
    const week = []
    for (let d = 0; d < 7; d++) {
      const iso = toISO(current)
      week.push({ date: iso, done: doneSet.has(iso), future: current > today })
      current.setDate(current.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

export default function Stats() {
  const [stats, setStats] = useState(null)
  const [allLogs, setAllLogs] = useState([])
  const navigate = useNavigate()
  const today = toISO(new Date())

  useEffect(() => {
    api.get('/logs/stats').then(({ data }) => setStats(data)).catch(() => {})
    loadRecentLogs()
  }, [])

  async function loadRecentLogs() {
    const logs = []
    for (let i = 0; i < 8; i++) {
      const d = new Date()
      d.setDate(d.getDate() - i * 7)
      try {
        const { data } = await api.get(`/logs/week/${toISO(d)}`)
        logs.push(...data)
      } catch {}
    }
    setAllLogs(logs)
  }

  const calendar = buildCalendar(allLogs)

  const chartData = stats?.completionByMonth.map(({ month, rate }) => {
    const [y, m] = month.split('-')
    return { name: MONTH_NAMES[m] || month, rate }
  }) ?? []

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
              {chartData.length === 0 ? (
                <p className={styles.empty}>Noch keine Daten vorhanden.</p>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} unit="%" />
                    <Tooltip formatter={v => [`${v}%`, 'Completion']} />
                    <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, i) => (
                        <Cell key={i} fill={entry.rate >= 80 ? '#639922' : entry.rate >= 50 ? '#BA7517' : '#D85A30'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Trainings-Kalender (8 Wochen)</h2>
              <div className={styles.calendarWrap}>
                <div className={styles.dayLabels}>
                  {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(d => (
                    <span key={d} className={styles.dayLabel}>{d}</span>
                  ))}
                </div>
                <div className={styles.calendar}>
                  {calendar.map((week, wi) => (
                    <div key={wi} className={styles.calWeek}>
                      {week.map(({ date, done, future }) => (
                        <div
                          key={date}
                          title={date}
                          className={`${styles.calCell} ${done ? styles.calDone : ''} ${future ? styles.calFuture : ''} ${date === today ? styles.calToday : ''}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.legend}>
                <span className={`${styles.calCell} ${styles.calDone}`} /> Trainiert
                <span className={styles.calCell} /> Nicht trainiert
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
