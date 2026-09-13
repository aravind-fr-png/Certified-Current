import { useRef, useState } from 'react'
import styles from './Dropzone.module.css'

export default function Dropzone({ preview, onPhotoSelected, onPhotoCleared }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  function handleFiles(fileList) {
    const file = fileList && fileList[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      onPhotoSelected(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  function handleChange(e) {
    handleFiles(e.target.files)
  }

  function handleZoneClick() {
    inputRef.current?.click()
  }

  return (
    <div className={styles.wrap}>
      <label className={styles.fieldLabel}>Meter board / transformer photo</label>
      <div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
        onClick={handleZoneClick}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className={styles.hiddenInput}
          onChange={handleChange}
        />
        {preview ? (
          <div className={styles.previewRow}>
            <img src={preview} alt="Uploaded evidence" className={styles.previewThumb} />
            <div className={styles.previewText}>
              <b>Photo received</b>
              Evidence logged for the inspection file (not actually analysed)
            </div>
            <button
              type="button"
              className={styles.clearBtn}
              onClick={(e) => {
                e.stopPropagation()
                onPhotoCleared()
              }}
            >
              Remove
            </button>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.icon}>🔌</span>
            <div className={styles.placeholderText}>
              <b>Drag &amp; drop, or click to upload</b>
              For visual inspection (mostly decorative)
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
