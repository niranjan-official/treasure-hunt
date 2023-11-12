'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '@/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { useGlobalContext } from '../context/context';

export default function Signup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setUser} = useGlobalContext()


    const router = useRouter()

    const handleSubmit = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) =>{
                userCredential.user.displayName=name;
                setUser({
                    name: name,
                    email: email
                })
                // const user = userCredential.user;
                await setDoc(doc(db, "users", email), {
                    name: name,
                    a: false,
                    b: false,
                    c: false,
                    d: false,
                    path: [],
                    startTime: new Date(),
                    endTime: new Date(),
                  });
                  router.push("/instruction")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }
    return (
        <div className='w-screen h-screen flex items-center justify-center bg-lime-200'>
            <div className='p-8 flex flex-col items-center rounded-md shadow-md bg-white'>
                <h1 className='mb-4 text-4xl font-serif font-bold text-lime-900'>Signup</h1>
                <input value={name} className='input' onChange={(e) => setName(e.target.value)} type="text" placeholder='Username' />
                <input value={email} className='input' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
                <input value={password} className='input' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
                <div className="flex w-full justify-between text-xs mt-4 text-lime-800">
                    <div className='flex'>
                        <input type="checkbox" className='bg-lime-800' />
                        <span className='ml-1 text-lime-800'>remember me</span>
                    </div>
                    <Link href="/login" className='cursor-pointer ml-8'>Already have an account?</Link>
                </div>
                <button onClick={handleSubmit} className='p-3 bg-lime-800 text-white rounded-xl mt-4 font-semibold text-sm hover:bg-lime-900'>SIGNUP</button>
            </div>
        </div>
    )
}
