"use client";
import React, { useEffect, useState } from "react";
import { getData, shuffle } from "../functions";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuth } from "@/firebase/auth";
import { useGlobalContext } from "../context";
import { AiOutlineLoading } from "react-icons/ai";
import Image from "next/image";
import Loading from "@/components/loading";
import { IoWarning } from "react-icons/io5";

const Instruction = () => {
  const router = useRouter();
  const { load, setLoad } = useGlobalContext();
  const [buttonLoad, setButtonLoad] = useState(false);

  const User = useAuth();

  useEffect(() => {
    setLoad(true);
    const checkUserPath = async () => {
      const newpath = await getData("users", User.email);

      if (newpath.path.length > 0) {  
        router.push("/scan");
      } else {
        setLoad(false);
      }
    };
    if (User) {
      checkUserPath();
    }
  }, [User]);

  const handleStart = async () => {
    setButtonLoad(true);
    const path = shuffle("abc");
    const array = path.split("");
    const washingtonRef = doc(db, "users", User.email);
    try {
      await updateDoc(washingtonRef, {
        path: array,
        startTime: new Date(),
      });
      router.push("/scan");
    } catch (e) {
      alert(e.message);
      console.log(e.message);
      setButtonLoad(false);
    }
  };
  if(load){
    return <Loading/>
  }
  if (User) {
    return (
      <div className=" min-h-screen primary-bg p-4 pb-0 pt-0 login">
        <div className="flex flex-col p-4 rounded-lg lg:w-1/2 w-full text-sm">
          <div className="w-full flex justify-center items-center gap-1 text-white">
            <IoWarning size={30} />
            <h1 className="text-3xl text-center font-bold uppercase">Instructions</h1>
          </div>
          <div className="w-full">
            <Image
              src={'/images/handprint.png'}
              width={200}
              height={200}
              alt="map"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div className="text-xs font-medium text-white">
            <h5>
              • Use the QR code scanner to scan QR codes placed around the
              campus. Pay attention to the instructions or content provided when
              scanning QR codes.
            </h5>

            <h5 className="mt-4">
              • Each team will have a unique set of QR code locations to visit.
              Stick to your designated pathway and don't deviate.
            </h5>

            <h5 className="mt-4">
              • Time is of the essence. The team that completes the hunt in the
              shortest time wins. Keep an eye on the clock and strategize your
              moves.
            </h5>

            <h5 className="mt-4">
              • Pay attention to each clue's details. They will guide your team
              to the next location.
            </h5>

            <h5 className="mt-4">
              • Keep the answers within your team. Let other teams enjoy the
              challenge without spoilers.
            </h5>

            <h5 className="mt-4">
              • Dont displace or manipulate the qr codes. They are strategically
              placed for a fair and challenging game.
            </h5>
          </div>
          <button disabled={buttonLoad} onClick={handleStart} className="w-full flex justify-center font-medium bg-red-800 text-white rounded-3xl p-2 shadow-md mt-4">
            {buttonLoad ? (
              <AiOutlineLoading size={20} className="animate-spin" />
            ) : (
              "Start the Hunt"
            )}
          </button>
        </div>
      </div>
    );
  }
};

export default Instruction;
