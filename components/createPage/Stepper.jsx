"use client";
import useGameCreationStore from "@/hooks/useGameCreationStore";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdGames } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AlertBox from "./AlertBox";

const Stepper = ({ prev, next, submit, triggerFunction }) => {
  const { gameData, incrementPageStep, decrementPageStep, refreshGameData } =
    useGameCreationStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gameToken, setGameToken] = useState("");

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
    const { qrData, questionsAnswers, basicData } = gameData;

    if (
      qrData.length < basicData.levels ||
      questionsAnswers.length < basicData.levels
    ) {
      alert(
        "The number of QR data and question/answers should be at least the number of levels."
      );
      setIsSubmitted(false);
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-game`,
        {
          method: "POST",
          body: JSON.stringify(gameData),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.ok) {
        const response = await res.json();
        setGameToken(response.randomToken);
        refreshGameData();
      }
    } catch (error) {
      console.log(error);
    }
    setIsSubmitted(false);
  };

  return (
    <div className="fixed w-full bottom-0 rounded-[0.5rem] border-t border-gray-400 p-2 bg-white">
      <div className="w-full flex text-white gap-2">
        {prev && (
          <button
            onClick={handlePrev}
            className="p-3 px-5 rounded-[0.4rem] bg-secondary"
          >
            <FaArrowLeft size={25} />
          </button>
        )}
        {next && (
          <button
            onClick={handleNext}
            className="w-full flex justify-center p-3 rounded-[0.4rem] bg-secondary font-semibold"
          >
            Next
          </button>
        )}
        {submit && (
          <button
            disabled={isSubmitted}
            onClick={handleSubmit}
            className="w-full flex justify-center items-center p-3 rounded-[0.4rem] bg-secondary font-semibold"
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
      <AlertBox
        open={gameToken ? true : false}
        heading={"Game created successfully !"}
        gameToken={gameToken}
      />
    </div>
  );
};

export default Stepper;
