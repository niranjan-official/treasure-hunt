import { db } from "@/firebase/config";
import { currentUser } from "@clerk/nextjs/server";
import { doc, runTransaction } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const level = await req.json();
  const { id } = await currentUser();

  console.log(level, id);

  try {
    await runTransaction(db, async (transaction) => {
      const userDocRef = doc(db, "users", id);
      const userDoc = await transaction.get(userDocRef);
      if (!userDoc.exists()) {
        throw "Document does not exist!";
      }
      let newCurrentGameStatus = userDoc.data().currentGameStatus;
      console.log("Status: ", newCurrentGameStatus);
      newCurrentGameStatus[Number(level)-1]['progress'] = 'finished';

      transaction.update(userDocRef, { currentGameStatus: newCurrentGameStatus });
    });
    console.log("Transaction successfully committed!");

    return NextResponse.json({ message: "Updation Successfull" });
} catch (e) {
    console.log("Transaction failed: ", e);
    return NextResponse.json({ error: "Updation Failed" });
  }

}
