"use client";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      signInWithEmailAndPassword(auth, email, password);
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
        className="p-8 flex flex-col items-center rounded-md"
      >
        <h1 className="mb-2 text-5xl font-serif font-bold text-orange-950">
          Login
        </h1>
        <input
          value={email}
          className="input"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          required
        />
        <input
          value={password}
          className="input"
          autoComplete="off"
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
          <Link href="/signup" className="cursor-pointer ml-8 font-medium">
            Create new Account?
          </Link>
        </div>
        <button disabled={load} type="submit" className="button w-full">
            {
                load ? (
                    <AiOutlineLoading size={20} className="animate-spin" />
                ) : (
                    'LOGIN'
                )
            }
        </button>
      </form>
    </div>
  );
}
