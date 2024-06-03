import InstructionField from "@/components/createPage/InstructionField";
import Stepper from "@/components/createPage/Stepper";
import useGameCreationStore from "@/hooks/useGameCreationStore";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";

const Instructions = () => {
  const { gameData, updateInstructions } = useGameCreationStore();
  const [instructions, setInstructions] = useState(
    gameData.instructions.length ? gameData.instructions : [""]
  );

  const handleChange = (e, index) => {
    const newInstructions = [...instructions];
    newInstructions[index] = e.target.value;
    setInstructions(newInstructions);
  };

  const instructionUpdation = () => {
    updateInstructions(instructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  return (
    <div className="w-full flex">
      <div className="w-full flex flex-col gap-5 p-4 pb-8">
        <div>
          <h3 className="text-zinc-600 font-semibold text-2xl">
            Fill up your instructions
          </h3>
          <p className="italic text-gray-400">
            (minimum 5 instructions recommended)
          </p>
        </div>
        {instructions.map((obj, index) => (
          <InstructionField
            key={index}
            value={obj}
            handleChange={handleChange}
            index={index}
          />
        ))}
        <button
          onClick={addInstruction}
          className="w-full flex justify-center items-center py-2 bg-sky-700 text-white rounded-[0.7rem] font-semibold transition-transform duration-300 ease-in-out"
        >
          <IoIosAdd size={30} /> Add Instruction
        </button>
      </div>
      <Stepper prev={true} next={true} triggerFunction={instructionUpdation} />
    </div>
  );
};

export default Instructions;
