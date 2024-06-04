"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const InstructionBox = ({ open, gameData, startFunction }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleStart = async () => {
    setIsLoading(true);
    await startFunction(gameData);
    Router.refresh();
  };

  if (!isMounted) {
    return null;
  } else {
    return (
      <AlertDialog open={open}>
        <AlertDialogContent className="border-0 bg-slate-200 text-bg-sky-950 ">
          <AlertDialogHeader>
            <AlertDialogTitle>Instructions</AlertDialogTitle>
            <div className="flex">
              <ul className="flex flex-col text-left gap-4">
                {gameData.instructions.map((instruction, index) => (
                  <li key={index}>• {instruction}</li>
                ))}
              </ul>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              disabled={isLoading}
              onClick={handleStart}
              className="bg-sky-900 text-white"
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" size={20} />
              ) : (
                "Start Hunt"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
};

export default InstructionBox;
