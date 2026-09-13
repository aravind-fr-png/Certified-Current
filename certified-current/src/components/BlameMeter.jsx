import { useEffect, useState } from 'react'
import styles from './BlameMeter.module.css'

const ROWS = [
  { key: 'overload', label: 'Overload', cls: 'b1' },
  { key: 'transformer', label: 'Transformer fatigue', cls: 'b2' },
  { key: 'cosmic', label: 'Cosmic interference', cls: 'b3' },
  { key: 'other', label: 'Unpaid bill karma', cls: 'b4' },
]

export default function BlameMeter({ blame }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(false)
    const frame = requestAnimationFrame(() => setAnimated(true))
    return () => cancelAnimationFrame(frame)
  }, [blame])

  return (
    <div>
      <p className={styles.title}>Blame distribution</p>
      {ROWS.map((row) => (
        <div className={styles.row} key={row.key}>
          <div className={styles.labels}>
            <span>{row.label}</span>
            <span>{blame[row.key]}%</span>
          </div>
          <div className={styles.barBg}>
            <div
              className={`${styles.barFill} ${styles[row.cls]}`}
              style={{ width: animated ? `${blame[row.key]}%` : '0%' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
