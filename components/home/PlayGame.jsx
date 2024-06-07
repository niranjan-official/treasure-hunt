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
    if(!gameId) return;
  
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
    <Dialog
      onOpenChange={() => {
        setGameDetails(""), setGameId("");
      }}
    >
      <DialogTrigger asChild>
        <button className="w-full flex items-center gap-2 justify-center p-3 bg-orange-400 rounded-3xl shadow-md">
          <FaMap size={20} className="text-black" /> Play Game
        </button>
      </DialogTrigger>
      <DialogContent className="border-0 flex items-center bg-white">
        <DialogHeader>
          {gameDetails ? (
            <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="w-full flex flex-col gap-4">
              <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">
                {gameDetails?.gameTitle}
              </h2>
              <div className="flex flex-col text-left gap-3 font-semibold text-gray-700">
                <span className="flex gap-2 items-center">
                  <IoLocation className="text-secondary" size={24} />
                  <span className="text-lg">{gameDetails?.venue}</span>
                </span>
                <span className="flex gap-2 items-center">
                  <IoFootsteps className="text-secondary" size={24} />
                  <span className="text-lg">No. of Levels: {gameDetails?.levels}</span>
                </span>
                <span className="flex gap-2 items-center">
                  <IoGameController className="text-secondary" size={24} />
                  <span className="text-lg">Game Code: {gameDetails?.gameId}</span>
                </span>
              </div>
              <Link
                href={`/game/${gameDetails?.gameId}`}
                className="mt-6 w-full flex justify-center p-3 bg-secondary text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
              >
                Join Game
              </Link>
            </div>
          </div>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <DialogTitle>Enter Game Code</DialogTitle>
              <p className="text-sm text-gray-500">
                Please enter the code you received to join the game. If you
                don't have a code, contact the game organizer.
              </p>
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
                className="w-full flex justify-center p-2 bg-secondary text-white"
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
