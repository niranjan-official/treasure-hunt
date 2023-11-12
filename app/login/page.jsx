'use client'
import { auth } from '@/firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getData } from '../functions'
import { useGlobalContext } from '../context/context'

export default function Home() {

  const {setUser} = useGlobalContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        console.log(userCredential);
        const newpath =await getData("users",email)
        setUser({
          name: userCredential.user.displayName,
          email: email
        })
        console.log(newpath.path);
        if(newpath.path.length>0){
          router.push("/scan")
        }else{
          router.push("/instruction")
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });

    // router.push("/instruction")
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-lime-200'>
      <div className='p-8 flex flex-col items-center rounded-md shadow-md bg-white'>
        <h1 className='mb-4 text-4xl font-serif font-bold text-lime-900'>Login</h1>
        <input value={email} className='input' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
        <input value={password} className='input' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
        <div className="flex w-full justify-between text-xs mt-4 text-lime-800">
          <div className='flex'>
            <input type="checkbox" className='bg-lime-800' />
            <span className='ml-1 text-lime-800'>remember me</span>
          </div>
          <Link href="/signup" className='cursor-pointer ml-8'>Create new Account?</Link>
        </div>
        <button onClick={handleSubmit} className='p-3 bg-lime-800 text-white rounded-xl mt-4 font-semibold text-sm hover:bg-lime-900'>LOGIN</button>
      </div>
    </div>
  )
}
