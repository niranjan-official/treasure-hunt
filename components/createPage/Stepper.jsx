"use client";
import useGameCreationStore from "@/hooks/useGameCreationStore";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdGames } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Stepper = ({ prev, next, submit, triggerFunction }) => {
  const { gameData, incrementPageStep, decrementPageStep } =
    useGameCreationStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      createGame();
    }
  }, [gameData, isSubmitted]);

  const handlePrev = () => {
    triggerFunction();
    decrementPageStep();
  };
  const handleNext = () => {
    triggerFunction();
    incrementPageStep();
  };
  const handleSubmit = () => {
    triggerFunction();
    setIsSubmitted(true);
  };

  const createGame = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/create-game", {
        method: "POST",
        body: JSON.stringify(gameData),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        console.log("Success");
      }
    } catch (error) {
      console.log(error);
    }
    setIsSubmitted(false);
  };

  return (
    <div className="fixed w-full bottom-0 rounded-[0.5rem] border-t border-gray-400 bg-slate-200 p-2">
      <div className="w-full flex text-white gap-2">
        {prev && (
          <button
            onClick={handlePrev}
            className="p-3 px-5 rounded-[0.4rem] bg-sky-900"
          >
            <FaArrowLeft size={25} />
          </button>
        )}
        {next && (
          <button
            onClick={handleNext}
            className="w-full flex justify-center p-3 rounded-[0.4rem] bg-sky-900 font-semibold"
          >
            Next
          </button>
        )}
        {submit && (
          <button
            disabled={isSubmitted}
            onClick={handleSubmit}
            className="w-full flex justify-center items-center p-3 rounded-[0.4rem] bg-sky-900 font-semibold"
          >
            {isSubmitted ? (
              <AiOutlineLoading3Quarters className="animate-spin" size={20} />
            ) : (
              <span className="flex gap-1">
                <MdGames size={20} /> Create Game
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Stepper;
