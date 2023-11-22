'use client'
import React, { useEffect, useState } from 'react'
import { handleData } from '../functions'
import { useAuth } from '@/firebase/auth'
import { useRouter } from 'next/navigation'
import Qrcode from './qrcode'
import Loading from '../../components/loading'
import { useGlobalContext } from '../context'
import Header from '../../components/header'
import Image from 'next/image'
import box from "../../public/images/box.png"

const Scan = () => {

    const router = useRouter()
    const [hint, setHint] = useState({})
    const { load, setLoad } = useGlobalContext()
    const User = useAuth()


    useEffect(() => {
        const fetchData = async () => {
            console.log("hihihi");
            setLoad(true)
            const obj = await handleData(User.email);
            if (obj !== "completed") {
                console.log(obj);
                setHint({
                    hint: obj.hint.h,
                    qr:obj.hint.qr,
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
                <div className=' login min-h-max flex flex-col '>
                    <Header UserName={hint.userName} />
                    <div className='h-full primary-bg p-3'>
                        <div className='w-full h-2/5 p-2 pt-5 mt-6'>
                            <Image src={box} width={0} height={0} style={{ height: "100%", width: "100%" }} />
                        </div>
                        <div className='h-3/5 p-4 flex flex-col justify-center items-center b-1'>
                            <div className='w-full bg-orange-100 rounded-xl pt-2 pb-8 shadow-inner shadow-orange-950'>
                                <h3 className='text-xl text-orange-950 p-3 rounded-xl mt-3'>Hint: {hint.hint}</h3>
                            </div>
                            <div className='relative -top-6 h-auto w-4/5 bg-orange-200 rounded-xl shadow-inner shadow-orange-950 p-3'>
                                <Qrcode qr={hint.qr}/>
                            </div>
                        </div>
                    </div>
                    <h1 className='text-2xl bg-orange-100 p-1 rounded-lg shadow-inner shadow-orange-950 text-orange-950 absolute left-3 top-16 font-serif'>Level: {hint.level}</h1>
                </div>
            )
        } else {
            return <Loading />
        }
    }
}

export default Scan