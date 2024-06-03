import Stepper from "@/components/createPage/Stepper";
import useGameCreationStore from "@/hooks/useGameCreationStore";
import React, { useState } from "react";

const BasicData = () => {
  const { gameData, updateBasicData } = useGameCreationStore();
  const [basicData, setBasicData] = useState(gameData.basicData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBasicData({
      ...basicData,
      [name]: value,
    });
  };

  const basicDataUpdation = () => {
    updateBasicData(basicData);
  };

  return (
    <div className="flex">
      <div className="w-full flex flex-col gap-8 basic-input-field p-4">
        <h3 className="text-zinc-600 font-semibold text-2xl">
          Fill your Game details
        </h3>
        <input
          onChange={handleChange}
          name="title"
          value={basicData.title}
          type="text"
          placeholder="Game Title"
          className=""
        />
        <input
          onChange={handleChange}
          name="venue"
          value={basicData.venue}
          type="text"
          placeholder="Venue"
          className=""
        />
        <input
          onChange={handleChange}
          name="levels"
          value={basicData.levels || ""}
          type="text"
          placeholder="No: of levels"
          className=""
        />
      </div>
      <Stepper next={true} triggerFunction={basicDataUpdation} />
    </div>
  );
};

export default BasicData;
