import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiSolidGrid } from "react-icons/bi";

const Header = () => {
  return (
    <div className="fixed top-0 w-full flex items-center p-4 shadow-md justify-between bg-white z-50">
      <span className="flex items-center gap-1 text-secondary">
        <Image src={"/images/box.svg"} width={30} height={30} />
        <h2 className="text-2xl font-bold">Obscura</h2>
      </span>
      <div className="flex items-center gap-2">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <DropdownMenu>
          <DropdownMenuTrigger asChild >
            <BiSolidGrid className="text-black" size={30} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-100 shadow-md focus:outline-none text-black" >
            <DropdownMenuItem>Quit Game</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Go to Home</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
