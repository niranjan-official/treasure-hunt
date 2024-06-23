import Link from "next/link";
import React from "react";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { RiChatHistoryFill } from "react-icons/ri";
import PlayGame from "./PlayGame";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

const SearchGameId = async(gameId) =>{
  'use server'
  try {
    const gameDoc = await getDoc(doc(db, "games", gameId.toString()));
      if (gameDoc.exists()) {
        const gameData = gameDoc.data();
        return {exist: true,
          data:{
            gameTitle: gameData.title,
            gameId: gameDoc.id,
            venue: gameData.venue,
            levels: gameData.levels
          }
        }
      }else{
        return {exist: false}
      }
    } catch (error) {
      console.log(error.message);
    }
    return null;
}

const NavButtons = () => {
  
  return (
    <div className="flex flex-col gap-5 font-bold px-3">
      <PlayGame SearchGameId={SearchGameId} />
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
      <Link href="/signup">
        <button className="w-full flex items-center gap-2 justify-center p-3 rounded-3xl shadow-md bg-black text-white">
          <RiChatHistoryFill size={20} className="text-white" /> How to play
        </button>
      </Link>
    </div>
  );
};

export default NavButtons;
