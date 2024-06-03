import React from "react";

const InstructionField = ({ value, handleChange, index }) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-[0.8rem] basic-input-field">
      <span>Instruction {index + 1}</span>
      <input
        value={value}
        onChange={(e) => handleChange(e, index)}
        placeholder="Enter your instruction"
        type="text"
      />
    </div>
  );
};

export default InstructionField;
