import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import { GiChestnutLeaf } from "react-icons/gi";

const Header = () => {
  return (
    <div className="w-full flex items-center p-4 shadow-md justify-between">
      <span className="flex items-center gap-1 text-sky-800">
        <GiChestnutLeaf size={30} />
        <h2 className="text-2xl font-bold">Treasure Hunt</h2>
      </span>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Header;
