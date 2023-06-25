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
      <main className="flex w-full bg-[#EBEBEB]">
        <div className="relative flex items-center justify-center h-screen w-1/2">
          <div className="pl-10">
            <Image alt="signup_form_image" src={hairyKnotImg} className="w-[29rem]" />
          </div>
          <div className="absolute w-1/3 h-96 bg-[#23616F] rounded-2xl"></div>
        </div>
        <form onSubmit={handleSignup} 
        className="flex items-center justify-center h-screen w-1/2 px-10">
          <Flex direction="column" gap={4}>
            <Flex direction='column'>
              <h1 className="text-5xl text-[#23616F] font-black">Hello there!</h1>
              <span className="text-sm text-[#343333] font-normal ">Sign up to our application</span>
            </Flex>
              <Flex direction='column' gap={2}  >
                <Flex direction="column" gap={1}>
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={onChange}
                    placeholder="Enter your email"
                    className="py-2 px-4 outline-none rounded-full w-3/4 bg-[#E3E3E3]"
                  />
                </Flex>
                <Flex direction="column" gap={1}>
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={onChange}
                    placeholder="Create a password"
                    className="py-2 px-4 outline-none rounded-full w-3/4 bg-[#E3E3E3]"
                  />
                </Flex>
                <Flex direction="column" gap={1}>
                  <label htmlFor="">Confirm password</label>
                  <input
                    type="password"
                    name="confirmedPassword"
                    value={user.confirmedPassword}
                    onChange={onChange}
                    placeholder="Confirm your password"
                    className="py-2 px-4 outline-none rounded-full w-3/4 bg-[#E3E3E3]"
                  />
                </Flex>
                <Flex>
                  <button
                  type="submit" 
                  className="py-2 px-5 rounded-full text-white bg-[#23616F]">Submit</button>
                  <span>Already have an account ? <Link href="/login">Login</Link></span>
                </Flex>
              </Flex>
          </Flex>
        </form>
      </main>
  );
};

export default Register;
