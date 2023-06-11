import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
      <nav className="py-4 flex gap-4 justify-around">
        <div>LogoAI</div>
        <ul className="flex gap-10">
          <li>Home</li>
          <li>About</li>
          <li>Pricing</li>
        </ul>
        <Link href='/login'>
          <button className="">Login</button>
        </Link>
      </nav>
      <Link href='/register'>
        <button>Get started</button>
      </Link>
    </main>
  )
}
