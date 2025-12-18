import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="relative min-h-screen w-full bg-background flex justify-center items-center">
      <div className="relative z-20 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-[#dc2626] rounded-full blur-md animate-pulse" />
          <AiOutlineLoading3Quarters 
            size={48} 
            className="relative z-10 animate-spin text-[#dc2626]"
            style={{ animationDuration: '1s' }}
          />
        </div>
        <span className="mt-4 font-mono text-sm text-muted-foreground tracking-wider">
          INITIALIZING
        </span>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
};

export default Loading;
