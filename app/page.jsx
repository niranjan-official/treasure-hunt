import Image from "next/image";
import React from "react";
import treasureBox from "../public/images/login.svg";
import NavButtons from "@/components/home/NavButtons";
import { auth } from "@clerk/nextjs/server";

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
            <NavButtons/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
