'use client'

import React, { useEffect, useRef, useState } from 'react'
import { faker } from '@faker-js/faker'
import CountDownTimer from '../components/CountDownTimer'
import HandleRestart from '../components/HandleRestart'
import Results from '../components/Results'
import UserTypings from '@/components/UserTypings'

const TEST_DURATION = 10

const Home = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const [words, setWords] = useState('')
  const [typedText, setTypedText] = useState('')
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION)
  const [started, setStarted] = useState(false)

  const totalTyped = typedText.length

  const errors = typedText.split('').reduce((count, char, index) => {return char!==words[index]?count+1:count}, 0);

  const accuracyPercentage =
    totalTyped === 0
      ? 0
      : Math.max(
          0,
          ((totalTyped - errors) / totalTyped) * 100
        )

  useEffect(() => {
    setWords(faker.word.words(40))
  }, [])

  useEffect(() => {
    if (!started) return

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          setStarted(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [started])

  const startTest = () => {
    setTypedText('')
    setTimeLeft(TEST_DURATION)
    setStarted(true)
  }

  return (
    <div className="text-3xl text-center text-slate-500 flex flex-col gap-5">
      <div className="font-semibold">TYPINGO...</div>

      <button
        ref={buttonRef}
        onClick={startTest}
        className="mx-auto w-fit rounded-lg bg-amber-100/80 px-4 py-2 text-black border border-black"
      >
        start
      </button>

      <CountDownTimer timeLeft={timeLeft} />

      <div className="relative max-w-4xl mx-auto mt-3 text-left leading-relaxed break-all">
        <div>{words}</div>

        <div className="absolute inset-0">
          <UserTypings
            className="text-green-600"
            userInput={words}
            timer={started}
            buttonRef={buttonRef}
            typedText={typedText}
            setTypedText={setTypedText}
          />
        </div>
      </div>

      <HandleRestart />

      {timeLeft === 0 && (
        <Results
          errors={errors}
          accuracyPercentage={accuracyPercentage}
          total={totalTyped}
        />
      )}
    </div>
  )
}

export default Home
