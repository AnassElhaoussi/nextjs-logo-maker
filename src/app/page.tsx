import React from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { poppins } from './fonts'

export default function Home() {
  return (
    <main className="p-5" style={poppins.style}>
      <Navigation />
      <Home />
    </main>
  )
}
