import Error from "next/error";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;

  const { searchParams } = new URL(request.url);
  const rawData = searchParams.get("data");

  if (!rawData) {
    return NextResponse.json(
      { error: "Missing required data parameter" },
      { status: 400 }
    );
  }

  try {
    const parsedData = JSON.parse(decodeURIComponent(rawData));

    const requestData = {
      ...parsedData,
      k: 5,
    };

    // 타겟 서버로 요청 보내기
    const targetUrl = `http://rst0070.duckdns.org:3005/list/${category}`;

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from target server" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }
}
