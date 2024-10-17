import { handleFileUpload } from "@/lib/upload";
import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Not file sended." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({
        error: "The file is too large. The maximum allowed size is 2MB.",
      });
    }

    const { uniqueFilename } = await handleFileUpload(file);

    return NextResponse.json({
      message: "Image sended successfully.",
      filename: uniqueFilename,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: `Error ${error}`,
      },
      {
        status: 400,
      }
    );
  }
}
