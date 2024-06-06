"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FaMap } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import { IoLocation } from "react-icons/io5";
import { IoFootsteps } from "react-icons/io5";
import { IoGameController } from "react-icons/io5";

const PlayGame = ({ SearchGameId }) => {
  const [gameId, setGameId] = useState("");
  const [searching, setSearching] = useState(false);
  const [gameDetails, setGameDetails] = useState("");
  const [gameNotExist, setGameNotExist] = useState(false);

  const handleSearch = async () => {
    setSearching(true);
    const game = await SearchGameId(gameId);
    if (game.exist) {
      setGameDetails(game.data);
      console.log(game.data);
    } else {
      setGameNotExist(true);
    }
    setSearching(false);
  };
  useEffect(() => {
    if (gameNotExist) {
      setTimeout(() => {
        setGameNotExist(false);
      }, 2000);
    }
  }, [gameNotExist]);

  return (
    <Dialog onOpenChange={()=>{setGameDetails(''), setGameId('')}} >
      <DialogTrigger asChild>
        <button className="w-full flex items-center gap-2 justify-center p-3 bg-orange-400 rounded-3xl shadow-md">
          <FaMap size={20} className="text-black" /> Play Game
        </button>
      </DialogTrigger>
      <DialogContent className="border-0 bg-slate-200">
        <DialogHeader>
          {gameDetails ? (
            <div className="w-full flex flex-col gap-4">
              <DialogTitle className="text-center text-2xl">
                {gameDetails?.gameTitle}
              </DialogTitle>
              <div className="flex flex-col text-left gap-1 font-semibold" >
                <span className="flex gap-1 items-center"><IoLocation size={20} />Venue: {gameDetails?.venue}</span>
                <span className="flex gap-1 items-center"><IoFootsteps size={20} />No: of levels: {gameDetails?.levels}</span>
                <span className="flex gap-1 items-center"><IoGameController size={20} />Game code:  {gameDetails?.gameId}</span>
              </div>
              <Link
                href={`/game/${gameDetails?.gameId}`}
                className="w-full flex justify-center p-2 bg-green-500 hover:bg-green-700 text-white"
              >
                Join Game
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <DialogTitle>Enter Game Code</DialogTitle>
              <InputOTP
                maxLength={6}
                value={gameId}
                onChange={(value) => setGameId(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {gameNotExist && (
                <span className="text-sm text-red-500">
                  A game with this code does not exist
                </span>
              )}
              <button
                disabled={searching}
                onClick={handleSearch}
                className="w-full flex justify-center p-2 bg-sky-900 text-white"
              >
                {searching ? (
                  <AiOutlineLoading3Quarters
                    className="animate-spin"
                    size={20}
                  />
                ) : (
                  "Search"
                )}
              </button>
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlayGame;
