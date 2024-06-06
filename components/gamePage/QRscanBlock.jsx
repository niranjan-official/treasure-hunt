"use client";
import React, { useState } from "react";
import Scanner from "./Scanner";
import { BsQrCodeScan } from "react-icons/bs";
import QuestionBlock from "./QuestionBlock";
import { useRouter } from "next/navigation";

const QRscanBlock = ({currentLevelData}) => {

  const [isScannerOn, setIsScannerOn] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const Router = useRouter();

  const updateLevelCompletion = async() => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/update-game-level`,
        {
          method: "POST",
          body: JSON.stringify(currentLevelData.level),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("Updation successfull !");
        setIsScannerOn(false);
        setScanSuccess(false);
        Router.refresh();
      } else {
        console.log("Updation Failed");
      }
    } catch (error) {
        console.log("Updation Failed", error);
    }
  };

  return (
    <div className="w-3/4 aspect-square border-2 border-sky-900 border-dashed">
      {isScannerOn ? (
        <>
        <Scanner qrData={currentLevelData.qr} setScanSuccess={setScanSuccess} setIsScannerOn={setIsScannerOn}/>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center rounded-[0.5rem]">
          <button
            onClick={() => setIsScannerOn(true)}
            className="flex items-center gap-2 text-sky-900"
          >
            <BsQrCodeScan size={40} />
            <span className="text-4xl font-bold">Scan</span>
          </button>
        </div>
      )}
      {
        scanSuccess && (
          <QuestionBlock open={scanSuccess} question={currentLevelData.question} answer={currentLevelData.answer} updateLevelCompletion={updateLevelCompletion} />
        )
      }
    </div>
  );
};

export default QRscanBlock;
