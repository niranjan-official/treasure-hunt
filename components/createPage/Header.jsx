import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { GiChestnutLeaf } from "react-icons/gi";

const Header = () => {
  return (
    <div className="fixed top-0 w-full flex items-center p-4 shadow-md justify-between bg-white z-50">
      <span className="flex items-center gap-1 text-secondary">
        <Image src={'/images/box.svg'} width={30} height={30}  />
        <h2 className="text-2xl font-bold">Obscura</h2>
      </span>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Header;
