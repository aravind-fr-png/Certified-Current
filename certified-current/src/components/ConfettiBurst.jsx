import { useMemo } from 'react'
import styles from './ConfettiBurst.module.css'

const COLORS = ['var(--hazard)', 'var(--copper)', 'var(--circuit)', 'var(--danger)', 'var(--ink)']

export default function ConfettiBurst({ count = 24 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1.6 + Math.random() * 1.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        width: 5 + Math.random() * 5,
        height: 8 + Math.random() * 6,
      })),
    [count],
  )

  return (
    <div className={styles.wrap} aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className={styles.piece}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            background: p.color,
            width: p.width,
            height: p.height,
          }}
        />
      ))}
    </div>
  )
}
