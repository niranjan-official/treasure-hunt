import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import { GiChestnutLeaf } from "react-icons/gi";

const Header = () => {
  return (
    <div className="fixed top-0 w-full flex items-center p-4 shadow-md justify-between bg-white z-50">
      <span className="flex items-center gap-1 text-secondary">
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
