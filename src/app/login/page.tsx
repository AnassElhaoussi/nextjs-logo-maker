"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

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
          redirect: false,
          email: user.email,
          password: user.password,
        });

        if (!res?.error) router.push("/dashboard");
        setLoading(false);
        setError("Invalid credentials, try again!");
      } catch (error: any) {
        setLoading(false);
        setError(error);
      }
    } else {
      setError("Some fields are empty, try again!");
    }
  };
  return (
    <form action="" onSubmit={handleLogin}>
      <h1>Login to our application</h1>
      <div>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={onChange}
          />
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Login;
