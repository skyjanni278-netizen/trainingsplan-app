# Trainingsplan App

Persönliche Trainingsplan-Web-App mit Login, Tages-Tracking und Statistiken.

## Stack
- **Backend:** Node.js, Express, SQLite (better-sqlite3), JWT
- **Frontend:** React, Vite, Recharts
- **Deployment:** Raspberry Pi via nginx + systemd

## Setup

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Deployment (Raspberry Pi)
```bash
bash deploy/setup-pi.sh
```
