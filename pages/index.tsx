import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
      <h1 className="text-blue-500">Netflix</h1>
      <button className="bg-white w-4 h-4" onClick={() => signOut()}>
        Sign out
      </button>
    </>
  );
}
