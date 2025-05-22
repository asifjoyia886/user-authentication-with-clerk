"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <main className="p-8">
      <SignedIn>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p>Only signed-in users can see this page.</p>
      </SignedIn>

      <SignedOut>
        <h2 className="text-xl">Access Denied</h2>
        <SignInButton>
          <button className="bg-black text-white px-3 py-1 rounded mt-2">Sign In</button>
        </SignInButton>
      </SignedOut>
    </main>
  );
}
