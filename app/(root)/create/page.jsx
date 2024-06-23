"use client";
import React, { useEffect } from "react";
import Instructions from "./Instructions";
import BasicData from "./BasicData";
import QueAndAns from "./QueAndAns";
import QrData from "./QrData";
import useGameCreationStore from "@/hooks/useGameCreationStore";

const page = () => {
  const { gameData, pageStep, updateGameData } = useGameCreationStore();

  // load existing data
  useEffect(() => {
    const storedGameData = localStorage.getItem("treasureGameData");
    if (storedGameData) {
      const existingGameData = JSON.parse(storedGameData);
      const { basicData, instructions, questionsAnswers, qrData } = existingGameData;
      if(basicData.level ||
        instructions[0] ||
        questionsAnswers[0] ||
        qrData[0]){
        if (confirm("Do you want to load the existing Data ?")) {
          updateGameData(JSON.parse(storedGameData));
        }
      }
    }
  }, []);

  //update local data
  useEffect(() => {
      localStorage.setItem("treasureGameData", JSON.stringify(gameData));
  }, [gameData]);

  return (
    <section className="w-full flex">
      <div className="w-full flex flex-col py-16 overflow-y-scroll">
        {pageStep === 1 && <BasicData />}
        {pageStep === 2 && <Instructions />}
        {pageStep === 3 && <QueAndAns />}
        {pageStep === 4 && <QrData />}
      </div>
    </section>
  );
};

export default page;
