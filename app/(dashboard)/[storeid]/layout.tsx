import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ storeid: string }>;
}) {
    const { userId } = await auth();
    const { storeid } = await params;

    if (!userId) {
        redirect("/sign-in");
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: storeid,
            userId
        }
    })

    if (!store) {
        redirect("/");
    }

    return (
       <>
       <Navbar />
       {children}
       </> 
    )
}