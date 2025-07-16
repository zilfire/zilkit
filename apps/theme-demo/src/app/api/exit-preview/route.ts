import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: "Preview mode disabled" });

  // Clear the preview mode cookie
  response.cookies.delete("__prerender_bypass");
  response.cookies.delete("__next_preview_data");

  return response;
}
