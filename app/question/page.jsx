'use client'
import React, { useEffect, useState } from 'react'
import { handleQuestion, handleQuestionSubmit } from '../functions';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase/auth';
import { useGlobalContext } from '../context';
import Loading from '../../components/loading';
import Header from '../../components/header';
import Image from 'next/image';
import qmark from "../../public/images/qmark.png"
const Question = () => {

  const [que, setQue] = useState({ question: "", answer: "", userName: "" })
  const [answer, setAnswer] = useState("")
  const User = useAuth()
  const { load, setLoad, scan, setScan } = useGlobalContext()

  const router = useRouter()

  useEffect(() => {
    if (!scan) {
      router.push("/scan");
    } else {
      setScan(false)
    }
  }, [])
  useEffect(() => {
    setLoad(true)
    const fetchQuestion = async () => {
      const question = await handleQuestion(User)
      setQue({ question: question.question, answer: question.answer, userName: question.userName })
      setLoad(false)
    }
    // console.log(User);
    if (User) {
      console.log(User);
      fetchQuestion()
    }
  }, [User])

  const handleSubmit = async () => {

    let LowerCaseAnswer = answer.toLocaleLowerCase();
    let Answer = LowerCaseAnswer.replace(/\s/g, "");
    if (Answer === que.answer) {
      alert("Correct answer");
      const state = await handleQuestionSubmit(User)
      if (state) {
        router.push("/scan")
      } else {
        alert("Got Error")
      }
    } else {
      alert("incorrect answer");
    }
  }
  if (User) {
    if (!load) {
      return (
        <div className='h-screen flex flex-col login items-center'>
          <Header UserName={que.userName} />
          <div className='h-full primary-bg p-4 justify-center items-center'>
            <div className='lg:w-1/2 w-full bg-white rounded-md p-4 flex flex-col shadow-inner shadow-orange-950'>
              <h3 className='text-lime-900 text-xl font-serif'>Q. {que.question}</h3>
              <input value={answer} onChange={(e) => setAnswer(e.target.value)} className='input w-3/4 p-1 mt-5' type="text" placeholder='Answer' />
              <button onClick={handleSubmit} className='mt-4 button shadow-md'>Submit</button>
            </div>
          </div>
            <div className='h-1/3 absolute bottom-0'>
            <Image src={qmark} width={0} height={0} style={{ height: "100%", width: "100%" }} />
            </div>
        </div>
      )
    } else {
      return <Loading />
    }
  }
}

export default Question
