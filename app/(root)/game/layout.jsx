import React, { Suspense } from "react";
import Loading from "./loading";
import Header from "@/components/gamePage/Header";

const layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col" >
      <Header/>
      <Suspense fallback={<Loading/>} >{children}</Suspense>
    </div>
  );
};

export default layout;
