"use client";
import React, { useState } from "react";
import Scanner from "./Scanner";
import { BsQrCodeScan } from "react-icons/bs";

const QRscanBlock = ({qrData}) => {

  const [isScannerOn, setIsScannerOn] = useState(false);

  return (
    <div className="w-3/4 aspect-square border-2 border-sky-900 border-dashed">
      {isScannerOn ? (
        <>
        <Scanner qrData={qrData} setIsScannerOn={setIsScannerOn}/>
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
    </div>
  );
};

export default QRscanBlock;
