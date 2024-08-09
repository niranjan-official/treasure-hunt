"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Qrcode = ({ qr, setTrigger }) => {

  const Router = useRouter();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 200,
        height: 200,
      },
      fps: 100,
    });
    scanner.render(success, error);

    function success(result) {
      if (result === qr) {
        scanner.clear();
        setTrigger(true);
      } else {
        alert("Try Again !!!");
      }
    }
    function error(err) {
      console.log(err);
    }
  }, []);
  return (
    <div>
      <div
        id="reader"
        className="flex flex-col gap-2 items-center justify-center font-serif p-4"
      ></div>
    </div>
  );
};

export default Qrcode;
