import InstructionBox from "@/components/gamePage/InstructionBox";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const getGameData = async (gameId, userId) => {
  const res = await fetch(
    `http:localhost:3000/api/get-game-data?gameId=${gameId}&userId=${userId}`,
    { cache: "no-store" },
    {
      method: "GET",
    }
  );
  if (res.ok) {
    const data = await res.json();
    return data.gameStatus;
  } else {
    console.log("Error Occured", res);
  }
};

const InitializeNewPlayer = async (gameData) => {
  "use server";
  const res = await fetch("http:localhost:3000/api/initialize-game", {
    method: "POST",
    body: JSON.stringify(gameData),
    headers: {
      "content-type": "application/json",
    },
  });
  if (res.ok) {
    const result = await res.json();
    console.log("GamePattern: ", result.gamePattern);
  } else {
    console.log(res);
  }
};

const page = async ({ params }) => {
  const user = await currentUser();
  const userGameStatus = await getGameData(params.gameId, user.id);
  const { status, data } = userGameStatus;

  const instructionParameter = {
    ...data.gameData,
    userId: user.id,
    gameId: params.gameId,
  };

  // if (status === "new player") {
  //   console.log(data.userData, data.gameData);
  // }

  return (
    <div className="min-h-screen flex flex-col">
      <h3 className="text-3xl font-bold" >Game Page</h3>
      <div>
        {status === "new player" && (
          <InstructionBox
            open={status === "new player"}
            startFunction={InitializeNewPlayer}
            gameData={instructionParameter}
          />
        )}
      </div>
    </div>
  );
};

export default page;
