"use client";
import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    
    setUser({
        ...user,
        [name]: value
    })
  }

  const loginUser = () => {
    // Should be login the user
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
