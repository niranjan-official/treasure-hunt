import HintField from "@/components/createPage/HintField";
import Stepper from "@/components/createPage/Stepper";
import useGameCreationStore from "@/hooks/useGameCreationStore";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";

const QrData = () => {
  const { gameData, updateQrData } = useGameCreationStore();
  const [qrData, setQrData] = useState(
    gameData.qrData.length ? gameData.qrData : [{ hint: "", qr: "" }]
  );

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newQrData = [...qrData];
    newQrData[index][name] = value;
    setQrData(newQrData);
  };

  const qrDataUpdation = () => {
    updateQrData(qrData);
  };

  const addHintField = () => {
    setQrData([...qrData, { hint: "", qr: "" }]);
  };

  return (
    <div className="flex">
      <div className="w-full flex flex-col gap-5 p-4 pb-8">
        <div>
          <h3 className="text-zinc-600 font-semibold text-2xl">
            Add the Hints and their corresponding QR data
          </h3>
          <p className="italic text-gray-400">
            (minimum {gameData.basicData.levels} hints required)
          </p>
        </div>
        {qrData.map((qrData, index) => (
          <HintField
            key={index}
            value={qrData}
            handleChange={handleChange}
            index={index}
          />
        ))}
        <button
          onClick={addHintField}
          className="w-full flex justify-center items-center py-2 bg-secondary text-white rounded-[0.7rem] font-semibold transition-transform duration-300 ease-in-out"
        >
          <IoIosAdd size={30} /> Add Hint
        </button>
      </div>
      <Stepper prev={true} submit={true} triggerFunction={qrDataUpdation} />
    </div>
  );
};

export default QrData;
