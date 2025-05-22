"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <nav className="p-4 bg-gray-100 flex justify-between items-center">
      <Link href="/" className="text-lg font-bold">MyApp</Link>
      <div className="flex gap-4 items-center">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="bg-black text-white px-3 py-1 rounded">Sign In</button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
