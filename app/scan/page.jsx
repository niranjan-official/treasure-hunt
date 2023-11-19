'use client'
import React, { useEffect, useState } from 'react'
import { handleData } from '../functions'
import { useAuth } from '@/firebase/auth'
import { useRouter } from 'next/navigation'
import Qrcode from './qrcode'
import Loading from '../../components/loading'
import { useGlobalContext } from '../context'
import Header from '../../components/header'
import box from "../images/box.svg"
// import box1 from "../images/login.svg"
import Image from 'next/image'

const Scan = () => {

    const router = useRouter()
    const [hint, setHint] = useState({})
    const { load, setLoad } = useGlobalContext()
    const User = useAuth()


    useEffect(() => {
        const fetchData = async () => {
            setLoad(true)
            const obj = await handleData(User.email);
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
        if (User) {
            console.log(User);
            fetchData();
        }
    }, [User])

    // If you want to prefer front camera
    if (User) {
        if (!load) {
            return (
                <div className=' login h-screen flex flex-col overflow-y-hidden'>
                    <Header UserName={hint.userName} />
                    <div className='h-full primary-bg p-3'>
                        <div className='w-full h-2/5 p-2 pt-5 mt-6'>
                            <Image src={box} width={0} height={0} style={{ height: "100%", width: "100%" }} />
                        </div>
                        <div className='h-3/5 p-4 flex flex-col justify-center items-center b-1'>
                            <div className='w-full bg-white rounded-xl pt-2 pb-8 shadow-md'>
                                <h3 className='text-xl text-orange-950 p-3 rounded-xl mt-3'>Hint: {hint.hint}</h3>
                            </div>
                            <div className='relative -top-6 h-auto w-4/5 bg-orange-200 rounded-xl shadow-md p-3'>
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