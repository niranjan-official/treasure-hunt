import QueAndAnsInputField from "@/components/createPage/QueAndAnsInputField";
import Stepper from "@/components/createPage/Stepper";
import useGameCreationStore from "@/hooks/useGameCreationStore";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";

const QueAndAns = () => {
  const { gameData, updateQuestionsAnswers } = useGameCreationStore();
  const [questionsAnswers, setQuestionsAnswers] = useState(
    gameData.questionsAnswers.length
      ? gameData.questionsAnswers
      : [{ question: "", answer: "" }]
  );

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newQuestionsAnswers = [...questionsAnswers];
    newQuestionsAnswers[index][name] = value;
    setQuestionsAnswers(newQuestionsAnswers);
  };

  const questionsAnswersUpdation = () => {
    updateQuestionsAnswers(questionsAnswers);
  };

  const addQuestionField = () => {
    setQuestionsAnswers([...questionsAnswers, { question: "", answer: "" }]);
  };

  return (
    <div className="flex">
      <div className="w-full flex flex-col gap-5 p-4 pb-8">
        <div>
          <h3 className="text-zinc-600 font-semibold text-2xl">
            Add your Questions and Answers
          </h3>
          <p className="italic text-gray-400">
            (minimum {gameData.basicData.levels} questions required)
          </p>
        </div>
        {questionsAnswers.map((questionsAnswers, index) => (
          <QueAndAnsInputField
            value={questionsAnswers}
            handleChange={handleChange}
            key={index}
            index={index}
          />
        ))}
        <button
          onClick={addQuestionField}
          className="w-full flex justify-center items-center py-2 bg-sky-700 text-white rounded-[0.7rem] font-semibold transition-transform duration-300 ease-in-out"
        >
          <IoIosAdd size={30} /> Add Question
        </button>
      </div>
      <Stepper
        prev={true}
        next={true}
        triggerFunction={questionsAnswersUpdation}
      />
    </div>
  );
};

export default QueAndAns;
