'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '@/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { useGlobalContext } from '../context';
import Loading from '../../components/loading';
import frame from '../../public/images/frame.svg'
import Image from 'next/image';

export default function Signup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { load, setLoad } = useGlobalContext()


    const router = useRouter()

    const handleSubmit = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                userCredential.user.displayName = name;
                setLoad(true);
                // const user = userCredential.user;
                await setDoc(doc(db, "users", email), {
                    name: name,
                    a: false,
                    b: false,
                    c: false,
                    d: false,
                    e: false,
                    f: false,
                    g: false,
                    h: false,
                    i: false,
                    j: false,
                    path: [],
                    startTime: new Date(),
                    endTime: new Date(),
                }).then(() => {
                    router.push("/instruction")
                }).catch((err) => {
                    const errorMessage = err.message;
                    alert("Signup Failed, Try Again", errorMessage)
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });

    }
    if (!load) {
        return (
            <div className='h-screen primary-bg login justify-center items-center'>
                <div className='p-8 flex flex-col items-center rounded-md  '>
                    <h1 className='mb-2 text-5xl font-serif font-bold text-orange-950'>Sign up</h1>
                    <input value={name} className='input' onChange={(e) => setName(e.target.value)} type="text" placeholder='Username' />
                    <input value={email} className='input' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
                    <input value={password} className='input' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
                    <div className="flex w-full justify-between text-xs mt-4 text-orange-950">
                        <div className='flex'>
                            <input type="checkbox" className='bg-orange-950' />
                            <span className='ml-1 text-orange-950'>remember me</span>
                        </div>
                        <Link href="/login" className='cursor-pointer ml-8 text-orange-950'>Already have an account?</Link>
                    </div>
                    <button onClick={handleSubmit} className='button'>SIGNUP</button>
                </div>
                <div className='w-full h-2/5 p-2 absolute -bottom-14'>
                    <Image src={frame} width={0} height={0} alt='trophy' style={{ height: "100%", width: "100%" }} />
                </div>
            </div>
        )
    } else {
        return <Loading />
    }
}
