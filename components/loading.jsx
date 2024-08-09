import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center login">
      <div className="flex justify-center items-center p-10 rounded-xl">
        <AiOutlineLoading size={40} className="animate-spin text-white/60" />
      </div>
    </div>
  );
};

export default Loading;
