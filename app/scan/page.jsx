"use client";
import React, { useEffect, useState } from "react";
import { handleData, handleQuestionSubmit } from "../functions";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import Qrcode from "./qrcode";
import { AiOutlineLoading } from "react-icons/ai";

const Scan = () => {

  const router = useRouter();
  const [hint, setHint] = useState({});
  const [load, setLoad] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [check, setCheck] = useState(false);
  const User = useAuth();

  const fetchData = async () => {
    setLoad(true);
    const obj = await handleData(User.email);
    console.log(obj);

    if (!obj.StartTime) {
      setHint({
        hint: obj.hint.h,
        qr: obj.hint.qr,
        level: obj.level,
        userName: obj.userName,
      });
      setLoad(false);
    } else {
      router.push("/completion");
    }
  };

  useEffect(() => {
    if (trigger) {
      updateLevel();
      setTrigger(false);
    }
  }, [trigger]);

  const updateLevel = async () => {
    try {
      setCheck(true);
      await handleQuestionSubmit(User);
      setCheck(false);
      fetchData();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (User) {
      fetchData();
    }
  }, [User]);

  // If you want to prefer front camera
  if (User) {
    return (
      <div className="login min-h-screen flex flex-col p-2">
        {/* <Header UserName={hint.userName} /> */}
        <div className="h-full flex flex-col items-center primary-bg p-3">
          {load ? (
            <AiOutlineLoading
              size={40}
              className="animate-spin mt-5 text-center"
            />
          ) : check ? (
            <span className="text-center">Checking your QR....</span>
          ) : (
            <div className="p-4 w-full flex flex-col justify-center items-center mx-8 mt-4">
              <div className="flex flex-col text-center text-white">
                <span className="text-7xl font-bold">CRIME</span>
                <span className="text-3xl">INVESTIGATION</span>
              </div>
              <div className="w-full bg-white bg-opacity-40 backdrop-blur-md rounded-lg shadow-lg shadow-orange-950 text-center font-medium mt-4">
                <h3 className="text-lg text-orange-950 p-3 rounded-xl">
                  &quot;{hint.hint}&quot;
                </h3>
              </div>
              <div className=" w-4/5 mt-4 bg-red-950 text-white rounded-xl shadow-inner shadow-orange-950 p-3">
                <Qrcode qr={hint.qr} setTrigger={setTrigger} />
              </div>
            </div>
          )}
        </div>
        {/* {!load && (
          <span className="text-2xl flex items-center justify-center w-fit bg-orange-100 p-1 rounded-lg shadow shadow-orange-950 text-orange-950 absolute left-3 top-16 font-serif">
            Level: {hint.level}
          </span>
        )} */}
      </div>
    );
  }
};

export default Scan;
