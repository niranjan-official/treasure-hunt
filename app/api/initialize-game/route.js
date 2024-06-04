import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  try {
    const gamePattern = generateDataPattern(data);
    const time = new Date().toLocaleString(undefined, {
      timeZone: "Asia/Kolkata",
    });

    const userDoc = doc(db, "users", data.userId);
    await updateDoc(userDoc, {
      currentGameStatus: gamePattern,
      currentGameId: Number(data.gameId),
      startingTime: time,
    });

    return NextResponse.json({ gamePattern });
  } catch (error) {
    console.error("Firebase Error:", error);
    return NextResponse.json({ error: "Firebase Error", status: 500 });
  }
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateDataPattern = (data) => {
  const { questionsAnswers, qrData, levels } = data;
  const numberOfLevels = parseInt(levels, 10);

  const qrDataLength = qrData.length;
  const qaDataLength = questionsAnswers.length;

  const levelArray = new Array(numberOfLevels).fill(null).map((_, i) => ({
    qr: qrData[i % qrDataLength].qr,
    hint: qrData[i % qrDataLength].hint,
    progress: "pending",
    question: questionsAnswers[i % qaDataLength].question,
    answer: questionsAnswers[i % qaDataLength].answer,
  }));

  return shuffleArray(levelArray);
};
