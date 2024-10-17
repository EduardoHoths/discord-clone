import { handleFileUpload } from "@/lib/upload";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@/types/enums";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const serverName = formData.get("serverName") as string | null;
    const profile = await currentProfile();

    if (!file) {
      return NextResponse.json({ error: "Not file sended." }, { status: 400 });
    }

    if (!serverName) {
      return NextResponse.json(
        { error: "Not serverName sended." },
        { status: 400 }
      );
    }

    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { uniqueFilename } = await handleFileUpload(file);

    const server = await db.server.create({
      data: {
        name: serverName,
        image: uniqueFilename,
        profileId: profile.id,
        inviteCode: uuidv4(),
        channels: {
          create: [
            { name: "general", profileId: profile.id },
          ]
        },
        members: {
          create: [
            { profileId: profile.id, role: MemberRole.ADMIN },
          ]
        }
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}


