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
        <AlertDialogContent className="bg-white border-0 focus:outline-none focus:ring-0">
          <AlertDialogHeader className={"flex flex-col items-center"} > 
          <IoMdCheckmarkCircleOutline size={50} className="text-secondary"/>
            <AlertDialogTitle>{heading}</AlertDialogTitle>
              <div className="flex flex-col items-center mt-2">
                <span>Game Token: </span>
                <div className="flex gap-1 text-3xl mt-2">
                  {digits.map((digit, index) => (
                    <span key={index} className="border border-black text-violet-900 font-semibold tabular-nums px-2 py-1">
                      {digit}
                    </span>
                  ))}
                </div>
              </div>
          
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={()=>Router.push('/')} className={"flex gap-1 items-center bg-secondary text-white rounded-[0.3rem]"}>Go To Home Page <VscDebugContinue size={20} /></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AlertBox;
