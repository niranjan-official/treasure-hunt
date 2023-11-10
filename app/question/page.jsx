'use client'
import React, { useEffect, useState } from 'react'
import { getData } from '../functions';

const Question = () => {

    const [que,setQue] = useState({})
    const[answer,setAnswer] = useState("")
    useEffect(()=>{
        const handleStart=async()=>{
            const userData =await getData("users","niranjan@gmail.com");
            const question =await getData("Questions",userData.path[0]);
            const randomIndex = Math.floor(Math.random() * 3)+1;
            setQue({"question":question[randomIndex],"answer":question[`${randomIndex}a`]});
        }
        handleStart();
    },[])


    const handleSubmit=()=>{
        if(answer===que.answer){
            alert("Correct answer");
        }else{
            alert("incorrect answer");
        }
    }
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-lime-100'>
      <div className='w-1/2 bg-white rounded-md p-4 flex flex-col'>
        <h3 className='text-lime-900 text-xl font-serif'>Q. {que.question}</h3>
        <input value={answer} onChange={(e)=>setAnswer(e.target.value)} className='input w-3/4 p-1 mt-5' type="text" placeholder='Answer' />
        <button onClick={handleSubmit} className='mt-4 button'>Submit</button>
      </div>
    </div>
  )
}

export default Question
