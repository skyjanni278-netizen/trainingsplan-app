import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../hooks/useApi'
import styles from './Auth.module.css'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      return setError('Passwörter stimmen nicht überein')
    }
    setLoading(true)
    try {
      await api.post('/auth/register', { username, password })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'Registrierung fehlgeschlagen')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Trainingsplan</h1>
        <p className={styles.subtitle}>Konto erstellen</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="Benutzername"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Passwort (min. 6 Zeichen)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Passwort bestätigen"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Registrieren…' : 'Registrieren'}
          </button>
        </form>
        <p className={styles.link}>
          Bereits ein Konto? <Link to="/login">Anmelden</Link>
        </p>
      </div>
    </div>
  )
}
