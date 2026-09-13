import { useEffect, useRef, useState } from 'react'
import QuestionModal from './QuestionModal.jsx'
import { questions } from '../data/content.js'
import styles from './AnalyzingScreen.module.css'

const STAGES = [
  { at: 0, label: 'Initializing transformer inspection…' },
  { at: 20, label: 'Reading meter board evidence…' },
  { at: 45, label: 'Cross-referencing cosmic interference database…' },
  { at: 65, label: 'Calculating night-load spike probability…' },
  { at: 85, label: 'Finalizing confidence report…' },
]

function stageLabel(progress) {
  let label = STAGES[0].label
  for (const stage of STAGES) {
    if (progress >= stage.at) label = stage.label
  }
  return label
}

export default function AnalyzingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [question, setQuestion] = useState(null)
  const [paused, setPaused] = useState(false)
  const bonusRef = useRef(0)
  const askedRef = useRef(false)

  useEffect(() => {
    if (paused) return undefined

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return prev
        const next = Math.min(100, prev + Math.random() * 10 + 4)

        if (!askedRef.current && next >= 45) {
          askedRef.current = true
          setQuestion(questions[Math.floor(Math.random() * questions.length)])
          setPaused(true)
        }

        return next
      })
    }, 350)

    return () => clearInterval(interval)
  }, [paused])

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => onComplete(bonusRef.current), 500)
      return () => clearTimeout(timeout)
    }
    return undefined
  }, [progress, onComplete])

  function handleAnswer(bonus) {
    bonusRef.current += bonus
    setQuestion(null)
    setPaused(false)
  }

  const rounded = Math.round(progress)

  return (
    <div className={styles.sheet}>
      <div className={styles.hazardStrip} />
      <div className={styles.content}>
        <div className={styles.ring}>
          <span className={styles.ringPercent}>{rounded}%</span>
        </div>
        <p className={styles.heading}>Running Certified Current diagnostic</p>
        <p className={styles.stage}>{stageLabel(rounded)}</p>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${rounded}%` }} />
        </div>
      </div>
      <QuestionModal question={question} onAnswer={handleAnswer} />
    </div>
  )
}
