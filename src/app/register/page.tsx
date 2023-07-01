"use client";
import React, { useState } from "react";
import { checkMissingInputFields } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import signUpUser from "../../axios";
import { useRouter } from "next/navigation";
import {Flex, Button} from '@chakra-ui/react'
import Image from "next/image";
import { hairyKnotImg } from "@/assets";
import Link from "next/link";
import {Poppins} from "next/font/google"
import { Spinner } from "@chakra-ui/react";

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ['latin']
})

const Register = () => {
  const [user, setUser] = useState<{
    email: string;
    password: string;
    confirmedPassword: string;
  }>({
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const [error, setError] = useState<{
    isError: boolean;
    errorMessage: string | null | undefined;
  }>({
    isError: false,
    errorMessage: null,
  });
  const router = useRouter()

  // This functions appends the value of each modified input to the user state
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // This function sends an axios request to the /register endpoint to create a user
  const {mutate, isLoading} = useMutation(signUpUser, {
    onSuccess: () => {
      setError({
        isError: false,
        errorMessage: null
      })
      router.push("/login")
    },
    onError: (axiosError: any) => {
      setError({
      isError: true,
      errorMessage: axiosError.response.data.error
    })
  }
  })

  // Registering the user
  const handleSignup = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (Object.values(user).every((value) => value.trim().length !== 0)) {
      if (user.password === user.confirmedPassword) {
        // Destructuring the email and password from the object
        const {email, password} = user
        // Mutating
        mutate({email, password})
      } else {
        // Sending an error if the two values do not match
        setError({
          isError: true,
          errorMessage: "The two passwords do not match, try again!",
        });
      }
    } else {
      // Sending an error if an input field is empty
      const missingFields = Object.keys(user)
      .filter((key: string) => user[key as keyof typeof user].trim().length === 0);
      const errorMessage = checkMissingInputFields(missingFields)
      setError({
        isError: true,
        errorMessage
      });
    }
  };


  return (
      <main className="flex w-full bg-gradient-to-b from-[#e9e9e9] to-white gap-10" style={poppins.style}>
        <div className="relative sm:flex hidden items-center justify-center h-screen w-1/2 ">
          <div className="pl-10">
            <Image alt="signup_form_image" src={hairyKnotImg} className="relative z-1 w-[32rem] z-10" />
          </div>
          <div className="absolute -z-1 left-1/3 w-1/2 md:h-[32rem] h-[20rem] bg-[#23616F] rounded-[2rem] shadow-2xl"></div>
        </div>
        <form onSubmit={handleSignup} 
        className="flex items-center justify-center h-screen sm:w-1/2 w-full pr-10">
          <Flex direction="column" gap="3rem">
            <Flex direction='column' position="relative">
              <Image src={hairyKnotImg} className="sm:hidden flex absolute w-[10rem] top-0" alt="" />
              <h1 className="lg:text-8xl md:text-7xl sm:text-6xl text-7xl text-[#23616F] font-[800] ">Hi there!</h1>
              <span className="md:text-sm text-xs text-[#343333] font-normal ">Sign up to IconAI and enjoy our free plan!</span>
            </Flex>
              <Flex direction='column' gap="1.5rem" className="w-[20rem] ">
                <Flex direction="column" gap="0.5rem">
                  <label htmlFor="" className="text-md">Email</label>
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
                  <label htmlFor="" className="text-md">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={onChange}
                    placeholder="Create a password"
                    className="py-2 px-6 outline-none rounded-full bg-[#ececec] placeholder:text-sm"
                  />
                </Flex>
                <Flex direction="column" gap="0.5rem">
                  <label htmlFor="" className="text-md">Confirm password</label>
                  <input
                    type="password"
                    name="confirmedPassword"
                    value={user.confirmedPassword}
                    onChange={onChange}
                    placeholder="Confirm your password"
                    className="py-2 px-6 outline-none rounded-full bg-[#ececec] placeholder:text-sm"
                  />
                </Flex>
                {error.isError && (
                  <span className="text-red-400 text-sm ">{error.errorMessage}</span>
                )}
                <Flex direction="column" gap="0.5rem" alignItems="start">
                  <button
                  type="submit" 
                  className="py-2 px-10 rounded-full text-white bg-[#23616F] shadow-lg hover:px-14 transition-all">
                    {isLoading ? <Spinner /> : "Submit"} 
                  </button>
                  <span className="text-sm text-[#676565] ">Already have an account ? <Link href="/login">Login</Link></span>
                </Flex>
              </Flex>
          </Flex>
        </form>
      </main>
  );
};

export default Register;
