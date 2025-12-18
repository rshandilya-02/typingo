'use client'

import React from 'react'
import { motion } from 'framer-motion';
import { formatPercentage } from '@/utils/helper';

const Results = ({errors,accuracyPercentage,total,className}:{errors:number, accuracyPercentage:number,total:number,className?:string}) => {
    const initial = { opacity: 0 };
    const animate = { opacity: 1 };
    const duration = { duration: 0.3 };
    return (
      <div>
          <motion.ul className={`flex flex-col items-center text-yellow-500 space-y-3 text-xl ${className}`} initial={initial} animate={animate} transition={{...duration,delay:0.5}}>
                <motion.li className='text-xl font-semibold' initial={initial} animate={animate} transition={{ ...duration, delay: 0.3 }}>Results</motion.li>
          <motion.li className='text-xl' initial={initial} animate={animate} transition={{ ...duration, delay: 0.5 }}>Accuracy : {formatPercentage(accuracyPercentage)}</motion.li>
                <motion.li className='text-red-500' initial={initial} animate={animate} transition={{ ...duration, delay: 0.8 }}>Errors: {errors}</motion.li>
                <motion.li initial={initial} animate={animate} transition={{ ...duration, delay: 1 }}>Typed: {total}</motion.li>
          </motion.ul>
    </div>
  )
}

export default Results