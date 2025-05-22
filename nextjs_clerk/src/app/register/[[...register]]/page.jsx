"use client";
import { SignUp } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs';

export default function RegisterPage() {
    const { user } = useUser();
  
    if (!user) {
      return <SignUp />
    }
  
    return <div>Welcome, {user.firstName}!</div>;
  }
  