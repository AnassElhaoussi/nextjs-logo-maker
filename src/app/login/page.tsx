"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Flex } from "@chakra-ui/react";
import { abstShapeImg } from "@/assets";
import { poppins } from "../fonts";

const Login = () => {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // This is making sure that the input field is not empty
    if (Object.values(user).every((value) => value.trim().length !== 0)) {
      try {
        setLoading(true);
        const res = await signIn("Login", {
          email: user.email,
          password: user.password,
          callbackUrl: "/dashboard",
          redirect: false,
        });

        if (res?.url) router.push(res.url);
        if (res?.error) setError(res.error);
      } catch (error: any) {
        setLoading(false);
        setError(error);
      }
    } else {
      setError("Some fields are empty, try again!");
    }
  };
  return (
    <main
      className="flex w-full bg-gradient-to-b from-[#e9e9e9] to-white gap-10"
      style={poppins.style}
    >
      <div className="relative sm:flex hidden items-center justify-center h-screen w-1/2 ">
        <div className="pl-10">
          <Image
            alt="signup_form_image"
            src={abstShapeImg}
            className="relative z-1 w-[32rem] z-10"
          />
        </div>
        <div className="absolute -z-1 left-1/3 w-1/2 md:h-[32rem] h-[20rem] bg-[#23616F] rounded-[2rem] shadow-2xl"></div>
      </div>
      <form
        onSubmit={handleLogin}
        className="flex items-center justify-center h-screen sm:w-1/2 w-full pr-10"
      >
        <Flex direction="column" gap="3rem">
          <Flex direction="column">
            <h1 className="lg:text-8xl md:text-7xl sm:text-6xl text-7xl text-[#23616F] font-[800] ">
              Welcome!!!
            </h1>
            <span className="md:text-sm text-xs text-[#343333] font-normal ">
              Login to IconAI by using your credentials or social media
              providers
            </span>
          </Flex>
          <Flex direction="column" gap="1.5rem" className="w-[20rem] ">
            <Flex direction="column" gap="0.5rem">
              <label htmlFor="" className="text-md">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={onChange}
                placeholder="Enter your email"
                className="py-2 px-6 outline-none rounded-full bg-[#ececec] placeholder:text-sm"
              />
            </Flex>
            <Flex direction="column" gap="0.5rem">
              <label htmlFor="" className="text-md">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={onChange}
                placeholder="Create a password"
                className="py-2 px-6 outline-none rounded-full bg-[#ececec] placeholder:text-sm"
              />
            </Flex>
            {error && <span className="text-red-400 text-sm ">{error}</span>}
            <Flex direction="column" gap="0.5rem" alignItems="start">
              <button
                type="submit"
                className="py-2 px-10 rounded-full text-white bg-[#23616F] shadow-lg hover:px-14 transition-all"
              >
                Submit
              </button>
              <span className="text-sm text-[#676565] ">
                Don't have an account ? <Link href="/register">Sign up</Link>
              </span>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </main>
  );
};

export default Login;
