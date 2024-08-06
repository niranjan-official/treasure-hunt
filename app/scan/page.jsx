"use client";
import React, { useEffect, useState } from "react";
import { handleData, handleQuestionSubmit } from "../functions";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import Qrcode from "./qrcode";
import Header from "../../components/header";
import Image from "next/image";
import box from "../../public/images/box.png";
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
      <div className="login min-h-screen flex flex-col ">
        <Header UserName={hint.userName} />
        <div className="h-full flex flex-col items-center primary-bg p-3">
          <div className="w-full h-2/5 p-2 pt-5 mt-6">
            <Image
              src={box}
              width={0}
              height={0}
              alt="box"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          {load ? (
            <AiOutlineLoading
              size={40}
              className="animate-spin mt-5 text-center"
            />
          ) : check ? (
            <span className="text-center">Checking your QR....</span>
          ) : (
            <div className="h-3/5 p-4 flex flex-col justify-center items-center b-1">
              <div className="w-full bg-orange-100 rounded-xl pt-2 pb-8 shadow-inner shadow-orange-950">
                <h3 className="text-lg text-orange-950 p-3 rounded-xl mt-3">
                  Hint: {hint.hint}
                </h3>
              </div>
              <div className="relative -top-6 h-auto w-4/5 bg-orange-200 rounded-xl shadow-inner shadow-orange-950 p-3">
                <Qrcode qr={hint.qr} setTrigger={setTrigger} />
              </div>
            </div>
          )}
        </div>
        <h1 className="text-2xl bg-orange-100 p-1 rounded-lg shadow-inner shadow-orange-950 text-orange-950 absolute left-3 top-16 font-serif">
          Level: {hint.level}
        </h1>
      </div>
    );
  }
};

export default Scan;
