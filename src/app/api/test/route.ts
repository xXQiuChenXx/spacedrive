import { exchangeToken } from "@/lib/oAuthHandler";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await exchangeToken({ refreshToken: "asjkchdijfhdsifed" });
  console.log(response);
  return NextResponse.json(response);
}
