'use client'
import React from 'react'
import Image from 'next/image'

const Complete = () => {

  return (
    <div className='h-screen primary-bg text-4xl text-orange-950 p-3 text-center login justify-center items-center'>
      <div className='w-full h-2/5 p-2 pt-5 mt-6'>
        <Image src={'/images/murder.png'} width={250} height={200} alt='trophy' style={{ height: "100%", width: "100%"}} />
      </div>
      <h1>Congratulations</h1>
      <h2 className='text-sm'>You have completed Day 1</h2>
      <h2 className='text-xs'>The Real Story Begins Tomorrow</h2>
    </div>
  )
}


export default Complete