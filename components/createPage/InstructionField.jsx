import React from "react";
import { MdLabelImportant } from "react-icons/md";

const InstructionField = ({ value, handleChange, index }) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow-md border rounded-[0.8rem]">
      <span className="flex items-center gap-1 text-lg font-semibold"><MdLabelImportant className="text-secondary" size={23} />Instruction {index + 1}</span>
      <input
        value={value}
        onChange={(e) => handleChange(e, index)}
        placeholder="Enter your instruction"
        type="text"
        className="pb-2 border-b-2 border-secondary-dark"
      />
    </div>
  );
};

export default InstructionField;
