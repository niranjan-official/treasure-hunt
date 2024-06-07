import React from "react";
import { BsQuestionOctagonFill } from "react-icons/bs";

const QueAndAnsInputField = ({ value, handleChange, index }) => {
  return (
    <div className="flex flex-col p-4 gap-4 rounded-[0.8rem] shadow-md border">
      <span className="flex items-center gap-2 text-lg font-semibold"><BsQuestionOctagonFill size={20} className="text-secondary" />Question {index + 1}</span>
      <input
        type="text"
        value={value.question}
        onChange={(e) => handleChange(e, index)}
        name="question"
        className="w-full p-2 border focus:outline-none focus:ring-0"
        placeholder="Enter your Question"
      />
      <input
        type="text"
        value={value.answer}
        onChange={(e) => handleChange(e, index)}
        name="answer"
        className="w-full ml-2 bg-transparent pb-2 border-b-2 border-[#5601c4] focus:outline-none focus:ring-0"
        placeholder="Answer"
      />
    </div>
  );
};

export default QueAndAnsInputField;
