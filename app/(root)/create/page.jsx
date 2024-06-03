"use client";
import React from "react";
import Instructions from "./Instructions";
import BasicData from "./BasicData";
import QueAndAns from "./QueAndAns";
import QrData from "./QrData";
import useGameCreationStore from "@/hooks/useGameCreationStore";

const page = () => {
  const { pageStep } = useGameCreationStore();
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
