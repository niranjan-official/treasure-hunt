import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const params = new URLSearchParams(url.searchParams);

    const gameId = Number(params.get("gameId"));
    const userId = params.get("userId");

    if (!gameId || !userId) {
      return NextResponse.json({ error: "Insufficient Data" }, { status: 400 });
    }

    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const userData = userDoc.data();

    const gameStatus = await checkGameStatus(userData, gameId);

    return NextResponse.json({ gameStatus });
  } catch (error) {
    console.error("Error fetching game data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const checkGameStatus = async (userData, gameId) => {
  if (userData.currentGameId === gameId) {
    return {
      status: "existing player",
      data: { userData },
    };
  }

  const gameDoc = await getDoc(doc(db, "games", gameId.toString()));
  if (!gameDoc.exists()) {
    return { error: "Game not found", status: 404 };
  }

  const gameData = gameDoc.data();
  return {
    status: "new player",
    data: { userData, gameData },
  };
};
