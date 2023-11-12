'use client'
import { auth } from '@/firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getData } from '../functions'
import { useGlobalContext } from '../context/context'

export default function Home() {

  const {load,setLoad} = useGlobalContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        console.log(userCredential);
        router.push("/instruction")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });

    // router.push("/instruction")
  }
  return (
    <div className='h-screen primary-bg'>
      <div className='p-8 flex flex-col items-center rounded-md shadow-md bg-white'>
        <h1 className='mb-4 text-4xl font-serif font-bold text-green-950'>Login</h1>
        <input value={email} className='input' autoComplete='off' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
        <input value={password} className='input' autoComplete='off' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
        <div className="flex w-full justify-between text-xs mt-4 text-lime-800">
          <div className='flex'>
            <input type="checkbox" className='bg-lime-800' />
            <span className='ml-1 text-lime-800'>remember me</span>
          </div>
          <Link href="/signup" className='cursor-pointer ml-8'>Create new Account?</Link>
        </div>
        <button onClick={handleSubmit} className='button'>LOGIN</button>
      </div>
    </div>
  )
}
