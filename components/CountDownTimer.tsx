'use client'

import React, { useEffect, useState } from 'react'

const CountDownTimer = ({ timeLeft }: { timeLeft: number }) => {
  
  useEffect(() => {
    setInterval(() => {
      
    })
  },[])
  return (
    <div>
          Time Left : {
              JSON.stringify(timeLeft)
      }
    </div>
  )
}

export default CountDownTimer