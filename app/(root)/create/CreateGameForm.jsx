"use client";
import React from "react";
import Instructions from "./Instructions";
import BasicData from "./BasicData";
import QueAndAns from "./QueAndAns";
import QrData from "./QrData";
import useGameCreationStore from "@/hooks/useGameCreationStore";

const CreateGameForm = () => {
  const { pageStep } = useGameCreationStore();

  return (
    <div className="w-full flex flex-col p-4">
      {pageStep === 1 && <BasicData />}
      {pageStep === 2 && <Instructions />}
      {pageStep === 3 && <QueAndAns />}
      {pageStep === 4 && <QrData />}
    </div>
  );
};

export default CreateGameForm;
