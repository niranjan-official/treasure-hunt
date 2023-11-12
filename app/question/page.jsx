'use client'
import React, { useEffect, useState } from 'react'
import { handleQuestion, handleQuestionSubmit } from '../functions';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase/auth';
import { useGlobalContext } from '../context/context';
import Loading from '../loading';

const Question = () => {

  const [que, setQue] = useState({ question: "", answer: "" })
  const [answer, setAnswer] = useState("")
  const User = useAuth()
  const {load, setLoad} = useGlobalContext()

  const router = useRouter()
  useEffect(() => {
    setLoad(true)
    const fetchQuestion = async () => {
      const question = await handleQuestion(User)
      setQue({ question: question.question, answer: question.answer })
      setLoad(false)
    }
    // console.log(User);
    if (User) {
      fetchQuestion()
    }
  }, [User])

  const handleSubmit = async () => {

    if (answer === que.answer) {
      alert("Correct answer");
      const state = await handleQuestionSubmit(User)
      if (state) {
        router.push("/scan")
      } else {
        alert("Got Error")
      }
    }else {
      alert("incorrect answer");
    }
  }
  if (User) {
    if(!load){
      return (
        <div className='w-screen h-screen flex items-center justify-center bg-lime-200 p-4'>
          <div className='lg:w-1/2 w-full bg-white rounded-md p-4 flex flex-col'>
            <h3 className='text-lime-900 text-xl font-serif'>Q. {que.question}</h3>
            <input value={answer} onChange={(e) => setAnswer(e.target.value)} className='input w-3/4 p-1 mt-5' type="text" placeholder='Answer' />
            <button onClick={handleSubmit} className='mt-4 button'>Submit</button>
          </div>
        </div>
      )
    }else{
      return <Loading/>
    }
  }
}

export default Question
