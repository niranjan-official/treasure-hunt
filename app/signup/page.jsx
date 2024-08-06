"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading } from "react-icons/ai";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ load, setLoad ] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", email), {
        name: name,
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false,
        h: false,
        i: false,
        j: false,
        k: false,
        path: [],
        startTime: new Date(),
        endTime: new Date(),
      });
      router.push("/instruction");
    } catch (e) {
      alert(e.message);
      setLoad(false);
    }
  };
    return (
      <div className="h-screen primary-bg login justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="p-8 flex flex-col items-center rounded-md  "
        >
          <h1 className="mb-2 text-5xl font-serif font-bold text-orange-950">
            Sign up
          </h1>
          <input
            value={name}
            className="input"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your team name"
            required
          />
          <input
            value={email}
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <input
            value={password}
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <div className="flex w-full justify-between text-xs mt-4 text-orange-950">
            <div className="flex">
              <input type="checkbox" className="bg-orange-950" />
              <span className="ml-1 text-orange-950 font-medium">remember me</span>
            </div>
            <Link href="/login" className="cursor-pointer ml-8 text-orange-950 font-medium">
              Already have an account?
            </Link>
          </div>
          <button disabled={load} type="submit" className="button w-full">
            {
                load ? (
                    <AiOutlineLoading size={20} className="animate-spin" />
                ) : (
                    'SIGNUP'
                )
            }
          </button>
        </form>
      </div>
    );
}
