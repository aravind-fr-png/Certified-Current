import Dropzone from './Dropzone.jsx'
import TempSlider from './TempSlider.jsx'
import styles from './UploadScreen.module.css'

export default function UploadScreen({
  preview,
  onPhotoSelected,
  onPhotoCleared,
  area,
  onAreaChange,
  temp,
  onTempChange,
  isDay,
  onGenerate,
}) {
  return (
    <div className={styles.sheet}>
      <div className={styles.hazardStrip} />
      <header className={styles.header}>
        <div className={`${styles.boardId} mono`}>
          <span>FORM NO. 27-B/LOAD</span>
          <span>CERTIFIED CURRENT</span>
        </div>
        <h1 className={styles.title}>
          Current varo?
          <span className={styles.subtitle}>
            Unofficial power-cut forecast — accuracy not guaranteed, blame accepted
          </span>
        </h1>
      </header>

      <div className={styles.section}>
        <Dropzone preview={preview} onPhotoSelected={onPhotoSelected} onPhotoCleared={onPhotoCleared} />
      </div>

      <div className={styles.section}>
        <label className={styles.fieldLabel}>General area / city</label>
        <input
          type="text"
          className={styles.textInput}
          placeholder="e.g. Kochi, Vytilla"
          value={area}
          onChange={(e) => onAreaChange(e.target.value)}
        />
      </div>

      <div className={styles.section}>
        <TempSlider temp={temp} onChange={onTempChange} isDay={isDay} />
      </div>

      <div className={styles.sectionLast}>
        <button className={styles.generateBtn} onClick={onGenerate}>
          File complaint &amp; get prediction
        </button>
      </div>
    </div>
  )
}
