'use client'
import React, { useEffect, useState } from 'react'
import { handleData } from '../functions'
import { useAuth } from '@/firebase/auth'
import { useRouter } from 'next/navigation'
import Qrcode from './qrcode'
import Loading from '../components/loading'
import { useGlobalContext } from '../context/context'
import Header from '../components/header'

const Scan = () => {
    const router = useRouter()
    const [hint, setHint] = useState({})
    const { load, setLoad } = useGlobalContext()
    const User = useAuth()
    useEffect(() => {
        const fetchData = async () => {
            setLoad(true)
            const obj = await handleData();
            if (obj !== "completed") {
                console.log(obj);
                setHint({
                    hint: obj.hint,
                    level: obj.level,
                    userName: obj.userName
                })
                setLoad(false)
            } else {
                alert("Game completed")
                router.push("/completion")
            }
        }
        fetchData();
    }, [])

    // If you want to prefer front camera
    if (User) {
        if (!load) {
            return (
                <div className='h-screen flex flex-col'>
                    <Header UserName={hint.userName}/>
                    <div className='h-full primary-bg p-3'>
                        <div className='flex flex-col items-center bg-white rounded-lg p-4 shadow-md'>
                            <h2 className='text-green-900 text-3xl font-sans border-b-2 border-green-950'>Level: {hint.level}</h2>
                            <h3 className='bg-green-800 p-3 text-white rounded-xl mt-3'>Hint: {hint.hint}</h3>
                            <div className='w-full bg-green-500 p-2 rounded-xl mt-5 flex flex-col items-center justify-center'>
                                <Qrcode />
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Loading />
        }
    }
}

export default Scan