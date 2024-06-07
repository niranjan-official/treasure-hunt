import React from "react";
import { LuQrCode } from "react-icons/lu";

const HintField = ({ value, handleChange, index }) => {
  return (
    <div className="flex flex-col p-4 gap-4 border rounded-[0.8rem] shadow-md">
      <span className="flex gap-1 text-lg font-semibold">
        <LuQrCode size={25} /> Hint {index + 1}
      </span>
      <input
        type="text"
        name="hint"
        value={value.hint}
        onChange={(e) => handleChange(e, index)}
        className="w-full p-2 border focus:outline-none focus:ring-0"
        placeholder="Enter the Hint"
      />
      <input
        type="text"
        name="qr"
        value={value.qr}
        onChange={(e) => handleChange(e, index)}
        className="w-full ml-2 bg-transparent pb-2 border-b-2 border-secondary-dark focus:outline-none focus:ring-0"
        placeholder="QR data"
      />
    </div>
  );
};

export default HintField;
