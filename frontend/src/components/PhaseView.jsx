import { SPORT_COLORS } from '../data/phases'
import styles from './PhaseView.module.css'

export default function PhaseView({ phase }) {
  if (!phase) return null

  return (
    <div className={styles.wrap}>
      <div className={styles.meta}>
        <div>
          <span className={styles.level} style={{ background: phase.col }}>{phase.lvl}</span>
          <p className={styles.desc}>{phase.desc}</p>
        </div>
        <div className={styles.kpis}>
          {phase.kpis.map(k => (
            <div key={k.l} className={styles.kpi}>
              <span className={styles.kpiVal}>{k.v}</span>
              <span className={styles.kpiLabel}>{k.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.week}>
        {phase.days.map(day => (
          <div key={day.n} className={styles.dayCard}>
            <div className={styles.dayDot} style={{ background: SPORT_COLORS[day.t] || '#888' }} />
            <span className={styles.dayName}>{day.n}</span>
            <span className={styles.dayLabel}>{day.l}</span>
            <span className={styles.dayDur}>{day.d}</span>
            {day.nt && <span className={styles.dayNote}>{day.nt}</span>}
          </div>
        ))}
      </div>

      <div className={styles.plans}>
        {[phase.planA, phase.planB].map(plan => (
          <div key={plan.title} className={styles.plan}>
            <h4 className={styles.planTitle}>{plan.title}</h4>
            <ul className={styles.exercises}>
              {plan.exercises.map(ex => (
                <li key={ex}>{ex}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {phase.cycling && (
        <p className={styles.cyclingNote}>{phase.cycling}</p>
      )}
    </div>
  )
}
