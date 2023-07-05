import React from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { poppins } from './fonts'
import Home from '@/components/Home'

export default function App() {
  return (
    <main className="p-5" style={poppins.style}>
      <Navigation />
      <Home />
    </main>
  )
}
