import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

function getContentType(extension: string): string {
  const contentTypes: { [key: string]: string } = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".bmp": "image/bmp",
    ".webp": "image/webp",
  };
  return contentTypes[extension.toLowerCase()] || "application/octet-stream";
}

export async function GET(
  req: Request,
  { params }: { params: { filename: string } }
) {
  const { filename } = params;
  try {
    const filepath = path.join(process.cwd(), "public", "uploads", filename);
    const fileBuffer = await readFile(filepath);

    const response = new NextResponse(fileBuffer);

    const contentType = getContentType(path.extname(filename));
    response.headers.set("Content-Type", contentType);

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
}
