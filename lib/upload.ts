import path from "path";
import { writeFile } from "fs/promises";

function generateNumericFilename(originalExtension: string): string {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);
  return `${timestamp}${randomNum}${originalExtension}`;
}

export async function handleFileUpload(file: File) {
  const buffer = await file.arrayBuffer();
  const filename = path.extname(file.name);
  const uniqueFilename = generateNumericFilename(filename);
  
  const filepath = path.join(
    process.cwd(),
    "public",
    "uploads",
    uniqueFilename
  );

  await writeFile(filepath, Buffer.from(buffer));
  return { uniqueFilename };
}
