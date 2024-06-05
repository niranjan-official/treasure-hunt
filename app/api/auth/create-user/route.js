import { db } from "@/firebase/config";
import { auth, currentUser } from "@clerk/nextjs/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userData = await currentUser();
    if (!userData) {
      return new NextResponse('User Not Exist', { status: 404 });
    }

    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    // If the user document does not exist, create it
    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", userId), {
        username: userData.username,
        email: userData.emailAddresses[0].emailAddress
      });
    }

    // Redirect to the homepage
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: "http://localhost:3000/",
      },
    });

  } catch (error) {
    console.error('Error in GET /api/auth/create-user:', error);

    // Redirect to the create-user page in case of an error
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: "http://localhost:3000/api/auth/create-user",
      },
    });
  }
}
