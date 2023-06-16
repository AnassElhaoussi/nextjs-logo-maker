import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {redirect} from 'next/navigation'

const getSessionData = async () => {
    const session = await getServerSession(authOptions)
    return {
        authenticated: !!session,
        session
    }
}

const Dashboard = async () => {
    const sessionData = await getSessionData()
    if(!sessionData.authenticated) {
        redirect("/register?callbackUrl=/dashboard")
    }

    return (
        <div></div>
    )
}

export default Dashboard