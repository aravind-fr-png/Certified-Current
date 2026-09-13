import {
  reasonsNight,
  reasonsDay,
  reasonsWildcard,
  explanationsFreeNoPhoto,
  explanationsFreeWithPhoto,
  explanationsProNoPhoto,
  explanationsProWithPhoto,
} from '../data/content.js'

export function isDaytimeNow() {
  const h = new Date().getHours()
  return h >= 6 && h < 19
}

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v))
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Free vs Pro fictional probability ranges, nudged by photo + mini-quiz bonus.
export function computeModeScore(mode, hasPhoto, bonus = 0) {
  if (mode === 'ai') {
    const lo = hasPhoto ? 72 : 60
    const hi = 90
    const value = clamp(rand(lo, hi) + bonus, 55, 90)
    return { value, precise: false }
  }
  const lo = hasPhoto ? 96 : 90
  const hi = 99.999999999999999
  const value = clamp(rand(lo, hi) + bonus * 0.05, 90, 99.999999999999999)
  return { value, precise: true }
}

export function formatModeScore(scoreObj) {
  if (!scoreObj.precise) {
    return `${Math.round(scoreObj.value)}%`
  }
  if (scoreObj.value > 99.9) {
    return '99.999999999999999%'
  }
  return `${scoreObj.value.toFixed(6)}%`
}

export function pickExplanation(mode, hasPhoto) {
  if (mode === 'ai') {
    return pick(hasPhoto ? explanationsFreeWithPhoto : explanationsFreeNoPhoto)
  }
  return pick(hasPhoto ? explanationsProWithPhoto : explanationsProNoPhoto)
}

export function pickDiagnosis(isDay) {
  const pool = isDay
    ? [...reasonsDay, ...reasonsWildcard.slice(0, 2)]
    : [...reasonsNight, ...reasonsWildcard.slice(0, 2)]
  return pick(pool)
}

export function generateBlame(isDay, temp) {
  let overload = isDay ? rand(10, 30) : rand(35, 60)
  let transformer = rand(10, 30)
  let cosmic = rand(5, 20)
  let other = rand(10, 30)
  if (temp > 34) overload += 10
  const total = overload + transformer + cosmic + other
  return {
    overload: Math.round((overload / total) * 100),
    transformer: Math.round((transformer / total) * 100),
    cosmic: Math.round((cosmic / total) * 100),
    other: Math.round((other / total) * 100),
  }
}

export function buildGraphPoints(score) {
  const n = 8
  const points = []
  let cur = clamp(score - rand(15, 30), 2, 90)
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1)
    cur = cur + (score - cur) * (0.35 + t * 0.3) + rand(-4, 4)
    cur = clamp(cur, 2, 97)
    points.push(cur)
  }
  points[points.length - 1] = clamp(score, 2, 97)
  return points
}

// Builds the full fictional result object shown on the results screen.
export function buildResult({ mode, hasPhoto, bonus, temp }) {
  const isDay = isDaytimeNow()
  const scoreObj = computeModeScore(mode, hasPhoto, bonus)
  const display = formatModeScore(scoreObj)
  const statusLabel =
    scoreObj.value < 75 ? 'BUILDING UP' : scoreObj.value < 95 ? 'LIKELY SOON' : 'ALMOST CERTAIN'

  return {
    mode,
    isDay,
    scoreValue: scoreObj.value,
    display,
    statusLabel,
    explanation: pickExplanation(mode, hasPhoto),
    diagnosis: pickDiagnosis(isDay),
    blame: generateBlame(isDay, temp),
    graphPoints: buildGraphPoints(Math.min(scoreObj.value, 97)),
  }
}
