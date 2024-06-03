import React from "react";

const QueAndAnsInputField = ({ value, handleChange, index }) => {
  return (
    <div className="flex flex-col p-4 gap-4 rounded-[0.8rem] bg-white">
      <span className="text-lg font-semibold">Question {index + 1}</span>
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
        className="w-full ml-2 bg-transparent pb-2 border-b-2 border-sky-900 focus:outline-none focus:ring-0"
        placeholder="Answer"
      />
    </div>
  );
};

export default QueAndAnsInputField;
