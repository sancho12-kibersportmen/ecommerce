import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Home() {
    const { userId } = await auth()
    
    if (!userId) {
        redirect("/sign-in")
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <Button>Click me</Button>
        </div>
    )
}