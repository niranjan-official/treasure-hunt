import InstructionBox from "@/components/gamePage/InstructionBox";
import QRscanBlock from "@/components/gamePage/QRscanBlock";
import { currentUser } from "@clerk/nextjs/server";

const getGameData = async (gameId, userId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/get-game-data?gameId=${gameId}&userId=${userId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();
    if (res.ok) {
      return data.gameStatus;
    } else {
      console.error("Error Occurred: ", data.error);
    }
  } catch (error) {
    console.error("Error fetching game data: ", error);
  }
  return null;
};
const initializeNewPlayer = async (gameData) => {
  "use server";
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/initialize-game`,
      {
        method: "POST",
        body: JSON.stringify(gameData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
  for (let i = 0; i < gameLevelStatus.length; i++) {
    const level = gameLevelStatus[i];
    if (level.progress === "pending") {
      return {
        hint: level.hint,
        qr: level.qr,
        question: level.question,
        answer: level.answer,
        level: i + 1,
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
      <div className="min-h-screen flex flex-col bg-slate-200 pt-16">
        <div className="w-full flex flex-col p-4">
          <div className="flex flex-col bg-red-700 text-white p-3 rounded-[0.5rem]">
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

  if (status === "new player") {
    return (
      <div className="w-full min-h-screen bg-slate-200">
        <InstructionBox
          open={status === "new player"}
          startFunction={initializeNewPlayer}
          gameData={instructionParameter}
        />
      </div>
    );
  }

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
    <div className="w-full flex flex-1 flex-col items-center justify-around ">
      <div className="w-full flex flex-col p-4">
        <div className="flex flex-col bg-secondary text-white p-3 rounded-[0.5rem]">
          {currentLevelData && (
            <span className="text-3xl font-bold">
              Level: {currentLevelData.level}
            </span>
          )}
          <hr className="my-4" />
          <p>{currentLevelData ? currentLevelData.hint : "Game Finished"}</p>
        </div>
      </div>
      <QRscanBlock currentLevelData={currentLevelData} />
    </div>
  );
};

export default page;
