'use client'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import treasureBox from "../public/images/login.svg"
const Home = () => {
    return (
        <div className='w-screen h-screen bg-color'>
            <div className='w-full h-1/2'>
                <Image src={treasureBox} height={0} width={0} style={{ width: '100%', height: '100%' }} />
            </div>
            <div className='w-full h-1/2 flex flex-col p-3 pt-0'>
                <div className='relative -top-12'>
                    <h1 className='text-6xl font-serif text-center text-white mt-3 mb-7'>Treasure Hunt</h1>
                    <Link href="/login">
                        <button className='w-full p-3 bg-orange-400 rounded-2xl shadow-md'>LOGIN</button>
                    </Link>
                    <div className='flex items-center text-white pl-4 pr-4'>
                        <hr className='w-full border-1 border-white' />
                        <span className='m-3 mt-6 mb-6 text-xl'>or</span>
                        <hr className='w-full border-1 border-white' />
                    </div>
                    <Link href="/signup">
                        <button className='w-full p-3 rounded-2xl shadow-md bg-black text-white'>SIGN UP</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Home