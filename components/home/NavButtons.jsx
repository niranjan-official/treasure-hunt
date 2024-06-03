import Link from "next/link";
import React from "react";
import { FaMap } from "react-icons/fa";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { RiChatHistoryFill } from "react-icons/ri";

const NavButtons = () => {
  return (
    <div className="flex flex-col gap-5 font-bold px-3">
      <Link href="/login">
        <button className="w-full flex items-center gap-2 justify-center p-3 bg-orange-400 rounded-3xl shadow-md">
          <FaMap size={20} className="text-black" /> Play Game
        </button>
      </Link>
      <Link href="/create">
        <button className="w-full flex items-center gap-2 justify-center p-3 rounded-3xl shadow-md bg-black text-white">
          <VscGitPullRequestCreate size={20} className="text-white" /> Create
          Game
        </button>
      </Link>
      <Link href="/signup">
        <button className="w-full flex items-center gap-2 justify-center p-3 rounded-3xl shadow-md bg-slate-200 text-black">
          <RiChatHistoryFill size={20} className="text-black" /> Past Games
        </button>
      </Link>
    </div>
  );
};

export default NavButtons;
