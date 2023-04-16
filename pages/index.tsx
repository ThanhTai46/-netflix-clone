import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: user } = useCurrentUser();
  const session = getSession();

  return (
    <>
      <h1 className="text-blue-500">Netflix</h1>
      <button
        className="bg-white w-4 h-4"
        onClick={() => signOut({ callbackUrl: "/auth" })}
      >
        Sign out
      </button>
    </>
  );
}
