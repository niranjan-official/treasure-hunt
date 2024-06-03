import { db } from "@/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const generateRandomToken = () => {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
};

const checkTokenExistence = async (randomToken) => {
  const docRef = doc(db, "games", randomToken.toString());
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  let randomToken;
  let exists = true;

  while (exists) {
    randomToken = generateRandomToken();
    exists = await checkTokenExistence(randomToken);
  }

  await setDoc(doc(db, "games", randomToken.toString()), {
    title: data.basicData.title,
    venue: data.basicData.venue,
    levels: data.basicData.levels,
    instructions: data.instructions,
    questionsAnswers: data.questionsAnswers,
    qrData: data.qrData,
  });

  return NextResponse.json(data);
}
