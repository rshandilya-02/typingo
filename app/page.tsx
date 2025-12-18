import React from 'react'
import { faker } from '@faker-js/faker';
import CountDownTimer from '../components/CountDownTimer';
import HandleRestart from '../components/HandleRestart';
import Results from '../components/Results';
import UserTypings from '@/components/UserTypings';
import Caret from '@/components/Caret';


const Home = () => {
  const words = faker.word.words(40);
  return (
    <div className='text-3xl text-center text-slate-500 flex flex-col gap-5'>
      TYPINGO...
      <CountDownTimer timeLeft={40}></CountDownTimer>
      <div className='relative max-w-4xl mt-3 text-left text-3xl leading-relaxed break-all'>
        <div>
          {words}
        </div>
        <div className='absolute inset-0 '>
          <UserTypings className='text-green-600 ' userInput={words}></UserTypings>
          
          </div>
      </div>
      <HandleRestart></HandleRestart>
      <Results className='mt-10'
        errors={10}
        accuracyPercentage={100}
      total={200}></Results>
    </div>
  )
}

export default Home