import styles from './ModeSelector.module.css'

export default function ModeSelector({ mode, onChange }) {
  const isPro = mode === 'aipro'
  return (
    <div className={styles.row}>
      <div className={styles.selectWrap}>
        <span className="mono">PREDICTION MODE:</span>
        <select
          className={`${styles.select} ${isPro ? styles.proActive : ''}`}
          value={mode}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="ai">AI (Free)</option>
          <option value="aipro">AI-Pro (Monthly)</option>
        </select>
      </div>
      {isPro && <span className={styles.proBadge}>👑 PRO CONFIDENCE ENGAGED</span>}
    </div>
  )
}
