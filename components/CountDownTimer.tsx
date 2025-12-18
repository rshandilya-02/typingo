import React from 'react'

const CountDownTimer = ({timeLeft}:{timeLeft:number}) => {
  return (
      <div>
          Time Left : {
              JSON.stringify(timeLeft)
          }</div>
  )
}

export default CountDownTimer