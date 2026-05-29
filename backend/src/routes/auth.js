const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db/database')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/register', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Username und Passwort erforderlich' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Passwort muss mindestens 6 Zeichen lang sein' })
  }

  const hash = bcrypt.hashSync(password, 10)
  try {
    const stmt = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)')
    const result = stmt.run(username, hash)
    const token = jwt.sign({ id: result.lastInsertRowid, username }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.status(201).json({ token, username })
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return res.status(409).json({ error: 'Username bereits vergeben' })
    }
    res.status(500).json({ error: 'Serverfehler' })
  }
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Username und Passwort erforderlich' })
  }

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username)
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Ungültige Anmeldedaten' })
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, username: user.username })
})

router.get('/me', auth, (req, res) => {
  const user = db.prepare('SELECT id, username, created_at FROM users WHERE id = ?').get(req.user.id)
  if (!user) return res.status(404).json({ error: 'Nicht gefunden' })
  res.json(user)
})

module.exports = router
