'use client'
import useGameCreationStore from "@/hooks/useGameCreationStore";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const Stepper = () => {
  const { pageStep, incrementPageStep, decrementPageStep } = useGameCreationStore();
  return (
    <div className="absolute w-full bottom-0 rounded-[0.5rem] border-t border-gray-400 p-2">
      <div className="w-full flex text-white gap-2">
        {pageStep > 1 && (
          <button onClick={decrementPageStep} className="p-3 px-5 rounded-[0.4rem] bg-sky-900">
            <FaArrowLeft size={25} />
          </button>
        )}
        {pageStep < 4 && (
          <button onClick={incrementPageStep} className="w-full flex justify-center p-3 rounded-[0.4rem] bg-sky-900 font-semibold">
            Next
          </button>
        )}
        {pageStep === 4 && (
          <button className="w-full flex justify-center p-3 rounded-[0.4rem] bg-sky-900 font-semibold">
            Create Game
          </button>
        )}
      </div>
    </div>
  );
};

export default Stepper;
