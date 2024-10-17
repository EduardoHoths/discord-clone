import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { handleFileUpload } from "@/lib/upload";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const serverName = formData.get("serverName") as string | null;

    if (!serverName) {
      return new NextResponse("Server name is required.", { status: 400 });
    }

    const updateData: { name: string; image?: string } = { name: serverName };

    if (file) {
      const { uniqueFilename } = await handleFileUpload(file);
      updateData.image = uniqueFilename;
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
      },
      data: updateData,
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
