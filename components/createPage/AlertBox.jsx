import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { VscDebugContinue } from "react-icons/vsc";
import { useRouter } from "next/navigation";

const AlertBox = ({ open, heading, gameToken }) => {
  const digits = gameToken.toString().split("");
  const Router = useRouter();
  return (
    <div>
      <AlertDialog open={open}>
        <AlertDialogContent className="bg-slate-200 border-0 text-sky-950 focus:outline-none focus:ring-0">
          <AlertDialogHeader className={"flex flex-col items-center"} > 
          <IoMdCheckmarkCircleOutline size={50} className="text-950"/>
            <AlertDialogTitle>{heading}</AlertDialogTitle>
          
              <div className="flex flex-col items-center mt-4">
                <span>Game Token: </span>
                <div className="flex text-3xl mt-2">
                  {digits.map((digit, index) => (
                    <span key={index} className="border border-black tabular-nums px-2 py-1">
                      {digit}
                    </span>
                  ))}
                </div>
              </div>
          
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={()=>Router.push('/')} className={"flex gap-1 items-center bg-sky-900 text-white rounded-[0.3rem]"}>Go To Home Page <VscDebugContinue size={20} /></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AlertBox;
