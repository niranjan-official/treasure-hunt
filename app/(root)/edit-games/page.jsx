import React from "react";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

const getGames = async (userId) => {
    try {
        const q = query(collection(db, "games"), where("userId", "==", userId));
        let games = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            games.push(data);
            console.log(data);
        });
    } catch (error) {
        console.log(error.message);   
    }
};
const page = async () => {
    const { userId } = await auth();
    if (userId) {
        const games = await getGames(userId);
    }
    return (
        <div className="min-h-screen bg-slate-100 w-full flex flex-col p-4 gap-4"></div>
    );
};

export default page;
