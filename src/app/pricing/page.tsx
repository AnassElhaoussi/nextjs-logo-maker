"use client"
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import PricingCard from '@/components/pricing/PricingCard'


const PricingPage = () => {
    const [prices, setPrices] = useState<object[]>([])

    useEffect(() => {
        fetchPrices()
    }, [])

    const fetchPrices = async () => {
        const {data} = await axios.get("/api/getproducts")
        setPrices(data)
    }
    return (
        <main className="flex flex-col gap-5 items-center justify-center h-screen">
            <h1 className="">Pricing</h1>
            <p className="">Choose the right plan for you!</p>
            {prices && prices.map((price, id) => (
                <PricingCard key={id} price={price} />
            ))}
        </main>
    )
}

export default PricingPage