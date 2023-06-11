import React from "react";

const Login = () => {
  return (
    <main>
      <h1>Login to our application</h1>
      <form>
        <div className="">
          <label htmlFor="">Email</label>
          <input type="text" placeholder="Enter your email" className="block" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="text"
            placeholder="Enter your password"
            className="block"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default Login;
