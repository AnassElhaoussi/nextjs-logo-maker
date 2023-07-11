"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Navigation = async () => {
  const {data: session} = useSession()
  const router = useRouter()

  const handleNavButtonState = async () => {
    if(session?.user) {
        return await signOut()
    } else router.push("/login")
  }

  return (
    <nav className="">
      <h1 className="">IconAI</h1>
      <div className="">
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
      </div>
      <button className="">Sign in</button>
    </nav>
  );
};

export default Navigation;
