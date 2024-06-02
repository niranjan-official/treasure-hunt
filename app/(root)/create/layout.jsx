import Header from "@/components/createPage/Header";
import Stepper from "@/components/createPage/Stepper";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-200">
      <Header />
      {children}
      <Stepper/>
    </div>
  );
};

export default layout;
