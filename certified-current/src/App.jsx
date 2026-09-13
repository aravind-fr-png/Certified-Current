import { useCallback, useEffect, useState } from 'react'
import UploadScreen from './components/UploadScreen.jsx'
import AnalyzingScreen from './components/AnalyzingScreen.jsx'
import ResultScreen from './components/ResultScreen.jsx'
import Toast from './components/Toast.jsx'
import { buildResult, isDaytimeNow } from './utils/predictionEngine.js'
import './App.css'

export default function App() {
  const [screen, setScreen] = useState('upload') // 'upload' | 'analyzing' | 'result'
  const [preview, setPreview] = useState(null)
  const [area, setArea] = useState('')
  const [temp, setTemp] = useState(30)
  const [mode, setMode] = useState('ai')
  const [result, setResult] = useState(null)
  const [toast, setToast] = useState(null)

  const isDay = isDaytimeNow()

  useEffect(() => {
    if (!toast) return undefined
    const timeout = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(timeout)
  }, [toast])

  function handleGenerate() {
    setScreen('analyzing')
  }

  const handleAnalysisComplete = useCallback(
    (bonus) => {
      const next = buildResult({ mode, hasPhoto: Boolean(preview), bonus, temp })
      setResult(next)
      setScreen('result')
    },
    [mode, preview, temp],
  )

  function handleModeChange(nextMode) {
    setMode(nextMode)
    if (result) {
      const next = buildResult({ mode: nextMode, hasPhoto: Boolean(preview), bonus: 0, temp })
      setResult(next)
    }
  }

  function handleRestart() {
    setScreen('analyzing')
  }

  return (
    <div className="app-shell">
      {screen === 'upload' && (
        <UploadScreen
          preview={preview}
          onPhotoSelected={setPreview}
          onPhotoCleared={() => setPreview(null)}
          area={area}
          onAreaChange={setArea}
          temp={temp}
          onTempChange={setTemp}
          isDay={isDay}
          onGenerate={handleGenerate}
        />
      )}

      {screen === 'analyzing' && <AnalyzingScreen onComplete={handleAnalysisComplete} />}

      {screen === 'result' && (
        <ResultScreen
          result={result}
          mode={mode}
          onModeChange={handleModeChange}
          area={area}
          onNotify={() => setToast('You will be notified. (You will not actually be notified.)')}
          onShare={() => setToast('Forecast copied to clipboard for the family group.')}
          onRestart={handleRestart}
        />
      )}

      <Toast message={toast} />
    </div>
  )
}
