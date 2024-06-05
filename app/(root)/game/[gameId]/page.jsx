import InstructionBox from "@/components/gamePage/InstructionBox";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import QRscanBlock from "./QRscanBlock";

const getGameData = async (gameId, userId) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/get-game-data?gameId=${gameId}&userId=${userId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (res.ok) {
      const data = await res.json();
      return data.gameStatus;
    } else {
      console.error("Error Occurred: ", res);
    }
  } catch (error) {
    console.error("Error fetching game data: ", error);
  }
  return null;
};

const initializeNewPlayer = async (gameData) => {
  "use server";
  try {
    const res = await fetch("http://localhost:3000/api/initialize-game", {
      method: "POST",
      body: JSON.stringify(gameData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const result = await res.json();
      console.log("GamePattern: ", result.gamePattern);
    } else {
      console.error("Error initializing game: ", res);
    }
  } catch (error) {
    console.error("Error initializing new player: ", error);
  }
};

const findFirstUnfinishedLevel = (gameLevelStatus) => {
  for (const level of gameLevelStatus) {
    if (level.progress === "pending") {
      return {
        hint: level.hint,
        qr: level.qr,
        question: level.question,
        answer: level.answer,
      };
    }
  }
  return null;
};

const page = async ({ params }) => {
  const user = await currentUser();
  const userGameStatus = await getGameData(params.gameId, user.id);

  if (!userGameStatus) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-200">
        <div className="w-full flex flex-col p-4">
          <div className="flex bg-red-700 text-white p-3 rounded-[0.5rem]">
            <p>Error fetching game status. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }

  const { status, data } = userGameStatus;
  // data => data.gameData & data.userData
  // status => "new player" || "existing player"

  const instructionParameter = {
    ...data.gameData,
    userId: user.id,
    gameId: params.gameId,
  };

  let currentLevelData;
  if (status === "existing player") {
    const unfinishedLevel = findFirstUnfinishedLevel(
      data.userData.currentGameStatus
    );
    if (!unfinishedLevel) {
      console.log("Game Finished");
    } else {
      currentLevelData = unfinishedLevel;
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-around bg-slate-200">
      <div className="w-full flex flex-col p-4">
        <div className="flex bg-sky-700 text-white p-3 rounded-[0.5rem]">
          <p>{currentLevelData ? currentLevelData.hint : "Game Finished"}</p>
        </div>
      </div>
        <QRscanBlock/>
      <div>
        {status === "new player" && (
          <InstructionBox
            open={status === "new player"}
            startFunction={initializeNewPlayer}
            gameData={instructionParameter}
          />
        )}
      </div>
    </div>
  );
};

export default page;
