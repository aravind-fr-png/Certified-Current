import ModeSelector from './ModeSelector.jsx'
import GraphChart from './GraphChart.jsx'
import BlameMeter from './BlameMeter.jsx'
import ConfettiBurst from './ConfettiBurst.jsx'
import LightningFlash from './LightningFlash.jsx'
import vdsGif from '../assets/vds-kerala.gif'
import styles from './ResultScreen.module.css'

export default function ResultScreen({
  result,
  mode,
  onModeChange,
  area,
  onNotify,
  onShare,
  onRestart,
}) {
  if (!result) return null

  const isFree = mode === 'ai'
  const statusClass =
    result.scoreValue < 75 ? styles.mid : result.scoreValue < 95 ? styles.high : styles.high

  const tier = result.scoreValue >= 90 ? 'big' : result.scoreValue >= 80 ? 'small' : 'none'
  const isAbove85 = result.scoreValue > 85
  // Keyed on the score so the celebration replays whenever the mode/score changes.
  const celebrationKey = `${mode}-${result.display}`

  return (
    <div className={styles.sheet}>
      {tier !== 'none' && <ConfettiBurst key={celebrationKey} count={tier === 'big' ? 46 : 20} />}
      {tier === 'big' && <LightningFlash key={`bolt-${celebrationKey}`} />}
      <div className={styles.hazardStrip} />
      <div className={styles.content}>
        <div className={styles.stampRow}>
          <span className={`${styles.statusTag} ${statusClass}`}>{result.statusLabel}</span>
          <span className={styles.stamp}>{(area || 'AREA UNKNOWN').toUpperCase()}</span>
        </div>

        <ModeSelector mode={mode} onChange={onModeChange} />

        <div className={styles.scoreBlock}>
          <div className={`${styles.scoreNumber} ${!isFree ? styles.proGlow : ''}`}>
            {result.display}
          </div>
          <div className={styles.scoreCaption}>
            chance current returns in the next 1 hour
            {!result.isDay ? ' (night-load conditions active)' : ''}
          </div>
        </div>

        {isAbove85 && (
          <div className={styles.gifContainer}>
            <img
              src={vdsGif}
              alt="High confidence prediction reaction"
              className={styles.predictionGif}
              width={165}
              height={294}
            />
          </div>
        )}

        <div className={`${styles.explanation} ${!isFree ? styles.explanationPro : ''}`}>
          {result.explanation}
        </div>

        {isFree && (
          <div className={styles.upgradeBanner}>
            <span>Not confident enough? AI-Pro feels much better about this.</span>
            <button onClick={() => onModeChange('aipro')}>Upgrade ₹4999/mo</button>
          </div>
        )}

        <GraphChart points={result.graphPoints} scoreValue={result.scoreValue} />

        <div className={styles.diagnosisBox}>
          <span className={styles.diagLabel}>INSPECTION FINDING</span>
          <span>{result.diagnosis}</span>
        </div>

        <BlameMeter blame={result.blame} />

        <div className={styles.actions}>
          <button onClick={onNotify}>🔔 Notify me</button>
          <button onClick={onShare}>📤 Share</button>
        </div>

        <button className={styles.restartBtn} onClick={onRestart}>
          Re-file complaint &amp; re-predict
        </button>

        {isFree && (
          <div className={styles.finalUpgradeMsg}>
            🔒 Free AI is capped at ~90% confidence. Upgrade to <b>AI-Pro</b> for near-certain
            (fictional) results and ultra-confident transformer intelligence.
          </div>
        )}

        <p className={styles.disclaimer}>
          Prediction Mode percentages are randomly generated for entertainment only — free or
          paid, neither mode analyses your photo, your grid, or reality in any way.
        </p>
      </div>
    </div>
  )
}
