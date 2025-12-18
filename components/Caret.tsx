'use client'

import { motion } from 'framer-motion'

const Caret = () => {
  return (
    <motion.span
      layout
      className="inline-block w-[2px] h-[1em] bg-amber-400 align-baseline ml-[1px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        opacity: {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 0.6,
        },
        layout: {
          duration: 0.08,
          ease: 'easeOut',
        },
      }}
    />
  )
}

export default Caret
