"use client"
import Image from "next/image";
import { abst_shape1 } from "@/assets";
import Link from "next/link"
import { useSession } from "next-auth/react";
import { authOptions } from "@/lib/auth";

const Home = async () => {
  const {data: session} = useSession()
  
  return (
    <section className="flex bg-[#C1D1EE] h-screen w-full">
      <div className="relative z-1 flex flex-col gap-3 w-1/2">
        <h1 className="text-white text-8xl font-black">IconAI</h1>
        <p className="font-light text-[#114F7C]">
          Use artificial intelligence to build high-quality icons
        </p>
        <Link href={session?.user ? "/dashboard" : "/register"}>
            <button className="py-3 px-6 bg-[#4B88FF] text-white text-sm">
            {session?.user ? "Dashboard" : "Get started"}
            </button>
        </Link>
      </div>
      <Image src={} />
    </section>
  );
};

export default Home;
