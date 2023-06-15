"use client";
import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<null | string>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    
    setUser({
        ...user,
        [name]: value
    })
  }

  const loginUser = () => {
    // This is making sure that the input field is not empty
    if(Object.values(user).every((value) => value.trim().length !== 0)){

    } else {
        setError("Some fields are empty, try again!")
    }
  }
  return (
    <form action="" onSubmit={loginUser}>
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
