export const PHASES = [
  {
    id: 0, name: 'Juni', col: '#639922', lvl: 'Beginner',
    desc: 'Rad und Laufen auf Phase-2-Niveau. Calisthenics mit Grundübungen starten.',
    kpis: [
      { l: 'Trainingstage', v: '5/Woche' },
      { l: 'Rad km/Woche', v: '90–115 km' },
      { l: 'Gym-Level', v: 'Beginner' }
    ],
    days: [
      { n: 'Mo', t: 'gym',      l: 'Push Tag',       d: '60–70 min', nt: 'Brust, Schultern, Trizeps' },
      { n: 'Di', t: 'cycling',  l: 'Fahrrad Zone 2', d: '45–60 min', nt: '25–30 km' },
      { n: 'Mi', t: 'running',  l: 'Laufen Easy',    d: '30–35 min', nt: 'Lockeres Tempo' },
      { n: 'Do', t: 'gym',      l: 'Pull Tag',       d: '60–70 min', nt: 'Rücken, Bizeps' },
      { n: 'Fr', t: 'cycling',  l: 'Intervalle',     d: '60 min',    nt: '3×5 min Zone 4' },
      { n: 'Sa', t: 'cycling',  l: 'Lange Ausfahrt', d: '75–90 min', nt: '40–55 km' },
      { n: 'So', t: 'rest',     l: 'Ruhetag',        d: '—',         nt: '' }
    ],
    planA: {
      title: 'Plan A – Push & Beine (Mo)',
      exercises: ['Push-ups 3×10–12','Negative Pull-ups 3×5–6','Bench Dips 3×10','Air Squats 3×15','Plank 3×30 Sek.','Hollow Body Hold 3×20 Sek.']
    },
    planB: {
      title: 'Plan B – Pull & Core (Do)',
      exercises: ['Diamond Push-ups 3×8','Langsame Neg. Pull-ups 3×5','Chair Dips 3×10','Reverse Lunges 3×12/Seite','Mountain Climbers 3×20','Dead Bug 3×10/Seite']
    },
    cycling: '3 Ausfahrten/Woche. Di: 3×5 min Zone 4 (163–177 bpm). Woche 4: Deload −20%.'
  },
  {
    id: 1, name: 'Juli', col: '#BA7517', lvl: 'Aufbau',
    desc: 'Volumen und Intervalle steigen. Erste echte Pull-ups und Dips.',
    kpis: [
      { l: 'Trainingstage', v: '5–6/Woche' },
      { l: 'Rad km/Woche', v: '100–130 km' },
      { l: 'Gym-Level', v: 'Aufbau' }
    ],
    days: [
      { n: 'Mo', t: 'calisthenics', l: 'Calisthenics A', d: '70 min',     nt: '4 Sätze' },
      { n: 'Di', t: 'cycling',      l: 'Intervalle',      d: '60 min',     nt: '4×5 min Zone 4' },
      { n: 'Mi', t: 'running',      l: 'Laufen Easy',     d: '30–35 min',  nt: 'Lockeres Tempo' },
      { n: 'Do', t: 'calisthenics', l: 'Calisthenics B',  d: '70 min',     nt: 'Schwerere Varianten' },
      { n: 'Fr', t: 'cycling',      l: 'Zone 2 Steady',   d: '75 min',     nt: '45–55 km' },
      { n: 'Sa', t: 'cycling',      l: 'Lange Ausfahrt',  d: '100–120 min',nt: '55–70 km' },
      { n: 'So', t: 'rest',         l: 'Ruhetag',         d: '—',          nt: '' }
    ],
    planA: {
      title: 'Push Tag (Mo) – Brust, Schultern, Trizeps',
      exercises: ['Bankdrücken 4×8–10','Schulterdrücken (KH) 4×10','Schrägbank KH 4×10','Trizeps-Dips 4×12','Seitenheben 4×15','Kabelzug Flyes 4×12']
    },
    planB: {
      title: 'Pull Tag (Do) – Rücken, Bizeps',
      exercises: ['Klimmzüge oder Lat Pulldown 4×8–10','Langhantel Rudern 4×10','Seated Cable Row 4×12','EZ-Curls 4×10','Hammer Curls 4×12']
    },
    cycling: 'Di: 4×5 min Zone 4. Sa: Zone 2–3. Woche 8: Deload −25%.'
  },
  {
    id: 2, name: 'August', col: '#D85A30', lvl: 'Intermediate',
    desc: 'Höchstes Outdoor-Volumen. Erste Skill-Elemente. Sonntag: Pflicht-Erholung.',
    kpis: [
      { l: 'Trainingstage', v: '6/Woche' },
      { l: 'Rad km/Woche', v: '150–180 km' },
      { l: 'Gym-Level', v: 'Intermediate' }
    ],
    days: [
      { n: 'Mo', t: 'gym',          l: 'Push Tag',       d: '75–85 min', nt: 'Compound-Fokus, schwer' },
      { n: 'Di', t: 'cycling',      l: 'Intervalle',     d: '75 min',    nt: '5×5 min Zone 4' },
      { n: 'Mi', t: 'running',      l: 'Tempolauf',      d: '35–40 min', nt: 'Tempo-Blöcke' },
      { n: 'Do', t: 'calisthenics', l: 'Calisthenics B', d: '75 min',    nt: 'Skill-Arbeit' },
      { n: 'Fr', t: 'cycling',      l: 'Zone 2 Steady',  d: '90 min',    nt: '50–60 km' },
      { n: 'Sa', t: 'cycling',      l: 'Große Tour',     d: '2–2,5 Std.',nt: '70–90 km, Hügel' },
      { n: 'So', t: 'recovery',     l: 'Aktive Erholung',d: '30 min',    nt: 'Dehnen, Foam Rolling' }
    ],
    planA: {
      title: 'Push Tag (Mo) – Compound schwer',
      exercises: ['Bankdrücken 4×6–8','Overhead Press 4×8','Schrägbank KH 4×10','Weighted Dips 4×10','Close-Grip Bench 4×10','Seitenheben 4×15']
    },
    planB: {
      title: 'Pull Tag (Do) – Rücken, Bizeps',
      exercises: ['Weighted Pull-ups 4×6–8','Langhantel Rudern 4×6–8','T-Bar Rudern 4×10','Face Pulls 4×15','EZ-Curls 4×10','Hammer Curls 4×12']
    },
    cycling: 'Di: 5×5 min Zone 4. Optional Zone 5. Sa: Hügel. Woche 12: Deload −30%.'
  },
  {
    id: 3, name: 'September', col: '#1D9E75', lvl: 'Intermediate',
    desc: 'Outdoor-Gipfel. Ab Mitte September Zwift als Backup. Taper für Event.',
    kpis: [
      { l: 'Trainingstage', v: '5–6/Woche' },
      { l: 'Rad km/Woche', v: '150–200 km' },
      { l: 'Gym-Level', v: 'Intermediate+' }
    ],
    days: [
      { n: 'Mo', t: 'calisthenics', l: 'Calisthenics A',   d: '75 min',     nt: 'Peak Outdoor' },
      { n: 'Di', t: 'cycling',      l: 'HIIT Rad',          d: '60 min',     nt: '6×3 min Zone 5' },
      { n: 'Mi', t: 'running',      l: 'Tempolauf',         d: '40 min',     nt: '5-km-Tempo' },
      { n: 'Do', t: 'calisthenics', l: 'Calisthenics B',    d: '75 min',     nt: 'Advanced Skills' },
      { n: 'Fr', t: 'cycling',      l: 'Schwellentraining', d: '90 min',     nt: '55–65 km, Zone 3' },
      { n: 'Sa', t: 'cycling',      l: 'Große Tour / Event',d: '2,5–3 Std.', nt: '80–100+ km' },
      { n: 'So', t: 'rest',         l: 'Ruhetag',           d: '—',          nt: '' }
    ],
    planA: {
      title: 'Push Tag (Mo) – 5×5 Kraftblock',
      exercises: ['Bankdrücken 5×5','Overhead Press 5×5','Schrägbank KH 4×10','Weighted Dips 4×10','Cable Flyes 4×12','Seitenheben 4×15']
    },
    planB: {
      title: 'Pull Tag (Do) – 5×5 Kraftblock',
      exercises: ['Weighted Pull-ups 5×5','Langhantel Rudern 5×5','Seated Cable Row 4×10','Face Pulls 4×15','Preacher Curls 4×10','Reverse Curls 4×12']
    },
    cycling: 'Di: VO2max 6×3 min Zone 5. Woche 16: Taper −40%.'
  },
  {
    id: 4, name: 'Oktober', col: '#378ADD', lvl: 'Advanced',
    desc: 'Übergang Outdoor/Zwift. Erste OAP-Progressionen und Back Lever.',
    kpis: [
      { l: 'Trainingstage', v: '5/Woche' },
      { l: 'Rad km/Woche', v: '115–150 km' },
      { l: 'Gym-Level', v: 'Advanced' }
    ],
    days: [
      { n: 'Mo', t: 'calisthenics', l: 'Calisthenics A',  d: '75 min',    nt: 'OAP Progressionen' },
      { n: 'Di', t: 'zwift',        l: 'Zwift Intervalle', d: '60 min',    nt: '3×8 min Sweet Spot' },
      { n: 'Mi', t: 'running',      l: 'Laufen',           d: '35 min',    nt: 'Herbst-Tempo' },
      { n: 'Do', t: 'calisthenics', l: 'Calisthenics B',   d: '75 min',    nt: 'Lever & Skill' },
      { n: 'Fr', t: 'zwift',        l: 'Zwift / Outdoor',  d: '60–75 min', nt: 'Zone 2' },
      { n: 'Sa', t: 'cycling',      l: 'Outdoor / Zwift',  d: '90–120 min',nt: '60–80 km' },
      { n: 'So', t: 'rest',         l: 'Ruhetag',          d: '—',         nt: '' }
    ],
    planA: {
      title: 'Push Tag (Mo) – Maximalkraft',
      exercises: ['Bankdrücken 5×4–5 (schwer)','Overhead Press 4×6','Incline Bench 4×8','Weighted Dips 4×10','Skull Crushers 4×10','Cable Crossover 4×12']
    },
    planB: {
      title: 'Pull Tag (Do) – Maximalkraft',
      exercises: ['Weighted Pull-ups 5×4–6','Langhantel Rudern 5×5','Chest-Supported Row 4×8','Face Pulls 4×15','Hammer Curls 4×12','Reverse Curls 4×12']
    },
    cycling: 'Zwift Sweet Spot (88–93% FTP). Outdoor ≥5°C. Woche 20: Deload −25%.'
  },
  {
    id: 5, name: 'November', col: '#534AB7', lvl: 'Skill-Focus',
    desc: 'Vollständige Zwift-Phase. HSPU, Front Lever, Muscle-ups. Vitamin D3 wichtig.',
    kpis: [
      { l: 'Trainingstage', v: '5/Woche' },
      { l: 'Rad km/Woche', v: '90–115 km' },
      { l: 'Gym-Level', v: 'Skill-Focus' }
    ],
    days: [
      { n: 'Mo', t: 'calisthenics', l: 'Calisthenics A',       d: '80 min', nt: 'HSPU-Fokus' },
      { n: 'Di', t: 'zwift',        l: 'Zwift FTP-Intervalle', d: '60 min', nt: '2×20 min 95% FTP' },
      { n: 'Mi', t: 'running',      l: 'Laufen',               d: '30 min', nt: 'Optional' },
      { n: 'Do', t: 'calisthenics', l: 'Calisthenics B',       d: '80 min', nt: 'Lever & Muscle-up' },
      { n: 'Fr', t: 'zwift',        l: 'Zwift Sweet Spot',     d: '75 min', nt: 'Ausdauer halten' },
      { n: 'Sa', t: 'zwift',        l: 'Zwift Zone 2',         d: '90 min', nt: 'Langer Block' },
      { n: 'So', t: 'rest',         l: 'Ruhetag',              d: '—',      nt: '' }
    ],
    planA: {
      title: 'Push Tag (Mo) – Strength Peak',
      exercises: ['Bankdrücken 5×3–5','Overhead Press 5×3–5','Schrägbank 4×8','Weighted Dips 5×8','Lateral Raises 4×15','Trizeps Pushdown 4×12']
    },
    planB: {
      title: 'Pull Tag (Do) – Strength Peak',
      exercises: ['Weighted Pull-ups 5×3–5','Langhantel Rudern 5×5','Kabel Rudern 4×10','Face Pulls 4×15','EZ-Curls 4×10','Preacher Curl 4×10']
    },
    cycling: 'FTP-Intervalle 2×20 min bei 95% FTP. Woche 24: Deload −25%.'
  },
  {
    id: 6, name: 'Dezember', col: '#5F5E5A', lvl: 'Peak',
    desc: 'Fitness halten, Stärken zementieren. Bestleistungen testen. Ziele 2026 setzen.',
    kpis: [
      { l: 'Trainingstage', v: '4–5/Woche' },
      { l: 'Rad km/Woche', v: '70–100 km' },
      { l: 'Gym-Level', v: 'Peak' }
    ],
    days: [
      { n: 'Mo', t: 'gym',          l: 'Push Tag',      d: '80 min',    nt: 'Bestleistung testen' },
      { n: 'Di', t: 'zwift',        l: 'Zwift',         d: '60 min',    nt: 'Flexibel' },
      { n: 'Mi', t: 'running',      l: 'Laufen',        d: '30 min',    nt: 'Optional' },
      { n: 'Do', t: 'calisthenics', l: 'Calisthenics B',d: '80 min',    nt: 'Skill-Test' },
      { n: 'Fr', t: 'zwift',        l: 'Zwift Zone 2',  d: '60 min',    nt: 'Aktiv bleiben' },
      { n: 'Sa', t: 'zwift',        l: 'Zwift / Frei',  d: '60–90 min', nt: 'Feiertage: flexibel' },
      { n: 'So', t: 'rest',         l: 'Ruhetag',       d: '—',         nt: '' }
    ],
    planA: {
      title: 'Push Tag (Mo) – Bestleistung',
      exercises: ['Bankdrücken 5×5 (max. Gewicht)','Overhead Press 5×5','Schrägbank KH 4×8','Dips max. Sätze 4×','Cable Flyes 4×12','Seitenheben 4×15']
    },
    planB: {
      title: 'Pull Tag (Do) – Bestleistung',
      exercises: ['Weighted Pull-ups 5×5 (max.)','Langhantel Rudern 5×5','Seated Row 4×10','Face Pulls 4×15','Curl-Variante 4×10 (frei)','Hammer Curls 4×12']
    },
    cycling: 'Zone 2 + Sweet Spot. Weihnachtswoche: Volumen halbieren.'
  }
]

export const PHASE_BY_MONTH = { 5: 0, 6: 1, 7: 2, 8: 3, 9: 4, 10: 5, 11: 6 }

export const SPORT_COLORS = {
  cycling:     '#639922',
  zwift:       '#378ADD',
  gym:         '#BA7517',
  calisthenics:'#D85A30',
  running:     '#D85A30',
  recovery:    '#1D9E75',
  rest:        '#888780'
}
