import Header from "@/components/createPage/Header";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-200">
      <Header />
      {children}
    </div>
  );
};

export default layout;
