import React from "react";
import Link from 'next/link'

const NavigationBar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-[#FEFEFE] ">
      <h2 className="font-medium">Dashboard</h2>
      <div className="flex items-center gap-x-4">
        <Link href="/dashboard/credits">
            <button className="bg-[#48BAFB] p-1 text-sm">Credits</button>
        </Link>
        <button></button>
      </div>
    </nav>
  );
};

export default NavigationBar;
