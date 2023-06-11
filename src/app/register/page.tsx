"use client";
import React, { useState } from "react";

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
  const registerUser = () => {
    if(Object.values(user).every(value => value.length !== 0)) {
        if(user.password === user.confirmedPassword) {
            const {email, password} = user
            // Sending an axios request 
        } else {
            // Send an error if the two values do not match
        }
    } else {
        // Send an error if an input field is empty
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
      </form>
    </main>
  );
};

export default Register;
