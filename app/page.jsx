'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {

  const [name,setName] = useState('')
  const [password,setPassword] = useState('')

  const router = useRouter()

  const handleSubmit=()=>{
    alert("Login successfull");
    router.push("/instruction")
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-lime-100'>
      <div className='p-8 flex flex-col items-center rounded-md shadow-md bg-white'>
        <h1 className='mb-4 text-4xl font-serif font-bold text-lime-900'>Login</h1>
        <input value={name} className='input' onChange={(e)=>setName(e.target.value)} type="text" placeholder='Username' />
        <input value={password} className='input' onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password'/>
        <div className="flex w-full justify-between text-xs mt-4 text-lime-800">
          <div className='flex'>
            <input type="checkbox" className='bg-lime-800'/>
            <span className='ml-1 text-lime-800'>remember me</span>
          </div>
          <Link href={""} className='cursor-pointer'>forgot password?</Link>
        </div>
        <button onClick={handleSubmit} className='p-3 bg-lime-800 text-white rounded-xl mt-4 font-semibold text-sm hover:bg-lime-900'>LOGIN</button>
      </div>
    </div>
  )
}
