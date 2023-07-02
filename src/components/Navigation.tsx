import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center text-white">
      <span className="font-black">IconAI</span>
      <div className="flex items-center gap-10">
        <ul className="flex items-center gap-8">
          <li className="hover:scale-105 transition-all">Home</li>
          <li className="hover:scale-105 transition-all">About</li>
          <li className="hover:scale-105 transition-all">FAQ</li>
          <li className="hover:scale-105 transition-all">Contact</li>
        </ul>
        <Link href="/login">
          <button className="px-2 py-6 rounded-full bg-[#4B88FF] text-sm">Sign in</button>
        </Link>
      </div>
      <div className="flex justify-between items-center h-8 w-12 bg-white rounded-full p-[5px] ">
        <div className="w-1/3"></div>
        <div className="w-1/3 bg-[#C1D1EE] rounded-full"></div>
      </div>
    </nav>
  );
};

export default Navigation;
