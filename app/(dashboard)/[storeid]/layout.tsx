import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storeid: string };
}) {
    const { userId } = await auth();


    if (!userId) {
        redirect("/sign-in");
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeid,
            userId
        }
    })

    if (!store) {
        redirect("/");
    }

    return (
       <>
       <div>This will be the navbar</div>
       {children}
       </> 
    )
}