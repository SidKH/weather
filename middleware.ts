import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  console.log(req.headers.get("X-Forwarded-For"));
}
