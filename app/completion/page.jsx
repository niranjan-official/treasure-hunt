import React from 'react'
import { useGlobalContext } from '../context/context'

const Complete = () => {

  return (
    <div className='w-screen h-screen bg-lime-200 flex flex-col items-center justify-center text-4xl text-lime-950'>
        <h1>Congratulations...</h1>
        <h2>You have completed the game</h2>
    </div>
  )
}

export default Complete