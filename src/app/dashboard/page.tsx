"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Dashboard = async () => {
  const router = useRouter();
  const signOutUser = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={signOutUser}>Sign out</button>
    </div>
  );
};

export default Dashboard;
