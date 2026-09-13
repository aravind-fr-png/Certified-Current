import { useMemo } from 'react'
import styles from './GraphChart.module.css'

const W = 400
const H = 150
const PAD_L = 30
const PAD_R = 14
const PAD_T = 16
const PAD_B = 22

function toXY(points) {
  const n = points.length
  const stepX = (W - PAD_L - PAD_R) / (n - 1)
  const toY = (v) => H - PAD_B - (v / 100) * (H - PAD_T - PAD_B)
  return points.map((v, i) => ({ x: PAD_L + stepX * i, y: toY(v), value: v }))
}

// Catmull-Rom to cubic-bezier smoothing so the trend line curves gently
// instead of joining points with hard angles.
function smoothPath(coords) {
  if (coords.length < 2) return ''
  let d = `M ${coords[0].x} ${coords[0].y}`
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[i - 1] || coords[i]
    const p1 = coords[i]
    const p2 = coords[i + 1]
    const p3 = coords[i + 2] || p2
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
  }
  return d
}

export default function GraphChart({ points, scoreValue }) {
  const { linePath, areaPath, coords, color, peak, avg, trendUp } = useMemo(() => {
    const coords = toXY(points)
    const line = smoothPath(coords)
    const area = `${line} L ${coords[coords.length - 1].x} ${H - PAD_B} L ${coords[0].x} ${H - PAD_B} Z`
    const c = scoreValue < 35 ? '#A6331E' : scoreValue < 65 ? '#C98D0F' : '#3C6E52'
    const peakVal = Math.max(...points)
    const avgVal = points.reduce((a, b) => a + b, 0) / points.length
    const up = points[points.length - 1] >= points[0]
    return { linePath: line, areaPath: area, coords, color: c, peak: peakVal, avg: avgVal, trendUp: up }
  }, [points, scoreValue])

  const gridLines = [0, 25, 50, 75, 100]
  const lastPoint = coords[coords.length - 1]
  const firstPoint = coords[0]

  return (
    <div className={styles.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={styles.svg}>
        <defs>
          <linearGradient id="gradFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {gridLines.map((g) => {
          const y = H - PAD_B - (g / 100) * (H - PAD_T - PAD_B)
          return (
            <g key={g}>
              <line
                x1={PAD_L}
                y1={y}
                x2={W - PAD_R}
                y2={y}
                stroke="#22201b"
                strokeOpacity={g === 0 ? 0.35 : 0.12}
                strokeWidth="1"
                strokeDasharray={g === 0 ? 'none' : '2 3'}
              />
              <text x={PAD_L - 6} y={y + 3} textAnchor="end" className={styles.axisLabel}>
                {g}
              </text>
            </g>
          )
        })}

        <path d={areaPath} fill="url(#gradFill)" stroke="none" />
        <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

        {coords.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === coords.length - 1 ? 4.5 : 2.5}
            fill={i === coords.length - 1 ? color : 'var(--paper)'}
            stroke={color}
            strokeWidth="1.5"
          />
        ))}

        <text x={lastPoint.x} y={lastPoint.y - 10} textAnchor="end" className={styles.pointLabel} fill={color}>
          {Math.round(lastPoint.value)}%
        </text>

        <text x={firstPoint.x} y={H - 6} textAnchor="start" className={styles.axisLabel}>
          Now
        </text>
        <text x={(firstPoint.x + lastPoint.x) / 2} y={H - 6} textAnchor="middle" className={styles.axisLabel}>
          +30m
        </text>
        <text x={lastPoint.x} y={H - 6} textAnchor="end" className={styles.axisLabel}>
          +1h
        </text>
      </svg>

      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Peak</span>
          <span className={styles.statValue}>{Math.round(peak)}%</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Average</span>
          <span className={styles.statValue}>{Math.round(avg)}%</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Trend</span>
          <span className={styles.statValue}>{trendUp ? '↑ Rising' : '↓ Falling'}</span>
        </div>
      </div>
    </div>
  )
}
