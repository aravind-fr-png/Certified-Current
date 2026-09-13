import styles from './QuestionModal.module.css'

export default function QuestionModal({ question, onAnswer }) {
  if (!question) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <p className={styles.eyebrow}>⚠ Unscheduled model input required</p>
        <p className={styles.question}>{question.text}</p>
        <div className={styles.options}>
          {question.options.map((opt) => (
            <button
              key={opt.label}
              className={styles.optionBtn}
              onClick={() => onAnswer(opt.bonus)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className={styles.footnote}>This answer is not stored, sent anywhere, or relevant.</p>
      </div>
    </div>
  )
}
