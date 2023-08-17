import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = await getToken({
    req: request,
    secret: process.env.TOKEN_SECRET,
  });

  // custom request headers
  // request.headers.set('custom-req-header-from-middleware', 'hello')
  // console.log(request.headers);

  // log request and response data
  // console.log("REQUEST: " + request);
  // console.log("RESPONSE:" + response);

  if (
    request.nextUrl.pathname.startsWith("/posts") &&
    session?.role !== "admin" &&
    session?.role !== "developer"
  ) {
    console.log("REQUEST: " + request);
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}
