'use client'

import React, { useEffect, useRef, useState } from 'react'
import { faker } from '@faker-js/faker'
import CountDownTimer from '../components/CountDownTimer'
import HandleRestart from '../components/HandleRestart'
import Results from '../components/Results'
import UserTypings from '@/components/UserTypings'

const TEST_DURATION = 45

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
  <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">

    {/* Background Effects */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-purple-600/20 blur-[180px]" />
      <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[160px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>

    <main className="relative z-10 flex min-h-screen flex-col items-center px-6 py-12">

      {/* Logo */}
      <div className="mb-10 text-center">
        <h1 className="text-6xl md:text-7xl font-black tracking-tight">
          Typin
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Go
          </span>
        </h1>

        <p className="mt-3 text-zinc-500 text-sm md:text-base">
          Improve your speed. Master your rhythm.
        </p>
      </div>

      {/* Start Button */}
      <button
        ref={buttonRef}
        onClick={startTest}
        className="
          group
          relative
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-8
          py-4
          font-medium
          backdrop-blur-xl
          transition-all
          duration-300
          hover:scale-105
          hover:border-purple-500/50
          hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]
        "
      >
        <span className="relative z-10">Start Test</span>

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-purple-500/20
            via-pink-500/20
            to-cyan-500/20
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />
      </button>

      {/* Stats */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-widest text-zinc-500">
            Time Left
          </div>
          <div className="mt-1 text-2xl font-bold">
            {timeLeft}s
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-widest text-zinc-500">
            Accuracy
          </div>
          <div className="mt-1 text-2xl font-bold text-emerald-400">
            {accuracyPercentage.toFixed(0)}%
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-widest text-zinc-500">
            Errors
          </div>
          <div className="mt-1 text-2xl font-bold text-red-400">
            {errors}
          </div>
        </div>
      </div>

      {/* Timer Component */}
      <div className="mt-6">
        <CountDownTimer timeLeft={timeLeft} />
      </div>

      {/* Typing Card */}
      <div
        className="
          relative
          mt-10
          w-full
          max-w-6xl
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-8
          md:p-10
          backdrop-blur-2xl
          shadow-[0_0_80px_rgba(255,255,255,0.03)]
        "
      >

        <div className="mb-6 flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>

        {/* Words */}
        <div
          className="
            text-2xl
            md:text-3xl
            leading-[2.4]
            font-medium
            text-zinc-600
            select-none
            break-words
          "
        >
          {words}
        </div>

        {/* User Typing Overlay */}
        <div className="absolute inset-0 px-8 pt-[60px] md:px-10">
          <UserTypings
            className="text-white"
            userInput={words}
            timer={started}
            buttonRef={buttonRef}
            typedText={typedText}
            setTypedText={setTypedText}
          />
        </div>
      </div>

      {/* Restart */}
      <div className="mt-8">
        <HandleRestart />
      </div>

      {/* Results */}
      {timeLeft === 0 && (
        <div className="mt-10 w-full max-w-xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl">
            <Results
              errors={errors}
              accuracyPercentage={accuracyPercentage}
              total={totalTyped}
            />
          </div>
        </div>
      )}
    </main>
  </div>
)
  
}

export default Home
