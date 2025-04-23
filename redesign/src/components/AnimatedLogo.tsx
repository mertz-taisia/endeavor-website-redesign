// @ts-nocheck
import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [showText, setShowText] = useState(false)
  const [visibleLetters, setVisibleLetters] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const word = 'Endeavor'

  const handleEnded = () => {
    setShowText(true)
  }

  useEffect(() => {
    if (showText && visibleLetters < word.length) {
      const timeout = setTimeout(() => {
        setVisibleLetters((prev) => prev + 1)
      }, 150)
      return () => clearTimeout(timeout)
    }
  }, [showText, visibleLetters])

  return (
    <div className="flex flex-row items-center justify-center h-screen ">
      <video
        ref={videoRef}
        onEnded={handleEnded}
        autoPlay
        muted
        playsInline
        className="w-18"
      >
        <source src="../public/0001-0160.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {showText && (
        <div className="text-5xl font-bold text-black inline-flex">
          {word.split('').slice(0, visibleLetters).map((letter, index) => (
            <span
              key={index}
              className="animate-fade-in-letter"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
            >
              {letter}
            </span>
          ))}

        </div>
      )}
    </div>
  )
}

export default App
