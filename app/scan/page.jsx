'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getData, handleData } from '../functions'
import { useGlobalContext } from '../context/context'
import { useAuth } from '@/firebase/auth'
import { useRouter } from 'next/navigation'
import Qrcode from './qrcode'

const Scan = () => {
    const router = useRouter()
    const [currentPath, setPath] = useState('')
    const [level,setLevel] =useState(1)
    const User = useAuth()
    useEffect(() => {
        const fetchData =async()=>{
            const obj =await handleData();
            if(obj!=="completed"){
                console.log(obj);
                setPath(obj.hint);
                setLevel(obj.level);
            }else{
                alert("Game completed")
                router.push("/completion")
            }
        }
        fetchData()
    }, [])
    if(User){
        return (
            <div className='w-screen h-screen bg-lime-200 flex items-center justify-center p-3'>
                <div className='flex flex-col items-center bg-white rounded-lg p-4'>
                    <h2 className='text-lime-900 text-3xl font-sans'>Level: {level}</h2>
                    <h3 className='bg-lime-800 p-3 text-white rounded-xl mt-3'>Hint: {currentPath}</h3>
                    <div className='w-32 bg-lime-300 rounded-xl mt-5 flex flex-col items-center justify-center'>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                        </svg> */}
                        {/* <Link href="/question"><button className='p-2 bg-lime-700 font-semibold text-white rounded-md mt-3 hover:bg-lime-900'>Scan QR</button></Link> */}
                        <Qrcode/>
    
                    </div>
                </div>
            </div>
        )
    }
}

export default Scan