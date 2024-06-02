"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import treasureBox from "../public/images/login.svg";
import { FaMap } from "react-icons/fa";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { RiChatHistoryFill } from "react-icons/ri";

const Home = () => {
  return (
    <section className="w-screen h-screen flex justify-center overflow-hidden">
      <div className="max-w-4xl h-full flex flex-col bg-primary">
        <div className="w-full h-1/2">
          <Image
            src={treasureBox}
            height={0}
            width={0}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="w-full h-1/2 flex flex-col p-3 pt-0">
          <div className="relative -top-12">
            <h1 className="text-6xl font-serif text-center text-white mt-3 mb-7">
              Treasure Hunt
            </h1>
            <div className="flex flex-col gap-5 font-bold px-3">
              <Link href="/login">
                <button className="w-full flex items-center gap-2 justify-center p-3 bg-orange-400 rounded-3xl shadow-md">
                 <FaMap size={20} className="text-black" /> Play Game
                </button>
              </Link>
              <Link href="/signup">
                <button className="w-full flex items-center gap-2 justify-center p-3 rounded-3xl shadow-md bg-black text-white">
                <VscGitPullRequestCreate size={20} className="text-white" /> Create Game
                </button>
              </Link>
              <Link href="/signup">
                <button className="w-full flex items-center gap-2 justify-center p-3 rounded-3xl shadow-md bg-slate-200 text-black">
                <RiChatHistoryFill size={20} className="text-black" /> Past Games
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
