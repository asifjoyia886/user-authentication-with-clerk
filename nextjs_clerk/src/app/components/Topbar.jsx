'use client';

import { UserButton } from '@clerk/nextjs';

export default function Topbar() {
  return (
    <header className="h-16 flex items-center justify-between bg-white border-b px-6 shadow-sm">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <UserButton afterSignOutUrl="/" />
    </header>
  );
}
