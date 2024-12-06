import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ category: string; id: string }> }
) {
  // 비동기적으로 params 접근
  const { category, id } = await params;

  const filePath = path.join(
    process.cwd(),
    "data", // JSON 파일이 저장된 폴더
    `${category}_top3000_metadata.json`
  );

  // 파일 존재 여부 확인
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  try {
    // 파일 읽기
    const fileData = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(fileData);

    // id 유효성 확인
    const itemIndex = parseInt(id, 10);
    if (isNaN(itemIndex) || itemIndex < 0 || itemIndex >= jsonData.length) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // 요청된 id의 데이터 반환
    const item = jsonData[itemIndex];
    return NextResponse.json(item);
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json({ error: "Error reading file" }, { status: 500 });
  }
}