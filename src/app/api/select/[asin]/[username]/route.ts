import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ asin: string; username: string }> }
) {
  const { asin, username } = await params;

  // Query string에서 `username` 가져오기
  //   const url = new URL(req.url);

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  try {
    // 타겟 서버로 요청 보내기
    const targetUrl = `https://rating.server.unknownpgr.com/select/${asin}?username=${username}`;
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from target server" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in proxy:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
