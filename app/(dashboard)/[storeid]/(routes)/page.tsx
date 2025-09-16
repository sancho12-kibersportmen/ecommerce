import  paramsdb  from "@/lib/prismadb";

interface DashboardPageProps {
    params: Promise<{ storeid: string }>;
}



const DashboardPage: React.FC<DashboardPageProps> = async ({ 
    params
 }) => {
    const { storeid } = await params;
    const store = await paramsdb.store.findFirst({
        where: {
            id: storeid,
        }
    })
    return (
        <div>
            Active Store: {store?.name}
        </div>
    )
}

export default DashboardPage;
