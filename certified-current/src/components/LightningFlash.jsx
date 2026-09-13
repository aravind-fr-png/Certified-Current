import styles from './LightningFlash.module.css'

export default function LightningFlash() {
  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.flash} />
      <span className={`${styles.bolt} ${styles.boltA}`}>⚡</span>
      <span className={`${styles.bolt} ${styles.boltB}`}>⚡</span>
    </div>
  )
}
