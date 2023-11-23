'use client'
import React from 'react'
import Image from 'next/image'
import trophy from '../../public/images/trophy.webp'

const Complete = () => {

  return (
    <div className='h-screen primary-bg text-4xl text-lime-950 p-3 text-center login justify-center items-center'>
      <div className='w-full h-2/5 p-2 pt-5 mt-6'>
        <Image src={trophy} width={0} height={0} alt='trophy' style={{ height: "100%", width: "100%"}} />
      </div>
      <h1>Congratulations...</h1>
      <h2>You have completed the game !!!</h2>
    </div>
  )
}


export default Complete