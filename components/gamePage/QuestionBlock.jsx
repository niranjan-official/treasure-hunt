import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const QuestionBlock = ({ open, question, answer, updateLevelCompletion }) => {
  const [value, setValue] = useState("");
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      value.toLowerCase().trim().toString() ===
      answer.toLowerCase().trim().toString()
    ) {
      setIsLoading(true);
      await updateLevelCompletion();
      setIsLoading(false);
    } else {
      setWrongAnswer(true);
    }
  };

  useEffect(() => {
    if (wrongAnswer) {
      setTimeout(() => {
        setWrongAnswer(false);
      }, 2000);
    }
  }, [wrongAnswer]);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="border-0 bg-slate-200">
        <div className="w-full flex flex-col gap-4">
          <p>{question}</p>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            className="w-full border p-2"
            placeholder="Answer"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleSubmit}
            className="text-white bg-green-500 hover:bg-green-700 p-2 px-4 rounded-[0.3rem]"
          >
            {
                isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" size={20} />
                ): 'Submit'
            }
          </AlertDialogAction>
        </AlertDialogFooter>
        {wrongAnswer && (
          <span className="text-sm text-red-500">Wrong Answer! Try Again</span>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QuestionBlock;
