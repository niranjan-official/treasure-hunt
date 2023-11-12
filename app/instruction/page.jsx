'use client'
import React, { useEffect } from 'react'
import { getData, shuffle } from '../functions'
import { useRouter } from 'next/navigation'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useAuth } from '@/firebase/auth'
import { useGlobalContext } from '../context/context'
import Loading from '../components/loading'

const Instruction = () => {

  const router = useRouter()
  const {load, setLoad} = useGlobalContext()

  const User = useAuth()

  useEffect(()=>{
    setLoad(true)
    const checkUserPath =async() =>{
      const newpath =await getData("users",User.email)
          console.log(newpath.path);
          if(newpath.path.length>0){
            router.push("/scan")
          }else{
            setLoad(false)
          }
    }
    if(User){
      checkUserPath()
    }
    console.log(User);
  },[User])

  const handleStart = async () => {
    console.log(User);
    const path = await shuffle("abcd");
    console.log(path);
    const array = path.split('');
    setLoad(true)
    const washingtonRef = doc(db, "users", User.email);
    await updateDoc(washingtonRef, {
      path: array,
      startTime: new Date()
    }).then(() => {
      router.push("/scan")
    }).catch((err) => {
      console.log(err);
    })
  }
  if(User){
    if(!load){
      return (
        <div className=' h-screen primary-bg p-4 pb-0 pt-0'>
          <div className='flex flex-col p-4 bg-white rounded-lg lg:w-1/2 w-full text-gray-500 text-sm'>
            <div className='w-full flex justify-center items-center gap-1 text-green-900'>
              <h1 className='text-3xl text-center'>Instructions</h1>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
    
            </div>
            <div className='text-xs'>
            <h5 className='mt-4'>• Use the QR code scanner to scan QR codes placed around the campus.
              Pay attention to the instructions or content provided when scanning QR codes.</h5>
    
    
            <h5 className='mt-4'>• Each team will have a unique set of QR code locations to visit.
              Stick to your designated pathway and don't deviate.</h5>
    
    
            <h5 className='mt-4'>• Some QR codes may contain clues or riddles that lead to the next location.
              Work together with your team to decipher them.</h5>
    
    
            <h5 className='mt-4'>• Be prepared to encounter hidden challenges or mini-games at certain locations.
              Complete these tasks to earn bonus points or unlock the next clue.</h5>
    
    
            <h5 className='mt-4'>• Time is of the essence. The team that completes the hunt in the shortest time wins.
              Keep an eye on the clock and strategize your moves.</h5>
    
    
            <h5 className='mt-4'>• Navigate the interactive map on the website to help you find QR code positions.
              Access your user dashboard to monitor your progress and view the leaderboard.</h5>
    
    
            <h5 className='mt-4'>• Communicate with your team members and competitors through the in-game messaging system.
              Use it for coordination and strategy.</h5>
    
    
            <h5 className='mt-4'>• Personalize your avatar through your user profile on the website.
              Make your team stand out.</h5>
    
    
            </div>
            <button onClick={handleStart} className='button'>Start the Hunt</button>
          </div>
        </div>
      )
    }else{
      return <Loading/>
    }
  }
}

export default Instruction
