import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.geo) {
    const response = NextResponse.next();
    response.headers.set(
      "x-location",
      `${request.geo.latitude},${request.geo.longitude}`
    );
    return response;
  }
}
