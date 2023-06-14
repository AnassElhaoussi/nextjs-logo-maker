"use client";
import React, { useState } from "react";
import { checkMissingInputFields } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import signUpUser from "../../../API";
import { useRouter } from "next/router";
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
    onSuccess: () => router.push('/login'),
    onError: (error: string) => setError({isError: true, errorMessage: error})
  })

  const registerUser = (e: React.SyntheticEvent) => {
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
    <main>
      <h1>Sign up to our application</h1>
      <form action="" onSubmit={registerUser}>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={onChange}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={onChange}
            placeholder="Create a password"
          />
        </div>
        <div>
          <label htmlFor="">Confirm password</label>
          <input
            type="password"
            name="confirmedPassword"
            value={user.confirmedPassword}
            onChange={onChange}
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit">Submit</button>
        {error.isError && (
            <span>{error.errorMessage}</span>
        )}
      </form>
    </main>
  );
};

export default Register;
