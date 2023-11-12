import Image from 'next/image'
import React from 'react'
import loading from '../loading.gif'

const Loading = () => {
  return (
    <div className='h-screen primary-bg'>
        <div className='flex justify-center items-center p-10 rounded-xl bg-white'>
        <Image src={loading} height={100} width={100} alt='loading'/>
        </div>
    </div>
  )
}

export default Loading