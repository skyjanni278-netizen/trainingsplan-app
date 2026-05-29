const express = require('express')
const db = require('../db/database')
const auth = require('../middleware/auth')

const router = express.Router()

router.use(auth)

router.get('/stats', (req, res) => {
  const userId = req.user.id

  const logs = db.prepare(
    'SELECT log_date, workout_done FROM training_logs WHERE user_id = ? ORDER BY log_date ASC'
  ).all(userId)

  const total = logs.filter(l => l.workout_done).length

  let streak = 0
  let maxStreak = 0
  let current = 0
  const today = new Date().toISOString().slice(0, 10)

  const doneDates = new Set(logs.filter(l => l.workout_done).map(l => l.log_date))

  let d = new Date(today)
  while (doneDates.has(d.toISOString().slice(0, 10))) {
    streak++
    d.setDate(d.getDate() - 1)
  }

  let tempStreak = 0
  for (const log of logs) {
    if (log.workout_done) {
      tempStreak++
      if (tempStreak > maxStreak) maxStreak = tempStreak
    } else {
      tempStreak = 0
    }
  }

  const monthStats = {}
  for (const log of logs) {
    const month = log.log_date.slice(0, 7)
    if (!monthStats[month]) monthStats[month] = { done: 0, total: 0 }
    monthStats[month].total++
    if (log.workout_done) monthStats[month].done++
  }

  const completionByMonth = Object.entries(monthStats).map(([month, s]) => ({
    month,
    rate: Math.round((s.done / s.total) * 100)
  }))

  res.json({ streak, maxStreak, totalWorkouts: total, completionByMonth })
})

router.get('/week/:date', (req, res) => {
  const userId = req.user.id
  const date = new Date(req.params.date)
  const day = date.getDay()
  const monday = new Date(date)
  monday.setDate(date.getDate() - (day === 0 ? 6 : day - 1))

  const days = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    days.push(d.toISOString().slice(0, 10))
  }

  const rows = db.prepare(
    `SELECT tl.*, sl.kreatin, sl.protein, sl.vitd, sl.magnesium
     FROM training_logs tl
     LEFT JOIN supplement_logs sl ON sl.user_id = tl.user_id AND sl.log_date = tl.log_date
     WHERE tl.user_id = ? AND tl.log_date IN (${days.map(() => '?').join(',')})
    `
  ).all(userId, ...days)

  const byDate = {}
  for (const r of rows) byDate[r.log_date] = r
  const result = days.map(d => byDate[d] || { log_date: d, workout_done: 0, workout_type: null, kreatin: 0, protein: 0, vitd: 0, magnesium: 0 })

  res.json(result)
})

router.get('/:date', (req, res) => {
  const userId = req.user.id
  const { date } = req.params

  const training = db.prepare('SELECT * FROM training_logs WHERE user_id = ? AND log_date = ?').get(userId, date)
  const supplements = db.prepare('SELECT * FROM supplement_logs WHERE user_id = ? AND log_date = ?').get(userId, date)

  res.json({
    training: training || { log_date: date, workout_done: 0, workout_type: null, notes: null },
    supplements: supplements || { log_date: date, kreatin: 0, protein: 0, vitd: 0, magnesium: 0 }
  })
})

router.post('/:date', (req, res) => {
  const userId = req.user.id
  const { date } = req.params
  const { workout_done, workout_type, notes, kreatin, protein, vitd, magnesium } = req.body

  if (workout_done !== undefined || workout_type !== undefined || notes !== undefined) {
    db.prepare(`
      INSERT INTO training_logs (user_id, log_date, workout_done, workout_type, notes)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(user_id, log_date) DO UPDATE SET
        workout_done = excluded.workout_done,
        workout_type = excluded.workout_type,
        notes = excluded.notes
    `).run(userId, date, workout_done ? 1 : 0, workout_type || null, notes || null)
  }

  if (kreatin !== undefined || protein !== undefined || vitd !== undefined || magnesium !== undefined) {
    db.prepare(`
      INSERT INTO supplement_logs (user_id, log_date, kreatin, protein, vitd, magnesium)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(user_id, log_date) DO UPDATE SET
        kreatin = excluded.kreatin,
        protein = excluded.protein,
        vitd = excluded.vitd,
        magnesium = excluded.magnesium
    `).run(userId, date, kreatin ? 1 : 0, protein ? 1 : 0, vitd ? 1 : 0, magnesium ? 1 : 0)
  }

  res.json({ success: true })
})

module.exports = router
