'use client'
import React from 'react'
import { getData } from '../functions'

const Instruction = () => {

    const handleStart=async()=>{
        const userData =await getData("users","niranjan@gmail.com");
        const question =await getData("Questions",userData.path[0]);
        const randomIndex = Math.floor(Math.random() * 3)+1;
        const ques = {"question":question[randomIndex],"answer":question[`${randomIndex}a`]};
        console.log(ques);
    }
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-lime-100'>
      <div className='flex flex-col p-4 bg-white rounded-lg w-1/2 text-gray-500 text-sm'>
        <h1 className='text-3xl text-lime-900 text-center'>Instructions</h1>

<h5 className='mt-4'>Use the QR code scanner to scan QR codes placed around the campus.
Pay attention to the instructions or content provided when scanning QR codes.</h5>


<h5 className='mt-4'>Each team will have a unique set of QR code locations to visit.
Stick to your designated pathway and don't deviate.</h5>


<h5 className='mt-4'>Some QR codes may contain clues or riddles that lead to the next location.
Work together with your team to decipher them.</h5>


<h5 className='mt-4'>Be prepared to encounter hidden challenges or mini-games at certain locations.
Complete these tasks to earn bonus points or unlock the next clue.</h5>


<h5 className='mt-4'>Time is of the essence. The team that completes the hunt in the shortest time wins.
Keep an eye on the clock and strategize your moves.</h5>


<h5 className='mt-4'>Navigate the interactive map on the website to help you find QR code positions.
Access your user dashboard to monitor your progress and view the leaderboard.</h5>


<h5 className='mt-4'>Communicate with your team members and competitors through the in-game messaging system.
Use it for coordination and strategy.</h5>


<h5 className='mt-4'>Personalize your avatar through your user profile on the website.
Make your team stand out.</h5>


<button onClick={handleStart} className='button'>Start the Hunt</button>
      </div>
    </div>
  )
}

export default Instruction
