import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { name } = body as { name?: string };

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeid) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const result = await prismadb.store.updateMany({
      where: {
        id: params.storeid,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeid) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (store.count === 0) {
      return new NextResponse("Store not found", { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


