'use client'

import React, { useEffect, useRef, useState } from 'react'
import Caret from './Caret';

const UserTypings = ({ userInput, className,timer,buttonRef,typedText,setTypedText }: { userInput: string, className?: string,timer:boolean,typedText:string,buttonRef?: React.RefObject<HTMLButtonElement>,  setTypedText: React.Dispatch<React.SetStateAction<string>>
 }) => {

    // const letterStore = useRef('');
    // const [typedOnes, setTypedOnes] = useState<string>('');
    
    // const typedCharacters = userInput.split("");

    const handleKeyDown = (e: KeyboardEvent) => {
        // console.log('prev is ', typedOnes);
        console.log(e);
        if ( /^[a-zA-Z0-9]$/.test(e.key) ) {
            // letterStore.current = letterStore.current + e.key;
            // console.log(letterStore.current);
            // console.log('check', typedOnes);
            setTypedText((prev) => prev?.concat(e.key));
            console.log('key pressed', e);
        } else if (e.code === 'Space') {
            // alert('space clicked');
            setTypedText((prev) => prev?.concat(' '));
        } else if (e.key === 'Backspace') { 
            setTypedText((prev)=>prev.slice(0,-1))
        } else return;
    }

    useEffect(() => {
        if (!timer) return;
        buttonRef?.current.blur();
        window.addEventListener('keydown', handleKeyDown);

        return (() => window.removeEventListener('keydown', handleKeyDown));
    }, [timer]);
    
  return (
      <div className={className}>
          {
              typedText?.split('').map((char, index) => {
                  return <Character key={`${char}_${index}`} char={char} words={userInput} position={index}>{userInput[index]}</Character>
                })
                //   typedOnes
          }
          <Caret ></Caret>

    </div>
  )
}

const Character = ({ char, children,words,position }: { char: string, children?: React.ReactNode,words: string,position:number }) => {
    console.log('char is ', char, ' ', words[position]);
    const expectedChar = words[position];
  const displayChar = (expectedChar === ' ' && expectedChar!==char)?'␣':expectedChar
    return <span className={` ${char!==words[position]?"text-red-500":"text-green-500"}`}>{displayChar}</span>
}

export default UserTypings