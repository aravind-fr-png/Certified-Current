import styles from './TempSlider.module.css'

export default function TempSlider({ temp, onChange, isDay }) {
  return (
    <div className={styles.wrap}>
      <label className={styles.fieldLabel}>Outside temperature</label>
      <div className={styles.row}>
        <input
          type="range"
          min={18}
          max={42}
          value={temp}
          onChange={(e) => onChange(Number(e.target.value))}
          className={styles.slider}
        />
        <span className={styles.value}>{temp}&deg;C</span>
      </div>
      <div className={styles.badge}>
        {isDay ? '\u2600 DETECTED: DAYTIME' : '\u263E DETECTED: NIGHT-TIME'}
      </div>
    </div>
  )
}
