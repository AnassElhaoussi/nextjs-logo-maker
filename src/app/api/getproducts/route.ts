import Stripe from 'stripe'
import {NextResponse} from 'next/server'

export async function GET(req: Request){
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2022-11-15",
        typescript: true
    })

    const prices = await stripe.prices.list({
        limit: 4
    })
    return NextResponse.json(prices.data.reverse())
}