import { getServerSession } from "next-auth"
const Dashboard = async () => {
    const session = await getServerSession()
    return (
        <div></div>
    )
}

export default Dashboard