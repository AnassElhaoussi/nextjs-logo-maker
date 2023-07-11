"use client"
import Image from "next/image";
import { abst_shape1 } from "@/assets";
import Link from "next/link"
import { useSession } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import { homeIllustration } from "@/assets";


const Home = async () => {
  const {data: session} = useSession()
  
  return (
    <section className="flex items-center justify-center h-[60vh] w-full">
      <div className="w-1/2">
        <h1 className="">Generate your icons using IconAI</h1>
        <p className="">Use artificial intelligence to build your icons, use our guide to get the best outcome.</p>
      </div>
      <Image src={homeIllustration} alt="home_image" className="w-1/2"/>
    </section>
  );
};

export default Home;
