require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRoutes = require('./src/routes/auth')
const logsRoutes = require('./src/routes/logs')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/logs', logsRoutes)

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`)
})
